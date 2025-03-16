import { defineConfig } from '@hey-api/openapi-ts';
require('dotenv').config();
export default defineConfig({
	input: process.env.PUBLIC_API_HOST + '/api-json',
	output: {
		path: 'src/lib/generated/client',
		format: 'prettier',
		lint: 'eslint'
	},
	plugins: ['@hey-api/client-axios']
});
