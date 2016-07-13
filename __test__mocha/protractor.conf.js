exports.config = {
    specs: ['srories/*.js'],
    capabilities: {
        browserName: 'chrome'
    },
    baseUrl: 'http://localhost:8000',
    framework: 'mocha'
};