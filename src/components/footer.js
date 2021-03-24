import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const FooterContain = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding:2em 0;
  border-top:1px solid;
  align-items: end;
  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-gap:1em;
  }

  div {

    &:nth-child(even) {
      order:1;
     }
  }
 
  svg {
    max-width: 165px;
  }

  p {
    margin: 10px 0;
  }
`

const Copyright = styled.div`
@media only screen and (max-width: 800px) {
  order:2;
}
`



const Footer = ({ siteTitle }) => {

  return (
    <FooterContain  role="banner">

      <Copyright>
        <small>© {new Date().getFullYear()} {siteTitle} </small>
      </Copyright>


    </FooterContain>
  )
}
Footer.propTypes = {
  siteTitle: PropTypes.string,
}
Footer.defaultProps = {
  siteTitle: ``,
}
export default Footer