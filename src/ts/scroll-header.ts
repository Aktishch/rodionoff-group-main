import { scrolledPage } from './utils'

export default (): void => {
  const header = document.querySelector('*[data-header]') as HTMLElement

  if (!header) return

  const scrollHeader = (): void => {
    const currentOffsetTop: number = scrolledPage().top

    header.offsetHeight / 2 < currentOffsetTop
      ? header.classList.remove('bg-opacity-0', 'lg:pt-10', 'xl:pt-20')
      : header.classList.add('bg-opacity-0', 'lg:pt-10', 'xl:pt-20')
  }

  scrollHeader()
  document.addEventListener('scroll', scrollHeader as EventListener)
}
