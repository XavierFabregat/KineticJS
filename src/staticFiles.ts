// Import necessary modules
import fs, { read } from 'fs';
import path from 'path';
import { KineticRequest, Middleware } from './types';

// Static file serving middleware
export function staticFiles(directory: string): Middleware {
  return (req, res, next) => {
    if (isFileRequest(req)) {
      const requestedPath = decodeURI(req.url || '/');
      const filePath = path.join(directory, requestedPath);

      fs.stat(filePath, (err, stats) => {
        if (!err && stats.isFile()) {
          // Determine the content type based on the file extension
          const ext = path.extname(filePath).toLowerCase();
          const contentType = getContentType(ext);

          res.writeHead(200, { 'Content-Type': contentType });
          console.log('Hello');

          fs.readFile(filePath, (err, data) => {
            console.log(filePath, 'inside read');
            if (err) {
              console.log(res);
              return res.end(err.message);
            }
            console.log(data);
            return res.end(data);
          });
        } else if (!err && stats.isDirectory()) {
          // Optionally, serve index.html for directory requests
          const indexPath = path.join(filePath, 'index.html');
          fs.stat(indexPath, (err, stats) => {
            if (!err && stats.isFile()) {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              fs.createReadStream(indexPath).pipe(res);
            } else {
              next();
            }
          });
        } else {
          console.log(err);
          throw new Error(err?.message);
        }
      });
    } else {
      next();
    }
  };
}

function isFileRequest(req: KineticRequest) {
  const requestedPath = decodeURI(req.url || '/');
  console.log(requestedPath);
  return requestedPath.includes('.') || requestedPath === '/';
}

// Helper function to determine content type
function getContentType(ext: string): string {
  const mimeTypes: { [key: string]: string } = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    // Add more MIME types as needed
  };
  return mimeTypes[ext] || 'application/octet-stream';
}
