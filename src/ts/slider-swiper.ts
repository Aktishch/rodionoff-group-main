import Swiper from 'swiper'
import { Autoplay, EffectCards, Grid, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper/modules'
import { checkQuizSlide } from './quiz'
import { media } from './utils'

declare global {
  interface Window {
    Swiper: typeof Swiper
  }
}

Swiper.use([Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectCards])
Swiper.defaults.touchStartPreventDefault = false
window.Swiper = Swiper

const createСasesSlider = (): void => {
  const slider = document.querySelector('*[data-slider="cases"]') as HTMLDivElement

  if (!slider) return

  const value: string = slider.dataset.slider
  const swiper = slider.querySelector(`*[data-slider-swiper="${value}"]`) as HTMLDivElement
  const prev = slider.querySelector(`*[data-slider-prev="${value}"]`) as HTMLButtonElement
  const next = slider.querySelector(`*[data-slider-next="${value}"]`) as HTMLButtonElement

  new window.Swiper(swiper, {
    navigation: {
      prevEl: prev,
      nextEl: next,
    },
    effect: (document.documentElement as HTMLHtmlElement).clientWidth < media.lg ? 'slide' : 'cards',
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
    grabCursor: true,
    watchSlidesProgress: true,
    autoHeight: true,
    loop: true,
    cardsEffect: {
      perSlideOffset: 8,
      rotate: false,
    },
    breakpoints: {
      [media.lg]: {
        spaceBetween: 0,
        grabCursor: false,
        allowTouchMove: false,
        autoHeight: false,
        loop: false,
      },
    },
  }) as Swiper
}

const createTeamSlider = (): void => {
  const slider = document.querySelector('*[data-slider="team"]') as HTMLDivElement

  if (!slider) return

  const value: string = slider.dataset.slider
  const swiper = slider.querySelector(`*[data-slider-swiper="${value}"]`) as HTMLDivElement
  const prev = slider.querySelector(`*[data-slider-prev="${value}"]`) as HTMLButtonElement
  const next = slider.querySelector(`*[data-slider-next="${value}"]`) as HTMLButtonElement

  new window.Swiper(swiper, {
    navigation: {
      prevEl: prev,
      nextEl: next,
    },
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
    grabCursor: true,
    watchSlidesProgress: true,
    loop: true,
    breakpoints: {
      [media.md]: {
        slidesPerView: 'auto',
        spaceBetween: 0,
        grabCursor: false,
        allowTouchMove: false,
        loop: false,
      },
    },
  }) as Swiper
}

const createQuizSlider = (): void => {
  const slider = document.querySelector('*[data-slider="quiz"]') as HTMLDivElement

  if (!slider) return

  const value: string = slider.dataset.slider
  const swiper = slider.querySelector(`*[data-slider-swiper="${value}"]`) as HTMLDivElement
  const pagination = slider.querySelector(`*[data-slider-pagination="${value}"]`) as HTMLDivElement
  const prev = slider.querySelector(`*[data-slider-prev="${value}"]`) as HTMLButtonElement
  const next = slider.querySelector(`*[data-slider-next="${value}"]`) as HTMLButtonElement

  const checkSwiperSlide = (swiper: Swiper): void => {
    const quiz = swiper.el.closest('[data-quiz]') as HTMLDivElement

    if (!quiz) return

    const visibleSlide = quiz.querySelector('.swiper-slide-visible') as HTMLDivElement

    if (visibleSlide) {
      checkQuizSlide(visibleSlide)

      if (visibleSlide === swiper.slides[swiper.slides.length - 1]) {
        quiz.setAttribute('data-quiz-end', '')
      } else {
        quiz.removeAttribute('data-quiz-end')
      }
    }
  }

  new window.Swiper(swiper, {
    pagination: {
      el: pagination,
    },
    navigation: {
      prevEl: prev,
      nextEl: next,
    },
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
    allowTouchMove: false,
    watchSlidesProgress: true,
    autoHeight: true,
    on: {
      init: (swiper: Swiper): void => {
        checkSwiperSlide(swiper)
      },
      slideChange: (swiper: Swiper): void => {
        checkSwiperSlide(swiper)
      },
    },
  }) as Swiper
}

const createCompanySlider = (): void => {
  const slider = document.querySelector('*[data-slider="company"]') as HTMLDivElement

  if (!slider) return

  const value: string = slider.dataset.slider
  const swiper = slider.querySelector(`*[data-slider-swiper="${value}"]`) as HTMLDivElement
  const prev = slider.querySelector(`*[data-slider-prev="${value}"]`) as HTMLButtonElement
  const next = slider.querySelector(`*[data-slider-next="${value}"]`) as HTMLButtonElement

  new window.Swiper(swiper, {
    navigation: {
      prevEl: prev,
      nextEl: next,
    },
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
    grabCursor: true,
    watchSlidesProgress: true,
    loop: true,
  }) as Swiper
}

const createCreditsSlider = (): void => {
  const slider = document.querySelector('*[data-slider="credits"]') as HTMLDivElement

  if (!slider) return

  const value: string = slider.dataset.slider
  const swiper = slider.querySelector(`*[data-slider-swiper="${value}"]`) as HTMLDivElement
  const prev = slider.querySelector(`*[data-slider-prev="${value}"]`) as HTMLButtonElement
  const next = slider.querySelector(`*[data-slider-next="${value}"]`) as HTMLButtonElement
  const toggles = slider.querySelectorAll(`*[data-slider-toggle="${value}"]`) as NodeListOf<HTMLLabelElement>

  const setActiveToggle = (swiper: Swiper): void => {
    const toggle = toggles[swiper.activeIndex] as HTMLLabelElement
    const input = toggle.querySelector('input') as HTMLInputElement

    input.checked = true
  }

  const sliderSwiper = new window.Swiper(swiper, {
    navigation: {
      prevEl: prev,
      nextEl: next,
    },
    effect: (document.documentElement as HTMLHtmlElement).clientWidth < media.lg ? 'slide' : 'cards',
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
    grabCursor: true,
    watchSlidesProgress: true,
    autoHeight: true,
    cardsEffect: {
      perSlideOffset: 8,
      rotate: false,
    },
    breakpoints: {
      [media.lg]: {
        spaceBetween: 0,
        grabCursor: false,
        allowTouchMove: false,
        autoHeight: false,
      },
    },
    on: {
      init: (swiper: Swiper): void => {
        setActiveToggle(swiper)
      },
      slideChange: (swiper: Swiper): void => {
        setActiveToggle(swiper)
      },
    },
  }) as Swiper

  toggles.forEach((toggle: HTMLLabelElement, key: number): void => {
    if (!toggle) return

    toggle.addEventListener('click', ((): void => {
      sliderSwiper.slideTo(key)
    }) as EventListener)
  })
}

export default (): void => {
  createСasesSlider()
  createTeamSlider()
  createQuizSlider()
  createCompanySlider()
  createCreditsSlider()
}
