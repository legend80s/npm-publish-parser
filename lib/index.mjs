import { toCamelCase } from './lite-lodash.mjs';

/**
 *
 * @param {string} output
 * @returns {INpmPublishOutput}
 * @example
 * const output = `npm notice 📦  swaggered@1.4.2
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
npm notice total files: 11`
 *
 * parseNpmOutputToJSON(output)
 * // output well formed json structure
 * {
    "tarballContents": [
        {
            "file": "LICENSE",
            "size": "1.1kB"
        },
        {
            "file": "README.md",
            "size": "10.9kB"
        },
        {
            "file": "bin.mjs",
            "size": "2.5kB"
        },
        {
            "file": "commands/swagger-to-ts.mjs",
            "size": "6.2kB"
        },
        {
            "file": "package.json",
            "size": "1.5kB"
        }
    ],
    "tarballDetails": {
        "name": "swaggered",
        "version": "1.4.2",
        "filename": "swaggered-1.4.2.tgz",
        "packageSize": "13.1 kB",
        "unpackedSize": "44.8 kB",
        "shasum": "29908db791e1234572dfde0171e128b0528d846b",
        "integrity": "sha512-d+HQGn+dgTvez[...]uvwxJZElZy30A==",
        "totalFiles": 5
    }
}
 */
export function parseNpmOutputToJSON(output) {
  const result = {
    tarballContents: [],
    tarballDetails: {},
  };

  let currentSection = '';
  const outputLines = output.split('\n');
  // console.log('outputLines:', outputLines);

  outputLines.forEach((line) => {
    const trimmedLine = line.replace(/^\s*npm notice\s+/, '');
    // console.log('line:', trimmedLine);
    // mark beginning of sections
    if (
      trimmedLine.includes('Tarball Contents') ||
      trimmedLine.includes('Tarball Details')
    ) {
      currentSection = trimmedLine;
      return;
    }

    if (currentSection.includes('Tarball Contents')) {
      // extract file name and size in Tarball Contents section
      const matches = trimmedLine.split(' ');

      if (matches.length === 2) {
        // @ts-expect-error
        result.tarballContents.push({
          file: matches[1],
          size: matches[0],
        });
      }
    } else if (currentSection.includes('Tarball Details')) {
      // extract key-value pairs in Tarball Details section
      const matches = trimmedLine.split(': ');

      if (matches.length === 2) {
        const key = toCamelCase(matches[0]);
        const value = matches[1].trim();

        // @ts-expect-error
        result.tarballDetails[key] =
          key === 'totalFiles' ? Number(value) : value;
      }
    }
  });

  // @ts-expect-error
  return result;
}
