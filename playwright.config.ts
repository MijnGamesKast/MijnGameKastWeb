import { defineConfig } from '@playwright/test';
import "dotenv/config";

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	testMatch: '**/*.test.ts'
});
