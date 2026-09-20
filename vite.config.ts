import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function legacyServePlugin(): Plugin {
  return {
    name: 'legacy-serve-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url === '/legacy' || req.url.startsWith('/legacy/'))) {
          const urlPath = req.url.split('?')[0];
          const relativeFile = (urlPath === '/legacy' || urlPath === '/legacy/') 
            ? 'index.html' 
            : urlPath.replace(/^\/legacy\/?/, '');
          
          const diskPath = path.resolve(__dirname, 'legacy', relativeFile);

          if (fs.existsSync(diskPath) && fs.statSync(diskPath).isFile()) {
            const ext = path.extname(diskPath).toLowerCase();
            const mimeTypes: Record<string, string> = {
              '.html': 'text/html; charset=utf-8',
              '.css': 'text/css; charset=utf-8',
              '.js': 'application/javascript; charset=utf-8',
              '.json': 'application/json; charset=utf-8',
              '.png': 'image/png',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.svg': 'image/svg+xml',
              '.ico': 'image/x-icon',
              '.mp3': 'audio/mpeg',
              '.wav': 'audio/wav'
            };
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            res.end(fs.readFileSync(diskPath));
            return;
          }
        }
        next();
      });
    },
    closeBundle() {
      const srcDir = path.resolve(__dirname, 'legacy');
      const destDir = path.resolve(__dirname, 'dist', 'legacy');
      if (fs.existsSync(srcDir)) {
        fs.cpSync(srcDir, destDir, { recursive: true });
        console.log('Copied legacy/ to dist/legacy/ for production.');
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), legacyServePlugin()],
  server: {
    port: 3000,
    open: false,
  },
});
