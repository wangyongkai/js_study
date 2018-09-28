//关键字class从ES6开始正式被引入到JavaScript中


class Student {
    constructor(name) {
        this.name = name;
    }
    hello() { //注意没有function关键字
        console.log('Hello, ' + this.name + '!');
    }
}

var xiaoming = new Student('小明');
xiaoming.hello();


class PrimaryStudent extends Student { //extends则表示原型链对象来自Student
    constructor(name, grade) {
        super(name);
        this.grade = grade;
    }

    myGrade() {
        console.log('I am at grade ' + this.grade);
    }

}

var xiaohong = new PrimaryStudent('小红', 4);
var xiaoli = new PrimaryStudent('小李', 5);
console.log('xiaohong.hello === xiaoli.hello:' + (xiaohong.hello === xiaoli.hello)); //解决了原型链继承中多次拷贝的问题
xiaohong.hello();
xiaohong.myGrade();
//ES6引入的class和原有的JavaScript原型继承有什么区别呢？实际上它们没有任何区别，class的作用就是让JavaScript引擎去实现原来需要我们自己编写的原型链代码。