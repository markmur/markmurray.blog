import { useState } from 'react'

const themes = {
  light: {
    selection: 'rgb(247, 235, 238)',
    primary: '#e6bac5',
    background: 'rgb(247, 235, 238)',
    color: '#444',
    contentBackground: '#fffcf8',
    titleColor: '#111',
    descriptionColor: '#7b778e',
    postBorderColor: '#eaeaea',
    postHoverColor: 'rgba(255, 255, 255, 0.6)',
    tagColor: '#c1355a',
    tagBackground: 'rgba(217, 156, 174, 0.135)',
    tagHoverBackground: 'rgba(217, 156, 174, 0.2)',
    blockquoteBackground: '#f4f4f7',
    blockquoteBorder: '#eeedf3',
    linkColor: '#0087ff',
    linkBorder: '#eee',
    hrColor: 'rgb(223, 224, 238)',
  },
  dark: {
    selection: 'rgb(247, 235, 238)',
    primary: '#58b3b2',
    background: '#1f2529',
    color: 'white',
    contentBackground: '#232a2f',
    titleColor: 'white',
    descriptionColor: 'rgba(255, 255, 255, 0.8)',
    postBorderColor: 'rgba(0,0,0,0.15)',
    postHoverColor: 'rgba(0,0,0,0.05)',
    tagColor: '#58b3b2',
    tagBackground: '#1f2529',
    tagHoverBackground: '#1f2529',
    blockquoteBackground: '#1f2529',
    blockquoteBorder: '#1f2529',
    linkColor: '#58b3b2',
    linkBorder: '#1f2529',
    hrColor: '#1f2529',
  },
}

const useTheme = defaultTheme => {
  let themeName = defaultTheme
  const [theme, setTheme] = useState(themes[defaultTheme] || {})

  function changeTheme(newTheme) {
    if (typeof window !== 'undefined' && 'localStorage' in window)
      localStorage.setItem('theme', newTheme)

    setTheme(themes[newTheme])
    themeName = newTheme
  }

  return [theme, changeTheme, themeName]
}

export default useTheme
