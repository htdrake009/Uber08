export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  tags: string[];
  isFavorite: boolean;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export type ViewMode = 'grid' | 'list';
export type SortBy = 'updatedAt' | 'createdAt' | 'title' | 'category';
export type SortOrder = 'asc' | 'desc';

export interface AppState {
  notes: Note[];
  categories: Category[];
  searchTerm: string;
  selectedCategory: string;
  viewMode: ViewMode;
  sortBy: SortBy;
  sortOrder: SortOrder;
  showFavoritesOnly: boolean;
}