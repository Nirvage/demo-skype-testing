"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var guide_service_1 = require("../services/guide.service");
var GuideDialog = (function () {
    function GuideDialog(session, result, next) {
        this.session = session;
        this.result = result || null;
        this.next = next || null;
        this.guideService = new guide_service_1.GuideService();
    }
    GuideDialog.prototype.getGuide = function () {
        this.guideService.getGuides().then(function (guides) { return console.log(guides); });
    };
    return GuideDialog;
}());
exports.GuideDialog = GuideDialog;
