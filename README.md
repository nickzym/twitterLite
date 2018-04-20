# Twitter-Lite ![Build Status](https://scrutinizer-ci.com/g/nickzym/twitterLite/badges/build.png?b=master)

> Twitter alike web application.
>
> User can post their twittes, comment other twittes, access yelp/google/api through their twitte.
>
> Based on Koa2, mongoDB, React, Redux, Webpack, Ant Design, Material UI, Yelp Fusion, Google Map Service API. Implement Server-side rendering to accelerate home page render speed.

Homepage: http://www.twitte-lite-nickzym.com/

![homepage](/Users/nick/Downloads/www.twitte-lite-nickzym.com_ (3).png)


## Directory

```
├── assets
│   └── index.css //store global css setting
├── config
│   ├── webpack.config.dev.js  devlopment environment webpack setting
│   └── webpack.config.prod.js production environment webpack setting
├── package.json
├── README.md
├── server  server side files，based on koa2
│   ├── controller // store all controllers based on routes
│   ├── error // store ApiErrors(need to be developed)
│   ├── middleware // store koa2 self-defined middleware
│   ├── models // store mongoDB schema
|	├── routes // store all koa2 routes 
|	├── clientRouter.js // server side rendering client router
|	├── index.js
|	└── app.js
└── src
    ├── app  store logic code connecting server and client side
    │   ├── configureStore.js  //redux-thunk setting
    │   ├── createApp.js       //setting router based on production/development mode
    │   ├── index.js
    │   └── router
    │       ├── index.js
    │       └── routes.js      //react-router setting
    ├── components             //public components
    ├── favicon.ico
    ├── index.ejs              //template engine
    ├── index.js             
    ├── pages                  //website page component
    │   ├── home
    |	├── login
    |	├── newpost
    |	├── profile
    |	├── signup
    |	├── timeline
    │   └── TwitteInfoPage
    ├── service                //backend api call
    │   ├── api.js
    └── store
        ├── actions            
        ├── constants.js       // actions' name
        └── reducers
```



In this project, expect homepage router, all routers are dedicate to react-router, reducing backend service call time. 

In development mode, use webpack-dev-server as server, realize hot-module loading. In production mode, use koa2 as back end server, realize demanding load.

When a page component get new data, store it in redux store. I use redux-persist to store user data in case of losing state when redirecting.

I could use homethunk to inject initial data for server side-rendering. But considering auth module, I have to store cookie(instead of localStorage beacuse of server-side can't touch it) in server side and use it as inital state. It must be some better solution!





------

1. npm install
2. npm dev:server
3. npm start  // run in heroku 

-------------------------------------------------

1. npm install
2. npm run dev  // development mode, run webpack-dev-server
3. npm run server // run koa


-------------------------------------------------
