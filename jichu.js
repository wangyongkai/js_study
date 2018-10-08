/** 

123; // 整数123
0.456; // 浮点数0.456
1.2345e3; // 科学计数法表示1.2345x1000，等同于1234.5
-99; // 负数
NaN; // NaN表示Not a Number，当无法计算结果时用NaN表示
Infinity; // Infinity表示无限大，当数值超过了JavaScript的Number所能表示的最大值时，就表示为Infinity


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

*/

var a;

function test() {
              if (a) {} else {
                            console.log('====================');
              }

}

test();//如果没有var a 则报错 ReferenceError: a is not defined
console.log(a); //undefined