import fs from 'fs';
import { promises as fsp } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { config } from '../config.js';

const usersFile = path.join(config.dataDir, 'users.json');
const pagesFile = path.join(config.dataDir, 'pages.json');

async function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    await fsp.mkdir(dirPath, { recursive: true });
  }
}

async function ensureFileExists(filePath, defaultData) {
  if (!fs.existsSync(filePath)) {
    await fsp.writeFile(filePath, JSON.stringify(defaultData, null, 2));
  }
}

export async function initStorage() {
  await ensureDirExists(config.dataDir);
  await ensureDirExists(config.uploadDir);
  await ensureFileExists(usersFile, []);
  await ensureFileExists(pagesFile, []);
}

export async function loadUsers() {
  const data = await fsp.readFile(usersFile, 'utf-8');
  return JSON.parse(data);
}

export async function saveUsers(users) {
  await fsp.writeFile(usersFile, JSON.stringify(users, null, 2));
}

export async function loadPages() {
  const data = await fsp.readFile(pagesFile, 'utf-8');
  return JSON.parse(data);
}

export async function savePages(pages) {
  await fsp.writeFile(pagesFile, JSON.stringify(pages, null, 2));
}

export async function seedAdmin() {
  const users = await loadUsers();
  const existing = users.find((u) => u.email === config.adminEmail);
  if (!existing) {
    const passwordHash = await bcrypt.hash(config.adminPassword, 10);
    const admin = {
      id: uuid(),
      email: config.adminEmail,
      name: 'Admin',
      role: 'admin',
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    users.push(admin);
    await saveUsers(users);
  }
}