declare global {
  interface Window {
    ym: any
    metric: number
  }
}

export default (): void => {
  const calc = document.querySelector('*[data-calc]') as HTMLDivElement

  if (!calc) return

  const profit = calc.querySelector('*[data-calc-profit]') as HTMLInputElement
  const taxes = calc.querySelector('*[data-calc-taxes]') as HTMLInputElement
  const employees = calc.querySelector('*[data-calc-employees]') as HTMLInputElement
  const salary = calc.querySelector('*[data-calc-salary]') as HTMLInputElement
  const result = calc.querySelector('*[data-calc-result]') as HTMLSpanElement
  let flag: boolean = true

  const replaceLetters = (value: string): number => {
    return Number(value.replace(/\D/g, ''))
  }

  const calcResult = (): void => {
    const benefit: number =
      (replaceLetters(profit.value) * 25) / 100 +
      replaceLetters(taxes.value) +
      (replaceLetters(employees.value) * replaceLetters(salary.value) * 7.5) / 100

    result.innerText = benefit ? new Intl.NumberFormat('ru').format(benefit) : 'Х ХХХ ХХХ'

    if (
      flag &&
      profit.value.length !== 0 &&
      taxes.value.length !== 0 &&
      employees.value.length !== 0 &&
      salary.value.length !== 0
    ) {
      flag = false
      window.ym(111617441, 'reachGoal', 'calc')
    }
  }

  calcResult()
  profit.addEventListener('input', calcResult as EventListener)
  taxes.addEventListener('input', calcResult as EventListener)
  employees.addEventListener('input', calcResult as EventListener)
  salary.addEventListener('input', calcResult as EventListener)
}
