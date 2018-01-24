---
title: Student video analytics
description: Vue.js/D3 data visualisation to aid university lecturers
tags: ['JavaScript', 'Node.js', 'Vue.js', 'D3', 'Express', 'RethinkDB']
type: edu
date: 02/04/2017
sections:
 - link: "#project-summary"
   title: Project summary
 - link: "#technology"
   title: Technology
 - link: "#live-version"
   title: Live version
 - link: "#images"
   title: Images
carouselImages:
  - src: /img/projects/student-video-analytics/session-timeline-graph.png
    alt: Timeline of student video watching session
    title: Video watching timeline
    text: Timeline of events during student video watching session
  - src: /img/projects/student-video-analytics/confused-histogram.png
    alt: Histogram of confused events occurrence throughout video
styles:
 - http://vjs.zencdn.net/5.8.8/video-js.css
 - https://video-analytics.herokuapp.com/css/confusedbutton.video.css
externalScripts:
 - https://video-analytics.herokuapp.com/js/tracker.min.js
 - http://vjs.zencdn.net/5.17.0/video.js
 - https://video-analytics.herokuapp.com/js/confusedbutton.video.js
scripts: /js/video-analytics/init-tracker.js
---
## Project summary

In completion of BSc Computer Science at [University of Southampton](https://southampton.ac.uk) I completed an individual project in which I designed and implemented a web service for university lecturers to view how students are watching their video content. Online video lectures are the most common medium used by MOOCs and for a "Flipped Learning" approach. With support growing for these teaching methods I identified the need for a tool to aid these instructors by providing them with student video usage information. Lecturers can view how students have watched their video content by accessing D3 (Data-Driven Documents) data visualisations, seeing how much of the video they have watched and how they interacted with the video player.

## Technology

The system records student video interactions by tracking and logging DOM events emitted by HTMLVideoElements. The tracker is in the form of a JavaScript file that can be embedded in a HTML document and initialised with configuration values to determine what is tracked and where it is logged.

The backend logging server is a Node.js web application using the Express framework. It stores logged student sessions in a RethinkDB database and provides a analytics dashboard for lecturers. This dashboard includes Vue.js + D3 components that provide visualisations of the recorded sessions.

## Live version

The web application is deployed on [Heroku](https://heroku.com) and accessible [here](https://video-analytics.herokuapp.com). You can login using a demo account (email: demo@example.com, password: 123456) to view logged data from the below video. Try playing through the video and see how your interactions are logged to the analytics dashboard (remember to disable any ad blockers).

<video id="video-player" class="video-js" controls preload="auto" width="640" height="360">
  <source src="/videos/secrets-x-chromosome.mp4"></source>
  <p class="vjs-no-js">
    To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
  </p>
</video>
