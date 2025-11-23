import { formatDateShort } from '@/lib/utils'
import { isOverdue, isToday, isTomorrow } from '@/lib/taskUtils'
import { Calendar, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DueDateProps {
  dueDate: string | null
}

export function DueDate({ dueDate }: DueDateProps) {
  if (!dueDate) return null

  const overdue = isOverdue(dueDate)
  const today = isToday(dueDate)
  const tomorrow = isTomorrow(dueDate)

  let label = formatDateShort(dueDate)
  if (today) label = 'Today'
  if (tomorrow) label = 'Tomorrow'

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-200',
        overdue
          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
          : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
      )}
    >
      {overdue ? (
        <AlertCircle className="h-3.5 w-3.5" />
      ) : (
        <Calendar className="h-3.5 w-3.5" />
      )}
      <span>{label}</span>
    </div>
  )
}
