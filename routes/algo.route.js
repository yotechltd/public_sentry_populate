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



module.exports = route;