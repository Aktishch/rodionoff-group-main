type Data = {
  [index: string]: string
}

export default (): void => {
  const params: URLSearchParams = new URLSearchParams(window.location.search)
  const tags: string[] = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
  const data: Data = {}

  tags.forEach((tag: string): void => {
    const value: string = params.get(tag)

    if (value) {
      data[tag] = value
    }
  })

  if (Object.keys(data).length > 0) {
    sessionStorage.setItem('utm_tags', JSON.stringify(data))
  }
}

export const getUtmTags = (): Data => {
  try {
    return JSON.parse(sessionStorage.getItem('utm_tags') || '{}')
  } catch {
    return {}
  }
}
