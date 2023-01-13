import { Parser } from 'acorn';
import jsx from 'acorn-jsx';
import YAML from 'yaml';

const parser = Parser.extend(jsx());

function getChartPropsFromContent(content, isYaml, chartJsDefaults) {
  const chartProps = isYaml ? YAML.parse(content) : JSON.parse(content);
  return {
    type: chartProps.type,
    data: chartProps.data,
    options: { ...chartJsDefaults.options, ...chartProps.options },
    redraw: chartProps.redraw !== undefined ? chartProps.redraw : chartJsDefaults.redraw,
    datasetIdKey:
      chartProps.datasetIdKey !== undefined
        ? chartProps.datasetIdKey
        : chartJsDefaults.datasetIdKey,
    updateMode:
      chartProps.updateMode !== undefined ? chartProps.updateMode : chartJsDefaults.updateMode,
    width: chartProps.width,
  };
}

function createRegisterNode(imports) {
  const importNames = Object.entries(imports)
    .map((entry) => (imports[entry[0]] ? entry[0] : undefined))
    .filter(Boolean)
    .join(', ');
  const value = `ChartJs.register(${importNames})`;
  const estree = parser.parse(value, { ecmaVersion: 'latest' });
  return importNames.length
    ? {
        type: 'mdxjsEsm',
        value,
        data: { estree },
      }
    : undefined;
}

function createImportsNode(imports) {
  const importNames = Object.entries(imports)
    .map((entry) => (imports[entry[0]] ? entry[0] : undefined))
    .filter(Boolean);
  return [
    {
      type: 'mdxjsEsm',
      value: importNames.length
        ? `import {Chart as ChartJS} from 'chart.js';`
        : "import 'chart.js/auto';",
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            importNames.length
              ? {
                  type: 'ImportDeclaration',
                  source: { type: 'Literal', value: 'chart.js', raw: "'chart.js'" },
                  specifiers: [
                    {
                      type: 'ImportSpecifier',
                      imported: { type: 'Identifier', name: 'Chart' },
                      local: { type: 'Identifier', name: 'ChartJs' },
                    },
                  ],
                }
              : {
                  type: 'ImportDeclaration',
                  source: { type: 'Literal', value: 'chart.js/auto', raw: "'chart.js/auto'" },
                  specifiers: [],
                },
          ],
        },
      },
    },
    {
      type: 'mdxjsEsm',
      value: importNames.length
        ? `import {Chart, ${importNames.join(', ')}} from 'react-chartjs-2';`
        : "import {Chart} from 'react-chartjs-2';",
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ImportDeclaration',
              source: { type: 'Literal', value: 'react-chartjs-2', raw: "'react-chartjs-2'" },
              specifiers: [
                {
                  type: 'ImportSpecifier',
                  imported: { type: 'Identifier', name: 'Chart' },
                  local: { type: 'Identifier', name: 'Chart' },
                },
              ].concat(
                importNames.map((name) => ({
                  type: 'ImportSpecifier',
                  imported: { type: 'Identifier', name: name },
                  local: { type: 'Identifier', name: name },
                })),
              ),
            },
          ],
        },
      },
    },
  ];
}

function createChartNode(chartJs) {
  const dataString = `true && ${JSON.stringify(chartJs.data)}`;
  const optString = `true && ${JSON.stringify(chartJs.options)}`;
  return {
    type: 'mdxJsxFlowElement',
    name: 'Chart',
    attributes: [
      {
        type: 'mdxJsxAttribute',
        name: 'type',
        value: chartJs.type,
      },
      chartJs.redraw !== undefined && {
        type: 'mdxJsxAttribute',
        name: 'redraw',
        value: {
          type: 'mdxJsxAttributeValueExpression',
          value: chartJs.redraw ? 'true' : 'false',
          data: {
            estree: {
              type: 'Program',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Literal',
                    value: !!chartJs.redraw,
                    raw: chartJs.redraw ? 'true' : 'false',
                  },
                },
              ],
              sourceType: 'module',
              comments: [],
            },
          },
        },
      },
      chartJs.width !== undefined && {
        type: 'mdxJsxAttribute',
        name: 'width',
        value: {
          type: 'mdxJsxAttributeValueExpression',
          value: chartJs.width,
          data: {
            estree: {
              type: 'Program',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Literal',
                    value: chartJs.width,
                    raw: chartJs.width,
                  },
                },
              ],
              sourceType: 'module',
              comments: [],
            },
          },
        },
      },
      chartJs.datasetIdKey !== undefined && {
        type: 'mdxJsxAttribute',
        name: 'datasetIdKey',
        value: chartJs.datasetIdKey,
      },
      chartJs.updateMode !== undefined && {
        type: 'mdxJsxAttribute',
        name: 'updateMode',
        value: chartJs.updateMode,
      },
      chartJs.data && {
        type: 'mdxJsxAttribute',
        name: 'data',
        value: {
          type: 'mdxJsxAttributeValueExpression',
          value: dataString,
          data: {
            estree: parser.parse(dataString, { ecmaVersion: 'latest' }),
          },
        },
      },
      Object.keys(chartJs.options).length && {
        type: 'mdxJsxAttribute',
        name: 'options',
        value: {
          type: 'mdxJsxAttributeValueExpression',
          value: optString,
          data: {
            estree: parser.parse(optString, { ecmaVersion: 'latest' }),
          },
        },
      },
    ].filter(Boolean),
    children: [],
    position: {
      start: {
        line: 4,
        column: 1,
        offset: 102,
      },
      end: {
        line: 4,
        column: 31,
        offset: 132,
      },
    },
    data: {
      _mdxExplicitJsx: true,
    },
  };
}

export { getChartPropsFromContent, createImportsNode, createRegisterNode, createChartNode };
