import Swiper from 'swiper'
import { Autoplay, EffectCards, Grid, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper/modules'
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

export default (): void => createСasesSlider()
