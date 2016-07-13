exports.config = {
    specs: ['./srories/*.js'],
    capabilities: {
        browserName: 'chrome'
    },
    baseUrl: 'http://localhost:3000',
    framework: 'jasmine'
};