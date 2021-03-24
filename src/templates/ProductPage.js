import React from 'react'
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import styled from 'styled-components'
import ProductForm from '../components/ProductForm'
import SoldOut from '../components/ProductGrid/soldOut'
import Img from 'gatsby-image'

const GridLeft = styled.div`
  grid-area: left;
`

const GridRight = styled.div`
  grid-area: right;
`

const Container = styled.div`
  margin: 0 auto;
`
const ImageSection = styled.div`
  svg {
    position: absolute;
    top: 144px;
    z-index: 100;
  }
`
const SectionContain = styled.div`
  margin: 1em 0;

  a {
    border-bottom:1px solid;
  }
`




const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2rem 1fr;
  grid-template-rows: 1auto;
  grid-template-areas: 'left . right';

  @media screen and (max-width: 800px) {
    display: block;
  }
`

const ProductTitle = styled.h1`
  margin-bottom: 15px;
  margin: 0 0 0.5rem;
  line-height: 1.4;
`

const ProductDescription = styled.div`
  margin-top: 40px;

  p {
    margin:1em 0;
  }
  ul {
    margin-left: 3em;
  }
`


const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  const avaiable = product.availableForSale
  // const [isToggled, setToggled] = useState(false)


  return (
    <>
      <SEO title={product.title} description={product.description} image={product.images[0].originalSrc} />
      <Container>
        <p>
          <Link to="/"> Home </Link> / {product.title}{' '}
        </p>
        <TwoColumnGrid>

          <GridLeft>

            <ImageSection>
              {!avaiable && <SoldOut />}
              {product.images.map(image => (
                <SectionContain key={image.id}>
                  <Img
                    fluid={image.localFile.childImageSharp.fluid}
                    key={image.id}
                    alt={product.title}
                  />
                </SectionContain>
              ))}
            </ImageSection>
          </GridLeft>
          <GridRight>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductForm product={product} />

            <ProductDescription
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

            <SectionContain>
              <p>A portion of the profits will be donated to the <a href="https://jacl.org/donate" target="_blank" rel="noopener noreferrer" >Japanese American Citizen's League (JACL)</a>.</p>
            </SectionContain>

          </GridRight>
        </TwoColumnGrid>
      </Container>
    </>
  )
}
export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      tags
      description
      descriptionHtml
      shopifyId
      availableForSale
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 910) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default ProductPage
