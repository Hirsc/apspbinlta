const { defaults } = require("jest-config");

const config = {
    preset: "@stencil/core/testing",
    ...defaults,
    extraGlobals: ["Math"],
    transformIgnorePatterns: ['/node_modules/(?!@ionic/core|@stencil/core|ionicons)']
};
module.exports = config;
