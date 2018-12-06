var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i);
  }
  console.log('a['+i+']-------->'+a[i]);
}


//let 不像var 那样会发生 ‘变量提升’ 现象，因此，变量需要先声明然后再使用，否则报错
//let 不允许在相同作用域内，重复声明同一个变量。


var b = [];
for (let j = 0; j < 10; j++) {
  b[j] = function() {
    console.log(j);
  }
  console.log('b['+j+']-------->'+b[j]);
}

//-----------------------------------------
var aaa = [];
var _loop = function _loop(i) {
    aaa[i] = function () {
    console.log(i);
  };
};

for (let i = 0; i < 10; i++) {
  _loop(i);
}
aaa[6]();//6
//-----------------------------------------


//怎么理解for循环中用let声明的迭代变量每次是新的变量？
//https://segmentfault.com/q/1010000007541743/a-1020000007542563