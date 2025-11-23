import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TaskSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function TaskSearch({
  value,
  onChange,
  placeholder = 'Search tasks by title or description...',
}: TaskSearchProps) {
  return (
    <div className="task-search relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-input bg-background pl-10 pr-10 py-2.5 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          aria-label="Search tasks"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
