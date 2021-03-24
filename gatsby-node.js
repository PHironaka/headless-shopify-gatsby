const path = require(`path`)
const _ = require("lodash")


exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /locomotive-scroll/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const products = await graphql(`
  {
    allShopifyProduct(filter: {productType: {eq: "Hironaka"}}) {
      edges {
        node {
          id
          handle
        }
      }
    }
  }
  `)


  const template = path.resolve("src/templates/ProductPage.js")

  products.data.allShopifyProduct.edges.forEach(edge => {
    createPage({
      path: `/product/${edge.node.handle}`,
      component: template,
      context: {
        id: edge.node.id,
        handle: edge.node.handle,
      },
    })
  })



}
