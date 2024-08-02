#!usr/bin/env node
import { input, select } from "@inquirer/prompts";
class Student {
    static counter = 1000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    ;
    enroll_course(course) {
        this.courses.push(course);
    }
    ;
    view_balance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    ;
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees paid for ${this.name}`);
    }
    ;
    show_status() {
        console.log(`Name: ${this.name}`);
        console.log(`ID: ${this.id}`);
        console.log(`Courses Enrolled: ${this.courses.join(", ")}`);
        console.log(`Balance: $${this.balance}`);
    }
    ;
}
;
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    ;
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added with ID: ${student.id}`);
    }
    ;
    find_student(id) {
        return this.students.find((std) => std.id === id);
    }
    ;
    enroll_student(id, course) {
        let student = this.find_student(id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course}`);
        }
        else {
            console.log(`Student with ID ${id} not found`);
        }
        ;
    }
    ;
    view_student_balance(id) {
        let student = this.find_student(id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(`Student with ID ${id} not found`);
        }
        ;
    }
    ;
    pay_student_fees(id, amount) {
        let student = this.find_student(id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(`Student with ID ${id} not found`);
        }
        ;
    }
    ;
    show_student_status(id) {
        let student = this.find_student(id);
        if (student) {
            student.show_status();
        }
        else {
            console.log(`Student with ID ${id} not found`);
        }
        ;
    }
    ;
}
;
async function main() {
    console.log("\n\t\tWelcome to Student Management System\n");
    let student_manager = new Student_manager();
    while (true) {
        let choice = await select({
            message: "Choose an option",
            choices: [
                { name: "Add Student", value: "add_student" },
                { name: "Enroll Student", value: "enroll_student" },
                { name: "View Student Balance", value: "view_student_balance" },
                { name: "Pay Student Fees", value: "pay_student_fees" },
                { name: "Show Student Status", value: "show_student_status" },
                { name: "Exit", value: "exit" },
            ],
        });
        if (choice === "add_student") {
            let name = await input({ message: "Enter student name:" });
            student_manager.add_student(name);
        }
        else if (choice === "enroll_student") {
            let id = Number(await input({ message: "Enter student ID:" }));
            let course = await input({ message: "Enter course name:" });
            student_manager.enroll_student(id, course);
        }
        else if (choice === "view_student_balance") {
            let id = Number(await input({ message: "Enter student ID:" }));
            student_manager.view_student_balance(id);
        }
        else if (choice === "pay_student_fees") {
            let id = Number(await input({ message: "Enter student ID:" }));
            let amount = Number(await input({ message: "Enter amount to pay:" }));
            student_manager.pay_student_fees(id, amount);
        }
        else if (choice === "show_student_status") {
            let id = Number(await input({ message: "Enter student ID:" }));
            student_manager.show_student_status(id);
        }
        else if (choice === "exit") {
            process.exit();
        }
        ;
    }
    ;
}
;
main();
