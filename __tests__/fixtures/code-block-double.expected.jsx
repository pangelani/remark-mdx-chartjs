/*@jsxRuntime automatic @jsxImportSource react*/
import {Chart} from "react-chartjs-2";
import "chart.js/auto";
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1"
  }, props.components);
  return <><_components.h1>{"chartjs code block without options"}</_components.h1>{"\n"}<Chart type="bar" data={{
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
  }} />{"\n"}<_components.h1>{"only one import should be added"}</_components.h1>{"\n"}<Chart type="line" data={{
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
  }} /></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
