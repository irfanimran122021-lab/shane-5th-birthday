import { cp, mkdir, readFile, stat } from 'node:fs/promises';
await mkdir('dist', {recursive:true});
await cp('public', 'dist', {recursive:true});
const html = await readFile('dist/index.html', 'utf8');
for (const [,path] of html.matchAll(/(?:src|href)="(\.\/[^"#?]+)"/g)) {
  await stat('dist/' + path.slice(2));
}
console.log('Built static invitation in dist/. Ready for Vercel.');
