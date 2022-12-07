import fs, { promises as fsp } from 'fs';
import path from 'path';

const dataRootPath = path.join(process.cwd(), './src/data');
const dataFiles = fs
  .readdirSync(dataRootPath)
  .filter((f) => f.includes('.json'));

export type CssDataType = {
  version: string;
  timestamp: string | Date;
  size: string | number;
  sizeGzip: string | number;
  selectorsAvg: string | number;
  selectorsSum: string | number;
  cohesion: string | number;
  declarations: string | number;
  lines: string | number;
  rules: string | number;
  colors: string[];
};

const generateData = async function generateData(data = []) {
  for (const f of dataFiles) {
    const split = f.split('--');
    const version = split[0];
    const timestamp = split[1].slice(0, -5);

    const dataPath = path.join(dataRootPath, f);

    const bin: Buffer = await fsp.readFile(dataPath);
    const d = JSON.parse(bin.toString());

    const dataOut: CssDataType = {
      version: 'v' + version,
      timestamp,
      size:
        d['stylesheets.size.uncompressed.totalBytes'] ||
        d['stylesheets.filesize.uncompressed.totalBytes'],
      sizeGzip:
        d['stylesheets.size.compressed.gzip.totalBytes'] ||
        d['stylesheets.filesize.compressed.gzip.totalBytes'],
      selectorsAvg: d['selectors.complexity.average'],
      selectorsSum: d['selectors.complexity.sum'],
      cohesion: d['stylesheets.cohesion.average'],
      declarations: d['declarations.total'],
      lines: d['stylesheets.linesOfCode.sourceLinesOfCode.total'],
      rules: d['rules.total'],
      colors: d['values.colors.unique'],
    };

    data.push(dataOut);
  }

  return data;
};

const delayOutput = (cb) =>
  new Promise((resolve) => {
    setTimeout(async () => resolve(await cb()), 350);
  });

export async function get({ params, request }) {
  const res = await delayOutput(generateData);

  return {
    body: JSON.stringify(res, null, 2),
  };
}
