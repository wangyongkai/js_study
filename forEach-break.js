var array = ["first","second","third","fourth"];
        
// 会遍历数组所有元素，只是执行到第3次师，return false下面的代码不再执行而已
array.forEach(function(item,index){
    if (item === "third") {
        return false;//只能结束本次循环  
    }
    console.log('item------------->', item);// 输出：first,second,fourth
});



try {
    var array = ["first","second","third","fourth"];
    // 执行到第3次，结束循环
    array.forEach(function(item,index){
        if (item == "third") {
            throw new Error("EndIterative");
        }
        console.log('item------------->', item);// 输出 first,sencond
    });
} catch(e) {
};