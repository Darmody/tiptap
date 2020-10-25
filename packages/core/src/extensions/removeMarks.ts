import { Command } from '../Editor'
import { createExtension } from '../Extension'

export const RemoveMarks = createExtension({
  addCommands() {
    return {
      removeMarks: (): Command => ({ tr, state }) => {
        const { selection } = tr
        const { from, to, empty } = selection

        if (empty) {
          return true
        }

        Object
          .entries(state.schema.marks)
          .forEach(([, mark]) => {
            tr.removeMark(from, to, mark as any)
          })

        return true
      },
    }
  },
})

declare module '../Editor' {
  interface AllExtensions {
    RemoveMarks: typeof RemoveMarks,
  }
}