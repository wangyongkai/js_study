var o={flag:true};  
var test=!!o.flag;//等效于var test=o.flag||false;  
console.log('test--------->', test);

// 如果明确设置了变量的值（非null/undifined/0/""等值),
// 结果就会根据变量的实际值来返回，如果没有设置，结果就会返回false。