import imagemin from 'imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import pngquant from 'imagemin-pngquant';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function compress() {
  const dir = path.join(__dirname, '..', 'src', 'assets');
  const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png)$/i.test(f));
  console.log('Found', files.length, 'images');

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.size < 1024 * 10) continue; // skip tiny files <10KB
    console.log('Compressing', file, `(${(stat.size/1024/1024).toFixed(2)} MB)`);
    try {
      const buffer = fs.readFileSync(filePath);
      let out;
      if (/\.png$/i.test(file)) {
        out = await imagemin.buffer(buffer, {
          plugins: [pngquant({quality: [0.45, 0.6], speed: 1})]
        });
      } else {
        out = await imagemin.buffer(buffer, {
          plugins: [mozjpeg({quality: 45, progressive: true})]
        });
      }
      fs.writeFileSync(filePath, out);
      const newStat = fs.statSync(filePath);
      console.log(' ->', `${(newStat.size/1024/1024).toFixed(2)} MB`);
    } catch (err) {
      console.error('Failed to compress', file, err.message);
    }
  }
}

compress().catch(err => {
  console.error(err);
  process.exit(1);
});
