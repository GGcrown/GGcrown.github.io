// 模块

module com.test {
    export class Person {
        constructor(name: string, sex: boolean) {
            this._Name = name;
            this._Sex = sex;
        }

        private _Name: string;
        private _Sex: boolean;

        get Name() {
            return this._Name
        }

        get Sex() {
            return this._Sex;
        }

        set Name(name: string) {
            this._Name = name;
        }

        set Sex(sex: boolean) {
            this._Sex = sex;
        }

        static SayHello(person: Person) {
            return "大家好，我是" + person.Name + "性别" + person.Sex;
        }

    }
}












