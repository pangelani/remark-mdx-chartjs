[![github actions](https://github.com/pangelani/remark-mdx-chartjs/actions/workflows/ci.yml/badge.svg)](https://github.com/pangelani/remark-mdx-chartjs/actions/workflows/ci.yaml)
[![codecov](https://codecov.io/gh/pangelani/remark-mdx-chartjs/branch/main/graph/badge.svg)](https://codecov.io/gh/pangelani/remark-mdx-chartjs)
[![npm](https://img.shields.io/npm/v/remark-mdx-chartjs)](https://www.npmjs.com/package/remark-mdx-chartjs)
[![prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io)

# remark-mdx-chartjs

A [remark](https://remark.js.org) plugin that replaces `chartjs` code blocks with ChartJS Components
(react-chartjs-2).

[**See online docs for more info**](https://pangelani.github.io/remark-mdx-chartjs/)

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
```
````

The following script:

```js
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
      <Chart
        type="bar"
        data={
          true && {
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
          }
        }
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

No options by default. ChartJS Properties used as default props for all Chart Components. Can be
override in each individual code block.
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
