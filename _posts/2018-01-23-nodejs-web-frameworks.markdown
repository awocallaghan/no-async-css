---
layout:     post
title:      "Node.js Web Frameworks"
subtitle:   "Popular Node.js web development frameworks"
date:       2018-01-23 18:00:00
modified:   2018-01-23 18:00:00
author:     "Alex O'Callaghan"
header-img: "/img/nodejs.jpg"
description: Popular Node.js web development frameworks
---
Express
==

[Website](https://expressjs.com/) [GitHub](https://github.com/expressjs/express/)

Install: `npm install express --save`

Express is a minimal framework for developing Node.js web applications. Many of the other frameworks in this list are based on Express with additional useful features to help speed up development or apply a design pattern to aid maintainability. Express is unopinionated and the go to option for a Node.js webserver.

Two of the main concepts required for developing Express-based applications is [routing](https://expressjs.com/en/guide/routing.html) and [middleware](https://expressjs.com/en/guide/using-middleware.html). Express request handlers are JavaScript functions that accept 2 or more arguments: `req` = [Request](https://expressjs.com/en/4x/api.html#req), `res` = [Response](https://expressjs.com/en/4x/api.html#res), and `next` = function to call next middleware. Which request handler is called is determined by the routes registered to the [router](https://expressjs.com/en/4x/api.html#router) and the URL of the request.

Express also supports a range of [template engines](https://expressjs.com/en/guide/using-template-engines.html) out of the box, including [Pug](https://pugjs.org/api/getting-started.html), [Mustache](https://www.npmjs.com/package/mustache), and [EJS](https://www.npmjs.com/package/ejs) which support features like partial templates, variable interpolation and conditional branching within HTML templates.

The [express-generator](https://expressjs.com/en/starter/generator.html) package allows for quick generation of a skeleton Express application via a command line interface (CLI).

Loopback
==

[Website](https://loopback.io/)
[GitHub](https://github.com/strongloop/loopback/)

Install: `npm install -g loopback-cli`

Loopback is a framework based on Express for rapidly building REST APIs. Development is maintained by IBM and integration with [IBM Connect](https://developer.ibm.com/apiconnect) is provided.

Loopback has a command line interface for creating models, relations, and access control rules reducing time setting up boilerplate code. There's also an web-based API explorer that allows you to view and test your REST API routes.

It can also support a range of popular database management systems via [database connectors](http://loopback.io/doc/en/lb3/Database-connectors.html).

[A comparison of Loopback vs other frameworks](http://loopback.io/resources/#compare)

Sails.js
==

[Website](https://sailsjs.com/)
[GitHub](https://github.com/balderdashy/sails/)

Install: `npm install -g sails`

Sails is a framework based on Express implementing a Model-View-Controller (MVC) design pattern similar to [Ruby on Rails](http://rubyonrails.org/).

Sails uses an ORM called [Waterline](https://github.com/balderdashy/waterline) for defining database models which supports a range of database connectors. 

[Blueprints](https://sailsjs.com/documentation/concepts/blueprints) allow for rapid development of REST APIs by generating common CRUD methods.

Nest
==

[Website](https://nestjs.com/)
[GitHub](https://github.com/kamilmysliwiec/nest)

Install: `git clone https://github.com/nestjs/typescript-starter.git <project-name>`

Nest is a framework based on Express that implements a very similar architecture to an [Angular](https://angular.io) application, including support for TypeScript. 

hapi.js
==

[Website](https://hapijs.com/)
[GitHub](https://github.com/hapijs/hapi)

hapi.js is a web application framework that handles requests and routing similar to Express. There are also a range of [community plugins](https://hapijs.com/plugins) for handling common web application requirements such as authentication, authorization, and templating.
