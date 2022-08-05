const functions = require("firebase-functions");
const admin = require("firebase-admin");
const next = require("next");

admin.initializeApp();

const app = next({ dev: true, conf: { distDir: ".next" } });
const handle = app.getRequestHandler();

exports.server = functions.region("asia-east2").https.onRequest((req, res) => {
    return app.prepare().then(() => handle(req, res));
});
