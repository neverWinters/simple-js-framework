<h1 align="center">
    Simple Js Framework
</h1>
<br>
<p align="center">
    Simple Js is a framework designed to make web development more simple and fast.
    <br>
    Make it simple, keep it that way.
<p> 

# Installation

Using the package manager [npm](https://www.npmjs.com/get-npm) to install Simple Js.

```bash
npm install -g simple-js-framework
```

# Basic Usage

To create a Simple Js project just type in the command line:

```bash
simplejs create -t=project -n=project-name
```

To start using the Simple Js environment:

```bash
cd project-name
npm run start
npm run test
```

Next open the browser in http://localhost:9898 

The Simple Js live server is powered by [Nodemon](https://www.npmjs.com/package/nodemon).

# Creating Components

A component is another instance of javascript within the same project. 

Create a new component is very simple, just run the following command from the project root:

```bash
simplejs create -t=component -n=component-name
```

The component will be available on the route http://localhost:9898/component-name

# Environment

The environment structure is simple, just look at it:

    .
    ├── backend                         # Backend functions files
    |   ├── data                        # Data definition files
    |   │   └── schema                  # Data schema validation files
    │   ├── helpers                     # Helper functions files
    │   └── routes                      # Backend routes files
    |       └── v1                      # Backend versioned routes files
    ├── public                          # Public page files
    |   ├── css                         # CSS files
    |   │   └── app.css                 # Principal project css file
    │   ├── images                      # Image files
    │   ├── js                          # JS files
    |   │   ├── app.js                  # Principal project js file
    |   │   ├── authentication.js       # Authentication js file
    |   │   ├── globals.js              # Component global variables file
    |   │   └── pages.js                # Component pages declaration file
    │   └── index.html                  # Principal index.html file
    ├── res                             # Multilanguage support files
    │   ├── en.json                     # English texts file   
    |   └── es.json                     # Spanish texts file
    ├── src                             # Virtual server environment files
    │   ├──conf                         # Server configuration files
    |   │   ├── component.json          # Frontend component list
    |   │   ├── route.json              # Backend route list
    |   │   └── static.json             # Static file path list
    |   └── server.js                   # Principal server side file
    ├── .env                            # Environment variables file
    └── package.json                    # Project package file

# Contributors

    .
    └── Johangel Ilarraza

# License

This framework is under the ISC license.

