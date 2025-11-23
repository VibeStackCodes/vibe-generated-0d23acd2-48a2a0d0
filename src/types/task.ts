export type TaskPriority = 'high' | 'medium' | 'low'

export interface Task {
  id: string
  title: string
  description: string
  dueDate: string | null
  priority: TaskPriority
  completed: boolean
  createdAt: string
  updatedAt: string
}

export interface TaskFilter {
  priority: TaskPriority | null
  searchQuery: string
  showCompleted: boolean
}

export interface TaskStats {
  total: number
  completed: number
  pending: number
}
