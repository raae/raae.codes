module.exports = {
  siteMetadata: {
    title: `raae.codes`,
    author: `Benedicte Raae (@raae)`,
    description: `The interwebz home of developer Benedicte Raae (@raae)`,
    siteUrl: `https://raae.codes`,
    social: {
      twitter: `raae`,
      instagram: `raae.codes`,
      github: "raae"
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: []
      }
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
        icon: `content/assets/avatar.jpg`
      }
    },
    `gatsby-plugin-react-helmet`
  ]
};
