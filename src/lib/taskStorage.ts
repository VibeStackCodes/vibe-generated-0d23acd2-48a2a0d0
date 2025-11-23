import { Task } from '@/types/task'

const TASKS_STORAGE_KEY = 'privio_tasks'

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error)
  }
}

export function loadTasks(): Task[] {
  try {
    const stored = localStorage.getItem(TASKS_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error)
    return []
  }
}

export function deleteTaskFromStorage(taskId: string, tasks: Task[]): Task[] {
  return tasks.filter((task) => task.id !== taskId)
}

export function clearAllTasks(): void {
  try {
    localStorage.removeItem(TASKS_STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear tasks from localStorage:', error)
  }
}
