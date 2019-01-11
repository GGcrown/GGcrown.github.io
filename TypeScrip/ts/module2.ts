module com.test {

    export class Studen extends Person {
        constructor() {
            super("liiii", true);
        }

        private _Grade: string;

        get Grade() {
            return this._Grade;
        }

        set Grade(grade: string) {
            this._Grade = grade;
        }
    }
}



