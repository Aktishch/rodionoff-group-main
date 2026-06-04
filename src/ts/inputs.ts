const onInputText = (input: HTMLInputElement): void => {
  const regExp: RegExp = /[0-9.,!@№#$%^&*()\-=_+`~{}[\]\\/?<>|'"]/g

  if (input.value.match(regExp)) {
    input.value = input.value.replace(regExp, '')
  }
}

const onInputNumber = (input: HTMLInputElement): void => {
  const selection: number | null = input.selectionStart
  const length: number = input.value.length
  const value: string = input.value
    .replace(/^\.|[^\d.]|\.(?=.*\.)|^0+(?=\d)/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  input.value = value

  if (selection) {
    const newLength: number = value.length
    const cursorPosition: number = selection + (newLength - length)

    input.setSelectionRange(cursorPosition, cursorPosition)
  }
}

export default (): void => {
  document.addEventListener('input', ((event: Event): void => {
    const input: HTMLInputElement = event.target as HTMLInputElement

    switch (input.getAttribute('data-input')) {
      case 'name': {
        onInputText(input)
        break
      }

      case 'number': {
        onInputNumber(input)
        break
      }
    }
  }) as EventListener)
}
