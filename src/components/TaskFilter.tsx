import { TaskPriority } from '@/types/task'
import { cn } from '@/lib/utils'

interface TaskFilterProps {
  selectedPriority: TaskPriority | null
  onPriorityChange: (priority: TaskPriority | null) => void
}

const priorities: { value: TaskPriority; label: string }[] = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

export function TaskFilter({
  selectedPriority,
  onPriorityChange,
}: TaskFilterProps) {
  return (
    <div className="task-filter flex flex-wrap gap-2">
      <button
        onClick={() => onPriorityChange(null)}
        className={cn(
          'rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
          selectedPriority === null
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        )}
      >
        All
      </button>
      {priorities.map((priority) => (
        <button
          key={priority.value}
          onClick={() => onPriorityChange(priority.value)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
            selectedPriority === priority.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          {priority.label}
        </button>
      ))}
    </div>
  )
}
