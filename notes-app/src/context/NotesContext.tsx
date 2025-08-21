import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Note, Category, AppState, ViewMode, SortBy, SortOrder } from '../types';
import { generateId, sortNotes, filterNotes } from '../utils';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { addSampleNotes } from '../data/sampleNotes';

interface NotesContextType extends AppState {
  filteredNotes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setSortBy: (sortBy: SortBy) => void;
  setSortOrder: (order: SortOrder) => void;
  setShowFavoritesOnly: (show: boolean) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  exportNotes: () => void;
  importNotes: (notes: Note[]) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

type Action =
  | { type: 'SET_NOTES'; payload: Note[] }
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'UPDATE_NOTE'; payload: { id: string; updates: Partial<Note> } }
  | { type: 'DELETE_NOTE'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_SORT_BY'; payload: SortBy }
  | { type: 'SET_SORT_ORDER'; payload: SortOrder }
  | { type: 'SET_SHOW_FAVORITES_ONLY'; payload: boolean }
  | { type: 'ADD_CATEGORY'; payload: Category };

const defaultCategories: Category[] = [
  { id: 'personal', name: 'Personal', color: '#3B82F6', icon: '👤' },
  { id: 'work', name: 'Work', color: '#10B981', icon: '💼' },
  { id: 'ideas', name: 'Ideas', color: '#F59E0B', icon: '💡' },
  { id: 'tasks', name: 'Tasks', color: '#EF4444', icon: '✅' },
  { id: 'notes', name: 'Notes', color: '#8B5CF6', icon: '📝' },
];

const initialState: AppState = {
  notes: [],
  categories: defaultCategories,
  searchTerm: '',
  selectedCategory: 'all',
  viewMode: 'grid',
  sortBy: 'updatedAt',
  sortOrder: 'desc',
  showFavoritesOnly: false,
};

function notesReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.payload] };
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id
            ? { ...note, ...action.payload.updates, updatedAt: new Date() }
            : note
        ),
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
      };
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload
            ? { ...note, isFavorite: !note.isFavorite, updatedAt: new Date() }
            : note
        ),
      };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'SET_SORT_ORDER':
      return { ...state, sortOrder: action.payload };
    case 'SET_SHOW_FAVORITES_ONLY':
      return { ...state, showFavoritesOnly: action.payload };
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    default:
      return state;
  }
}

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(notesReducer, initialState);
  const [storedNotes, setStoredNotes] = useLocalStorage<Note[]>('notes', []);
  const [storedCategories, setStoredCategories] = useLocalStorage<Category[]>('categories', defaultCategories);

  useEffect(() => {
    // If no stored notes, add sample notes
    const notesToUse = storedNotes.length === 0 ? addSampleNotes() : storedNotes;
    dispatch({ type: 'SET_NOTES', payload: notesToUse });
    
    // Save sample notes to localStorage if they were added
    if (storedNotes.length === 0 && notesToUse.length > 0) {
      setStoredNotes(notesToUse);
    }
  }, [storedNotes, setStoredNotes]);

  useEffect(() => {
    setStoredNotes(state.notes);
  }, [state.notes, setStoredNotes]);

  useEffect(() => {
    setStoredCategories(state.categories);
  }, [state.categories, setStoredCategories]);

  const filteredNotes = sortNotes(
    filterNotes(state.notes, state.searchTerm, state.selectedCategory, state.showFavoritesOnly),
    state.sortBy,
    state.sortOrder
  );

  const addNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...noteData,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: 'ADD_NOTE', payload: newNote });
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    dispatch({ type: 'UPDATE_NOTE', payload: { id, updates } });
  };

  const deleteNote = (id: string) => {
    dispatch({ type: 'DELETE_NOTE', payload: id });
  };

  const toggleFavorite = (id: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
  };

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: generateId(),
    };
    dispatch({ type: 'ADD_CATEGORY', payload: newCategory });
  };

  const exportNotes = () => {
    const dataStr = JSON.stringify(state.notes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `notes-export-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importNotes = (notes: Note[]) => {
    dispatch({ type: 'SET_NOTES', payload: [...state.notes, ...notes] });
  };

  const value: NotesContextType = {
    ...state,
    filteredNotes,
    addNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    setSearchTerm: (term: string) => dispatch({ type: 'SET_SEARCH_TERM', payload: term }),
    setSelectedCategory: (category: string) => dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category }),
    setViewMode: (mode: ViewMode) => dispatch({ type: 'SET_VIEW_MODE', payload: mode }),
    setSortBy: (sortBy: SortBy) => dispatch({ type: 'SET_SORT_BY', payload: sortBy }),
    setSortOrder: (order: SortOrder) => dispatch({ type: 'SET_SORT_ORDER', payload: order }),
    setShowFavoritesOnly: (show: boolean) => dispatch({ type: 'SET_SHOW_FAVORITES_ONLY', payload: show }),
    addCategory,
    exportNotes,
    importNotes,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}