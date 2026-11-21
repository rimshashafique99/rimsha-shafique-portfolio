import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleContactRequest } from './api/_lib/contact';

// Load .env.local first (if present), then .env so local Resend credentials work automatically
dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.set('trust proxy', true);
  app.use(express.json({ limit: '32kb' }));

  // Clean JSON parse error handler so malformed requests never return HTML stack traces
  app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && 'status' in err && (err as { status?: number }).status === 400) {
      res.status(400).json({ ok: false, error: 'Invalid JSON payload.' });
      return;
    }
    next(err);
  });

  // Serve resume PDF directly with verified Content-Type and anti-cache headers
  app.get('/Rimsha-Shafique-Resume.pdf', (_req: Request, res: Response) => {
    const candidates = [
      path.resolve(__dirname, 'public', 'Rimsha-Shafique-Resume.pdf'),
      path.resolve(__dirname, 'dist', 'Rimsha-Shafique-Resume.pdf'),
    ];
    const pdfPath = candidates.find((candidate) => fs.existsSync(candidate));

    if (!pdfPath) {
      res.status(404).type('text/plain').send('Resume PDF not found.');
      return;
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="Rimsha-Shafique-Resume.pdf"');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.sendFile(pdfPath);
  });

  // Serve SEO crawl files explicitly with accurate Content-Type before SPA middleware fallback
  app.get('/robots.txt', (_req: Request, res: Response) => {
    const candidates = [
      path.resolve(__dirname, 'public', 'robots.txt'),
      path.resolve(__dirname, 'dist', 'robots.txt'),
    ];
    const robotsPath = candidates.find((candidate) => fs.existsSync(candidate));
    if (!robotsPath) {
      res.status(404).type('text/plain').send('Not found');
      return;
    }
    res.type('text/plain; charset=utf-8').sendFile(robotsPath);
  });

  app.get('/sitemap.xml', (_req: Request, res: Response) => {
    const candidates = [
      path.resolve(__dirname, 'public', 'sitemap.xml'),
      path.resolve(__dirname, 'dist', 'sitemap.xml'),
    ];
    const sitemapPath = candidates.find((candidate) => fs.existsSync(candidate));
    if (!sitemapPath) {
      res.status(404).type('text/plain').send('Not found');
      return;
    }
    res.type('application/xml; charset=utf-8').sendFile(sitemapPath);
  });

  // Server-side contact form endpoint
  app.all('/api/contact', async (req: Request, res: Response) => {
    await handleContactRequest(req, res);
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      const indexFile = path.join(distPath, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
