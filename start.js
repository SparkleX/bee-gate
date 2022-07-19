const Koa = require("koa");
const koaLogger = require("koa-logger");
const koaBetterHttpProxy = require("koa-better-http-proxy");
const koaMount = require("koa-mount");

function main() {
	const bee_api_url = "http://localhost:3002";
	const bee_ui_url = "http://localhost:3001";

	const app = new Koa();
	app.use(koaLogger());

	let u = new URL(bee_ui_url);
	app.use(koaMount("/ui", koaBetterHttpProxy(u.hostname, {
		port: u.port
	})));

	u = new URL(bee_api_url);
	app.use(koaMount("/api", koaBetterHttpProxy(u.hostname, {
		port: u.port
	})));
	
	const port = process.env.PORT || 3000;
	app.listen(port);
	console.info(`Server start on port ${port}`);
}
main();



/*

function proxyInit (url) {
	const u = new URL(url);
	proxyCallback = proxy(u.hostname, {
		port: Number.parseInt(u.port),
		https: u.protocol == "https:",
		proxyReqPathResolver: function (ctx) {
			return "/b1s" + ctx.url;
		},
		proxyReqOptDecorator: function (proxyReqOpts, originalReq) {
			//(proxyReqOpts as any).rejectUnauthorized = false;
			return proxyReqOpts;
		}
	});
}
async function svclProxy(ctx, next) {
	await proxyCallback(ctx, next);
	return null;
}

*/