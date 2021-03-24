import React, { useState } from "react"
import StoreContext from "../../../context/StoreContext"
import { useEffect } from "react"
import styled from 'styled-components'


const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr ;
  padding: 2rem 0 2rem 0;
  grid-gap:2em;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr ;
  }

  img {
   max-width:100%;
  }
`

const QuantityContain = styled.div`
  display: grid;
  grid-template-columns: 35px 25px 40px;
  margin: 1em 0;
`

const AddRemoveItems = styled.div`
  border: none;
  outline: none;
  text-align: center;
  margin-top: 5px;
`

const QuantityButton = styled.div`
  cursor: pointer;
  border: 1px solid;
  padding: 4px 10px;
  display: block;
  position: relative;
  text-align: center;
  transition: all 0.3s ease 0s;
  background: white;


  &:hover {
    background: ${props => props.theme.lightgrey};
  }
`

const RemoveItem = styled.button`
  background: none;
  border: 1px solid ${props => props.theme.primarycolor};
  padding: 6px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  background: white;
  color: ${props => props.theme.primarycolor};
  max-height: 86px;
  max-width: 140px;
  align-self: center;

  &:hover {
    background: ${props => props.theme.lightgrey};
  }
`

const LineItem = props => {
  const { line_item, onRemove } = props
  const {
    removeLineItem,
    updateLineItem,
    store: { client, checkout, removing },
  } = React.useContext(StoreContext)

  const variantImage = line_item.variant.image ? (
    <img
      src={line_item.variant.image.src}
      alt={`${line_item.title} product shot`}
    />
  ) : null

  const selectedOptions =
    line_item.variant && line_item.variant.selectedOptions
      ? line_item.variant.selectedOptions
        .filter(({ value }) => value !== "Default Title")
        .map((option, index) => (
          <React.Fragment key={`${option.name}-${index}`}>
            {option.name}: {option.value}
            <br />
          </React.Fragment>
        ))
      : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, line_item.id)

    if (onRemove) {
      onRemove({ line_item, quantity: line_item.quantity })
    }
  }

  const updateQuantity = quantity => {
    updateLineItem(client, checkout.id, line_item.id, quantity)
  }


  return (
    <Wrapper >
      {variantImage}
      <div >
        <p>
          {line_item.title}
          {`  `}
          {line_item.variant && line_item.variant.title === !"Default Title" ? line_item.variant.title : ""}
        </p>
        {selectedOptions && <p >{selectedOptions}</p>}

      </div>
      <QuantityInput
        currentQuantity={line_item.quantity}
        onUpdate={updateQuantity}
      />
      <RemoveItem
        onClick={handleRemove}
        disabled={removing}
      >
        Remove

        </RemoveItem>

    </Wrapper>
  )
}

export default LineItem

const QuantityInput = ({ currentQuantity, onUpdate }) => {
  const [quantity, setQuantity] = useState(currentQuantity)
  const updateQuantity = newQuantity => {
    onUpdate(newQuantity)
    setQuantity(newQuantity)
  }
  const setFromInput = e => {
    let value = e.target.value

    if (value === "") {
      value = 1
    }

    //setQuantity(parseInt(value))
    updateQuantity(parseInt(value))
  }

  useEffect(() => {
    //onUpdate(quantity)
  }, [quantity])

  return (
    <QuantityContain>
      <QuantityButton
        onClick={() => updateQuantity(quantity - 1)}
      >
        <span className="">-</span>
      </QuantityButton>

      <AddRemoveItems
        min="1"
        step="1"
        value={quantity}
        onChange={setFromInput}
      >
        {quantity}
      </AddRemoveItems>

      <QuantityButton
        onClick={() => updateQuantity(quantity + 1)}
      >
        <span className="">+</span>
      </QuantityButton>
    </QuantityContain>

  )
}