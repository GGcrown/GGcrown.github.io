// 下面通过一个简单示例来观察接口是如何工作的：
function printLabel(labelledObj: { label: string, size: number }) {
    // console.log(`${labelledObj.label} size=> ${labelledObj.size}`);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);


// 类型检查器会查看printLabel的调用。 printLabel有一个参数，并要求这个对象参数有一个名为label类型为string的属性。
// 需要注意的是，我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，并且其类型是否匹配。
// 然而，有些时候TypeScript却并不会这么宽松，我们下面会稍做讲解。
// 下面我们重写上面的例子，这次使用接口来描述：必须包含一个label属性且类型为string：
// 定义label接口
interface LabelledValue {
    labels: string;
}

// 需要使用label参数作参数的接口
function printLabel2(labelledValue: LabelledValue) {
    // console.log(labelledValue.labels);
}

let myObje2 = {size: 100, labels: "Size 100 Object"};
printLabel2(myObje2);
// LabelledValue2接口就好比一个名字，用来描述上面例子里的要求。 它代表了有一个 label属性且类型为string的对象。
// 需要注意的是，我们在这里并不能像在其它语言里一样，说传给 printLabel2的对象实现了这个接口。
// 我们只会去关注值的外形。 只要传入的对象满足上面提到的必要条件，那么它就是被允许的。
// 还有一点值得提的是，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。


// 可选属性
// 接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。
// 可选属性在应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。
// 下面是应用了“option bags”的例子：

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = {color: "while", area: 100}
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width
    }
    return newSquare;
}

let mySquare = createSquare({color: "balck"});
// console.log(mySquare);
// 带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。
// 可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。
// 比如，我们故意将 createSquare里的color属性名拼错，就会得到一个错误提示：
// 接口2
interface SquareConfig2 {
    color?: string;
    width?: number;

    [propName: string]: any;
}

function createSquare2(config: SquareConfig2): { color: string; area: number } {
    // 1
    let newSquare = {color: "black", area: 200};
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

createSquare2({color: "red", width: 999});

// 只读属性
// 一些对象属性只能在对象刚刚创建的时候修改其值，你可以在属性名前面用readonly来指定只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}

// 你可以通过赋值一个对象字面来构造一个Point.赋值后，x和y再也不能改变了
let p1: Point = {x: 100, y: 99};
// p1.x=5; // error!
let p2: Point;
// p2.x=100; // eroor!

// TypeScript具有ReadonlyArray<T>类型，它与Array<T>类似，只是把所有可变方法去掉了，因此可以确定数组创建后再也不能改变
let a: number[] = [1, 2, 3, 4];
let ra: ReadonlyArray<number> = a;

// 上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：
a = ra as number[];

// readonly VS const
// 最简单的判断该用readonly还是const的方法是看要把它作为一个变量还是一个属性，作为变量的话使用const作为属性就使用readonly

// 然而，TypeScript会认为这段代码可能存在bug。 对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。
// 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。
// error: 'colour' not expected in type 'SquareConfig'
let mySquare2 = createSquare2({colour: "red", width: 100});
// 绕开这些检查非常简单。 最简便的方法是使用类型断言：
let mySquare3 = createSquare2({colors: "blue", width: 99} as SquareConfig2);

// 然而，最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性。
// 如果 SquareConfig带有上面定义的类型的color和width属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它：
// interface SquareConfig {
//     color?: string;
//     width?: number;
//     [propName: string]: any;
// }


// 我们稍后会讲到索引签名，但在这我们要表示的是SquareConfig可以有任意数量的属性，并且只要它们不是color和width，那么就无所谓它们的类型是什么。
// 还有最后一种跳过这些检查的方式，这可能会让你感到惊讶，它就是将这个对象赋值给一个另一个变量： 因为squareOptions不会经过额外属性检查，所以编译器不会报错。
let squareOptions = {colour: "red", width: 100};
let mySquare4 = createSquare(squareOptions);

// 要留意，在像上面一样的简单代码里，你可能不应该去绕开这些检查。 对于包含方法和内部状态的复杂对象字面量来讲，
// 你可能需要使用这些技巧，但是大部分额外属性检查错误是真正的bug。 就是说你遇到了额外类型检查出的错误，
// 比如选择包，你应该去审查一下你的类型声明。 在这里，如果支持传入 color或colour属性到createSquare，
// 你应该修改SquareConfig定义来体现出这一点。


// 函数类型
// 接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。
// 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
interface SearchFunc {
    (source: number, subString: string): boolean;
}

// 这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。 下例展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。
let mySearch: SearchFunc;
mySearch = function (source: number, subString: string) {

    return false;
};


// 类类型
// 实现接口
// 与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约。

interface ClockInterface {
    currentTime: Date;

    setTime(date: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;

    // 构造函数
    constructor(h: number, m: number) {
    }

    setTime(date: Date) {
    }
}

// 类静态部分与实例部分的区别
// 当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。
// 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：
interface ClockConstructor {
    // new (hour: number, minute: number);
}

class Clock2 implements ClockConstructor {
    currentTime: Date;

    constructor(h: number, m: number) {
    }
}

// 这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内。
// 因此，我们应该直接操作类的静态部分。 看下面的例子，我们定义了两个接口， ClockConstructor为构造函数所用和ClockInterface为实例方法所用。
// 为了方便我们定义一个构造函数 createClock，它用传入的类型创建实例。

interface ClockConstructor2 {
    new(hour: number, minute: number): ClockInterface2;
}

interface ClockInterface2 {
    tick();
}

function createClock2(ctor: ClockConstructor2, hour: number, minute: number): ClockInterface2 {
    return new ctor(hour, minute);
}

class DigitalClock2 implements ClockInterface2 {
    constructor(h: number, m: number) {
    }

    tick() {
        console.log("boom sha ka la ka !!!!");
    }

}

class AnalogClock implements ClockInterface2{
    constructor(){
        console.log("初始化第二次");
    }
    // constructor(h: number, m: number) {
    //     console.log("初始化了。。。");
    // }
    tick() {
        console.log("tick tick !!!");
    }
}


let digital = createClock2(DigitalClock2, 99, 88);
let anlog = createClock2(AnalogClock, 7, 32);
digital.tick();
anlog.tick();



































