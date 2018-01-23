---
layout:     post
title:      "Improving website load speed"
subtitle:   "Using Google PageSpeed Insights to ensure fast load times"
date:       2017-05-10 17:00:00
author:     "Alex O'Callaghan"
header-img: "/img/speedmeter.jpg"
preview-img: "/img/speedmeter_small.jpg"
description: Optimizing page load speed can help reduce visitor bounce rate. Google PageSpeed Insights is a useful tool that can identify problem areas of a webpage that could be affecting the initial load time.
---
# Contents

- [PageSpeed insights](/#pagespeed-insights)
- [Best practices](/#best-practices)
  - [Minification](/#minfication)
  - [Render blocking](/#render-blocking)
  - [Enable compression](/#enable-compression)
  - [Optimize images](/#optimize-images)

Users expect your website to load fast, and if it doesn't you'll lose that traffic. Optimizing your website to improve load speed can not only reduce traffic bounce rate, but improve your SEO as page speed is a metric used by search engines such as Google to rank your website.

# PageSpeed Insights

Google offers an online tool called [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) that tests the performance of your website on both mobiles and desktops. As mobile web usage continues to increase it is important to consider how your website is optimized for browsers often browsing the web with slower internet connectivity.

PageSpeed Insights tests your website and gives a score between 0 and 100 for both mobile and desktop performance.

![PageSpeed Insights results for alexocallaghan.com](/img/pagespeed-insights-results-desktop.png)

There are also open-source [PageSpeed modules](https://developers.google.com/speed/pagespeed/module/) for [Apache](https://www.apache.org/) and [Nginx](https://www.nginx.com/resources/wiki/) webservers to automatically optimize the serving of assets to improve performance.

# Best practices

## Minification

One way to improve the speed of your website is to ensure the HTML file and CSS and JavaScript assets are minified [\[1\]](https://developers.google.com/speed/docs/insights/MinifyResources). Minification is the process of removing unnecessary data from files without affecting how the resource is processed by the browser. Examples include removing comments, using shorter variable and function names, and removing unused code.

Best practice is to include minification into your build process using an automation tool such as [Gulp](/2016/07/16/gulp/).

- Minify HTML: [HTMLMinifier](https://github.com/kangax/html-minifier) - offers Gulp and Grunt plugins and Express middleware wrapper
- Minify CSS: [clean-css](https://github.com/jakubpawlowicz/clean-css) or [cssnano](https://github.com/ben-eb/cssnano) (extension of [PostCSS](https://github.com/postcss/postcss))
- Minify JavaScript: [UglifyJS](https://github.com/mishoo/UglifyJS2) or the [Closure Compiler](https://developers.google.com/closure/compiler/)

## Render blocking

PageSpeed also penalizes any JavaScript or CSS assets that block browser rendering of above the fold content \[[2](https://developers.google.com/speed/docs/insights/BlockingJ),[3](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery)\]. Above the fold content describes the top section of your website first visible on page load. Browsers must wait for JavaScript and CSS files included within the document's `<head>` to be loaded before rendering the webpage. This increase in wait time can be enough to make a user hit the back button.

### Optimizing JavaScript delivery

To stop JavaScript assets blocking rendering you should include them just before the closing `</body>` tag rather than within `<head>`. This delays browser loading of JavaScript until after the DOM and styles are rendered.

### Optimizing CSS delivery

**Note: I'm now using [Filament Group's async css](https://www.filamentgroup.com/lab/async-css.html) approach using [rel="preload"](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content) and [cssrelpreload.js](https://github.com/filamentgroup/loadCSS/blob/master/src/cssrelpreload.js) polyfill for older browser support.**

CSS delivery can be optimized by inlining all styles for above the fold content within a `<style>` tag. Inlining all stylesheets isn't feasible for most websites and to mitigate this you can use the following example to extra CSS files after first browser rendering.

```
  <head>
  ...
    <style>
      // Styles for above the fold content
    </style>
  ...
  </head>
  <body>
  ...
    <noscript id="deferred-styles">
      <link rel="stylesheet" type="text/css" href="css/styles.css" />
    </noscript>
    <script>
      var loadDeferredStyles = function () {
        var addStylesNode = document.getElementById("deferred-styles");
        var replacement = document.createElement("div");
        replacement.innerHTML = addStylesNode.textContent;
        document.body.appendChild(replacement)
        addStylesNode.parentElement.removeChild(addStylesNode);
      };
      var raf = requestAnimationFrame || mozRequestAnimationFrame ||
          webkitRequestAnimationFrame || msRequestAnimationFrame;
      if (raf) raf(function () { window.setTimeout(loadDeferredStyles, 0); });
      else window.addEventListener('load', loadDeferredStyles);
    </script>
  </body>
```

## Enable compression

Google recommends using [gzip](http://www.gzip.org/) to compress resources served by your web server [\[4\]](https://developers.google.com/speed/docs/insights/EnableCompression). **gzip** can reduce response size by up to 90% significantly increasing page load times.

## Optimize images

Images are often the largest resources on a web page therefore their optimization is vital in improving page speed [\[5\]](https://developers.google.com/speed/docs/insights/OptimizeImages). Images should be optimized for the web with consideration placed into resolution and dimensions.
