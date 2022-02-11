import { useState } from 'react';

// #004b38 - nice mint green

const lightText = '#7e859b';

export const themes = {
  minimal: {
    selection: 'rgba(133, 180, 255, 0.4)',
    primary: 'black',
    background: 'white',
    color: 'black',
    logoColor: 'black',
    logoHoverColor: 'blue',
    contentBackground: 'white',
    titleColor: '#111',
    descriptionColor: '#686882',
    postBorderColor: '#eaeaea',
    tagColor: 'black',
    tagBackground: 'rgba(133, 180, 255, 0.2)',
    tagHoverBackground: 'rgba(133, 180, 255, 0.4)',
    blockquoteBackground: '#f4f4f7',
    blockquoteBorder: '#eeedf3',
    linkColor: 'var(--primary)',
    linkBorder: '#eee',
    hrColor: 'rgb(223, 224, 238)',
    bullet: '#7b778e',
    inlineCodeColor: 'black',
  },
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
    linkColor: 'var(--primary)',
    linkBorder: '#eee',
    hrColor: 'black',
    hrWidth: '2px',
    bullet: '#7b778e',
    inlineCodeColor: 'black',
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
    hrColor: '#394750',
    bullet: 'white',
    inlineCodeColor: 'white',
    codeBackground: '#1f2529',
  },
};

const useTheme = defaultTheme => {
  let themeName = defaultTheme || 'minimal';
  const [theme, setTheme] = useState(themes[themeName] || {});

  function changeTheme(newTheme) {
    if (typeof window !== 'undefined' && 'localStorage' in window)
      localStorage.setItem('theme', newTheme);

    setTheme(themes[newTheme]);
    themeName = newTheme;
  }

  return [theme, changeTheme, themeName];
};

export default useTheme;
