import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FileText, Search } from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { NoteCard } from './NoteCard';

export function NotesGrid() {
  const { filteredNotes, viewMode, searchTerm, selectedCategory, categories } = useNotes();

  const selectedCategoryName = categories.find(cat => cat.id === selectedCategory)?.name || 'All Notes';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] text-center"
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center mb-6"
      >
        {searchTerm ? (
          <Search className="w-12 h-12 text-gray-400" />
        ) : (
          <FileText className="w-12 h-12 text-gray-400" />
        )}
      </motion.div>
      
      <h3 className="text-xl font-semibold text-white mb-2">
        {searchTerm ? 'No notes found' : 'No notes yet'}
      </h3>
      
      <p className="text-gray-400 mb-6 max-w-md">
        {searchTerm 
          ? `No notes match "${searchTerm}". Try adjusting your search terms.`
          : `Create your first note to get started. Click the "New Note" button to begin.`
        }
      </p>

      {!searchTerm && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          <span>Create Your First Note</span>
        </motion.button>
      )}
    </motion.div>
  );

  if (filteredNotes.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {selectedCategoryName}
          </h2>
          <p className="text-gray-400">
            {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
      </motion.div>

      {/* Notes Grid/List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }
      >
        <AnimatePresence mode="popLayout">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              viewMode={viewMode}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load More Button (for future pagination) */}
      {filteredNotes.length >= 20 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center pt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass px-6 py-3 rounded-xl text-white font-medium hover:bg-white/10 transition-all duration-200"
          >
            Load More Notes
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}