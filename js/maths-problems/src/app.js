'use strict';

/**
 * Application to demonstrate function of 'maths-problems'
 * @author Alex O'Callaghan
 */


const Vue = require('vue');
const App = require('./App.vue');

// Create Vue instance
// - Replace #maths-problems-example DOM element
// - With App.vue Vue component
new Vue({
  el: '#maths-problems-example',
  render: function (h) { return h(App); },
});
