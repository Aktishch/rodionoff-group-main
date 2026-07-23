import { dialog } from './fancybox'
import { validation } from './utils'
import { getUtmTags } from './utm'

declare global {
  interface Window {
    ym: any
    metric: number
  }
}

export const setStateSubmitBtn = (): void => {
  const forms: NodeListOf<HTMLFormElement> = document.querySelectorAll('*[data-form]')

  if (!forms.length) return

  forms.forEach((form: HTMLFormElement): void => {
    const submitBtn: HTMLButtonElement | null = form.querySelector('button[type="submit"]')

    if (!submitBtn) return

    const toggles: NodeListOf<HTMLInputElement> = form.querySelectorAll('*[data-form-toggle]')

    const togglesChecked = (): void => {
      const allChecked: boolean = ([...toggles] as HTMLInputElement[]).every((toggle: HTMLInputElement): boolean => {
        return toggle.checked
      })

      submitBtn.disabled = !allChecked
    }

    togglesChecked()

    if (toggles.length) {
      toggles.forEach((toggle: HTMLInputElement): void => {
        toggle.addEventListener('change', togglesChecked as EventListener)
      })
    }
  })
}

const formSubmitHandler = (event: Event): void => {
  const form = event.target as HTMLFormElement

  switch (form.dataset.form) {
    case '': {
      if (!validation(form)) event.preventDefault()
      break
    }

    default: {
      event.preventDefault()

      if (!validation(form)) return

      const formData: FormData = new FormData(form)
      const currentUtmTags = getUtmTags()
      const utmKeys: string[] = Object.keys(currentUtmTags)
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement
      const requestUrl: string = '/ajax/submit-handler.php'

      if (utmKeys.length !== 0) {
        utmKeys.forEach((utmKey: string): void => {
          formData.append(utmKey, currentUtmTags[utmKey])
        })
      }

      submitBtn.disabled = true
      dialog.notClosing('/dialogs/dialog-preloader.php')

      switch (form.dataset.form) {
        case 'submit': {
          fetch(requestUrl, {
            method: 'POST',
            body: formData,
          })
            .then((response: Response): Promise<{ status: boolean }> => {
              return response.json()
            })
            .then(({ status }): void => {
              dialog.close()

              if (status) {
                dialog.open('/dialogs/dialog-success.php')

                if (window.metric) {
                  window.ym(window.metric, 'reachGoal', 'zayavka')
                }
              } else {
                dialog.open('/dialogs/dialog-error.php')
              }

              form.reset()
              submitBtn.disabled = false
            })
            .catch((error: string): void => console.log('The form has not been sent', error))

          break
        }

        case 'params': {
          const searchParams: URLSearchParams = new URLSearchParams()

          for (const pair of formData.entries()) {
            searchParams.append(pair[0], String(pair[1]))
          }

          dialog.close()
          submitBtn.disabled = false
          dialog.open(`/dialogs/dialog-feedback.php?${searchParams.toString()}`)
          break
        }
      }

      break
    }
  }
}

export default (): void => {
  setStateSubmitBtn()

  document.addEventListener('submit', ((event: Event): void => {
    if ((event.target as HTMLFormElement).hasAttribute('data-form')) formSubmitHandler(event)
  }) as EventListener)
}
