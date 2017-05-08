'use strict';

/**
 * Filter through project data
 * @author Alex O'Callaghan
 */

var PROJECTS_SELECTOR = '#projects';
var PROJECT_SELECTOR = '.post-preview';
var PROJECTS_DATA = 'projects';
var PROJECT_DATA = 'project';
// Debug to console
var DEBUG = false;

/**
 * Load data and initialise when page ready
 */
$(function () {
  var element = $(PROJECTS_SELECTOR);

  $.get('/api/projects.json', function (data) {
    if (DEBUG) {
      console.log('Successfully loaded projects data', data);
    }
    element.data(PROJECTS_DATA, data);
    initFilters(element);
    initProjects(element, data.projects);
  }).fail(function (err) {
    console.error('Error loading project data', err);
    console.log(err.responseText);
  });
});

// Setup the filter controls
function initFilters(projectsElement) {
  var title = projectsElement.find('h2');
  // Add filter trigger link
  title.append('<a class="filter-toggler collapsed" data-toggle="collapse" href="#projects-filters"><i class="fa fa-filter" aria-hidden="true"></i>Filter</a>');
  // Add filter toggleable content
  title.after('<div id="projects-filters" class="collapse"><form class="row"><div class="col-xs-12 col-sm-6"><div class="form-group"><label for="search">Search</label><input type="text" class="form-control" name="search" placeholder="Some text..." /></div><div class="form-group"><label for="tags">Tags</label><select class="form-control" multiple name="tags"><option selected value>All</option><option value="JavaScript">JavaScript</option><option value="PHP">PHP</option><option value="Java">Java</option></select></div></div><div class="col-xs-12 col-sm-6"><button class="btn btn-primary" role="submit">Update</button><a class="btn btn-secondary" onclick="resetFilters()" href="#projects-filters">Reset</a></div></form></div>');
  // Add handling on filter change
  $('#projects-filters form').on('submit', filtersUpdated);
}

// Tag each project element with its index
function initProjects(projectsElement, projects) {
  projectsElement.find(PROJECT_SELECTOR).each(function (index) {
    var thisProjectElement = $(this);
    thisProjectElement.data(PROJECT_DATA, projects[index]);
  });
}

// Filters have updated
// - Filters have been changed, update the shown projects
function filtersUpdated(event) {
  // Stop form submission refresh
  if (event) event.preventDefault();

  // Get the filters as an object
  var filters = $(this).serializeArray().reduce(function (obj, item) {
    // Don't save empty values
    if (item.value && item.value.length > 0) {
      // Property with multiple values = array
      if (!obj.hasOwnProperty(item.name)) {
        obj[item.name] = item.value;
      } else if (obj[item.name].constructor === Array) {
        obj[item.name].push(item.value);
      } else {
        obj[item.name] = [obj[item.name], item.value];
      }
    }
    return obj;
  }, {});
  var filterKeys = Object.keys(filters).filter(function (key) {
    return key !== 'search';
  });

  var projectElements = $(PROJECTS_SELECTOR + ' ' + PROJECT_SELECTOR);

  // Hide all the projects
  projectElements.hide();

  // Show project if it matches the filters
  projectElements.each(function (index) {
    var projectElement = $(this);
    var projectData = projectElement.data(PROJECT_DATA);

    if (!projectData) throw new Error('No project data for index ' + index);

    var showProject = true;

    // Handle 'search' string filter
    // - Search for the string in 'name' and 'description'
    if (filters.hasOwnProperty('search')) {
      filters.search = filters.search.toLowerCase();
      var name = projectData.name.toLowerCase(),
          description = projectData.description.toLowerCase();
      showProject = name.indexOf(filters.search) >= 0 || description.indexOf(filters.search) >= 0;
    }

    // Check each filter
    var i = 0;
    while (showProject && i < filterKeys.length) {
      var filterName = filterKeys[i];
      var filterValue = filters[filterName];
      if (filterValue.constructor === Array) {
        if (projectData[filterName].constructor === Array) {
          // Array filter value, array project value
          // - Search both arrays as OR tests
          var show = false,
              j = 0,
              k = 0;
          while (!show && k < projectData[filterName].length) {
            var _j = 0;
            while (!show && _j < filterValue.length) {
              show = projectData[filterName][k] === filterValue[_j];
              _j++;
            }
            k++;
          }
          showProject = show;
        } else {
          // Array filter value, single project value
          // - Treat array of filters as OR test
          var _show = false,
              _j2 = 0;
          while (!_show && _j2 < filterValue.length) {
            _show = projectData[filterName] === filterValue[_j2];
            _j2++;
          }
          showProject = _show;
        }
      } else {
        if (projectData[filterName].constructor === Array) {
          // Single filter value, array project value
          var _show2 = false,
              _j3 = 0;
          while (!_show2 && _j3 < projectData[filterName].length) {
            _show2 = projectData[filterName][_j3] === filterValue;
            _j3++;
          }
          showProject = _show2;
        } else {
          // Single filter value, single project value
          // - Simple equality check
          showProject = projectData[filterName] === filterValue;
        }
      }
      if (DEBUG && !showProject) {
        console.log(projectData[filterName], 'not matches filter:', filterValue);
      } else if (DEBUG) {
        console.log(projectData[filterName], 'matches filter:', filterValue);
      }
      i++;
    }

    // Show the project
    if (showProject) projectElement.show();
  });
}

// Reset filters form + projects shown
function resetFilters() {
  $('#projects-filters form')[0].reset();
  filtersUpdated();
}
//# sourceMappingURL=projects.dist.js.map
