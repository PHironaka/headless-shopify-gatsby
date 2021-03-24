import React, {  useContext } from 'react'
import PropTypes from 'prop-types'
import Cart from './Cart'
import StoreContext from '../context/StoreContext'
import styled from 'styled-components'





const NavContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 30%;
  height: 100%;
  min-width: 300px;
  background-color: white;
  z-index: 999;
  border-left:1px solid;
  padding: 2em 1em;
  transition: transform 300ms;
  transform: ${({ cartVisible }) => (cartVisible ? 'translateX(0%)' : 'translateX(100%)')};
  overflow-y: scroll;

  button {
    background: none;
    cursor: pointer;
    border: 1px solid;
  }

  h2 {
    margin-top:1em;
    padding-top:1em;
    border-top: 1px solid;
  }
`

const CloseCart = styled.button`
  background: none;
  outline: none;
  border: none !important;
  font-size: 1.4em;
  cursor: pointer;
  padding:0;
`


const CartShelf = ({ siteTitle }) => {
  const { cartVisible, toggleCart } = useContext(StoreContext) 
  
    return (
          <NavContainer  className={`cart ${cartVisible ? "open" : ""}`}>
            <CloseCart onClick={() => toggleCart(!cartVisible)}> Close X</CloseCart>
            <h2>Your Cart</h2>
            <Cart />
          </NavContainer>
    )
  }
  
  CartShelf.propTypes = {
    siteTitle: PropTypes.string,
  }
  
  CartShelf.defaultProps = {
    siteTitle: ``,
  }
  
  export default CartShelf