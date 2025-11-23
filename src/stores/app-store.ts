import { Task, TaskPriority, TaskFilter } from '@/types/task'
import { loadTasks, saveTasks } from '@/lib/taskStorage'
import { generateId } from '@/lib/utils'

interface AppState {
  // Task state
  tasks: Task[]
  filter: TaskFilter
  isLoaded: boolean

  // Task actions
  createTask: (data: {
    title: string
    description: string
    dueDate: string | null
    priority: TaskPriority
  }) => Task
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTaskCompletion: (id: string) => void

  // Filter actions
  setSearchQuery: (query: string) => void
  setPriorityFilter: (priority: TaskPriority | null) => void
  setShowCompleted: (show: boolean) => void

  // Initialization
  initializeTasks: () => void
}

// Note: This store is kept for reference but the app uses the useTasks hook instead
// for better React integration and local state management

export const createAppStore = (): AppState => {
  const tasks = loadTasks()

  return {
    tasks,
    filter: {
      priority: null,
      searchQuery: '',
      showCompleted: false,
    },
    isLoaded: true,

    createTask: (data) => {
      const newTask: Task = {
        id: generateId(),
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        priority: data.priority,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return newTask
    },

    updateTask: (id, updates) => {
      const index = tasks.findIndex((t) => t.id === id)
      if (index !== -1) {
        tasks[index] = {
          ...tasks[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        }
        saveTasks(tasks)
      }
    },

    deleteTask: (id) => {
      const index = tasks.findIndex((t) => t.id === id)
      if (index !== -1) {
        tasks.splice(index, 1)
        saveTasks(tasks)
      }
    },

    toggleTaskCompletion: (id) => {
      const task = tasks.find((t) => t.id === id)
      if (task) {
        task.completed = !task.completed
        task.updatedAt = new Date().toISOString()
        saveTasks(tasks)
      }
    },

    setSearchQuery: (query) => {
      // Filter state would be managed separately
    },

    setPriorityFilter: (priority) => {
      // Filter state would be managed separately
    },

    setShowCompleted: (show) => {
      // Filter state would be managed separately
    },

    initializeTasks: () => {
      // Tasks are loaded on store creation
    },
  }
}
