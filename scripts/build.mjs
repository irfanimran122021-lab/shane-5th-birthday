import { cp, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { calendarEvent } from '../public/calendar.js';
await mkdir('dist', {recursive:true});
await cp('public', 'dist', {recursive:true});
await writeFile('dist/shane-birthday.ics', calendarEvent());
const html = await readFile('dist/index.html', 'utf8');
for (const [,path] of html.matchAll(/(?:src|href)="(\.\/[^"#?]+)"/g)) {
  await stat('dist/' + path.slice(2));
}
console.log('Built static invitation in dist/. Ready for Vercel.');
