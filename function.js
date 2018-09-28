// function abs(x) {
//     if (x >= 0) {
//         return x;
//     } else {
//         return -x;
//     }
// }
//没有return语句，函数执行完毕后也会返回结果，只是结果为undefined。


//JavaScript的函数也是一个对象
var abs = function (x) { //function (x) { ... }是一个匿名函数
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}; //;，表示赋值语句结束

console.log('abs(10)=' + abs(10));
console.log('abs(-9)=' + abs(-9));
console.log('abs(10, blablabla)=' + abs(10, 'blablabla'));
console.log('abs(-9, haha, hehe, null)=' + abs(-9, 'haha', 'hehe', null));
console.log('abs()=' + abs());

//--typeof---------------------------------------------------------------------------
function abs1(x) {
    console.log('typeof:' + (typeof x));
    if (typeof x !== 'number') { //如何判断是不是数字
        //throw 'Not a number';
    }
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}

abs1(111);
abs1(true);
abs1('true');
abs1(function () {

});
abs1([1, 2, 3]);
//abs1(aaa); //这样执行会报错 因为aaa没有定义就传给方法abs1
console.log('typeofaaa:' + (typeof aaa)); //直接执行不报错。因为typeof 有undefined 类型结果

// typeof 运算符把类型信息当作字符串返回。typeof 返回值有六种可能： "number," "string," "boolean," "object," "function," 和
//  "undefined."我们可以使用typeof来获取一个变量是否存在，如if(typeof a!="undefined"){}，而不要去使用if(a)因为如果a不存在（未声明）
//  则会出错，对于Array,Null等特殊对象使用typeof一律返回object，这正是typeof的局限性。
//-----------------------------------------------------------------------------







//arguments-----------------------------------------------------------------------------
//只在函数内部起作用，并且永远指向当前函数的调用者传入的所有参数。arguments类似Array但它不是一个Array
//最常用于判断传入参数的个数
function foo(x) {
    console.log('x = ' + x); // 10
    for (var i = 0; i < arguments.length; i++) {
        console.log('arg ' + i + ' = ' + arguments[i]); // 10, 20, 30
    }
}
foo(10, 20, 30);




function foo1(a, b) {
    var i, rest = [];
    if (arguments.length > 2) {
        for (i = 2; i < arguments.length; i++) {
            rest.push(arguments[i]);
        }
    }
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}

foo1(1, 2, 3, 4);
//-----------------------------------------------------------------------------

//ES6标准引入了rest参数------------------------------------------------------------
function foo2(a, b, ...rest) {
    console.log(rest);
    console.log('rest a = ' + a);
    console.log('reset b = ' + b);

}

foo2(1, 2, 3, 4, 5);
foo2(1);
//-----------------------------------------------------------------------------


//小心你的return语句-------------------------------------------------------------
function foo3() {
    return; // 自动添加了分号，相当于return undefined;
    { // 这里不会自动加分号，因为{表示语句尚未结束
        name: 'foo3'
    }; // 这行语句已经没法执行到了
}
//-----------------------------------------------------------------------------



//变量访问范围--------------------------------------------------------------------
function foo4() {
    var x = 1;

    function bar() {
        var y = x + 1; // bar可以访问foo的变量x!
    }
    var z = y + 1; // ReferenceError! foo不可以访问bar的变量y!
}

//foo4();
//-----------------------------------------------------------------------------


//JavaScript的函数在查找变量时从自身函数定义开始，从“内”向“外”查找。如果内部函数定义了与外部函数重名的变量，则内部函数的变量将“屏蔽”外部函数的变量。
function foo5() {
    var x = 1;

    function bar() {
        var x = 'A';
        console.log('x in bar() = ' + x); // 'A'
    }
    console.log('x in foo() = ' + x); // 1
    bar();
}

foo5();
//-----------------------------------------------------------------------------

//JavaScript的函数定义有个特点，它会先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部：提升声明，不提升赋值！
function foo6() {
    var x = 'Hello, ' + y;
    console.log(x);
    var y = 'Bob';
}

