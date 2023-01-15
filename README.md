# remark-mdx-chartjs

A [remark](https://remark.js.org) plugin that replaces `chartjs` code blocks with ChartJS Components
(react-chartjs-2).

## Installation

```sh
npm install remark-mdx-chartjs
```

## Usage

This remark plugin takes markdown code blocks with `chartjs` as lang, and converts them into mdx
elements `<Chart />`.

For example, given a file named `example.mdx` with the following contents:

````mdx
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
options:
responsive: true
plugins:
    legend:
    position: "top"
    title:
    display: true
    text: Chart.js Bar Chart
```
````

The following script:

```js
const fs = require('fs');
const toVFile = require('to-vfile');
const { sync } = require('@mdx-js/mdx');

const remarkMdxChartJS = require('remark-mdx-chartjs');

const result = sync(toVFile.readSync('example.mdx'), {
  remarkPlugins: [remarkMdxChartJS],
  jsx: true,
});

console.log(result);
```

Roughly yields:

```jsx
/* @jsxRuntime classic */
/* @jsx mdx */
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const layoutProps = {};
const MDXLayout = 'wrapper';
export default function MDXContent({ components, ...props }) {
  return (
    <MDXLayout {...layoutProps} {...props} components={components} mdxType="MDXLayout">
      <Chart
        type={'bar'}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Bar Chart',
            },
          },
        }}
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
        mdxType="Chart"
      />
    </MDXLayout>
  );
}
MDXContent.isMDXComponent = true;
```

### Code Block Metadata

You can also specify some self-explanatory parameters inside the language metastring (leave a space
after the language): 'width', 'height', 'center', and 'title'. The order is important! the `title`
should always be the last.

Example:

````mdx
```chartjs width=50% height=200px center title=RGB Pie Chart
type: pie
data:
  labels: ["Red", "Green", "Blue"]
  datasets:
    - label: "Colors"
      data: [1, 1, 1]
      backgroundColor: [
        "rgba(255, 0, 0, 0.5)",
        "rgba(0, 255, 0, 0.5)",
        "rgba(0, 0, 255, 0.5)",
      ]
options:
  plugins: { legend: { position: 'bottom' } }
```
````

### Plugin Options

#### `chartjs.options`

Options passed to the `<Chart {...props} />` component. No options by default, if options are
available as part of the code block data, these default options will be completely ignored.

[See ChartJS docs for more information](https://react-chartjs-2.js.org/components/chart#props)

#### `imports`

Map containing the list of Chart registrable components to import and register. Everything will be
imported by default. Example:

```
  imports: {
    BarController: true,
    CategoryScale: true,
    BarElement: true,
    Title: true,
    Legend: false
  }
```

### License

[MIT](LICENSE.md) @ [Pablo Angelani](https://github.com/pangelani)
