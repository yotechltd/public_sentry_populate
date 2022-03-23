
// #include <iostream>
// #include <bits/stdc++.h>
// #include <algorithm>
// using namespace std;

// int main()
// {
//     cout<<"Hello World"<<endl;
//     int p[] = {15, 5, 3, 7, 9, 14, 0};
//     int length = sizeof(p)/sizeof(p[0]);
//     sort(p, p+length);
//     for(int i=0; i<length; i++){
//         cout<<p[i] << " ";
//     }
//     cout<<endl;
    
//     cout<<p[length-1]<<endl;
//     int maxi = max(p[0], 5 - p[length-1])*2;
//     cout<<maxi<<endl;
//     for(int i=0; i<length-1; i++){
//         maxi = max(maxi, p[i+1]-p[i]);
//     }
//     cout<<std::fixed;
//     cout<<std::setprecision(10);
//     cout<<maxi<<endl;
//     cout<<maxi/2.0<<endl;
//     return 0;
// }