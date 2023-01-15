---
sidebar_position: 4
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Docusaurus

## Setup Plugin

:::danger

For Docusaurus use versions `^1.x` or `latest-docusaurus`

```shell title=NPM
npm i remark-mdx-chartjs@latest-docusaurus chart.js
```

```shell title=Yarn
yarn add remark-mdx-chartjs@latest-docusaurus chart.js
```

```shell title=PNPM
pnpm add remark-mdx-chartjs@latest-docusaurus chart.js
```

:::

<Tabs>
  <TabItem value="default" label="Default Setup" default>

```js title=docusaurus.config.js
const remarkMdxChartJS = require('remark-mdx-chartjs');

/** @type {import('@docusaurus/types').Config} */
const config = {
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          remarkPlugins: [
            [
              remarkMdxChartJS,
              {
                chartJs: {
                  options: {
                    plugins: { legend: { position: 'top' } },
                    maintainAspectRatio: true,
                  },
                },
              },
            ],
          ],
        },
      }),
    ],
  ],
};

module.exports = config;
```

  </TabItem>
  <TabItem value="async" label="Async setup">

```js title=Async - docusaurus.config.js
async function createConfig() {
  const remarkMdxChartJS = await import('remark-mdx-chartjs');

  return {
    presets: [
      [
        'classic',
        {
          docs: {
            remarkPlugins: [
              [
                remarkMdxChartJS.default,
                {
                  chartJs: {
                    options: {
                      plugins: { legend: { position: 'right' } },
                    },
                  },
                },
              ],
            ],
          },
        },
      ],
    ],
  };
}

module.exports = createConfig;
```

  </TabItem>
</Tabs>

## Add a Diagram

Add a ChartJS diagram to a `.md` or `.mdx` file.

````mdx
```chartjs width=400px center title=RGB Pie Chart
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

## Enjoy!

```chartjs width=400px center title=RGB Pie Chart
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
