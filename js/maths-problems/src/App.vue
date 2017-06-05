<template>
  <div id="app" class="row">
    <div class="col-12 col-md-6">
      <h2>Problem templates</h2>
      <problem :problem="problem"></problem>
      <button class="btn btn-primary" v-on:click="generateQuestions">Generate questions</button>
    </div>
    <div class="col-12 col-md-6">
      <h2>Generated questions</h2>
      <span v-if="questions.length === 0">No questions generated</span>
      <div v-else id="questions">
        <a href="#questions" v-on:click="toggleRawQuestions">{{ toggleText }}</a>
        <div v-if="showRawQuestions === true">{{ this.questions }}</div>
        <question v-for="question in questions" :question="question"></question>
      </div>
      <button class="btn btn-primary" v-on:click="markQuestions">Mark answers</button>
      <div v-if="mark !== null">Correct: {{ mark.mark }} / {{ mark.total }}</div>
    </div>
  </div>

</template>

<script>
const Problem = require('./Problem.vue');
const Question = require('./Question.vue');

const problems = require('maths-problems');

module.exports = {
  name: 'MathsProblemsApp',
  components: {
    'problem': Problem,
    'question': Question,
  },
  data: function () {
    return {
      problem: {
        number: 1,
        question: 'What is {x=randomInt(1,10)} + {y=randomInt(1,10)}?',
        answer: ['{x}+{y}'],
        answerFormat: "0",
        count: 1,
      },
      showRawQuestions: false,
      questions: [],
      mark: null,
    };
  },
  computed: {
    // Text to show in toggle link
    toggleText: function () {
      return this.showRawQuestions === false ? 'Show JSON questions' : 'Hide';

    },
  },
  methods: {
    // Generate questions from problem schema
    generateQuestions: function () {
      let questions = problems.generateQuestions([this.problem], [this.problem.count]).map(function (question, index) {
        question.number = index + 1;
        question.result = {};
        return question;
      });
      console.log(questions);
      this.questions = questions;
      this.mark = null;
    },
    // Mark generated questions
    markQuestions: function () {
      let mark = { mark: 0, total: 0 };
      for (let i = 0; i < this.questions.length; i++) {
        // Attach answer to question
        let question = this.questions[i];
        question.userAnswer = [question.answer];
        // Mark the question
        let result = problems.markQuestion(question, this.problem);
        // Save marking result to question
        question.result = result;
        this.questions[i] = question;
        // Increment total mark
        mark.total += 1;
        if (result.correct) {
          mark.mark += 1;
        }
      }
      // Set mark property
      this.mark = mark;
    },
    // Toggle display of the array of JSON question objects
    toggleRawQuestions: function () {
      this.showRawQuestions = !this.showRawQuestions;
    },
  }
};
</script>
