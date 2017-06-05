'use strict';

/**
 * Filter through project data
 * @author Alex O'Callaghan
 */

const PROJECTS_SELECTOR = '#projects';
const PROJECT_SELECTOR = '.post-preview';
const PROJECT_FILTERS_SELECTOR = '#projects-filters';
const PROJECT_FILTERS_HTML = '/html/project-filters.html';
const PROJECT_FILTERS_NUM_TYPES = 3; // number of project types
const PROJECTS_COUNT_SELECTOR = '#projects-count';
const PROJECTS_DATA = 'projects';
const PROJECT_DATA = 'project';
// Debug to console
const DEBUG = false;

/**
 * Load data and initialise when page ready
 */
$(function () {
  let element = $(PROJECTS_SELECTOR);

  $.get('/api/projects.json', function (data) {
    // Last project in array is an empty {}
    data.projects = data.projects.slice(0, data.projects.length - 1);
    if (DEBUG) {
      console.log('Successfully loaded projects data', data);
    }
    element.data(PROJECTS_DATA, data);
    initFilters(element, data.projects);
    initProjects(element, data.projects);
    initProjectCount(element, data.projects);
  }).fail(function (err) {
    console.error('Error loading project data', err);
    console.log(err.responseText);
  });
});

// Setup the filter controls
function initFilters (projectsElement, projects) {
  let title = projectsElement.find('h2');
  $.get(PROJECT_FILTERS_HTML, function (html) {
    // Add filter trigger link
    title.append('<a class="filter-toggler collapsed" data-toggle="collapse" href="#projects-filters"><i class="fa fa-filter" aria-hidden="true"></i>Filter</a>');
    // Add filter toggleable content
    title.after(html);
    // Add handling on filter change
    $('#projects-filters form').on('submit', filtersUpdated);
  }).fail(function (err) {
    console.error('Unable to get project filters template', err);
  });
}

// Tag each project element with its index
function initProjects (projectsElement, projects) {
  projectsElement.find(PROJECT_SELECTOR).each(function (index) {
    let thisProjectElement = $(this);
    thisProjectElement.data(PROJECT_DATA, projects[index]);
  });
}

// Filters have updated
// - Filters have been changed, update the shown projects
function filtersUpdated (event) {
  // Stop form submission refresh
  if (event) event.preventDefault();

  // Get the filters as an object
  let filters = $(this).serializeArray().reduce(function(obj, item) {
    // Don't save empty values
    if (item.value && item.value.length > 0) {
      // Property with multiple values = array
      if (!obj.hasOwnProperty(item.name)) {
        // Simply store value if doesn't exist
        obj[item.name] = item.value;
      } else if (obj[item.name].constructor === Array) {
        // Add value to array if there's an existing array
        obj[item.name].push(item.value);
      } else {
        // Create an array if existing single value
        obj[item.name] = [ obj[item.name], item.value ];
      }
    }
    return obj;
  }, {});

  // Check if all types are enabled, if so don't bother filtering by type
  if (filters.hasOwnProperty('type') && filters.type.length === PROJECT_FILTERS_NUM_TYPES) {
    delete filters.type;
  }

  // Create array of filter keys minus 'search' filter
  let filterKeys = Object.keys(filters).filter(function (key) {
    return key !== 'search';
  });

  let projectElements = $(PROJECTS_SELECTOR + ' ' + PROJECT_SELECTOR);

  // Hide all the projects
  projectElements.hide();

  // Count how many projects we show
  let projectCount = 0;

  // Show project if it matches the filters
  projectElements.each(function (index) {
    let projectElement = $(this);
    let projectData = projectElement.data(PROJECT_DATA);

    if (!projectData) throw new Error(`No project data for index ${index}`);

    let showProject = true;

    // Handle 'search' string filter
    // - Search for the string in 'name' and 'description'
    if (filters.hasOwnProperty('search')) {
      filters.search = filters.search.toLowerCase();
      let name = projectData.name.toLowerCase(),
          description = projectData.description.toLowerCase();
      showProject = name.indexOf(filters.search) >= 0 ||
                    description.indexOf(filters.search) >= 0;
    }

    // Check each filter
    let i = 0;
    while (showProject && i < filterKeys.length) {
      let filterName = filterKeys[i];
      let filterValue = filters[filterName];
      if (filterValue.constructor === Array) {
        if (projectData[filterName].constructor === Array) {
          // Array filter value, array project value
          // - Search both arrays as OR tests
          let show = false,
              j = 0,
              k = 0;
          while (!show && k < projectData[filterName].length) {
            let j = 0;
            while (!show && j < filterValue.length) {
              show = projectData[filterName][k] === filterValue[j];
              j++;
            }
            k++;
          }
          showProject = show;
        } else {
          // Array filter value, single project value
          // - Treat array of filters as OR test
          let show = false,
              j = 0;
          while (!show && j < filterValue.length) {
            show = projectData[filterName] === filterValue[j];
            j++;
          }
          showProject = show;
        }
      } else {
        if (projectData[filterName].constructor === Array) {
          // Single filter value, array project value
          let show = false,
            j = 0;
          while (!show && j < projectData[filterName].length) {
            show = projectData[filterName][j] === filterValue;
            j++;
          }
          showProject = show;
        } else {
          // Single filter value, single project value
          // - Simple equality check
          showProject = projectData[filterName] === filterValue;
        }
      }
      if (DEBUG && !showProject) {
        console.log(projectData[filterName], 'does not match filter:', filterValue);
      } else if (DEBUG) {
        console.log(projectData[filterName], 'matches filter:', filterValue);
      }
      i++;
    }

    // Show the project
    if (showProject) {
      projectElement.show();
      projectCount += 1;
    }

    // Update shown projects count
    if (index === projectElements.length - 1) {
      updateProjectCount(projectCount);
    }
  });
}

// Reset filters form + projects shown
function resetFilters () {
  $(PROJECT_FILTERS_SELECTOR + ' form')[0].reset();
  filtersUpdated();
}

// Init project count text
function initProjectCount (element, projects) {
  element.find(PROJECT_FILTERS_SELECTOR).after('<span id="projects-count"></span>');
  updateProjectCount(projects.length);
}

// Update project count text
function updateProjectCount (count) {
  $(PROJECTS_COUNT_SELECTOR).text(`Showing ${count} project${count !== 1 ? 's' : ''}:`);
}
