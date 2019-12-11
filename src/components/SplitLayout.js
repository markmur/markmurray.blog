import React from 'react'
import styled, { css } from 'styled-components'
import { isMobile, hideScrollbar } from '../styles'

const Main = styled.main`
  display: flex;
`

const shared = css`
  height: calc(100vh - var(--nav-height));

  ${isMobile(`
    height: auto;
    flex: 1;
  `)}
`

const Meta = styled.div`
  ${shared};
  flex: 1;
  padding: 3em 4em;

  ${isMobile(`
    padding: 0 2em 0;
  `)}
`

const Content = styled.div`
  ${shared};
  height: calc(100vh - var(--nav-height));
  flex: 2.5;
  overflow: hidden;
  padding: 3em 2em;
  height: 100vh;
  ${hideScrollbar}

  ${isMobile(`
    height: auto;
    overflow-y: visible;
    overflow-x: auto;
    max-width: 100vw;
    padding-bottom: 4em;
  `)}
`

class SplitLayout extends React.Component {
  render() {
    return (
      <div>
        <Main>{this.props.children({ Meta, Content })}</Main>
      </div>
    )
  }
}

export default SplitLayout
