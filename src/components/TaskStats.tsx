import { Task } from '@/types/task'
import { CheckCircle2, Circle, ListTodo } from 'lucide-react'

interface TaskStatsProps {
  tasks: Task[]
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const total = tasks.length
  const completed = tasks.filter((task) => task.completed).length
  const pending = total - completed

  const stats = [
    {
      label: 'Total Tasks',
      value: total,
      icon: ListTodo,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle2,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      label: 'Pending',
      value: pending,
      icon: Circle,
      color: 'text-orange-600 dark:text-orange-400',
    },
  ]

  return (
    <div className="task-stats grid grid-cols-3 gap-3 sm:gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-card p-4 text-center transition-all duration-200 hover:shadow-sm"
          >
            <Icon className={`mx-auto h-5 w-5 ${stat.color} mb-2`} />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        )
      })}
    </div>
  )
}
