import { Task, TaskPriority, TaskFilter } from '@/types/task'

export function filterTasksByPriority(
  tasks: Task[],
  priority: TaskPriority | null
): Task[] {
  if (!priority) return tasks
  return tasks.filter((task) => task.priority === priority)
}

export function searchTasks(tasks: Task[], query: string): Task[] {
  if (!query.trim()) return tasks
  const lowerQuery = query.toLowerCase()
  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(lowerQuery) ||
      task.description.toLowerCase().includes(lowerQuery)
  )
}

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  let filtered = tasks

  // Filter by priority
  if (filter.priority) {
    filtered = filterTasksByPriority(filtered, filter.priority)
  }

  // Filter by search query
  if (filter.searchQuery) {
    filtered = searchTasks(filtered, filter.searchQuery)
  }

  // Filter by completion status
  if (!filter.showCompleted) {
    filtered = filtered.filter((task) => !task.completed)
  }

  return filtered
}

export function sortTasksByPriority(tasks: Task[]): Task[] {
  const priorityOrder: Record<TaskPriority, number> = {
    high: 0,
    medium: 1,
    low: 2,
  }

  return [...tasks].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  )
}

export function sortTasksByDueDate(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })
}

export function isOverdue(dueDate: string | null): boolean {
  if (!dueDate) return false
  return new Date(dueDate) < new Date()
}

export function isToday(dueDate: string | null): boolean {
  if (!dueDate) return false
  const today = new Date()
  const due = new Date(dueDate)
  return (
    due.getDate() === today.getDate() &&
    due.getMonth() === today.getMonth() &&
    due.getFullYear() === today.getFullYear()
  )
}

export function isTomorrow(dueDate: string | null): boolean {
  if (!dueDate) return false
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const due = new Date(dueDate)
  return (
    due.getDate() === tomorrow.getDate() &&
    due.getMonth() === tomorrow.getMonth() &&
    due.getFullYear() === tomorrow.getFullYear()
  )
}

export function validateTaskTitle(title: string): boolean {
  return title.trim().length > 0 && title.trim().length <= 200
}

export function validateTaskDescription(description: string): boolean {
  return description.length <= 1000
}

export function validateDueDate(dueDate: string | null): boolean {
  if (!dueDate) return true
  try {
    new Date(dueDate)
    return true
  } catch {
    return false
  }
}
