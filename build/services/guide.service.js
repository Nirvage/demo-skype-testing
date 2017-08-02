"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var promise = require("promise");
var GuideService = (function () {
    function GuideService() {
    }
    GuideService.prototype.getGuides = function () {
        return new promise(function (resolve) {
            // http.get(process.env.API_GUIDE_URL + '/guides').on("data", (data) => {
            //     console.log(data)
            //     resolve(data);
            // }).end();
            http.request({
                hostname: process.env.API_GUIDE_URL,
                path: '/guides',
                method: 'GET'
            })
                .on('data', function (chunk) {
                resolve(chunk);
            })
                .end();
        });
    };
    return GuideService;
}());
exports.GuideService = GuideService;
