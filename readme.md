# Simple Js Framework

Simple Js is a framework designed to make web development more simple and fast. 

# Installation

Using the package manager [npm](https://www.npmjs.com/get-npm) to install Simple Js.

```bash
npm install -g simple-js-framework
```

# Usage

To create a Simple Js project just type in the command line:

```bash
simplejs create project-name
```

To start using the Simple Js environment

```bash
cd project-name
npm run begin
npm run start
```

Next open the browser in http://localhost:4200

# Environment

The environment structure is simple, just look at it:

    .
    ├── public                   # Public page files
    |   ├── css                  # CSS files
    |   │   └── app.css          # Principal project css file
    │   ├── js                   # JS files
    |   │   ├── auth.js          # Authentication js file
    |   │   └── app.js           # Principal project js file
    │   └── index.html           # Principal index.html file   
    ├── src                      # Virtual server environment files
    |   └── server.js            # Principal server side file
    └── package.json

# License

This framework is under the ISC license.

