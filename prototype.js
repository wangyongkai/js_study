function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}


function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

//简单粗暴，这样不行？
//PrimaryStudent.prototype = Student.prototype;

function F() {}
F.prototype = Student.prototype;
PrimaryStudent.prototype = new F();
// 把PrimaryStudent原型的构造函数修复为PrimaryStudent:
PrimaryStudent.prototype.constructor = PrimaryStudent;
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
}

var xiaoming = new PrimaryStudent({
    name: '小明',
    grade: 2
});

console.log('xiaoming.name:' + xiaoming.name);
console.log('xiaoming.grade:' + xiaoming.grade);
console.log('xiaoming.__proto__ === PrimaryStudent.prototype:' + (xiaoming.__proto__ === PrimaryStudent.prototype));
console.log('xiaoming.__proto__.__proto__ === Student.prototype:' + (xiaoming.__proto__.__proto__ === Student.prototype));
console.log('Student.prototype === PrimaryStudent.prototype:' + (Student.prototype === PrimaryStudent.prototype));
console.log('xiaoming instanceof PrimaryStudent:' + (xiaoming instanceof PrimaryStudent));
console.log('xiaoming instanceof Student:' + (xiaoming instanceof Student));

console.log('xiaoming.getGrade():' + xiaoming.getGrade());



//抽象绑定原型链方法
function inherits(Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child; //Child和constructor都指代构造函数本身
}