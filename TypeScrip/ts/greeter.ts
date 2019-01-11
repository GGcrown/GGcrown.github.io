function greeter(person: Person) {
    return "Hello," + person.firstName + " " + person.lastName;
}

// var user = "Jane User";

// var user = [0, 1, 2];

// var user = {firstName: "Jack", lastName: "Ma"};


interface Person {
    firstName: string;
    lastName: string;
}

class Student {
    fullName: string;

    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

var user = new Student("Jane", "M.", "User");


document.body.innerText = greeter(user);

