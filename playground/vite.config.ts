import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { alias } from '../alias'

export default defineConfig({
  plugins: [Vue()],
  resolve: {
    alias,
  },
})
