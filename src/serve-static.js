const fs = require("fs");
const path = require("path");

const mimeType = {
	".ico": "image/x-icon",
	".html": "text/html",
	".js": "text/javascript",
	".css": "text/css",
	".png": "image/png",
	".jpg": "image/jpeg",
	".eot": "aplication/vnd.ms-fontobject",
	".ttf": "aplication/font-sfnt",
};

const serveStatic = (req, res) => {
	const ext = path.parse(req.url).ext;
	const publickPath = path.join(__dirname, "../public");
	if (Object.keys(mimeType).includes(ext)) {
		fs.readFile(`${publickPath}${req.url}`, (err, data) => {
			if (err) {
				res.statusCode = 400;
				res.end("Not Found");
			} else {
				res.stsatusCode = 200;
				res.setHeader("Content-Type", mimeType[ext]);
				res.end(data);
			}
		});
	}
};

module.exports = serveStatic;
