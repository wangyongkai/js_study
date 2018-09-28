// 当我们用obj.xxx访问一个对象的属性时，JavaScript引擎先在当前对象上查找该属性，如果没有找到，
// 就到其原型对象上找，如果还没有找到，就一直上溯到Object.prototype对象，最后，如果还没有找到，就只能返回undefined。

var arr = [1, 2, 3];
//arr----->Array.prototype----->Object.prototype----->null

function foo() {
    return 0;
}
//foo----->Function.prototype------>Object.prototype------>null


function Student(name) {
    this.name = name;
    this.hello = function () {
        console.log('Hello, ' + this.name + '!');
    }
}
var xiaoming = new Student('小明'); //如果不写new，这就是一个普通函数，它返回undefined。
console.log('xiaoming.name:' + xiaoming.name);
xiaoming.hello();
//xiaoming的原型指向函数Student的原型
//xiaoming----->Student.prototype------>Object.prototype------>null


//用new Student()创建的对象还从原型上获得了一个constructor属性，它指向函数Student本身：
console.log('xiaoming.constructor=' + xiaoming.constructor);
console.log('Student.prototype.constructor=' + Student.prototype.constructor);
console.log('Student.prototype=' + Student.prototype);
console.log('Student=' + Student);
console.log('xiaoming:' + xiaoming);
console.log('Object.getPrototypeOf(xiaoming) === Student.prototype:' + (Object.getPrototypeOf(xiaoming) === Student.prototype));
console.log('xiaoming instanceof Student:' + (xiaoming instanceof Student));
//xiaoming的原型对象==Student.prototype==某个原型对象
//原型对象有个属性 constructor==Student函数本身

console.log('xiaoming.hello:' + xiaoming.hello);
var xiaohong = new Student('小红');
console.log('xiaohong.hello:' + xiaohong.hello);
console.log('xiaoming.hello === xiaohong.hello:' + (xiaoming.hello === xiaohong.hello)); //false 各自从原型对象中复制了一份函数 耗内存 如何共享一个hello函数？

//创建的对象 从原型对象共享一份函数
function Person(name) {
    this.name = name;
    // this.hello = function () {//构造函数中也有hello 原型中也有 则原型中的会被覆盖掉
    //     console.log('Hello,constructor ' + this.name + '!');
    // }
}
//只要把hello函数移动到xiaoming、xiaohong这些对象共同的原型上就可以
Person.prototype.hello = function () {
    console.log('Hello,prototype ' + this.name + '!');
}

var xiaozhang = new Person('小张');
var xiaoli = new Person('小李');
console.log('xiaozhang.hello:' + xiaozhang.hello);
console.log('xiaoli.hello:' + xiaoli.hello);
console.log('xiaozhang.hello === xiaoli.hello:' + (xiaozhang.hello === xiaoli.hello));
//结论：不显示指定原型对象上的属性，则每个人都有原型对象上的属性的一份拷贝。显示指定，则共享原型对象的显示指定的一份。
//疑问：原型对象上为什么没有name hello等属性呢？？只有constructor？？？？


function JuniorStudent(props) {
    this.name = props.name || '匿名';
    this.grade = props.grade || 1;
}

JuniorStudent.prototype.hello = function () {
    console.log('HELLO, ' + this.name + '!');
}

function createJuniorStudent(props) {
    return new JuniorStudent(props || {});
}

var xiaoguo = createJuniorStudent({
    name: '小郭'
});


console.log('xiaoguo.grade:' + xiaoguo.grade);
xiaoguo.hello();