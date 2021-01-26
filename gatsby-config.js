module.exports = {
  siteMetadata: {
    title: `raae.codes`,
    author: `Benedicte Raae (@raae)`,
    description: `The interwebz home of developer Benedicte Raae (@raae)`,
    siteUrl: `https://raae.codes`,
    social: {
      twitter: `raae`,
      instagram: `raae.codes`,
      github: "raae",
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          },
          {
            resolve: `@raae/gatsby-remark-oembed`,
            options: {
              providers: {
                // Important to exclude providers
                // that adds js to the page.
                // If you do not need them.
                exclude: ["Reddit", "Instagram", "Twitter", "Flickr"],
              },
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `raae.codes`,
        short_name: `raae`,
        start_url: `/`,
        background_color: `floralwhite`,
        theme_color: `orangered`,
        display: `minimal-ui`,
        icon: `content/assets/avatar.jpg`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "@raae/gatsby-plugin-fathom",
      options: {
        site: "SALDPLQV",
        includedDomains: "raae.codes",
      },
    },
  ],
};
