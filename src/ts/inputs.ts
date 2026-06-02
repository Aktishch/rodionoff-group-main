const onInputText = (input: HTMLInputElement): void => {
  const regExp: RegExp = /[0-9.,!@№#$%^&*()\-=_+`~{}[\]\\/?<>|'"]/g

  if (input.value.match(regExp)) {
    input.value = input.value.replace(regExp, '')
  }
}

const onInputNumber = (input: HTMLInputElement): void => {
  input.value = input.value.replace(/[^0-9.]/g, '')
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
