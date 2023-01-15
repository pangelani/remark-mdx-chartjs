---
sidebar_position: 2
---

# MDX Usage

This remark plugin takes markdown code blocks with `chartjs` as lang, and converts them into mdx
elements `<Chart />`.

For example, given a the following file:

````mdx title=example.mdx
# Simple ChartJS code block

```chartjs
type: bar
data:
labels: ["January", "February", "March", "April", "May", "June", "July"]
datasets:
    - label: "Dataset 1"
    data: [0,2,6,1,7,13,2]
    backgroundColor: "rgba(255, 99, 132, 0.5)"

    - label: "Dataset 2"
    data: [4,2,11,8,6,1,4]
    backgroundColor: "rgba(53, 162, 235, 0.5)"
```
````

The following script:

```js title=index.js
import { readFile } from 'fs/promises';

import { compile } from '@mdx-js/mdx';
import remarkMdxChartJS from 'remark-mdx-chartjs';

const { contents } = await compile(await readFile('example.mdx'), {
  jsx: true,
  remarkPlugins: [remarkMdxChartJS],
});
console.log(contents);
```

Roughly yields:

```jsx
/*@jsxRuntime automatic @jsxImportSource react*/
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
function _createMdxContent(props) {
  const _components = Object.assign(
    {
      h1: 'h1',
    },
    props.components,
  );
  return (
    <>
      <_components.h1>{'Simple ChartJS code block'}</_components.h1>
      <Chart
        type="bar"
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Dataset 1',
              data: [0, 2, 6, 1, 7, 13, 2],
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Dataset 2',
              data: [4, 2, 11, 8, 6, 1, 4],
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        }}
      />
    </>
  );
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? (
    <MDXLayout {...props}>
      <_createMdxContent {...props} />
    </MDXLayout>
  ) : (
    _createMdxContent(props)
  );
}
export default MDXContent;
```
