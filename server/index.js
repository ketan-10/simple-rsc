import { createElement } from 'react';
import fs from 'node:fs';
import * as ReactServerDom from 'react-server-dom-webpack/server.browser';
import { readClientComponentMap, resolveClientDist, resolveServerDist } from './utils.js';

/** @type {import('@hattip/core').HattipHandler} */
export async function handler(context) {
	const { pathname, searchParams } = new URL(context.request.url);
	if (pathname === '/') {
		const html = await fs.promises.readFile(
			new URL('./templates/index.html', import.meta.url),
			'utf-8'
		);
		return new Response(html, {
			headers: { 'Content-type': 'text/html' }
		});
	}
	const searchParamsObject = Object.fromEntries(searchParams);
	if (pathname === '/rsc') {
		const App = await import(
			resolveServerDist(
				`page.js${
					// Invalidate cached module on every request in dev mode
					// WARNING: can cause memory leaks for long-running dev servers!
					process.env.NODE_ENV === 'development' ? `?invalidate=${Date.now()}` : ''
				}`
			).href
		);
		// `bundleMap.json` is generated by the build step.
		// This is run on server startup and on `app/` or `db/` file changes.
		// @see './build.js'
		const clientComponentMap = await readClientComponentMap();

		const ServerRoot = App.default;
		const stream = ReactServerDom.renderToReadableStream(
			createElement(ServerRoot, searchParamsObject),
			clientComponentMap
		);
		return new Response(stream, {
			// "Content-type" based on https://github.com/facebook/react/blob/main/fixtures/flight/server/global.js#L159
			headers: { 'Content-type': 'text/x-component' }
		});
	}
	return new Response('Not found', { status: 404 });
}

/** @type {import('@hattip/compose').RequestHandler} */
export async function clientAssetsMiddleware(context) {
	// Serve static JS assets in `dist/client/`
	const { pathname } = new URL(context.request.url);
	if (pathname.startsWith('/dist/client/') && pathname.endsWith('.js')) {
		const filePath = pathname.replace('/dist/client/', '');
		const contents = await fs.promises.readFile(resolveClientDist(filePath), 'utf-8');
		return new Response(contents, {
			headers: {
				'Content-Type': 'application/javascript'
			}
		});
	}
}