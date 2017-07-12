'use strict';

/**
 * Initialise the video tracker
 */

var tracker = new window.tracker({
  debug: true,
  token: "11c9af04-bc31-4390-a4af-c9f258cc1d3b",
  events: ["loadedmetadata", "play", "pause", "seeking", "seeked", "volumechange", "timeupdate"],
  data: {
    url: "//video-analytics.herokuapp.com/log",
  },
});
tracker.init();
window.tracker = tracker;
