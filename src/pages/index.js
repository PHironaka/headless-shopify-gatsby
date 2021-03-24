import React from 'react'
import { Link } from 'gatsby'
import SEO from '../components/seo'
import ProductGrid from '../components/ProductGrid'
import styled from 'styled-components'

const HomeContainer = styled.div`


`

const IntroStatement = styled.div`
  padding: 2em 0;
  height:100%;
  margin:2em 0;
border-bottom:1px solid;


  @media screen and (max-width: 1000px) {
  border-right:none;
  max-width:100%;
  height:auto;
  border-bottom:1px solid;
  margin:20px 0;
  }
  
h1 {
  line-height:1.3;
  align-self:top;
  position:relative;
  max-width:900px;

  top:10%;
  padding:  0 10px 0 0 ;
  margin:1em 0;
}

`

const ShopButton = styled.div`

a {
  background: none;
  border: 1px solid #000;
  outline: none;
  display:block;
  width: 150px;
  margin-top:10px;
  text-align: center;
  cursor: pointer;
  padding: 7px 10px;
  -webkit-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  background: white;
  
  
  
  &:hover {
    background:#E1E1E1;
  }
}

`

const IndexPage = () => (
  <>
    <SEO
      title="Home"
      description="Headless Shopify simple starter template. "
    />
    <HomeContainer>
      <IntroStatement>
        <h1>Headless Shopify simple starter template </h1>
      </IntroStatement>
      <ProductGrid />
    </HomeContainer>
  </>
)

export default IndexPage
