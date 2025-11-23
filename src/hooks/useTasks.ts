import { useState, useCallback, useEffect } from 'react'
import { Task, TaskPriority, TaskFilter } from '@/types/task'
import { loadTasks, saveTasks } from '@/lib/taskStorage'
import { generateId } from '@/lib/utils'
import { filterTasks, sortTasksByPriority } from '@/lib/taskUtils'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<TaskFilter>({
    priority: null,
    searchQuery: '',
    showCompleted: false,
  })
  const [isLoaded, setIsLoaded] = useState(false)

  // Load tasks from localStorage on mount
  useEffect(() => {
    const loadedTasks = loadTasks()
    setTasks(loadedTasks)
    setIsLoaded(true)
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      saveTasks(tasks)
    }
  }, [tasks, isLoaded])

  const createTask = useCallback(
    (data: {
      title: string
      description: string
      dueDate: string | null
      priority: TaskPriority
    }) => {
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
      setTasks((prev) => [newTask, ...prev])
      return newTask
    },
    []
  )

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    )
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  const toggleTaskCompletion = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    )
  }, [])

  const setSearchQuery = useCallback((query: string) => {
    setFilter((prev) => ({ ...prev, searchQuery: query }))
  }, [])

  const setPriorityFilter = useCallback((priority: TaskPriority | null) => {
    setFilter((prev) => ({ ...prev, priority }))
  }, [])

  const setShowCompleted = useCallback((show: boolean) => {
    setFilter((prev) => ({ ...prev, showCompleted: show }))
  }, [])

  const filteredTasks = filterTasks(tasks, filter)
  const sortedTasks = sortTasksByPriority(filteredTasks)

  return {
    tasks,
    filteredTasks: sortedTasks,
    filter,
    isLoaded,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    setSearchQuery,
    setPriorityFilter,
    setShowCompleted,
  }
}
