const path = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Headless Shopify Simple`,
    siteUrl: `https://headless-shopifysimple.app`,
    description: `Some text about shopify gatsby simple demo.`,
    image: `https://peterhironaka.com/favicons/android-chrome-512x512.png`,
    author: `Peter Hironaka`,
    menuLinks: [
      {
        name: 'Home',
        link: '/',
      },
      {
        name: 'Tops',
        link: '/collections/tops',
      },

      {
        name: 'Accessories',
        link: '/collections/accessories',
      },

      {
        name: 'About',
        link: '/about',
      },
    ],
  },

  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-sharp`,
    // `gatsby-plugin-layout`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/hironakaicon.png`, // This path is relative to the root of the site.
      },
    },

    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },


    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: false,
      },
    },


    {
      resolve: `gatsby-source-shopify`,
      options: {
        shopName: process.env.SHOP_NAME,
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
        verbose: true,
      },
    },
    'gatsby-plugin-offline',
  ],
}
