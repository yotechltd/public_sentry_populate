const { Router } = require( 'express' );
const { binarySearch, exceptionalSearch } = require( '../controller/main.controller' );

const route = require('express').Router()

route.post('/',(req,res)=>{
  let arr = [2,5,6,7,9,10],
  f = req.body.f;
  n = arr.length;
  let object = binarySearch(arr, 0, n-1, f);
  res.json(object);
});

route.post('/exceptional-search',(req,res)=>{
  let arr = [2,5,6,7,9,10],
   object = exceptionalSearch(arr, arr.length, req.body.f);
  return res.json(object);
})
route.get('/arraymap', (req,res)=>{
  try{
    let lastOne= require("./production.json");
    let   firstOne= require("./dev.json");
    let notMatched = firstOne.filter(o=> {
      let index = lastOne.findIndex(i => o==i);
      if(index == -1){
        return o;
      }
    })
    return res.json({
      notMatched
    })
  }catch(error){
    res.json(error);
  }
})

route.get("/max", (req,res)=>{
  try{
    let caps = req.body.caps,
      isFalse = false,
      length = caps.length,
      big=0,
      small=0,
      pro;
    for(i=0;i<length;i++){
      if(i!=0){
        if(caps[i]>=65 && caps[i]<=90){
          pro[i] = caps[i]+32;
          big++;
        }else{
          small++;
        }
      }else{
        if(caps[i]>=97 && caps[i]<=122){
          pro[i] = caps[i]-32;
        }else{
          big++;
          small++;
        }
      }
      if(big == length-1){
        console.log(pro);
      }
    }
    return res.json({
      value: caps
    });
    // let a = req.body.a,
    // total = req.body.total,
    // middle = total/2,
    // i = 0,
    // b=0;
    // for(i=0;b<=middle; i++){
    //   b+=a[i];
    // }
    // console.log(i);
    // return res.json({
    //   map: i
    // })
  }catch(error){
    res.json(error);
  }
})


module.exports = route;