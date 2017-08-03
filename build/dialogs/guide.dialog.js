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
        var _this = this;
        this.guideService.getGuides(this.result)
            .then(function (data) {
            _this.session.send("J'ai trouvé ce guide pour vous aider a choisir : " + data[0].name);
            // Dailogue guide
        })
            .catch(function (err) { return console.log(err); });
    };
    return GuideDialog;
}());
exports.GuideDialog = GuideDialog;
