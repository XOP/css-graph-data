import fs, { promises as fsp } from 'fs';
import path from 'path';

let data = [];

const dataRootPath = path.join(process.cwd(), './src/data');
const dataFiles = fs.readdirSync(dataRootPath).filter(f => f.includes('.json'));

const generateData = async function generateData(_ = []) {
  for (const f of dataFiles) {
    const split = f.split('--');
    const version = split[0];
    const timestamp = split[1].slice(0, -5);

    const dataPath = path.join(dataRootPath, f);

    const bin = await fsp.readFile(dataPath).catch(e => console.error(e));
    const d = JSON.parse(bin.toString());

    const dataOut = {
      version: 'v' + version,
      timestamp,
      size: d['stylesheets.size.uncompressed.totalBytes'] || d['stylesheets.filesize.uncompressed.totalBytes'],
      sizeGzip: d['stylesheets.size.compressed.gzip.totalBytes'] || d['stylesheets.filesize.compressed.gzip.totalBytes'],
      selectorsAvg: d['selectors.complexity.average'],
      selectorsSum: d['selectors.complexity.sum'],
      cohesion: d['stylesheets.cohesion.average'],
      declarations: d['declarations.total'],
      lines: d['stylesheets.linesOfCode.sourceLinesOfCode.total'],
      rules: d['rules.total'],
      colors: d['values.colors.unique']
    }

    _.push(dataOut);
  }

  return _;
}

export async function get({params, request}) {
  const res = await generateData(data);

  return {
    body: JSON.stringify(res, null, 2),
  };
}
