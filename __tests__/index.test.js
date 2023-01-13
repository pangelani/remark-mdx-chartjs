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

  expectCallback(result, expectedResult);

  return vfile;
}

describe('remark-chartjs', () => {
  it('can handle code blocks without options', () => {
    testUseCase('code-block-without-options', undefined, (result, expectedResult) => {
      expect(String(result)).toEqual(expectedResult);
      expect(result.messages[0].reason).toEqual('Code block replaced with chart.')
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
        expect(String(result)).toEqual(expectedResult);
        expect(result.messages[0].reason).toEqual('Code block replaced with chart.')
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
        expect(String(result)).toEqual(expectedResult);
        expect(result.messages[0].reason).toEqual('Code block replaced with chart.')
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
        expect(String(result)).toEqual(expectedResult);
      },
    );
  });

  it('cannot handle code blocks with missing data', () => {
    testUseCase('code-block-missing-data', undefined, (result, expectedResult) => {
      expect(String(result)).toEqual(expectedResult);
      expect(result.messages[0].reason).toEqual('The following properties are required: type and data');
    });
  });

  it('cannot handle code blocks with missing type', () => {
    testUseCase('code-block-missing-type', undefined, (result, expectedResult) => {
      expect(String(result)).toEqual(expectedResult);
      expect(result.messages[0].reason).toEqual('The following properties are required: type and data');
    });
  });

  it('code blocks without chartjs are ignored', () => {
    testUseCase('code-block-ignored', undefined, (result, expectedResult) => {
      expect(String(result)).toEqual(expectedResult);
      expect(result.messages).toHaveLength(0)
    });
  });

  it('multiple code blocks only import once', () => {
    testUseCase('code-block-double', undefined, (result, expectedResult) => {
      expect(String(result)).toEqual(expectedResult);
      expect(result.messages[0].reason).toEqual('Code block replaced with chart.')
    });
  });
});
