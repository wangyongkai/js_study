/** 
---------------------------------数值相关-------------------------------------------------
123; // 整数123
0.456; // 浮点数0.456
1.2345e3; // 科学计数法表示1.2345x1000，等同于1234.5
-99; // 负数
NaN; // NaN表示Not a Number，当无法计算结果时用NaN表示
Infinity; // Infinity表示无限大，当数值超过了JavaScript的Number所能表示的最大值时，就表示为Infinity

所有数字都是以64位浮点数形式储存，即使整数也是如此
1 === 1.0 // true
整数范围：-(253-1)到253-1  注意：是2的53次方
-------------------------------------龟定---------------------------------------------------
第一种是==比较，它会自动转换数据类型再比较，很多时候，会得到非常诡异的结果；
第二种是===比较，它不会自动转换数据类型，如果数据类型不一致，返回false，如果一致，再比较。
由于JavaScript这个设计缺陷，不要使用==比较，始终坚持使用===比较。
JavaScript的设计者希望用null表示一个空的值，而undefined表示值未定义。
事实证明，这并没有什么卵用，区分两者的意义不大。大多数情况下，我们都应该用null。undefined仅仅在判断函数参数是否传递的情况下有用。
变量本身类型不固定的语言称之为动态语言  对象也是动态的 可以动态增删属性
var a = 123; // a的值是整数123
a = 'ABC'; // a变为字符串
转义字符\
'I\'m \"OK\"!';
JavaScript把null、undefined、0、NaN和空字符串''视为false，其他值一概视为true
for ... in循环由于历史遗留问题，它遍历的实际上是对象的属性名称。 &&&属性
for ... of循环则完全修复了这些问题，它只循环集合本身的元素：&&&属性对应的值
forEach方法，它接收一个函数，每次迭代就自动回调该函数。
可枚举性（enumerable）用来控制所描述的属性，是否将被包括在for...in循环之中。具体来说，如果一个属性的enumerable为false，下面三个操作不会取到该属性。
* for..in循环
* Object.keys方法
* JSON.stringify方法
--------------------------------------------------------------------------------------
*/
//--------------let没有变量提升---------------------------------------------------------
console.log(fuck);// undefined  声明提前  赋值不提前 傻
var fuck=2;

// let的情况；
//console.log(bar);  // 报错
//let bar = 2;
//-------------------------------------------------------------------------------------

console.log('this=========>', this);

//-------------------------undefined与not defined---------------------------------------
var a;
function test123() {
              if (a) {} else {
                            console.log('====================');
              }

}
test123();//如果没有var a 则报错 ReferenceError: a is not defined
console.log(a); //undefined 定义 没有赋值   

function test133(aaa){
  console.log(aaa);//undefined 方法的参数中定义 没有赋值   
}
test133();
//-------------------------------------------------------------------------------------
var promise=new Promise((resole,reject)=>{//Promise构造函数内部主动调用了传入的函数
              console.log('log1=============');
});

function Student() {
             // fn();
              console.log('log3=============');//构造函数体中的却执行了
          }

var student=new Student(()=>{   //箭头函数传入构造函数  但是Student构造内部并没有调用
              console.log('log2=============');     
});
//-------------------------------------------------------------------------------------
function page(aaa){
              console.log('aaa.a='+aaa.a);
              console.log('aaa.b='+aaa.b);
}
function wepage(){
              return {
                            a:"我是a",
                            b:"我是b"
              }
}
page(wepage());
//-------------------------------------------------------------------------------------
function setData(data){
    let newData = {};
    Object.keys(data).forEach(key => {
      newData[`${'aaaa'}.${key}`] = data[key];
      //newData= {"aaaa.a":1,"aaaa.b":2,"aaaa.c":3,"aaaa.d":4,"aaaa.e":5}
    });
    console.log('newData=', JSON.stringify(newData));
  }
setData({
      a:1,
      b:2,
      c:3,
      d:4,
      e:5
  });
//---------------------------------------------------------------------------------------
var tt = 'aaqqqqqqqqqqqqqqq';
function test(){
console.log(tt);
var tt = 'ddqqqqqqqqqqqqqq';//此语句起到关键作用 屏蔽了函数外面的tt
console.log(tt);
}
test();

//结果：
//undefined
//ddqqqqqqqqqqqqqq

// 调用对象位于作用域链的前端，局部变量（在函数内部用var声明的变量）、
// 函数参数及Arguments对象都在函数内的作用域中——这意味着它们隐藏了作用
// 域链更上层的任何同名的属性。 

// 即，在以上程序片段中，test函数内部的“var tt='dd'”将会致使“var tt='aa'”在
// test函数被调用时完全被隐藏。而且，tt是在第一个alert语句之后定义，所以在调用到
// 第一个alert时，tt是还没有被赋值 的。这样说可能会清楚一点，即，在定义test函数时
// ，当定义第一个alert(tt)时，这里会记录tt是作用域链中的一个变量但不会记录它（tt）
// 的 值，函数定义完毕后tt就添加到作用域里，所以第一个alert语句能够找到该作用域里
// 的tt（即，相当于找到一个已经在函数内部声明，但未被赋值的 tt）。 
//---------------------------------js作用域-------------------------------------------------
// Javascript中的函数“在定义它们的作用域里运行，而不是在执行它们的作用域里运行”
// 函数作用域 !==块级作用域
// 词法作用域（静态作用域）：写的时候决定。当定义了一个函数后，当前的作用域就会被保存下来，并且成为函数内部状态的一部分>>>>>>箭头函数
// 动态作用域：调用的时候决定>>>>>普通函数
// 1.箭头函数的this绑定看的是this所在的函数定义在哪个对象下，绑定到哪个对象则this就指向哪个对象
// 2.如果有对象嵌套的情况，则this绑定到最近的一层对象上
//3.非箭头函数，有显示调用则指向调用对象。没有则window
//个人理解：箭头函数去决议上一层的this指向是谁。非箭头函数一般指向window，除非显示对象调用
var obj1={
	num:4,
	fn:function(){
    console.log('11111===', this);
		var f=function(){    
			console.log('22222===', this); //window,因为函数f定义后并没有对象调用，this直接绑定到最外层的window对象
			setTimeout(() => {
				console.log('33333===', this);//window，外层this绑定到了window,内层也相当于定义在window层（全局环境）
			});
		}
		f();
  },
  fn1:()=>{
    console.log('fn1=======', this);
  }
}
obj1.fn();
obj1.fn1();

var ggg={
  ttt:this,
  rrr:'rrr',
  aaa:function(){
    console.log('ggg中的方法===', this);//此处的this指向ggg对象
  }
};
console.log('ggg=======', ggg.ttt);//ttt却不是指向ggg对象
ggg.aaa();
//console.log('this=========>', this);

//------------------------------------


var obj123={
	num:4,
	fn:function(){
		var f=() => {    //object，也就是指obj1
      console.log('f--------------->>>>>', this);
      var j=() => {
				console.log('setTimeout---j----->', this);// //object，也就是指obj1
      };
      j();
			setTimeout(() => {
				console.log('setTimeout-------->', this);// //object，也就是指obj1
			});
		}
		f();
	}
}
obj123.fn();

//-------------------多个then-------------------------------------------------------

new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  console.log('f---------1------>>>>>', result);
  return result * 2;

}).then(function(result) { // (***)

  console.log('f--------2------->>>>>', result);
  return result * 2;

}).then(function(result) {

  console.log('f---------3------>>>>>', result);
  return result * 2;

});

