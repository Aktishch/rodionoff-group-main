import { Fancybox } from '@fancyapps/ui'
import loadMedia from './load-media'

type FancyboxDialog = {
  open: (src: string) => void
  notClosing: (src: string) => void
  close: () => void
}

declare global {
  interface Window {
    Fancybox: typeof Fancybox
    dialog: FancyboxDialog
  }
}

Fancybox.defaults.mainClass = 'fancybox-custom'
Fancybox.defaults.trapFocus = false
Fancybox.defaults.autoFocus = false
Fancybox.defaults.placeFocusBack = false
window.Fancybox = Fancybox

export const dialog: FancyboxDialog = {
  open: (src: string): void => {
    window.Fancybox.show(
      [
        {
          src: src,
          type: 'ajax',
        },
      ],
      {
        dragToClose: false,
        on: {
          done: (): void => loadMedia(),
        },
      }
    )
  },
  notClosing: (src: string): void => {
    window.Fancybox.show(
      [
        {
          src: src,
          type: 'ajax',
        },
      ],
      {
        dragToClose: false,
        closeButton: false,
        backdropClick: false,
        on: {
          done: (): void => loadMedia(),
        },
      }
    )
  },
  close: (): void => window.Fancybox.close(),
}

window.dialog = dialog

export default (): void => {
  window.Fancybox.bind('[data-fancybox]')

  window.Fancybox.bind('[data-fancybox-dialog]', {
    dragToClose: false,
    on: {
      done: (): void => loadMedia(),
    },
  })
}
