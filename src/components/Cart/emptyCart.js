import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const EmptyCartRoot = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 350px;
  justify-content: center;
`

const SadCartCopy = styled.div`
  margin-top: 20px;
  max-width: 250px;
  text-align: center;
  p {
    margin: 0;
  }
`


const EmptyCart = () => (
  <EmptyCartRoot>
    <SadCartCopy>
      <p>Your Cart is empty. </p>

      <Link to-="/">Return to Shopping.</Link>
    </SadCartCopy>
  </EmptyCartRoot>
)

export default EmptyCart
