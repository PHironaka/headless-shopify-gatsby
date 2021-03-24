import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import ContextProvider from '../provider/ContextProvider'
import Navigation from './Navigation'
import Footer from './footer'
import CartShelf from './CartShelf'
import Overlay from './Overlay'

const theme = {
  primarycolor: '#000',
  black: '#000',
  bgColor: '#fff',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  blueFont: '#0657F2',
  offWhite: '#EDEDED',
  maxWidth: '1200px',
  borderRadius: '5px',
}

const Wrapper = styled.div`
  grid-gap: 3em;
  padding: 0 2em;
  max-width: 1400px;
  margin: 0 auto;
  @media screen and (max-width: 1000px) {
    display: block;
    margin: 0 auto;
    padding: 0 1em;
    max-width: 100%;
  }

`


const GlobalStyle = createGlobalStyle`
 html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  html.has-scroll-smooth {
    overflow: hidden;
  overflow-x:hidden;

  }

  html, body {
  overflow-x:unset;
  @media screen and (max-width: 1000px) {
    overflow-x:hidden;

  }
  }

  header {
    margin-bottom: 1.45rem;
    position: sticky;
    top: 0;
    border-bottom:1px solid;
    z-index: 1000;
  }

  h1 {
    @media screen and (max-width: 800px) {
      font-size:1.6em;
    }
  }
  


  body {
    color: ${props => props.theme.primarycolor};
    margin:0;
    padding:0;
    border:0;
    background-color:${props => props.theme.bgColor};
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; 
 }

 .cart {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 30%;
  height: 100%;
  min-width: 300px;
  background-color: white;
  z-index: 1000;
  border-left:1px solid;
  padding: 2em 1em;
  transition: transform 500ms;
  transform: translateX(100%)};

  .open {
  transform: translateX(0%)};

  }

 }



  h1, h2, h3{
    letter-spacing: -.035em;

  }

  a {
    color: ${props => props.theme.primarycolor};
    text-decoration:none;
  }

  footer {
    margin:2em 0;
  }
 

  input {

    &::-webkit-input-placeholder {
      opacity:1; /* Chrome/Opera/Safari */
    }

    &::-moz-placeholder { /* Firefox 19+ */
      opacity:1;
}
&:-ms-input-placeholder { /* IE 10+ */
  opacity:1;
}
&:-moz-placeholder { /* Firefox 18- */
  opacity:1;
}
    
  }


`

const Layout = ({ children, location }) => {

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <>
        <ContextProvider>
          <GlobalStyle />
          <Wrapper>

            <header role="heading" aria-level="1">
              <Navigation siteTitle={data.site.siteMetadata.title} />
              <CartShelf />
              <Overlay />

            </header>

            {children}
            <Footer siteTitle={data.site.siteMetadata.title} />

          </Wrapper>
        </ContextProvider>
      </>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout


