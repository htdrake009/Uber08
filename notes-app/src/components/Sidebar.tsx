import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderOpen, 
  Plus, 
  Hash,
  ChevronRight,
  ChevronDown,
  Palette
} from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { cn } from '../utils';

const categoryColors = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
  '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
];

export function Sidebar() {
  const { 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    notes, 
    addCategory 
  } = useNotes();
  
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState(categoryColors[0]);

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return notes.length;
    return notes.filter(note => note.category === categoryId).length;
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory({
        name: newCategoryName,
        color: selectedColor,
        icon: '📁'
      });
      setNewCategoryName('');
      setShowAddCategory(false);
    }
  };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 glass rounded-r-2xl border-0 border-r border-white/20 h-full overflow-hidden"
    >
      <div className="p-6">
        {/* Categories Header */}
        <motion.div
          className="flex items-center justify-between mb-6 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center space-x-2">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
            <FolderOpen className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Categories</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setShowAddCategory(true);
            }}
            className="p-1 hover:bg-white/10 rounded-md transition-colors"
          >
            <Plus className="w-4 h-4 text-gray-400" />
          </motion.button>
        </motion.div>

        {/* Categories List */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              {/* All Notes */}
              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory('all')}
                className={cn(
                  'w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200',
                  selectedCategory === 'all'
                    ? 'bg-blue-500/20 border border-blue-500/30 text-white'
                    : 'hover:bg-white/10 text-gray-300'
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <span className="font-medium">All Notes</span>
                </div>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {getCategoryCount('all')}
                </span>
              </motion.button>

              {/* Category Items */}
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200',
                    selectedCategory === category.id
                      ? 'bg-white/20 border border-white/30 text-white shadow-lg'
                      : 'hover:bg-white/10 text-gray-300'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {getCategoryCount(category.id)}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Category Form */}
        <AnimatePresence>
          {showAddCategory && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 p-4 glass rounded-xl border border-white/20"
            >
              <input
                type="text"
                placeholder="Category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full p-2 bg-white/10 rounded-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 mb-3"
                autoFocus
              />
              
              {/* Color Picker */}
              <div className="flex items-center space-x-2 mb-3">
                <Palette className="w-4 h-4 text-gray-400" />
                <div className="flex space-x-2">
                  {categoryColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        'w-6 h-6 rounded-full border-2 transition-all',
                        selectedColor === color
                          ? 'border-white scale-110'
                          : 'border-transparent hover:scale-105'
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleAddCategory}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowAddCategory(false);
                    setNewCategoryName('');
                  }}
                  className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-4 glass rounded-xl border border-white/20"
        >
          <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Total Notes</span>
              <span className="text-white font-medium">{notes.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Favorites</span>
              <span className="text-white font-medium">
                {notes.filter(note => note.isFavorite).length}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Categories</span>
              <span className="text-white font-medium">{categories.length}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}