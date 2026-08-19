declare global {
  interface Window {
    ym: any
    metric: number
  }
}

export default (): void => {
  const start: number = Date.now()

  document.addEventListener('click', ((event: Event): void => {
    let target: HTMLElement | null = event.target as HTMLElement

    while (target && target.nodeName !== 'A' && target !== document.body) {
      target = target.parentElement
    }

    if (!target || target.nodeName !== 'A') return

    const href: string = target.getAttribute('href') || ''

    if (!/t\.me\/|wa\.me\/|api\.whatsapp\.com|tg:\/\//i.test(href)) return
    if ((Date.now() - start) / 1000 < 15) return

    const goal: string = /t\.me\/rodionoffgroup/i.test(href) ? 'TG_CHANNEL_CLICK' : 'MESSENGER_CLICK'

    if (typeof window.ym === 'function') window.ym(108247698, 'reachGoal', goal)
  }) as EventListener)
}
