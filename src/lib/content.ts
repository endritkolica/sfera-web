import fs from 'fs';
import path from 'path';

const contentPath = path.join(process.cwd(), 'content.json');

export function getContent() {
  try {
    const raw = fs.readFileSync(contentPath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveContent(data: unknown) {
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync(contentPath, json, 'utf-8');
}
