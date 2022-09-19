<script setup lang="ts">
import { analyseArticle } from '@parser/md-parser'
import { onMounted, ref } from 'vue'
import test from './assets/test.md?raw'
import '@monoparser/md-parser/default.css'
// import '@monoparser/md-parser/reset.css'

const html = ref()
onMounted(() => {
  html.value = analyseArticle(test).contentHTML
})
</script>

<template>
  <div v-html="html"></div>
  <ol>
    <li>第一句</li>
    <li>第二句</li>
    <li>第三句</li>
    <li>第四局</li>
  </ol>
</template>