foo6();
//-----------------------------------------------------------------------------



//不在任何函数内定义的变量就具有全局作用域。全局作用域的变量实际上被绑定到window的一个属性.全局函数也是绑定到window上。JavaScript实际上只有一个全局作用域
var course = 'Learn JavaScript';
// alert(course); // 'Learn JavaScript'
// alert(window.course); // 'Learn JavaScript'
//-----------------------------------------------------------------------------

// var 作用域实际上是函数内部 for循环等语句块中是无法定义具有局部作用域的变量的
function foo7() {
    for (var i = 0; i < 100; i++) { //变量i作用域在foo7中
        //
    }
    i += 100; // 仍然可以引用变量i
}

//ES6引入了新的关键字let，用let替代var可以申明一个块级作用域的变量 啥是块？{} ?
function foo8() {
    var sum = 0;
    for (let i = 0; i < 100; i++) {
        sum += i;
    }
    // SyntaxError:
    i += 1;
}
//-----------------------------------------------------------------------------






//解构赋值-----------------------------------------------------------------------
var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school',
    address: {
        city: 'Beijing',
        street: 'No.1 Road',
        zipcode: '100001'
    }
};
var {
    name,
    address: {
        city,
        zip
    }
} = person; //这是蛤？定义一个匿名对象？？

console.log('jiegou name=' + name);



// 先声明变量后解构赋值: JavaScript引擎把{开头的语句当作了块处理，于是=不再合法。解决方法是用小括号括起来：
var x, y;
// 解构赋值:
({
    x,
    y
} = {
    name: '小明',
    x: 100,
    y: 200
});
// 语法错误: Uncaught SyntaxError: Unexpected token =
//

//一个函数接收一个对象作为参数，那么，可以使用解构直接把对象的属性绑定到变量中
function buildDate({
    year,
    month,
    day,
    hour = 0,
    minute = 0,
    second = 0
}) {
    return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
}
//-----------------------------------------------------------------------------

//--this-----------------------------------------------------------------------
var xiaofang = {
    name: '小芳',
    birth: 1990,
    age: function () {
        var y = new Date().getFullYear();
        return y - this.birth;
    }
};

xiaofang.age; // function xiaoming.age()
xiaofang.age(); // 今年调用是25,明年调用就变成26了
console.log('xiaofang.age:' + xiaofang.age);
console.log('xiaofang.age():' + xiaofang.age());



function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming5 = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming5.age(); // 25, 正常结果
getAge(); // NaN

var fn = xiaoming5.age; // 先拿到xiaoming的age函数
fn(); // NaN  要保证this指向正确，必须用obj.xxx()的形式调用！



//在函数内部定义的函数，this又指向undefined了
var xiaoming6 = {
    name: '小明',
    birth: 1990,
    age: function () {
        function getAgeFromBirth() {
            var y = new Date().getFullYear();
            return y - this.birth;
        }
        return getAgeFromBirth();
    }
};
console.log('xiaoming6.age()=' + xiaoming6.age());



//var that = this;
var xiaoming7 = {
    name: '小明',
    birth: 1990,
    age: function () {
        var that = this; // 在方法内部一开始就捕获this
        function getAgeFromBirth() {
            var y = new Date().getFullYear();
            return y - that.birth; // 用that而不是this
        }
        return getAgeFromBirth();
    }
};
//-----------------------------------------------------------------------------

//---apply()-----call()--------------------------------------------------------
//第一个参数就是需要绑定的this变量，第二个参数是Array
function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
}

var xiaoming8 = {
    name: '小明',
    birth: 1990,
    age: getAge
};

xiaoming8.age(); // 25
getAge.apply(xiaoming8, []); // 25, this指向xiaoming, 参数为空

// apply()把参数打包成Array再传入；
// call()把参数按顺序传入。
Math.max.apply(null, [3, 5, 4]); // 5
Math.max.call(null, 3, 5, 4); // 5

