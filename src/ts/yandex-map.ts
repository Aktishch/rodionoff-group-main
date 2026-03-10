import ymaps from 'ymaps'

declare global {
  interface Window {
    ymaps: typeof ymaps
  }
}

window.ymaps = ymaps

export default (): void => {
  const yandexMap = document.querySelector('*[data-yandex-map]') as HTMLDivElement

  if (!yandexMap) return

  const coordinates: string[] = String(yandexMap.dataset.yandexMap).split(',')
  const mark: number[] = []

  for (let i: number = 0; i < coordinates.length; i++) {
    mark.push(Number(coordinates[i]))
  }

  window.ymaps
    .load('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
    .then((maps): void => {
      const inputs: Element[] = [...document.querySelectorAll('[data-suggest-view]')]

      const map = new maps.Map(yandexMap, {
        center: mark,
        zoom: 14,
      })

      const placemark = new maps.Placemark(
        mark,
        {},
        {
          iconLayout: 'default#image',
          iconImageHref: './img/pictures/point.svg',
          iconImageSize: [62, 62],
          iconImageOffset: [-31, -31],
        }
      )

      inputs.forEach((input: Element): void => {
        new maps.SuggestView(input, {
          results: 5,
          container: document.body,
        })
      })

      map.controls.remove('geolocationControl')
      map.controls.remove('searchControl')
      map.controls.remove('trafficControl')
      map.controls.remove('typeSelector')
      map.controls.remove('fullscreenControl')
      map.controls.remove('rulerControl')
      map.behaviors.disable(['scrollZoom'])
      map.geoObjects.add(placemark)
    })
    .catch((error: string) => console.log('Failed to load Yandex Maps', error))
}
