module.exports = {
    // Target serverless deployment
    target: 'serverless',
    // Enable experimental features
    exclude: ['api'],

    experimental: {
      // Enable client-side rendering
      clientSideRendering: true,
    },
  };