import { visit } from 'unist-util-visit';
import {
  createChartNode,
  createImportsNode,
  getChartPropsFromContent,
  createRegisterNode,
} from './utils';

const PLUGIN_NAME = 'remark-chartjs';

/**
 * Given the MDAST ast, look if ChartJS `imports` are present or not.
 * If not, adds them.
 *
 * @param {object} ast MDAST
 */
const addImportsAndRegister = (ast, imports) => {
  let alreadyImported = false;
  visit(ast, 'mdxjsEsm', (node) => {
    alreadyImported =
      alreadyImported ||
      node.data.estree.body.find(
        (node) => node.source.value === 'chart.js' || node.source.value === 'chart.js/auto',
      );
    return node;
  });
  if (!alreadyImported) {
    [createRegisterNode(imports)]
      .concat(createImportsNode(imports))
      .filter(Boolean)
      .forEach((importSmt) => {
        ast.children.unshift(importSmt);
      });
  }
};

/**
 * Given the MDAST ast, look for all fenced codeblocks that have a language of
 * `chartjs` and replace the content with a <Chart /> component.
 *
 * @param {object} ast MDAST
 * @param {vFile}  vFile
 * @param {object} defaultOptions
 * @return {function}
 */
function visitCodeBlock(ast, vFile, options) {
  return visit(ast, 'code', (node, index, parent) => {
    const { lang, value, position } = node;

    // If this codeblock is not chartjs, bail.
    if (lang !== 'chartjs') {
      return node;
    }

    try {
      const chartJs = getChartPropsFromContent(value, true, options.chartJs);

      if (!chartJs.type || !chartJs.data) {
        const msg = 'The following properties are required: type and data';
        vFile.message(msg, position, PLUGIN_NAME);
        return node;
      }

      const newNode = createChartNode(chartJs);

      parent.children.splice(index, 1, newNode);
      addImportsAndRegister(ast, options.imports);

      vFile.info('Code block replaced with chart.', position, PLUGIN_NAME);
    } catch (error) {
      vFile.message(error, position, PLUGIN_NAME);
    }
    return node;
  });
}

/**
 * Returns the transformer which acts on the MDAST tree and given VFile.
 *
 * @link https://github.com/unifiedjs/unified#function-transformernode-file-next
 * @link https://github.com/syntax-tree/mdast
 * @link https://github.com/vfile/vfile
 *
 * @param {object} options
 * @return {function}
 */
function chartjs(options = {}) {
  const pluginOpts = { chartJs: { options: undefined }, imports: {}, ...options };
  /**
   * @param {object} ast MDAST
   * @param {vFile} vFile
   * @param {function} next
   * @return {object}
   */
  return function transformer(ast, vFile, next) {
    visitCodeBlock(ast, vFile, pluginOpts);

    if (typeof next === 'function') {
      return next(null, ast, vFile);
    }

    return ast;
  };
}

export default chartjs;
