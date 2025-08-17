import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { config } from '../config.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

if (!fs.existsSync(config.uploadDir)) {
  fs.mkdirSync(config.uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const unique = `${base}-${Date.now()}${ext}`;
    cb(null, unique);
  },
});

const upload = multer({ storage });

router.post('/', requireAuth, upload.array('files', 10), (req, res) => {
  const files = (req.files || []).map((f) => ({
    filename: f.filename,
    originalname: f.originalname,
    size: f.size,
    mimetype: f.mimetype,
    url: `/uploads/${f.filename}`,
  }));
  res.json({ files });
});

export default router;