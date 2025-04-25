const httpInstance = require('http');
const httpStatusInstance = require('http-status-codes');
const fs = require('fs');
const path = require('path');
const url = require('url');
const portNumber = 8080;
let i = 0;

const httpServer = httpInstance.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const pathname = parsedUrl.pathname;
	let contentType = getContentType(pathname);
	let filePath = path.join(__dirname, pathname);

	console.log(
		`file ${fs.existsSync(filePath) ? 'exists' : 'does not exist'}`,
		filePath,
		i++,
	);

	if (req.url == '/') {
		filePath += 'index.html';
		contentType = 'text/html';
	} else if (!fs.existsSync(filePath)) {
		filePath = __dirname + '\\dummy.txt';
		contentType = 'text/plain';
	}

	readFile(filePath, contentType, res);
});

function getContentType(filePath) {
	const extname = path.extname(filePath);
	switch (extname) {
		case '.html':
		case '.htm':
			return 'text/html';
		case '.css':
			return 'text/css';
		case '.js':
		case '.mjs':
			return 'text/javascript';
		case '.csv':
			return 'text/csv';
		case '.txt':
			return 'text/plain';
		case '.json':
			return 'application/json';
		case '.xhtml':
			return 'application/xhtml+xml';
		case '.xml':
			return 'application/xml';
		case '.ico':
			return 'image/vnd.microsoft.icon';
		case '.jpg':
		case '.jpeg':
			return 'image/jpeg';
		case '.png':
			return 'image/png';
		case '.gif':
			return 'image/gif';
		case '.webp':
			return 'image/webp';
		case '.svg':
			return 'image/svg+xml';
		case '.apng':
			return 'image/apng';
		case '.avif':
			return 'image/avif';
		case '.bmp':
			return 'image/bmp';
		case '.tiff':
		case '.tif':
			return 'image/tiff';
		case '.mp4':
			return 'video/mp4';
		case '.ts':
			return 'video/mp2t';
		case '.avi':
			return 'video/x-msvideo';
		case '.webm':
			return 'video/webm';
		case '.mpeg':
			return 'video/mpeg';
		case '.ogv':
			return 'video/ogg';
		case '.aac':
			return 'audio/aac';
		case '.mp3':
			return 'audio/mpeg';
		case '.wav':
			return 'audio/wav';
		case '.weba':
			return 'audio/webm';
		case '.oga':
		case '.opus':
			return 'audio/ogg';
		case '.ttf':
			return 'font/ttf';
		case '.otf':
			return 'font/otf';
		case '.woff':
			return 'font/woff';
		case '.woff2':
			return 'font/woff2';
		default:
			return 'application/octet-stream';
	}
}

function readFile(file_path, contentType, res) {
	if (fs.existsSync(file_path)) {
		res.writeHead(httpStatusInstance.StatusCodes.OK, {
			'Content-Type': contentType,
		});
		fs.readFile(file_path, (error, data) => {
			if (error) {
				handleError(res);
				return;
			}
			res.write(data);
			res.end();
		});
	} else {
		readFile(__dirname + '\\404.html', 'text/html', res);
	}
}

const handleError = (res) => {
	console.log('errored');
};

httpServer.listen(portNumber, () => {
	console.log(`Server is listening on port ${portNumber}`);
});