//apply实现装饰器
//装饰器？不改变原方法的情况下给他再加其他/的功能 覆盖老方法,
// var count = 0;
// var oldParseInt = parseInt; // 保存原函数parseInt  重写新函数

// window.parseInt = function () {
//     count += 1;
//     return oldParseInt.apply(null, arguments); // 调用原函数
// };
//-----------------------------------------------------------------------------


//---高阶函数----map-----reduce-----------------filter---------------------------
//高阶函数：参数是函数而不是变量。JavaScript的函数其实都指向某个变量
function add(x, y, f) {
    return f(x) + f(y);
}

var x = add(-5, 6, Math.abs);
console.log('x====' + x);


//map
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log('arr.map(String)=' + arr.map(String));

//reduce Array的reduce()把一个函数作用在这个Array的[x1, x2, x3...]上，这个函数必须接收两个参数，reduce()把结果继续和序列的下一个元素做累积计算

function string2int(s) {
    var arr = s.split('');
    var newarr = arr.map(function (x) {
        return x * 1; //转化成数字  ‘5’*4=20
    });
    return newarr.reduce(function (x, y) {
        return x * 10 + y;
    });
}

console.log('string2int(4885954)===' + string2int('4885954'));



//练习题
function normalize(arr) {
    return arr.map(function (s) {
        var arr1 = s.split('');
        return arr1.reduce(function (x, y) {
            console.log('x===' + x + '   y===' + y);
            if (x === arr1[0].substring(0, 1)) { //第一个字母大写
                x = x.toUpperCase(); //重新赋值
            }
            return x + y.toLowerCase();
        });

    });

}

var arr = ['adam', 'LISA', 'barT'];
console.log('normalize(arr)===' + normalize(arr));




// var arr = ['1', '2', '3'];
// arr.map(parseInt)
// map的回调函数传入的参数有3个：currentValue，index，array
// parseInt函数传入两个参数，第二个是表示进制的基数
// 实际执行的时候会传入当前值和下标两个参数是：
// parseInt（‘1’，1）返回1
// parseInt（‘2’，2）返回NaN


//Array的filter()也接收一个函数。和map()不同的是，filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素。
var arr = ['A', 'B', 'C'];
arr.filter(function (element, index, self) {
    console.log(element); // 依次打印'A', 'B', 'C'
    console.log(index); // 依次打印0, 1, 2
    console.log(self); // self就是变量arr
    return true;
});
//-----------------------------------------------------------------------------

//闭包-------------------------------------------------------------------------- 
//返回值必须是function==相关参数和变量都保存在返回的function中=======================
function lazy_sum(arr) {
    var sum = function () {
        return arr.reduce(
            function (x, y) {
                return x + y;
            }
        );
    };
    return sum;
}
var f = lazy_sum([1, 2, 3, 4, 5]);
console.log('f=====' + f); //打印发现f只是一个函数 并没有计算出结果
console.log('f()====' + f()); //此时才计算结果

var f1 = lazy_sum([1, 2, 3, 4, 5]);
var f2 = lazy_sum([1, 2, 3, 4, 5]);
console.log('f1 === f2:' + (f1 === f2)); // false  每个拷贝一份



//返回函数不要引用任何循环变量，或者后续会发生变化的变量
function count() {
    var arr = [];
    for (var i = 1; i <= 3; i++) {
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}

var results = count(); //持有变量i
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];

console.log('f1=' + f1 + ' f2=' + f2 + ' f3=' + f3);
console.log('f1()=' + f1() + ' f2()=' + f2() + ' f3()=' + f3());


//解决闭包 循环变量引用问题
function count1() {
    var arr = [];
    for (var i = 1; i <= 3; i++) {
        arr.push((function (n) {
            return function () {
                return n * n;
            }
        })(i));
    }
    return arr;
}

var results1 = count1(); //声明相同的函数，f1 f2 f3之前的会被覆盖掉，js语法声明自动提前！！
var f11 = results1[0];
var f22 = results1[1];
var f33 = results1[2];

f11(); // 1
f22(); // 4
f33(); // 9

