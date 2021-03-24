import React, { useContext } from 'react'
import StoreContext from '../context/StoreContext'
import styled from "styled-components"

const OverlayArea = styled.div`

.set {
  position:fixed;
  z-index:0;
  min-height:100vh;
  width:100vw;
  background:black;
  transition: visibility 0.4s linear, opacity .4s linear;
  opacity: 0;
  visibility:hidden;
  top:0;
  right:0;
  &.open {
  opacity: .3;
  z-index:990;
  visibility:visible;

  }
  
}

`

const Overlay = () => {
  const { cartVisible, toggleCart } = useContext(StoreContext)  

  return (
    <OverlayArea>
      <div className={`set ${cartVisible ? "open" : ""}`}
      data-comp={Overlay.displayName}
    ></div>
    </OverlayArea>
  )
}

export default Overlay

