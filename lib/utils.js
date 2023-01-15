import { Parser } from 'acorn';
import jsx from 'acorn-jsx';
import YAML from 'yaml';
import { valueToEstree } from 'estree-util-value-to-estree';

const parser = Parser.extend(jsx());

function wrap(wrapper, content) {
  const { width, height, center } = wrapper;
  if (width !== undefined || height !== undefined || center !== undefined) {
    const style = {};
    if (width !== undefined) style.width = width;
    if (height !== undefined) style.height = height;
    if (center !== undefined) style.marginLeft = 'auto';
    if (center !== undefined) style.marginRight = 'auto';
    return {
      type: 'mdxJsxFlowElement',
      name: 'div',
      attributes: [
        {
          type: 'mdxJsxAttribute',
          name: 'style',
          value: {
            type: 'mdxJsxAttributeValueExpression',
            value: JSON.stringify(style),
            data: {
              estree: {
                type: 'Program',
                sourceType: 'module',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: valueToEstree(style),
                  },
                ],
              },
            },
          },
        },
      ],
      children: [content],
      data: {
        _mdxExplicitJsx: true,
      },
    };
  }
  return content;
}

function getChartPropsFromContent(content, meta, chartJsDefaults) {
  const chartProps = YAML.parse(content);
  const options = { ...chartJsDefaults.options, ...chartProps.options };
  const matches = meta.match(/title=(.*)$/);
  if (matches) {
    options.plugins = options.plugins || {};
    options.plugins.title = options.plugins.title || {};
    options.plugins.title.display = true;
    options.plugins.title.text = matches[1];
  }
  return {
    type: chartProps.type,
    data: chartProps.data,
    options,
    redraw: chartProps.redraw !== undefined ? chartProps.redraw : chartJsDefaults.redraw,
    datasetIdKey:
      chartProps.datasetIdKey !== undefined
        ? chartProps.datasetIdKey
        : chartJsDefaults.datasetIdKey,
    updateMode:
      chartProps.updateMode !== undefined ? chartProps.updateMode : chartJsDefaults.updateMode,
    width: chartProps.width !== undefined ? chartProps.width : chartJsDefaults.width,
    height: chartProps.height !== undefined ? chartProps.height : chartJsDefaults.height,
    wrapper: {
      width: (meta.match(/width=([^\s]+)/) || [[]])[1],
      height: (meta.match(/height=([^\s]+)/) || [[]])[1],
      center: (meta.match(/(center)/) || [[]])[1],
    },
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
  return wrap(chartJs.wrapper, {
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
      chartJs.width !== undefined && {
        type: 'mdxJsxAttribute',
        name: 'height',
        value: {
          type: 'mdxJsxAttributeValueExpression',
          value: chartJs.height,
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
    data: {
      _mdxExplicitJsx: true,
    },
  });
}

export { getChartPropsFromContent, createImportsNode, createRegisterNode, createChartNode };
