import { Note } from '../types';
import { generateId } from '../utils';

export const sampleNotes: Omit<Note, 'id'>[] = [
  {
    title: "Welcome to NotesApp! 🎉",
    content: `# Welcome to Your New Notes App!

This is your first note, and we're excited to have you here! This app is designed to be your digital companion for capturing thoughts, ideas, and important information.

## Features You'll Love:

- **Beautiful Design**: Clean, modern interface with smooth animations
- **Smart Organization**: Categories, tags, and powerful search
- **Rich Text Support**: Write with style and formatting
- **Favorites**: Mark important notes with a heart
- **Export & Import**: Your data, your way
- **Responsive**: Works perfectly on all devices

## Getting Started:

1. Click the "New Note" button to create your first note
2. Use categories to organize your thoughts
3. Add tags for better searchability
4. Mark favorites with the heart icon
5. Use the search bar to find anything quickly

Start writing and let your creativity flow! ✨`,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    category: 'notes',
    tags: ['welcome', 'getting-started', 'features'],
    isFavorite: true,
    color: '#8B5CF6',
  },
  {
    title: "Project Ideas 💡",
    content: `# Exciting Project Ideas

## Web Development
- Build a portfolio website with Next.js
- Create a weather app with React
- Develop a task management tool
- Build a blog with Gatsby

## Mobile Apps
- Habit tracker application
- Recipe sharing platform
- Fitness companion app
- Language learning tool

## Creative Projects
- Design a logo for local business
- Create digital art series
- Write short stories
- Start a podcast about tech

## Learning Goals
- Master TypeScript
- Learn Docker and Kubernetes
- Explore machine learning
- Study system design patterns

Remember: The best project is the one you're passionate about! 🚀`,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    category: 'ideas',
    tags: ['projects', 'development', 'creativity', 'learning'],
    isFavorite: true,
    color: '#F59E0B',
  },
  {
    title: "Daily Standup Notes",
    content: `# Team Standup - ${new Date().toLocaleDateString()}

## Yesterday's Accomplishments
- ✅ Completed user authentication flow
- ✅ Fixed responsive design issues
- ✅ Reviewed pull requests from team
- ✅ Updated project documentation

## Today's Goals
- 🎯 Implement search functionality
- 🎯 Add unit tests for API endpoints
- 🎯 Meeting with design team at 2 PM
- 🎯 Code review session with senior dev

## Blockers
- Waiting for API keys from third-party service
- Need clarification on new feature requirements

## Notes
- Great progress on sprint goals
- Team collaboration has been excellent
- Consider adding more automated tests`,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    category: 'work',
    tags: ['standup', 'daily', 'progress', 'team'],
    isFavorite: false,
    color: '#10B981',
  },
  {
    title: "Book Recommendations 📚",
    content: `# Must-Read Books

## Technical Books
- **Clean Code** by Robert Martin
- **Design Patterns** by Gang of Four
- **System Design Interview** by Alex Xu
- **The Pragmatic Programmer** by Hunt & Thomas

## Personal Development
- **Atomic Habits** by James Clear
- **Deep Work** by Cal Newport
- **The 7 Habits** by Stephen Covey
- **Mindset** by Carol Dweck

## Fiction Favorites
- **The Martian** by Andy Weir
- **Ready Player One** by Ernest Cline
- **Dune** by Frank Herbert
- **1984** by George Orwell

## Currently Reading
- **The Phoenix Project** - DevOps novel
- **Thinking, Fast and Slow** - Psychology

*Reading is to the mind what exercise is to the body.* 💪`,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    category: 'personal',
    tags: ['books', 'reading', 'recommendations', 'learning'],
    isFavorite: true,
    color: '#EC4899',
  },
  {
    title: "Weekend Tasks ✅",
    content: `# Weekend To-Do List

## Home & Personal
- [ ] Grocery shopping
- [ ] Clean the apartment
- [ ] Laundry and organizing closet
- [ ] Call mom and dad
- [ ] Meal prep for the week

## Learning & Development
- [ ] Complete React course chapter 5
- [ ] Practice coding challenges
- [ ] Read 2 chapters of current book
- [ ] Watch tech conference videos

## Fun & Relaxation
- [ ] Movie night with friends
- [ ] Try that new restaurant downtown
- [ ] Go for a nature walk
- [ ] Work on personal art project

## Planning
- [ ] Review next week's calendar
- [ ] Plan meals for the week
- [ ] Set goals for upcoming month

*Balance is key - work hard, rest well!* 🌟`,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    category: 'tasks',
    tags: ['weekend', 'todo', 'personal', 'productivity'],
    isFavorite: false,
    color: '#EF4444',
  },
  {
    title: "Recipe: Perfect Pasta 🍝",
    content: `# Creamy Garlic Parmesan Pasta

## Ingredients
- 1 lb fettuccine pasta
- 4 cloves garlic, minced
- 1 cup heavy cream
- 1 cup grated Parmesan cheese
- 3 tbsp butter
- 2 tbsp olive oil
- Salt and pepper to taste
- Fresh parsley for garnish

## Instructions

1. **Cook the pasta** according to package directions until al dente
2. **Heat olive oil** in large skillet over medium heat
3. **Add garlic** and sauté for 1 minute until fragrant
4. **Pour in cream** and bring to gentle simmer
5. **Add butter** and whisk until melted
6. **Stir in Parmesan** gradually until smooth
7. **Toss with pasta** and season with salt and pepper
8. **Garnish** with fresh parsley and serve immediately

## Chef's Tips
- Save some pasta water to adjust consistency
- Use freshly grated Parmesan for best flavor
- Don't let the cream boil or it might curdle
- Serve immediately while hot and creamy

*Buon Appetito!* 👨‍🍳`,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    category: 'personal',
    tags: ['recipe', 'cooking', 'pasta', 'italian'],
    isFavorite: false,
    color: '#06B6D4',
  },
];

export function addSampleNotes(): Note[] {
  return sampleNotes.map(note => ({
    ...note,
    id: generateId(),
  }));
}