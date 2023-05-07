import { Plugin } from 'unified';
import { Root } from 'mdast';

interface RemarkMdxChartJSOptions {
    chartJs: any;
    imports: Record<string, boolean>;
}
/**
 * Returns the transformer which acts on the MDAST tree and given VFile.
 *
 * @param {object} options
 * @return {function}
 */
declare const remarkMdxChartJS: Plugin<[Partial<RemarkMdxChartJSOptions>?], Root>;

export { RemarkMdxChartJSOptions, remarkMdxChartJS as default };
