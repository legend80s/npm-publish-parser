# npm-publish-parser

<p>
  <a href="https://www.npmjs.com/package/npm-publish-parser" target="_blank">
    <img src="https://img.shields.io/npm/v/npm-publish-parser.svg" alt="npm version" />
  </a>

  <a href="https://www.npmjs.com/package/npm-publish-parser">
    <img src="https://img.shields.io/npm/dm/npm-publish-parser.svg" alt="npm downloads" />
  </a>

  <img src="https://img.shields.io/badge/coverage-100-green" />

  <a href="https://www.npmjs.com/package/git-commit-msg-linter" target="_blank">
    <img alt="lint by git commit msg linter" src="https://img.shields.io/badge/git-commit%20msg%20linter-blue" />
  </a>
</p>

> Parse the output of `npm publish --dry-run` into JSON.
>
> 将 `npm output` 输出的内容装换成结构化的 JSON 格式。

## Example

```js
import { toJSON } from 'npm-publish-parser';

const npmPublishOutput = `
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
`;

const json = toJSON(npmPublishOutput);
```

Generate well formed json structure:

```json
{
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
```
