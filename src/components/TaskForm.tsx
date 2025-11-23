import { useState } from 'react'
import { TaskPriority } from '@/types/task'
import { validateTaskTitle, validateTaskDescription } from '@/lib/taskUtils'
import { X } from 'lucide-react'

interface TaskFormProps {
  onSubmit: (data: {
    title: string
    description: string
    dueDate: string | null
    priority: TaskPriority
  }) => void
  onCancel: () => void
}

export function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!validateTaskTitle(title)) {
      newErrors.title = 'Title is required and must be less than 200 characters'
    }

    if (!validateTaskDescription(description)) {
      newErrors.description = 'Description must be less than 1000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || null,
      priority,
    })

    // Reset form
    setTitle('')
    setDescription('')
    setDueDate('')
    setPriority('medium')
    setErrors({})
  }

  return (
    <div className="task-form-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="task-form-modal w-full max-w-md rounded-lg bg-card p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Create New Task</h2>
          <button
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              maxLength={200}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)"
              rows={3}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              maxLength={1000}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-destructive">{errors.description}</p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-foreground">
              Due Date
            </label>
            <input
              id="dueDate"
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-foreground">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-md border border-input bg-background px-4 py-2 font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
