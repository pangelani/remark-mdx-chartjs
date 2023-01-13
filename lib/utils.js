import { Parser } from 'acorn';
import jsx from 'acorn-jsx';
import YAML from 'yaml';
import { valueToEstree } from 'estree-util-value-to-estree';

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
      value: '',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            importNames.length
              ? {
                  type: 'ImportDeclaration',
                  source: { type: 'Literal', value: 'chart.js' },
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
                  source: { type: 'Literal', value: 'chart.js/auto' },
                  specifiers: [],
                },
          ],
        },
      },
    },
    {
      type: 'mdxjsEsm',
      value: '',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ImportDeclaration',
              source: { type: 'Literal', value: 'react-chartjs-2' },
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
          value: JSON.stringify(chartJs.data),
          data: {
            estree: {
              type: 'Program',
              sourceType: 'module',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: valueToEstree(chartJs.data),
                },
              ],
            },
          },
        },
      },
      Object.keys(chartJs.options).length && {
        type: 'mdxJsxAttribute',
        name: 'options',
        value: {
          type: 'mdxJsxAttributeValueExpression',
          value: JSON.stringify(chartJs.options),
          data: {
            estree: {
              type: 'Program',
              sourceType: 'module',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: valueToEstree(chartJs.options),
                },
              ],
            },
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
