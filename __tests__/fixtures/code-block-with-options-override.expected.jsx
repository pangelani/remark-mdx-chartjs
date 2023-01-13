/*@jsxRuntime automatic @jsxImportSource react*/
import {Chart} from "react-chartjs-2";
import "chart.js/auto";
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1"
  }, props.components);
  return <><_components.h1>{"chartjs code block with options override"}</_components.h1>{"\n"}<Chart type="bar" redraw={true} datasetIdKey="key" data={{
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
  }} options={{
    "plugins": {
      "title": {
        "display": true,
        "text": "Chart.js Bar Chart"
      }
    },
    "responsive": true
  }} /></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
