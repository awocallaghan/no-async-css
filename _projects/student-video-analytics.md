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
---
# Project summary

In completion of BSc Computer Science at [University of Southampton](https://southampton.ac.uk) I completed an individual project in which I designed and implemented a web service for university lecturers to view how students are watching their video content. Online video lectures are the most common medium used by MOOCs and for a "Flipped Learning" approach. With support growing for these teaching methods I identified the need for a tool to aid these instructors by providing them with student video usage information. Lecturers can view how students have watched their video content by accessing D3 (Data-Driven Documents) data visualisations, seeing how much of the video they have watched and how they interacted with the video player.

# Technology

The system records student video interactions by tracking and logging DOM events emitted by HTMLVideoElements. The tracker is in the form of a JavaScript file that can be embedded in a HTML document and initialised with configuration values to determine what is tracked and where it is logged.

The backend logging server is a Node.js web application using the Express framework. It stores logged student sessions in a RethinkDB database and provides a analytics dashboard for lecturers. This dashboard includes Vue.js + D3 components that provide visualisations of the recorded sessions.
# Report

You can read the full 10,000 word report on the research, design, and development behind this project [here]().
