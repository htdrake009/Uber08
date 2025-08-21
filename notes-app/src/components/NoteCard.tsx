import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Copy, 
  Share,
  Calendar,
  Tag
} from 'lucide-react';
import { Note } from '../types';
import { useNotes } from '../context/NotesContext';
import { formatDate, getPreviewText, cn } from '../utils';

interface NoteCardProps {
  note: Note;
  viewMode: 'grid' | 'list';
}

export function NoteCard({ note, viewMode }: NoteCardProps) {
  const { toggleFavorite, deleteNote, categories } = useNotes();
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const category = categories.find(cat => cat.id === note.category);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${note.title}\n\n${note.content}`);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy note:', error);
    }
    setShowMenu(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: note.title,
          text: note.content,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopy();
    }
    setShowMenu(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
        onClick={() => window.dispatchEvent(new CustomEvent('editNote', { detail: note }))}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-white truncate">
                {note.title}
              </h3>
              {category && (
                <div className="flex items-center space-x-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-xs text-gray-400">{category.name}</span>
                </div>
              )}
            </div>
            <p className="text-gray-300 text-sm line-clamp-2 mb-2">
              {getPreviewText(note.content)}
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(new Date(note.updatedAt))}</span>
              </div>
              {note.tags.length > 0 && (
                <div className="flex items-center space-x-1">
                  <Tag className="w-3 h-3" />
                  <span>{note.tags.slice(0, 2).join(', ')}</span>
                  {note.tags.length > 2 && <span>+{note.tags.length - 2}</span>}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(note.id);
              }}
              className={cn(
                'p-2 rounded-lg transition-all duration-200',
                note.isFavorite
                  ? 'text-red-400 bg-red-500/20'
                  : 'text-gray-400 hover:text-red-400 hover:bg-red-500/10'
              )}
            >
              <Heart className={cn('w-4 h-4', note.isFavorite && 'fill-current')} />
            </motion.button>
            
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <MoreVertical className="w-4 h-4" />
              </motion.button>
              
              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="absolute right-0 mt-2 w-48 glass rounded-xl border border-white/20 shadow-xl z-10"
                  >
                    <div className="py-2">
                      <button
                        onClick={handleCopy}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </button>
                      <button
                        onClick={handleShare}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Share className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                      <hr className="my-1 border-white/10" />
                      <button
                        onClick={() => {
                          deleteNote(note.id);
                          setShowMenu(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
              className="glass rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer group"
        style={{ backgroundColor: `${note.color}10` }}
        onClick={() => window.dispatchEvent(new CustomEvent('editNote', { detail: note }))}
    >
      {/* Header */}
      <div className="p-4 pb-2">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1">
            {note.title}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(note.id);
              }}
              className={cn(
                'p-1.5 rounded-lg transition-all duration-200',
                note.isFavorite
                  ? 'text-red-400 bg-red-500/20'
                  : 'text-gray-400 hover:text-red-400 hover:bg-red-500/10'
              )}
            >
              <Heart className={cn('w-4 h-4', note.isFavorite && 'fill-current')} />
            </motion.button>
            
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <MoreVertical className="w-4 h-4" />
              </motion.button>
              
              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="absolute right-0 mt-2 w-48 glass rounded-xl border border-white/20 shadow-xl z-10"
                  >
                    <div className="py-2">
                      <button
                        onClick={handleCopy}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </button>
                      <button
                        onClick={handleShare}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Share className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                      <hr className="my-1 border-white/10" />
                      <button
                        onClick={() => {
                          deleteNote(note.id);
                          setShowMenu(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        {category && (
          <div className="flex items-center space-x-1 mb-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-xs text-gray-400 font-medium">{category.name}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <p className="text-gray-300 text-sm line-clamp-4 mb-4">
          {getPreviewText(note.content, 200)}
        </p>

        {/* Tags */}
        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {note.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white/10 text-gray-300 border border-white/20"
              >
                #{tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="text-xs text-gray-400 px-2 py-1">
                +{note.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(new Date(note.updatedAt))}</span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="flex items-center space-x-1 text-blue-400"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}