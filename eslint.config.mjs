import { defineConfig, globalIgnores } from 'eslint/config'
import nextConfig from 'eslint-config-next'
import eslintConfigPrettier from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const eslintConfig = defineConfig([
  ...nextConfig,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      // 'react/jsx-no-literals': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
    'dist/**',
    'public/**',
  ]),
  eslintConfigPrettier,
])

export default eslintConfig
