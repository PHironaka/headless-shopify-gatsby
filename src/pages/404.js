import React from 'react'
import SEO from '../components/seo'
import styled from 'styled-components'

const ErrorPage = styled.div`
  margin:3em 0;
  text-align:center;
  h1 {
    margin:1em 0;
  }
`
const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <ErrorPage>
    <h1>404 Page</h1>
    <p>The page you searched for doesn't exist.</p>
    </ErrorPage>
    
  </>
)

export default NotFoundPage
