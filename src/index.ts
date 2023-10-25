/**
 * import type { PartytownConfig } from '@builder.io/partytown/integration';
 * import { partytownSnippet } from '@builder.io/partytown/integration';
 * import { copyLibFiles, libDirPath } from '@builder.io/partytown/utils';
 *
 * @format
 */

import type { AstroIntegration } from 'astro';
/*
import { createRequire } from 'module';
import * as fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const resolve = createRequire(import.meta.url).resolve;
*/

export type SimpleAnalyticsOptions = {
	allEnvironments?: boolean;
	collectDNT?: boolean;
	customDomain?: string;
	customHostname?: string;
	ignorePages?: string;
	light?: boolean;
	nonUniqueHostnames?: string;
	partytown?: boolean;
};

function appendForwardSlash(str: string) {
	return str.endsWith('/') ? str : str + '/';
}

function simpleAnalyticsSnippet(options?: SimpleAnalyticsOptions) {
	return 'yy' + JSON.stringify(options);
}

export default function createPlugin(options?: SimpleAnalyticsOptions): AstroIntegration {
	let simpleAnalyticsSnippetHtml: string = appendForwardSlash('x');
	// const simpleAnalyticsEntrypoint = resolve('@builder.io/simpleAnalytics/package.json');
	// const simpleAnalyticsLibDirectory = path.resolve(simpleAnalyticsEntrypoint, '../lib');
	return {
		name: 'astro-simpleanalytics-plugin',
		hooks: {
			'astro:config:setup': ({ config: _config, command, injectScript }) => {
				/*
				const lib = `${appendForwardSlash(_config.base)}~simpleanalytics/`;
				const simpleAnalyticsConfig = {
					...options?.config,
					lib,
					debug: options?.config?.debug ?? command === 'dev',
				};
				*/
				console.log(_config, command);
				simpleAnalyticsSnippetHtml = simpleAnalyticsSnippet(options);
				injectScript('page', simpleAnalyticsSnippetHtml);
			},
			/*
			'astro:build:done': async ({ dir }) => {
				await copyLibFiles(fileURLToPath(new URL('~simpleanalytics', dir)), {
					debugDir: options?.config?.debug ?? false,
				});
			},
			'astro:build:ssr': async ({ manifest }) => {
				const dirpath = libDirPath({ debugDir: false });
				const files = await fs.promises.readdir(dirpath);
				for (const file of files) {
					if (file === 'debug') continue;
					manifest.assets.push(`/~simpleanalytics/${file}`);
				}
			},
			*/
		},
	};
}
