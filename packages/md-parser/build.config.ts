import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/bodyParser',
    'src/headerParser',
    'src/parser',
    'src/types.ts',
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
