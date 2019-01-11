var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var com;
(function (com) {
    var test;
    (function (test) {
        var Studen = /** @class */ (function (_super) {
            __extends(Studen, _super);
            function Studen() {
                return _super.call(this, "liiii", true) || this;
            }
            Object.defineProperty(Studen.prototype, "Grade", {
                get: function () {
                    return this._Grade;
                },
                set: function (grade) {
                    this._Grade = grade;
                },
                enumerable: true,
                configurable: true
            });
            return Studen;
        }(test.Person));
        test.Studen = Studen;
    })(test = com.test || (com.test = {}));
})(com || (com = {}));
//# sourceMappingURL=module2.js.map