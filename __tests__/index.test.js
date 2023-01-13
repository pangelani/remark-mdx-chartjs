import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync } from 'fs';
import { readSync } from 'to-vfile';
import { compileSync } from '@mdx-js/mdx';

import chartjs from '../lib';

// eslint-disable-next-line
const fixturesDir = join(dirname(fileURLToPath(import.meta.url)), '/fixtures');

function testUseCase(useCase, options, expectCallback) {
  const srcFile = `${fixturesDir}/${useCase}.md`;
  const expectedFile = `${fixturesDir}/${useCase}.expected.jsx`;
  const vfile = readSync(srcFile);
  const expectedResult = readFileSync(expectedFile).toString();

  const result = compileSync(vfile, {
    remarkPlugins: [options ? [chartjs, options] : chartjs],
    jsx: true,
  });

  expectCallback(String(result), expectedResult);

  return vfile;
}

describe('remark-chartjs', () => {
  it('can handle code blocks without options', () => {
    testUseCase('code-block-without-options', undefined, (result, expectedResult) => {
      expect(result).toEqual(expectedResult);
    });
  });

  it('can handle code blocks with options', () => {
    testUseCase(
      'code-block-with-options',
      {
        chartJs: {
          options: {
            plugins: { legend: { position: 'top' } },
            responsive: false,
          },
          updateMode: 'none',
        },
      },
      (result, expectedResult) => {
        expect(result).toEqual(expectedResult);
      },
    );
  });

  it('can handle code blocks with options override', () => {
    testUseCase(
      'code-block-with-options-override',
      {
        chartJs: {
          options: {
            plugins: { legend: { position: 'top' } },
            responsive: false,
          },
          datasetIdKey: 'key',
          redraw: false,
        },
      },
      (result, expectedResult) => {
        expect(result).toEqual(expectedResult);
      },
    );
  });

  it('can handle code blocks with specific imports', () => {
    testUseCase(
      'code-block-with-imports',
      {
        imports: {
          BarController: true,
          CategoryScale: true,
          LinearScale: true,
          BarElement: true,
          Colors: true,
          Legend: true,
          Title: true,
          SubTitle: false,
        },
      },
      (result, expectedResult) => {
        expect(result).toEqual(expectedResult);
      },
    );
  });

  it('cannot handle code blocks with missing data', () => {
    testUseCase('code-block-missing-data', undefined, (result, expectedResult) => {
      expect(result).toEqual(expectedResult);
    });
  });

  it('cannot handle code blocks with missing type', () => {
    testUseCase('code-block-missing-type', undefined, (result, expectedResult) => {
      expect(result).toEqual(expectedResult);
    });
  });

  it('code blocks without chartjs are ignored', () => {
    testUseCase('code-block-ignored', undefined, (result, expectedResult) => {
      expect(result).toEqual(expectedResult);
    });
  });

  it('multiple code blocks only import once', () => {
    testUseCase('code-block-double', undefined, (result, expectedResult) => {
      expect(result).toEqual(expectedResult);
    });
  });
});