console.log('f11=' + f11 + ' f22=' + f22 + ' f33=' + f33);
console.log('f11()=' + f11() + ' f22()=' + f22() + ' f33()=' + f33());



//x 相当于私有变量  在返回的对象中，实现了一个闭包，该闭包携带了局部变量x，并且，从外部代码根本无法访问到变量x。
function create_counter(initial) {
    var x = initial || 0;
    return {
        inc: function () {
            x += 1;
            return x;
        }
    }
}

var c1 = create_counter();
c1.inc(); // 1
c1.inc(); // 2
c1.inc(); // 3

console.log('c1.inc()=' + c1.inc());
console.log('c1.inc()=' + c1.inc());
console.log('c1.inc()=' + c1.inc());

var c2 = create_counter(10);
c2.inc(); // 11
c2.inc(); // 12
c2.inc(); // 13



//脑洞-==================================================================
// 定义数字0:
var zero = function (f) {
    return function (x) {
        return x;
    }
};

// 定义数字1:
var one = function (f) { //返回一个待执行的f函数
    return function (x) {
        return f(x);
    }
};

(one(function () {
    console.log('print one times');
}))();

// 定义加法:
function add(n, m) { //先执行n 再把结果给m执行
    return function (f) {
        return function (x) {
            return m(f)(n(f)(x));
        }
    }
}

// 计算数字2 = 1 + 1:       嵌套-----
var two = add(one, one);
(two(function () {
    console.log('print two times');
}))();

console.log('two()=' + two());
// 计算数字3 = 1 + 2:
var three = add(one, two);
console.log('three()=' + three());
// 计算数字5 = 2 + 3:
var five = add(two, three);


// 给3传一个函数,会打印3次:
(three(function () {
    console.log('print 3 times');
}))();

// 给5传一个函数,会打印5次:
(five(function () {
    console.log('print 5 times');
}))();
//-----------------------------------------------------------------------------

// ES6 箭头函数  箭头函数内部的this是词法作用域，就是外层调用者obj决定。
var fn = x => x * x;
x => {
    if (x > 0) {
        return x * x;
    } else {
        return -x * x;
    }
}

(x, y) => x * x + y * y;
() => 3.14;
(x, y, ...rest) => {
    var i, sum = x + y;
    for (i = 0; i < rest.length; i++) {
        sum += rest[i];
    }
    return sum;
}
var yyy = xxxxxxxxxx => ({ //疑问，，，，，，，，，
    foo: xxxxxxxxxx
});

console.log('yyy=' + yyy);
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
    }
};
obj.getAge(); // 25


var obj = {
    birth: 1990,
    getAge: function (year) {
        var b = this.birth; // 1990
        var fn = (y) => y - this.birth; // this.birth仍是1990
        return fn.call({
            birth: 2000
        }, year); //this已经绑定 忽略第一个参数
    }
};
obj.getAge(2015); // 25
//-----------------------------------------------------------------------------

//generator 功能 返回多次  每次遇到yield x;就返回一个对象{value: x, done: true/false}
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
var fooo = foo(3);
console.log('x+1=' + fooo.next().value);
//斐波那契数列
function fib(max) {
    var t, a = 0,
        b = 1,
        arr = [0, 1];
    while (arr.length < max) {
        [a, b] = [b, a + b];
        arr.push(b);
    }
    return arr;
}
console.log('fib(5)=' + fib(5));
console.log('fib(10)=' + fib(10));


function* fibg(max) {
    var
        t,
        a = 0,
        b = 1,
        n = 0;
    while (n < max) {
        yield a;
        [a, b] = [b, a + b];
        n++;
    }
    return;
}

var f = fibg(5);
console.log('f.next()=' + f.next().value);
console.log('f.next()=' + f.next().value);
console.log('f.next()=' + f.next().value);
console.log('f.next()=' + f.next().value);
console.log('f.next()=' + f.next().value);
console.log('f.next()=' + f.next().value);
//-----------------------------------------------------------------------------