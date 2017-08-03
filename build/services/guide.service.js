"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client = require('node-rest-client').Client;
var GuideService = (function () {
    function GuideService() {
        this.optionsProxy = {
            proxy: {
                host: process.env.PROXY_IP,
                port: process.env.PROXY_PORT,
                user: process.env.PROXY_USERNAME,
                password: process.env.PROXY_PASSWORD,
                tunnel: false
            }
        };
    }
    GuideService.prototype.getGuides = function (section) {
        var client = new Client();
        var get = function () { return new Promise(function (resolve) { return client.get(process.env.API_GUIDE_URL + '/guides/filter?section=' + encodeURI(section), {}, resolve); }); };
        return get();
    };
    return GuideService;
}());
exports.GuideService = GuideService;
