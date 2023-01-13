/* @jsxRuntime classic */
/* @jsx mdx */
import { Chart as ChartJs, BarController, CategoryScale, LinearScale, BarElement, Colors, Legend, Title } from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJs.register(BarController, CategoryScale, LinearScale, BarElement, Colors, Legend, Title)


const layoutProps = {
  
};
const MDXLayout = "wrapper"
export default function MDXContent({
  components,
  ...props
}) {
  return <MDXLayout {...layoutProps} {...props} components={components} mdxType="MDXLayout">

    <h1>{`chartjs code block with options`}</h1>
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