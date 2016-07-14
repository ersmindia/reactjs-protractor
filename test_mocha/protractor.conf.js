exports.config = {
    specs: ['srories/*.js'],
    capabilities: {
        browserName: 'chrome'
    },
    baseUrl: 'http://localhost:5530',
    framework: 'mocha'
};