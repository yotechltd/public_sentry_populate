const binarySearch = (req,res)=>{
    let {list, item} = req.body;
    let length = list.length;
    let i = 0;
    let step = 0;
    let body = binary(list, i, length-1, item, step);
    console.log(body);
    return res.json({
        body: body
    })
}

const binary = (list, i, j, item, step)=>{
    step++;
    if(i>j){
        return {
            found: -1,
            item: item,
            step: step
        };
    }
    let middle = Math.round((j+i)/2);
    
    if(list[middle]>item){
        return binary(list, i, middle-1, item, step);
    } else if(list[middle]<item){
        return binary(list, middle+1, j, item, step)
    } else {
        console.log(middle, list[middle]);
        return {
            item: list[middle],
            position: middle,
            step: step
        }
    }
}

const tPrime = async()=>{
    #include <iostream>
#include <math.h>

using namespace std;

int main()
{
    int p, count=0, n;
    cin>>n;
    while(n--){
        int count = 0;
        cin>>p;
        int b = std::sqrt(p);
        for(int i = 1; i <= b; i++){
            if(p%i == 0){
                b==i && i*i == p ? count++ : count+=2;
            }
            if(count>3) break;
        }
        count==3 ? cout<<"YES"<<endl : cout<<"NO"<<endl;
    }
    return 0;
}
}

module.exports = {
    binarySearch
}