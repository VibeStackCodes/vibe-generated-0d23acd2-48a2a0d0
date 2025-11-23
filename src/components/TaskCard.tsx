import { Task } from '@/types/task'
import { DueDate } from './DueDate'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: Task
  onToggleComplete: (id: string) => void
  onDelete: (id: string) => void
}

const priorityColors: Record<Task['priority'], string> = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
}

export function TaskCard({
  task,
  onToggleComplete,
  onDelete,
}: TaskCardProps) {
  return (
    <div
      className={cn(
        'task-card group rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:shadow-md',
        task.completed && 'opacity-60'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="mt-1 h-5 w-5 cursor-pointer rounded border-border accent-blue-600"
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  'font-semibold text-foreground transition-all duration-200',
                  task.completed && 'line-through text-muted-foreground'
                )}
              >
                {task.title}
              </h3>
              {task.description && (
                <p
                  className={cn(
                    'mt-1 text-sm text-muted-foreground line-clamp-2',
                    task.completed && 'line-through'
                  )}
                >
                  {task.description}
                </p>
              )}
            </div>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(task.id)}
              className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
              aria-label={`Delete "${task.title}"`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Footer */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {/* Priority Badge */}
            <span
              className={cn(
                'inline-block rounded-full px-2.5 py-0.5 text-xs font-medium',
                priorityColors[task.priority]
              )}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>

            {/* Due Date */}
            {task.dueDate && <DueDate dueDate={task.dueDate} />}
          </div>
        </div>
      </div>
    </div>
  )
}
