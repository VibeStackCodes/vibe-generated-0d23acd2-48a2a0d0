import { useEffect } from 'react'

interface KeyboardShortcuts {
  onNewTask?: () => void
  onEscape?: () => void
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcuts) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+N or Cmd+N for new task
      if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        event.preventDefault()
        shortcuts.onNewTask?.()
      }

      // Escape to close modals
      if (event.key === 'Escape') {
        shortcuts.onEscape?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}
