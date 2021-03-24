import React, { useState, useContext } from 'react'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import StoreContext from '../../context/StoreContext'
import styled from 'styled-components'
import CartIcon from './cartIcon'

const HeaderWrapper = styled.div`
   background-color:${props => props.theme.bgColor};
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 35px;
  align-items: center;
  padding: 2px 0;
  grid-gap: 1em;
  margin: 0 auto;
  max-width: 1400px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: auto 45px 40px;
  }

  @media screen and (max-width: 700px) {
    grid-template-columns:auto 37px 65px;
  }
`

const NavigationLinks = styled.div`
  display: grid;
  grid-template-columns: auto auto auto 125px 82px;
  justify-content: end;
  grid-gap: 2em;

  @media screen and (max-width: 1000px) {
    font-size:1.4em;
    display: block;
    justify-items: center;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width:200px;
    height: 100vh;
    background-color:${props => props.theme.bgColor};
    z-index: 899;
    padding: 5em 1em;
    transition: transform 300ms;
    transform: ${({ mobnav }) =>
      mobnav ? 'translateX(0%)' : 'translateX(-100%)'};

    div {
      margin-top: 1em;
      opacity: ${({ mobnav }) => (mobnav ? '1' : '0')};
      transform: ${({ mobnav }) =>
      mobnav ? 'translateY(0%)' : 'translateY(12px)'};
      transition: all .4s linear;
      &:nth-child(1) {
        transition-delay: 0.0s;
      }
      &:nth-child(2) {
        transition-delay: 0.10s;
      }
      &:nth-child(3) {
        transition-delay: 0.15s;
      }
      
      a {
      opacity: ${({ mobnav }) => (mobnav ? '1' : '0')};
        transition: all .2s linear;
        -moz-transition: all .2s linear;
        -webkit-transition: all .2s linear;
        -o-transition: all .2s linear;
        &:nth-child(1) {
          transition-delay: 0.0s;
        }
        &:nth-child(2) {
          transition-delay: 0.1s;
        }
        &:nth-child(3) {
          transition-delay: 0.1s;
        }
      }
    }
  }
`

const CartButton = styled.div`
  text-decoration: none;
  font-size: 2rem;
  cursor: pointer;
  font-weight: bold;
  position: relative;
  top: 7px;
  @media screen and (max-width: 700px) {
    position: relative;
    top: 0;

  }
  svg {
    margin-right: 4px;
  }
`

const CartCounter = styled.span`
  background-color: white;
  color: #000;
  border-radius: 20px;
  padding: 1px 5px;
  font-size: 10px;
  float: right;
  margin: 0 -5px;
  z-index: 20;
  border: 1px solid;
  padding-bottom: 0px;
    @media screen and (max-width: 700px) {
      position: relative;
      right: 9px;
      top: 2px;
    }

`


const LogoLink = styled.div`
  text-decoration: none;
  font-size: 1.1em;
`

const MobileNav = styled.button`
  display: none;

  @media screen and (max-width: 1000px) {
    display: grid;
    text-decoration: none;
    font-size: 2rem;
    cursor: pointer;
    background: none;
    outline: none;
    justify-self: left;
    border: none;

    div {
      width: 1.8rem;
      height: 1px;
      margin:  0 0 7px;
      background: black;
      transform-origin: 1px;
      position: relative;
      z-index: 900;
      transition: transform 300ms;
      :first-child {
        transform: ${({ mobnav }) => (mobnav ? 'rotate(43deg)' : 'rotate(0)')};
      }
      :nth-child(2) {
        transform: ${({ mobnav }) => (mobnav ? 'rotate(-45deg)' : 'rotate(0)')};
        margin: ${({ mobnav }) => (mobnav ? '12px 0' : '0')};
      }
    }
  }
`

const MobileCloseButton = styled.div`
  display:none;
  @media screen and (max-width: 700px) {
    display:block;
  }

  button {
    background:none;
    outline:none;
    border:none;
    padding:0;
    margin: 0 0 2em 0;
    font-size:1.5em;
  }
`

const NavigationBar = styled.button`
  color: black;
  text-decoration: none;
  font-size: 2rem;
  cursor: pointer;
  background: none;
  outline: none;
  justify-self: left;
  border: none;

  div {
    width: 2.3rem;
    transform-origin: 1px;
    position: relative;
    transition: transform 300ms;
  }
`

const useQuantity = () => {
  const {
     store: { checkout }, 
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Navigation = ({ siteTitle }) => {
  const {
    toggleCart,
  } = useContext(StoreContext)
  const [hasItems, quantity] = useQuantity()
  const [mobnav, showMobile] = useState(false)

  function closeMobile() {
    showMobile(false)
  }

  return (
    <HeaderWrapper >
      <Container>
        <LogoLink>
          <Link to="/" class="logo" aria-label="logo">{siteTitle}</Link>
        </LogoLink>

        <MobileNav mobnav={mobnav} aria-label="mobile nav" onClick={() => showMobile(!mobnav)}>
          <div />
          <div />
        </MobileNav>

        <NavigationLinks mobnav={mobnav}>

          <div>
            <Link onClick={closeMobile} to="/">
              Shop
            </Link>
          </div>
      
         
        </NavigationLinks>

        <NavigationBar aria-label="cart"  onClick={toggleCart}>
          <CartButton>
            <CartIcon />
            {hasItems && <CartCounter>{quantity}</CartCounter>}
          </CartButton>
        </NavigationBar>
      </Container>
    </HeaderWrapper>
  )
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
