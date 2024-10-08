import { it } from 'node:test';
import { deepStrictEqual } from 'node:assert';
import { toJSON } from '../index.mjs';

it('#doc-test example should been parsed as expected', () => {
  const input = `
  npm notice
  npm notice 📦  swaggered@1.4.2
  npm notice Tarball Contents
  npm notice 1.1kB LICENSE
  npm notice 10.9kB README.md
  npm notice 2.5kB bin.mjs
  npm notice 6.2kB commands/swagger-to-ts.mjs
  npm notice 1.0kB index.d.ts
  npm notice 154B index.mjs
  npm notice 606B lib/fs.mjs
  npm notice 15.5kB lib/generate.mjs
  npm notice 4.4kB lib/lite-lodash.mjs
  npm notice 1.1kB lib/remove-title.mjs
  npm notice 1.5kB package.json
  npm notice Tarball Details
  npm notice name: swaggered
  npm notice version: 1.4.2
  npm notice filename: swaggered-1.4.2.tgz
  npm notice package size: 13.1 kB
  npm notice unpacked size: 44.8 kB
  npm notice shasum: 29908db791e8304d72dfde0171e128b0528d846b
  npm notice integrity: sha512-d+HQGn+dgTvez[...]yu3nJZElZy30A==
  npm notice total files: 11
  npm notice
  npm warn This command requires you to be logged in to https://registry.npmjs.org (dry-run)
  npm notice Publishing to https://registry.npmjs.org with tag latest and default access (dry-run)
  + swaggered@1.4.2
  `;

  const actual = toJSON(input);
  // console.log('actual:', actual);
  const expected = {
    tarballContents: [
      {
        file: 'LICENSE',
        size: '1.1kB',
      },
      {
        file: 'README.md',
        size: '10.9kB',
      },
      {
        file: 'bin.mjs',
        size: '2.5kB',
      },
      {
        file: 'commands/swagger-to-ts.mjs',
        size: '6.2kB',
      },
      {
        file: 'index.d.ts',
        size: '1.0kB',
      },
      {
        file: 'index.mjs',
        size: '154B',
      },
      {
        file: 'lib/fs.mjs',
        size: '606B',
      },
      {
        file: 'lib/generate.mjs',
        size: '15.5kB',
      },
      {
        file: 'lib/lite-lodash.mjs',
        size: '4.4kB',
      },
      {
        file: 'lib/remove-title.mjs',
        size: '1.1kB',
      },
      {
        file: 'package.json',
        size: '1.5kB',
      },
    ],
    tarballDetails: {
      name: 'swaggered',
      version: '1.4.2',
      filename: 'swaggered-1.4.2.tgz',
      packageSize: '13.1 kB',
      unpackedSize: '44.8 kB',
      shasum: '29908db791e8304d72dfde0171e128b0528d846b',
      integrity: 'sha512-d+HQGn+dgTvez[...]yu3nJZElZy30A==',
      totalFiles: 11,
    },
  };

  deepStrictEqual(actual, expected);
});

it('Publish result of Node.js V20 and V22 should been parsed as expected', () => {
  const input = `npm notice
  npm notice 📦  test@1.0.0
  npm notice === Tarball Contents ===
  npm notice 887B index.mjs
  npm notice 329B package.json
  npm notice === Tarball Details ===
  npm notice name:          test
  npm notice version:       1.0.0
  npm notice filename:      test-1.0.0.tgz
  npm notice package size:  726 B
  npm notice unpacked size: 1.2 kB
  npm notice shasum:        2cc4bd62b80351008d1234ab2f7d5f3415354c01
  npm notice integrity:     sha512-2FTzkVL2XKtWK[...]eYKJCcrh4dOig==
  npm notice total files:   2
  npm notice
  npm WARN This command requires you to be logged in to https://registry.npmmirror.com (dry-run)
  npm notice Publishing to https://registry.npmmirror.com with tag latest and default access (dry-run)
  + test@1.0.0`;

  const actual = toJSON(input);
  // console.log('actual:', actual);
  const expected = {
    tarballContents: [
      {
        file: 'index.mjs',
        size: '887B',
      },
      {
        file: 'package.json',
        size: '329B',
      },
    ],
    tarballDetails: {
      name: 'test',
      version: '1.0.0',
      filename: 'test-1.0.0.tgz',
      packageSize: '726 B',
      unpackedSize: '1.2 kB',
      shasum: '2cc4bd62b80351008d1234ab2f7d5f3415354c01',
      integrity: 'sha512-2FTzkVL2XKtWK[...]eYKJCcrh4dOig==',
      totalFiles: 2,
    },
  };

  deepStrictEqual(actual, expected);
});
