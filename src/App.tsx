import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { VibeStackBadge } from '@/components/vibestack-badge'
import { TaskList } from '@/components/TaskList'
import { TaskForm } from '@/components/TaskForm'
import { TaskFilter } from '@/components/TaskFilter'
import { TaskSearch } from '@/components/TaskSearch'
import { TaskStats } from '@/components/TaskStats'
import { useTasks } from '@/hooks/useTasks'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { Plus } from 'lucide-react'

/**
 * Main App component with task management layout
 * Integrates task list, creation form, filtering, and search functionality
 */
function App() {
  const [showForm, setShowForm] = useState(false)
  const {
    filteredTasks,
    filter,
    isLoaded,
    createTask,
    deleteTask,
    toggleTaskCompletion,
    setSearchQuery,
    setPriorityFilter,
  } = useTasks()

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onNewTask: () => setShowForm(true),
    onEscape: () => setShowForm(false),
  })

  // Handle form submission
  const handleCreateTask = (data: {
    title: string
    description: string
    dueDate: string | null
    priority: 'high' | 'medium' | 'low'
  }) => {
    createTask(data)
    setShowForm(false)
  }

  if (!isLoaded) {
    return (
      <ErrorBoundary>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        }
      >
        <div className="min-h-screen bg-background">
          {/* Main Content */}
          <div className="task-container">
            {/* Header */}
            <div className="task-header mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Privio Tasks</h1>
                <p className="mt-1 text-muted-foreground">
                  Privacy-first task management
                </p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                aria-label="Create new task (Ctrl+N)"
              >
                <Plus className="h-5 w-5" />
                <span className="hidden sm:inline">New Task</span>
              </button>
            </div>

            {/* Stats */}
            <div className="mb-8">
              <TaskStats tasks={filteredTasks} />
            </div>

            {/* Controls */}
            <div className="task-controls mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <TaskSearch
                  value={filter.searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search tasks..."
                />
              </div>
              <div className="flex-shrink-0">
                <TaskFilter
                  selectedPriority={filter.priority}
                  onPriorityChange={setPriorityFilter}
                />
              </div>
            </div>

            {/* Task List */}
            <div className="mb-8">
              <TaskList
                tasks={filteredTasks}
                onToggleComplete={toggleTaskCompletion}
                onDelete={deleteTask}
              />
            </div>
          </div>

          {/* Task Form Modal */}
          {showForm && (
            <TaskForm
              onSubmit={handleCreateTask}
              onCancel={() => setShowForm(false)}
            />
          )}

          {/* VibeStack Badge */}
          <VibeStackBadge />
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
