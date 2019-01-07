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


//---------------------------------------------------------------------------------


var NewStudent = {
    name: 'Robot',
    height: 1.6,
    run: function () {
        console.log(this.name + ' is running...');
    }
};

var xiaoming = {
    name: '小明'
};
xiaoming.__proto__ = NewStudent; //注意原型proto两边的下划线，长度分别是两条单划线
//JavaScript的原型链和Java的Class区别就在，它没有“Class”的概念，所有对象都是实例，所谓继承关系不过是把一个对象的原型指向另一个对象而已。即：原型也是对象。

console.log('xiaoming.name=' + xiaoming.name);
xiaoming.run();

var Bird = {
    fly: function () {
        console.log(this.name + ' is flying...');
    }
};
xiaoming.__proto__ = Bird; //Bird中没有指定name属性，但是却可以在fly函数中引用。把它当原型的xiaoming中指定name属性。类比java中抽象类的属性
xiaoming.fly();


// 请注意，上述代码仅用于演示目的。在编写JavaScript代码时，不要直接用obj.__proto__去改变一个对象的原型，并且，低版本的IE也无法使用__proto__。
// Object.create()方法可以传入一个原型对象，并创建一个基于该原型的新对象，但是新对象什么属性都没有，因此，我们可以编写一个函数来创建xiaoming：

function createStudent(name) {
    var s = Object.create(NewStudent);
    s.name = name;
    return s;
}

var xiaoming = createStudent('小明');
xiaoming.run();
console.log('xiaoming.__proto__ === NewStudent:' + (xiaoming.__proto__ === NewStudent));
//(xiaoming.__proto__ === Student)如果不加括弧，则会先+号再计算===,而在java中无括弧编译器会报错。