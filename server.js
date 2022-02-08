
// const fibb = (v)=>{
//     let fib = {...v};
//     console.log(fib.fib);
//     fib["fib"] = v["f"] + fib["fib"];
//     return fib["fib"] <= v["max"] ? fibb({f: v["fib"], fib: fib["fib"], max: v["max"]}) : null;
// }

// fibb({f:0,fib:1,max:55});

var value = undefined;

if(!value){
    console.log(value + "is undefined");
}else{
    console.log(value);
}