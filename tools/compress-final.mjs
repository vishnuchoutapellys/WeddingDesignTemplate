import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', 'src', 'assets');

async function processFile(file) {
  const filePath = path.join(dir, file);
  const ext = path.extname(file).toLowerCase();
  const stat = fs.statSync(filePath);
  if (stat.size < 1024 * 10) return; // skip tiny files <10KB

  try {
    console.log('Processing', file, `(${(stat.size/1024/1024).toFixed(2)} MB)`);
    const img = sharp(filePath).rotate();
    const metadata = await img.metadata();
    const width = metadata.width || null;
    const resizeWidth = width && width > 1600 ? 1600 : width;

    let pipeline = img;
    if (resizeWidth) pipeline = pipeline.resize({ width: resizeWidth, withoutEnlargement: true });

    const tmpPath = filePath + '.tmp';

    if (ext === '.jpg' || ext === '.jpeg') {
      await pipeline.jpeg({ quality: 55, progressive: true }).toFile(tmpPath);
    } else if (ext === '.png') {
      await pipeline.png({ compressionLevel: 9, palette: true }).toFile(tmpPath);
    } else {
      return;
    }

    const newStat = fs.statSync(tmpPath);
    fs.renameSync(tmpPath, filePath);
    console.log(' ->', `${(newStat.size/1024/1024).toFixed(2)} MB`);
  } catch (err) {
    console.error('Failed', file, err.message);
    try { if (fs.existsSync(filePath + '.tmp')) fs.unlinkSync(filePath + '.tmp'); } catch(e){}
  }
}

async function run(){
  const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png)$/i.test(f));
  console.log('Found', files.length, 'images');
  for (const f of files) await processFile(f);
}

run().catch(err => { console.error(err); process.exit(1); });
