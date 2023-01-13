const YAML = require('yaml');

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
    width: chartProps.width !== undefined ? chartProps.width : chartJsDefaults.width,
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
    chartJs.redraw !== undefined ? `redraw={${chartJs.redraw ? 'true' : 'false'}}` : '';
  const datasetIdKey =
    chartJs.datasetIdKey !== undefined ? `datasetIdKey="${chartJs.datasetIdKey}"` : '';
  const updateMode = chartJs.updateMode !== undefined ? `updateMode="${chartJs.updateMode}"` : '';
  const options = Object.keys(chartJs.options).length
    ? `options={${JSON.stringify(chartJs.options)}}`
    : '';
  const data = `data={${JSON.stringify(chartJs.data)}}`;
  const value = `<Chart type={"${chartJs.type}"} ${redraw} ${datasetIdKey} ${updateMode} ${options} ${data}/>`;
  return {
    type: 'jsx',
    value,
  };
}

module.exports = {
  getChartPropsFromContent,
  getImportStatements,
  createImportsNode,
  createChartNode,
};
