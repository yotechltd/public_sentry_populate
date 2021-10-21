module.exports.binarySearch = (arr, i, n, f)=>{
    if(i>n) return {
      "status": 0,
      "success": false,
      "foundIndex": null,
      "object": f
    };
    l = Math.floor((n+i)/2);
    if(arr[l]>f){
      return this.binarySearch(arr, 0, l-1, f)
    }if(arr[l]<f){
      return this.binarySearch(arr, l+1, n, f);
    }else{
      return {
        "status": 1,
        "success": true,
        "foundIndex": l,
        "object": f
      };
    }
  }

module.exports.exceptionalSearch = (arr, n, f)=>{
  console.log("catch");
  if(arr[0] == f) return{
    "status": 1,
    "success": true,
    "foundIndex": 0,
    "object": f
  }
  let i = 1;
    while (i < n && arr[i] <= f)
        i = i * 2;
        console.log(i);
  console.log(arr, n, f)
  return this.binarySearch(arr, i/2, Math.min(i, (n-1)), f);
}