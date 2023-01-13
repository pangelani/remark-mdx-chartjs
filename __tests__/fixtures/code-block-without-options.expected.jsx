/* @jsxRuntime classic */
/* @jsx mdx */
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';


const layoutProps = {
  
};
const MDXLayout = "wrapper"
export default function MDXContent({
  components,
  ...props
}) {
  return <MDXLayout {...layoutProps} {...props} components={components} mdxType="MDXLayout">

    <h1>{`chartjs code block without options`}</h1>
    <Chart type={"bar"} data={{
      "labels": ["January", "February", "March", "April", "May", "June", "July"],
      "datasets": [{
        "label": "Dataset 1",
        "data": [0, 2, 6, 1, 7, 13, 2],
        "backgroundColor": "rgba(255, 99, 132, 0.5)"
      }, {
        "label": "Dataset 2",
        "data": [4, 2, 11, 8, 6, 1, 4],
        "backgroundColor": "rgba(53, 162, 235, 0.5)"
      }]
    }} mdxType="Chart" />
    </MDXLayout>;
}
;
MDXContent.isMDXComponent = true;