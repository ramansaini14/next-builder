import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: (process.env.CORS_ORIGIN || 'http://localhost:3000')
    .split(',')
    .map((s) => s.trim()),
  jwtSecret: process.env.JWT_SECRET || 'dev_secret_change_me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  dataDir: path.resolve(__dirname, '..', process.env.DATA_DIR || 'data'),
  uploadDir: path.resolve(__dirname, '..', process.env.UPLOAD_DIR || 'uploads'),
  adminEmail: process.env.ADMIN_EMAIL || 'admin@local',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
  cookieSecure: (process.env.COOKIE_SECURE || 'false') === 'true',
};