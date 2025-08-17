import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { requireAuth } from '../middleware/auth.js';
import { loadPages, savePages } from '../utils/db.js';

const router = Router();

function slugify(input) {
  return String(input || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

router.get('/', async (req, res) => {
  const pages = await loadPages();
  res.json(pages);
});

router.get('/:slug', async (req, res) => {
  const pages = await loadPages();
  const page = pages.find((p) => p.slug === req.params.slug);
  if (!page) return res.status(404).json({ error: 'Not found' });
  res.json(page);
});

router.post('/', requireAuth, async (req, res) => {
  const { title, slug, blocks = [], meta = {} } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const pages = await loadPages();
  const finalSlug = slug?.trim() || slugify(title);
  if (pages.some((p) => p.slug === finalSlug)) {
    return res.status(409).json({ error: 'Slug already exists' });
  }
  const page = {
    id: uuid(),
    title,
    slug: finalSlug,
    blocks,
    meta,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  pages.push(page);
  await savePages(pages);
  res.status(201).json(page);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, slug, blocks, meta } = req.body;
  const pages = await loadPages();
  const index = pages.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  const next = { ...pages[index] };
  if (title !== undefined) next.title = title;
  if (slug !== undefined) next.slug = slugify(slug);
  if (blocks !== undefined) next.blocks = blocks;
  if (meta !== undefined) next.meta = meta;
  next.updatedAt = new Date().toISOString();
  if (pages.some((p, i) => i !== index && p.slug === next.slug)) {
    return res.status(409).json({ error: 'Slug already exists' });
  }
  pages[index] = next;
  await savePages(pages);
  res.json(next);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const pages = await loadPages();
  const index = pages.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  const removed = pages.splice(index, 1)[0];
  await savePages(pages);
  res.json(removed);
});

export default router;