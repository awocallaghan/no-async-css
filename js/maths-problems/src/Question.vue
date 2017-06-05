<template>
  <div :class="questionClass">
    <label for="answer">{{ question.number}}: {{ question.text }}</label>
    <input v-model="question.answer" type="text" class="form-control" />
    <div v-if="question.result.correct === false" class="has-danger">
      <strong>Correct answer:</strong> {{ question.result.answer[0] }}
    </div>
  </div>
</template>

<script>
module.exports = {
  name: 'Question',
  props: [ 'question', 'number' ],
  data: function () {
    return {
      questionClass: 'form-group'
    };
  },
  watch: {
    // Update class based on marked result
    'question.result': function (result) {
      console.log(result);
      // Not marked yet
      if (!result.hasOwnProperty('correct')) return;
      // Has been marked, update class name based on whether correct
      this.questionClass = result.correct === true ? 'form-group has-success' : 'form-group has-danger';
    }
  },
};
</script>
