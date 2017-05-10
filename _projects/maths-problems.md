---
name: maths-problems.js
description: npm package for generating and marking random maths questions
tags: ['JavaScript','NodeJS','Maths','Babel']
date: 11/12/2015
sections:
  - link: "#project-summary"
    title: Project summary
  - link: "#methods"
    title: Methods
  - link: "#problems"
    title: Problems
  - link: "#questions"
    title: Questions
---
# Project summary

maths-problems is an [npm module](https://www.npmjs.com/package/maths-problems) that allows you to generate random maths questions with answers that can be validated. The source code is available on [GitHub](https://github.com/awocallaghan/maths-problems).

# Methods

**generateQuestions (**_[problems]_, _[numbers]_**)**

_[problems_] => an array of problems to use to generate questions.

_[numbers]_ => an array of integers defining how many questions to generate for each problem.

**Returns** _[questions]_ an array of generated questions.

_Example:_

```js
    var problems = require('maths-problems');

    var additionProblem = {
      "question" : "What is {x=randomInt(1,10)} + {y=randomInt(1,10)}?",
      "answer" : ["{x}+{y}"],
      "answerFormat" : "0"
    };
    var subtractionProblem = {
      "question" : "What is {x=randomInt(1,10)} - {y=randomInt(1,10)}?",
      "answer" : ["{x}-{y}"],
      "answerFormat" : "0"
    };

    // Generate 5 addition questions and 5 subtraction questions
    var questions = problems.generateQuestions([additionProblem, subtractionProblem], [5,5]);
```

**markQuestion (**_question_, _problem_**)**

_question_ => the question object with an extra field - an array called "userAnswer" containing the user's answer for each part of the question
_problem_ => the problem used to generate the question

**Returns** a  _[result]_ object with a boolean property "correct" and an array "answer" containing the correct answers.

_Example:_

```js
    var questions = problems.generateQuestions([additionProblem, subtractionProblem], [5,5]);
    // Continuing from previous generate example

    ... obtain an answer from the user and store it in question.userAnswer[] ...

    // For example marking an additionProblem
    var result = problems.markQuestion(question, additionProblem);
    if (result.correct) {
      console.log("Correct!");
    } else {
      console.log("Incorrect! Correct answer: " + result.answer[0]);
    }
```

# Problems

```js
    problemSchema = {
      "question" : "What is {x=randomInt(1,10)} + {y=randomInt(1,10)}?",
      "answer" : ["{x}+{y}"],
      "answerFormat" : "0"
    }
```

**question** = The question text that will appear to the student after replacing variables (declared within curly brackets {}) with numeric values returned by the [mathjs](http://mathjs.org) function.

**answer** = The answer field is an array of strings representing formulas to calculate the answer to each part of the question. Variables can be referenced by their name within curly brackets ({}).

**answerFormat** = Format the answer should be written in where each integer refers to an index in the _answers_ array. For example, "0" => the value of "{x}+{y}" after evaluated. We can use this to add units or algebraic variables eg. "0 cm" or "0x".

# Questions

Problems are used to generate questions, an example Question object:

```js
    questionSchema = {
        "text" : "What is 5 + 4?",
        "variables" :
          [{
            "name":"x",
            "value": 5
          },
          {
            "name":"y",
            "value":4
          }]
    }
```

**text** = The actual question text to show to the student. A Problem's _question_ with variable values added.

**variables** = An array of variables each with a name and value. In this case the value is the output of the mathjs function _randomInt(1,10)_.
