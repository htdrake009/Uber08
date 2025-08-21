import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Save, 
  Heart, 
  Tag, 
  Palette, 
  Type,
  Bold,
  Italic,
  List,
  Hash
} from 'lucide-react';
import { Note } from '../types';
import { useNotes } from '../context/NotesContext';
import { cn } from '../utils';

interface NoteEditorProps {
  note?: Note;
  isOpen: boolean;
  onClose: () => void;
}

const noteColors = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
  '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16',
  '#F97316', '#6366F1', '#14B8A6', '#F43F5E'
];

export function NoteEditor({ note, isOpen, onClose }: NoteEditorProps) {
  const { addNote, updateNote, categories } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('personal');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState(noteColors[0]);
  const [isLoading, setIsLoading] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setSelectedCategory(note.category);
      setTags(note.tags);
      setIsFavorite(note.isFavorite);
      setSelectedColor(note.color);
    } else {
      // Reset form for new note
      setTitle('');
      setContent('');
      setSelectedCategory('personal');
      setTags([]);
      setIsFavorite(false);
      setSelectedColor(noteColors[0]);
    }
  }, [note]);

  useEffect(() => {
    if (isOpen && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;

    setIsLoading(true);

    try {
      const noteData = {
        title: title.trim(),
        content: content.trim(),
        category: selectedCategory,
        tags,
        isFavorite,
        color: selectedColor,
      };

      if (note) {
        updateNote(note.id, noteData);
      } else {
        addNote(noteData);
      }

      onClose();
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSave();
    }
  };

  const canSave = title.trim() && content.trim();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-4xl max-h-[90vh] glass rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-white">
                  {note ? 'Edit Note' : 'New Note'}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={cn(
                    'p-2 rounded-lg transition-all duration-200',
                    isFavorite
                      ? 'text-red-400 bg-red-500/20'
                      : 'text-gray-400 hover:text-red-400 hover:bg-red-500/10'
                  )}
                >
                  <Heart className={cn('w-5 h-5', isFavorite && 'fill-current')} />
                </motion.button>
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  disabled={!canSave || isLoading}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200',
                    canSave
                      ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  )}
                >
                  <Save className="w-4 h-4" />
                  <span>{isLoading ? 'Saving...' : 'Save'}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Editor */}
              <div className="flex-1 flex flex-col">
                {/* Title */}
                <input
                  ref={titleRef}
                  type="text"
                  placeholder="Note title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full p-6 bg-transparent border-0 text-2xl font-bold text-white placeholder-gray-400 focus:outline-none resize-none"
                />

                {/* Content */}
                <textarea
                  ref={contentRef}
                  placeholder="Start writing your note..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 p-6 pt-0 bg-transparent border-0 text-gray-300 placeholder-gray-400 focus:outline-none resize-none leading-relaxed"
                  style={{ minHeight: '300px' }}
                />

                {/* Tags Input */}
                <div className="p-6 pt-0 border-t border-white/10">
                  <div className="flex items-center space-x-2 mb-3">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Add tags..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className="flex-1 bg-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-white/20"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddTag}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                      Add
                    </motion.button>
                  </div>

                  {/* Tags Display */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <motion.span
                          key={index}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="inline-flex items-center space-x-1 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30"
                        >
                          <Hash className="w-3 h-3" />
                          <span>{tag}</span>
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:text-white transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-64 border-l border-white/10 p-6 space-y-6">
                {/* Category */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedCategory(category.id)}
                        className={cn(
                          'w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200',
                          selectedCategory === category.id
                            ? 'bg-white/20 border border-white/30 text-white'
                            : 'hover:bg-white/10 text-gray-300'
                        )}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-medium">{category.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center space-x-2">
                    <Palette className="w-4 h-4" />
                    <span>Color</span>
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {noteColors.map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          'w-8 h-8 rounded-lg border-2 transition-all',
                          selectedColor === color
                            ? 'border-white scale-110 shadow-lg'
                            : 'border-transparent hover:scale-105'
                        )}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Word Count */}
                <div className="glass rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Stats</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Words</span>
                      <span className="text-white font-medium">
                        {content.trim().split(/\s+/).filter(word => word.length > 0).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Characters</span>
                      <span className="text-white font-medium">{content.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Tags</span>
                      <span className="text-white font-medium">{tags.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}