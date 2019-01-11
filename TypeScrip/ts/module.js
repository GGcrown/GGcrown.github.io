// 模块
var com;
(function (com) {
    var test;
    (function (test) {
        var Person = /** @class */ (function () {
            function Person(name, sex) {
                this._Name = name;
                this._Sex = sex;
            }
            Object.defineProperty(Person.prototype, "Name", {
                get: function () {
                    return this._Name;
                },
                set: function (name) {
                    this._Name = name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Person.prototype, "Sex", {
                get: function () {
                    return this._Sex;
                },
                set: function (sex) {
                    this._Sex = sex;
                },
                enumerable: true,
                configurable: true
            });
            Person.SayHello = function (person) {
                return "大家好，我是" + person.Name + "性别" + person.Sex;
            };
            return Person;
        }());
        test.Person = Person;
    })(test = com.test || (com.test = {}));
})(com || (com = {}));
//# sourceMappingURL=module.js.map