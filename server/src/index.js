import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';
import { initStorage, seedAdmin } from './utils/db.js';
import authRoutes from './routes/auth.js';
import pageRoutes from './routes/pages.js';
import uploadRoutes from './routes/uploads.js';
import { errorHandler } from './middleware/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function start() {
  await initStorage();
  await seedAdmin();

  const app = express();
  app.use(cors({ origin: config.corsOrigin, credentials: true }));
  app.use(cookieParser());
  app.use(express.json({ limit: '5mb' }));
  app.use('/uploads', express.static(path.resolve(config.uploadDir)));

  app.get('/health', (req, res) => res.json({ ok: true }));

  app.use('/api/auth', authRoutes);
  app.use('/api/pages', pageRoutes);
  app.use('/api/uploads', uploadRoutes);

  app.use(errorHandler);

  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`[server] listening on http://localhost:${config.port}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});