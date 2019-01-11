// 布尔值
// 最基本的数据类型就是简单的true/false值，在JavaScript和TypeScript里叫做boolean（其它语言中也一样）。
let isDone: boolean = false;

//数字
// 和JavaScript一样，TypeScript里的所有数字都是浮点数。 这些浮点数的类型是 number。
// 除了支持十进制和十六进制字面量，Typescript还支持ECMAScript 2015中引入的二进制和八进制字面量。
let num: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

// 字符串
// JavaScript程序的另一项基本操作是处理网页或服务器端的文本数据。 像其它语言里一样，我们使用 string表示文本数据类型。
// 和JavaScript一样，可以使用双引号（ “）或单引号（’）表示字符串。
// let name: string = "bob"
// name = "smith";

// 你还可以使用模版字符串，它可以定义多行文本和内嵌表达式。 这种字符串是被反引号包围（ `）键盘右上角的键，并且以${ expr }这种形式嵌入表达式
let userName: String = "Gene";
let age: number = 99;
// let sentence:string ="Helllo,my name is ${userName}";
let sentence: string = `Hello,my name is ${userName} ,is old ${age + 1}`;
// 这与下面定义sentence的方式效果相同：
// alert(sentence);
sentence = "Hello, my name is " + userName + ".\n\n" +
    "I'll be " + (age + 1) + " years old next month.";
// alert(sentence);

// 数组
// TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上[]，表示由此类型元素组成的一个数组：
let list: number [] = [1, 2, 3];

// 第二种方式是使用数组泛型，Array<元素类型>
let list2: Array<number> = [1, 2, 3];

// 元组
// 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为string和number类型的元组。
// let x: [string, number];
// x[0] = ["age", 200];
// x = ["age2", 300];

let x: [string, number];

x = ["age", 999];
x[2] = "xixi1";
x[3] = "xixi";
x[4] = 1000;

for (let x1 of x) {
    // console.log(x1);
}

// 枚举
// enum类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
enum Color {Red, Green, Blue}

let b: Color = Color.Blue;
let g: Color = Color.Green;

// console.log(b);
// console.log(g);

// 默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 1开始编号：
enum Color2 {Red = 1, Green, Blue};
let c2: Color2 = Color2.Green;

// 或者，全部都采用手动赋值：
enum Color3 {Red = 1, Green = 2, Blue = 4};
let c3: Color3 = Color3.Green;

// 枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：
enum Color4 {Red = 1, Green, Blue};
let colorName: string = Color4[2];
// alert(colorName);

// 任意值
// 有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。
// 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量：
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
// 当你只知道一部分数据的类型时，any类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：
let list3: any[] = [1, true, "free"];
list3[1] = 100;

// 空值
// 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void：
function setNum(num: number): void {
    alert("假装一波set方法 =、=");
}
// setNum(111);

// Never
// never类型表示的是那些永不存在的值的类型。
// 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；
// 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
// never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。
// 即使 any也不可以赋值给never。
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

// 类型断言
// 有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。
// 通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。
// 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。
// 类型断言有两种形式。 其一是“尖括号”语法：
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
// console.log(strLength);

// 另一个为as语法：
let someValue2: any = "this is a string!!!!!";
let strLength2: number = (someValue2 as string).length;
// console.log(strLength2);









if(1==1){
    let y=1;
    if(2==2){
        let y=2;
        console.log(y);
    }
    console.log(y);
}

if(1==1){
    var z=1;
    if(2==2){
        var z=2;
        console.log(z);
    }
    console.log(z);
}






