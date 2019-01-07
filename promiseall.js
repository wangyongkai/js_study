
  Promise.all([]).then(res =>{
    console.log('n===========0');
  });


let p1 = new Promise((resolve, reject) => {
    resolve('p1成功了');
    //console.log('p1成功了');
    //reject('p1失败了');
  });
  
  let p2 = new Promise((resolve, reject) => {
    //resolve('p2success')
    reject('p2failure');
    //console.log('p2failure');
  });
  
  let p3 = Promise.reject('p3失败');
  
  Promise.all([p1, p2]).then((result) => {
    console.log(result);               //['成功了', 'success']  
  }).catch((error) => {
    console.log(error);
  });
  
  Promise.all([p1,p3,p2]).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);     // 失败了，打出 '失败'
  });





  //总结：--------------------------
//1.按数组顺序调用，一个成功了下一个才能调用，只有数组中所有都成功了才能正确走then中的输出.否则走catch失败。
//2.catch只输出第一个失败的error。
//3.数组为空数组  则直接走成功