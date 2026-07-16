type Input = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export const checkQuizSlide = (slide: HTMLElement): void => {
  const quiz: HTMLElement = slide.closest('[data-quiz]') as HTMLElement
  const inputs: Input[] = [
    ...slide.querySelectorAll('input'),
    ...slide.querySelectorAll('select'),
    ...slide.querySelectorAll('textarea'),
  ]
  let active: boolean = false

  if (slide.dataset.quizSlide === 'empty' || inputs.length === 0) {
    active = true
  } else {
    inputs.forEach((input: Input): void => {
      if (input.type === 'checkbox' || input.type === 'radio') {
        if ((input as HTMLInputElement).checked !== false) active = true
      } else if (input.value.length !== 0) {
        active = true
      }
    })
  }

  quiz.dataset.quiz = active ? '' : 'stop'
}

const checkQuizInputs = (event: Event): void => {
  const slide: HTMLDivElement | null = (event.target as HTMLElement).closest('[data-quiz-slide]')

  if (slide) {
    checkQuizSlide(slide)
  }
}

export default (): void => {
  document.addEventListener('input', checkQuizInputs as EventListener)
}
