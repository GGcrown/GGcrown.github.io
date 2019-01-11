// 下面通过一个简单示例来观察接口是如何工作的：
function printLabel(labelledObj) {
    // console.log(`${labelledObj.label} size=> ${labelledObj.size}`);
}
var myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
// 需要使用label参数作参数的接口
function printLabel2(labelledValue) {
    // console.log(labelledValue.labels);
}
var myObje2 = { size: 100, labels: "Size 100 Object" };
printLabel2(myObje2);
function createSquare(config) {
    var newSquare = { color: "while", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "balck" });
function createSquare2(config) {
    // 1
    var newSquare = { color: "black", area: 200 };
    if (config.color) {
        // Error Property 'color' does not exit on type 'SquareConfig'
        newSquare.color = config.color; // Type-checker can catch the mistyped name here
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    // console.log(config.colour);
    return newSquare;
}
createSquare2({ color: "red", width: 999 });
// 你可以通过赋值一个对象字面来构造一个Point.赋值后，x和y再也不能改变了
var p1 = { x: 100, y: 99 };
// p1.x=5; // error!
var p2;
// p2.x=100; // eroor!
// TypeScript具有ReadonlyArray<t>类型，它与Array<t>类似，只是把所有可变方法去掉了，因此可以确定数组创建后再也不能改变
var a = [1, 2, 3, 4];
var ra = a;
// 上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：
a = ra;
// readonly VS const
// 最简单的判断该用readonly还是const的方法是看要把它作为一个变量还是一个属性，作为变量的话使用const作为属性就使用readonly
// 然而，TypeScript会认为这段代码可能存在bug。 对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。
// 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。
// error: 'colour' not expected in type 'SquareConfig'
var mySquare2 = createSquare2({ colour: "red", width: 100 });
// 绕开这些检查非常简单。 最简便的方法是使用类型断言：
var mySquare3 = createSquare2({ colors: "blue", width: 99 });
// 然而，最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性。
// 如果 SquareConfig带有上面定义的类型的color和width属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它：
// interface SquareConfig {
//     color?: string;
//     width?: number;
//     [propName: string]: any;
// }
// 我们稍后会讲到索引签名，但在这我们要表示的是SquareConfig可以有任意数量的属性，并且只要它们不是color和width，那么就无所谓它们的类型是什么。
// 还有最后一种跳过这些检查的方式，这可能会让你感到惊讶，它就是将这个对象赋值给一个另一个变量： 因为squareOptions不会经过额外属性检查，所以编译器不会报错。
var squareOptions = { colour: "red", width: 100 };
var mySquare4 = createSquare(squareOptions);
// 这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。 下例展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。
var mySearch;
mySearch = function (source, subString) {
    return false;
};
var Clock = /** @class */ (function () {
    // 构造函数
    function Clock(h, m) {
    }
    Clock.prototype.setTime = function (date) {
    };
    return Clock;
}());
var Clock2 = /** @class */ (function () {
    function Clock2(h, m) {
    }
    return Clock2;
}());
function createClock2(ctor, hour, minute) {
    return new ctor(hour, minute);
}
var DigitalClock2 = /** @class */ (function () {
    function DigitalClock2(h, m) {
    }
    DigitalClock2.prototype.tick = function () {
        console.log("boom sha ka la ka !!!!");
    };
    return DigitalClock2;
}());
var AnalogClock = /** @class */ (function () {
    function AnalogClock() {
        console.log("初始化第二次");
    }
    // constructor(h: number, m: number) {
    //     console.log("初始化了。。。");
    // }
    AnalogClock.prototype.tick = function () {
        console.log("tick tick !!!");
    };
    return AnalogClock;
}());
var digital = createClock2(DigitalClock2, 99, 88);
var anlog = createClock2(AnalogClock, 7, 32);
digital.tick();
anlog.tick();
//# sourceMappingURL=interface.js.map</t></t>