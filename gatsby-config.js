const path = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Headless Shopify Simple`,
    siteUrl: `https://hironaka.works`,
    description: `Pete Hironaka (1927-2015) was a cartoonist and commercial artist who documented the Japanese American experience in a post-WWII America.`,
    image: `https://www.hironaka.works/static/ebde7a9d7fd8d9be2edfbbf8e36e9f11/04759/GrandpaGrandma_bw_page-001.jpg`,
    author: `Pete Hironaka`,
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
    `gatsby-plugin-robots-txt`,
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
      resolve: 'gatsby-plugin-mailchimp',
      options: {
          endpoint: 'https://gmail.us1.list-manage.com/subscribe/post?u=dd20d065ebed0e6991e2c4e8e&amp;id=4a552cfb06', // string; add your MC list endpoint here; see instructions below
          timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
  },
  {
    resolve: `gatsby-plugin-google-gtag`,
    options: {

      trackingIds: [
        "G-3LR4392JKM",
      ],

      pluginConfig: {
        head: true,
      },
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
