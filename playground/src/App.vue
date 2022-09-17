<script setup lang="ts">
import { analyseArticle } from '@parser/md-parser'
import { onMounted, ref } from 'vue'
import test from './assets/test.md?raw'

const html = ref()
onMounted(() => {
  html.value = analyseArticle(test).contentHTML
})
</script>

<template>
  <div v-html="html"></div>
</template>
