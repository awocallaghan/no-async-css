<template>
  <div>
    <h3>Problem {{ number }}</h3>
    <div class="form-group">
      <label for="question">Question</label>
      <textarea v-model="problem.question" class="form-control"></textarea>
    </div>
    <div class="form-group">
      <label for="answer">Answer formula</label>
      <input v-model="problem.answer[0]" type="text" class="form-control" />
    </div>
    <div class="form-group">
      <label for="answerFormat">Answer format</label>
      <input v-model="problem.answerFormat" type="text" class="form-control" />
    </div>
    <div class="form-group">
      <label for="count">Number of questions</label>
      <input v-model="problem.count" type="number" class="form-control" />
    </div>
  </div>
</template>

<script>
module.exports = {
  name: 'Problem',
  props: [ 'problem', 'number' ],
};
</script>
