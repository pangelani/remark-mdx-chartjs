const YAML = require('yaml');

function wrap(wrapper, content) {
  const { width, height, center } = wrapper;
  if (width !== undefined || height !== undefined || center !== undefined) {
    const style = {};
    if (width !== undefined) style.width = width;
    if (height !== undefined) style.height = height;
    if (center !== undefined) style.marginLeft = 'auto';
    if (center !== undefined) style.marginRight = 'auto';
    return `<div style={${JSON.stringify(style)}}>${content}</div>`;
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

function getImportStatements(imports) {
  const entries = Object.entries(imports);
  if (!entries.length) {
    return "import 'chart.js/auto';\nimport { Chart } from 'react-chartjs-2';";
  }
  const importString = Object.entries(imports)
    .map((entry) => (imports[entry[0]] ? entry[0] : undefined))
    .filter(Boolean)
    .join(', ');

  return `import { Chart as ChartJs, ${importString} } from 'chart.js';\nimport { Chart } from 'react-chartjs-2';\n\nChartJs.register(${importString})`;
}

function createImportsNode(imports) {
  const value = getImportStatements(imports || {});
  return {
    type: 'import',
    value,
  };
}

function createChartNode(chartJs) {
  const redraw =
    chartJs.redraw !== undefined ? ` redraw={${chartJs.redraw ? 'true' : 'false'}}` : '';
  const datasetIdKey =
    chartJs.datasetIdKey !== undefined ? ` datasetIdKey="${chartJs.datasetIdKey}"` : '';
  const updateMode = chartJs.updateMode !== undefined ? ` updateMode="${chartJs.updateMode}"` : '';
  const options = Object.keys(chartJs.options).length
    ? ` options={${JSON.stringify(chartJs.options)}}`
    : '';
  const data = ` data={${JSON.stringify(chartJs.data)}}`;
  const width = chartJs.width !== undefined ? ` width={${JSON.stringify(chartJs.width)}}` : '';
  const height = chartJs.height !== undefined ? ` height={${JSON.stringify(chartJs.height)}}` : '';
  const value = `<Chart type={"${chartJs.type}"}${redraw}${datasetIdKey}${updateMode}${options}${data}${width}${height}/>`;
  return {
    type: 'jsx',
    value: wrap(chartJs.wrapper, value),
  };
}

module.exports = {
  getChartPropsFromContent,
  getImportStatements,
  createImportsNode,
  createChartNode,
};
