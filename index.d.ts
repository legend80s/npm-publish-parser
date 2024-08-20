interface INpmPublishOutput {
  tarballContents: ITarballContent[];
  tarballDetails: ITarballDetails;
}

interface ITarballDetails {
  name: string;
  version: string;
  filename: string;
  packageSize: string;
  unpackedSize: string;
  shasum: string;
  integrity: string;
  totalFiles: number;
}

interface ITarballContent {
  file: string;
  size: string;
}
