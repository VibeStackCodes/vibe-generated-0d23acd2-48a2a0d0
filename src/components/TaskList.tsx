import { Task } from '@/types/task'
import { TaskCard } from './TaskCard'

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/50 py-12 px-4 text-center">
        <p className="text-muted-foreground">No tasks found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Create a new task to get started
        </p>
      </div>
    )
  }

  return (
    <div className="task-list space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
