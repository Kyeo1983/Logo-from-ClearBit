# Logo-from-ClearBit
Downloads company logos from [Clearbit](https://clearbit.com/)

Within ```index.js```, edit the list of companies and supply their domain in array format.
```
var sites = [["Google","https://www.google.com.sg/"],["Yahoo","https://yahoo.com.sg/"]];
```

If you require proxy, provide the proxy details at the top of ```index.js```, then uncomment this line while setting up options.
```
var createOptions = function(u) {
  return {
      uri: u,
      method: "GET",
      // agent: agent,   // << Uncomment this line to use proxy
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10
    };
}
```

Run the app by ```npm ./index.js``` and the available logos will be downloaded on the ```/logo``` folder.  
There could be failed downloads, such as if the logo is not recorded in clearbit, or if there were any HTTP errors.  
These failures will be recorded in the console printout with their HTTP status code. For example;
```
Yahoo;404;./logo/yahoo_com_sg.jpg
Google;200;./logo/google_com_sg.jpg
```

The downloaded content will be located in ```/logo```.  
![](https://github.com/Kyeo1983/Logo-from-ClearBit/blob/master/logos.jpg)
