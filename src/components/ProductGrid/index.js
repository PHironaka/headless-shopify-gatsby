import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import StoreContext from '../../context/StoreContext'
import SoldOutIcon from './soldOut'
import Img from 'gatsby-image'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 450px));
  gap: 2.5rem;

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const SoldOut = styled.div`
  position:absolute;
  top:0;
  right:10px;
  `

const ProductImageAvail = styled.div`
      position: relative;
      border:1px solid;
`

const PriceShelf = styled.div`
  display:grid;
  grid-template-columns:1fr 1fr;
  padding: 6px 25px;
  border-right: 1px solid;
  border-left: 1px solid;
  border-bottom: 1px solid;

  span:nth-child(even) {
    text-align:right;
  }


`

const Product = styled.div`
 a {
  display: block;
 }
`
const ShopButton = styled.div`
background: none;
border: 1px solid #000;
outline: none;
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
`

const Title = styled.span`
`

const PriceTag = styled.span`
  font-size: 1rem;

`

const ProductGrid = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  const { allShopifyProduct } = useStaticQuery(
    graphql`
      query {
        allShopifyProduct(sort: { fields: [createdAt], order: DESC }) {
          edges {
            node {
              id
              title
              handle
              availableForSale
              createdAt
              priceRange { 
                maxVariantPrice {
                  amount
                  currencyCode
                } 
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images {
                id
                originalSrc
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 910) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              variants {
                price
              }
            }
          }
        }
      }
    `
  )

  const getPrice = price =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : 'USD',
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(parseFloat(price ? price : 0))


  return (
    <Grid>
      {allShopifyProduct.edges ? (
        allShopifyProduct.edges.map(
          ({
            node: {
              id,
              handle,
              title,
              priceRange,
              availableForSale,
              images: [firstImage],
              variants: [thirdVariant],
            },
          }) => (
            <Product key={id}>
              <ProductImageAvail>
                <Link to={`/product/${handle}/`}>
                  {firstImage && firstImage.localFile && (
                    <Img
                      fluid={firstImage.localFile.childImageSharp.fluid}
                      alt={handle}
                    />
                  )}

                </Link>
                <SoldOut>
                  <b>{availableForSale ? '' : <SoldOutIcon />}</b>
                </SoldOut>
              </ProductImageAvail>
              <PriceShelf>
                <Title>{title}</Title>
                <PriceTag>{getPrice(priceRange.minVariantPrice.amount)}+</PriceTag>
              </PriceShelf>
              <ShopButton>
                <Link to={`/product/${handle}/`}>
                  Shop Now
              </Link>
              </ShopButton>

            </Product>
          )
        )
      ) : (
        <p>No Products found!</p>
      )}
    </Grid>
  )
}

export default ProductGrid
