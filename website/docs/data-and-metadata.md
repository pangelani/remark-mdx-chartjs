---
sidebar_position: 3
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

# Data and Metadata

## Data

The content of the code block will have the chart definition as YAML/JSON, available properties:

| Name         | Type                                                                       | Default Value | Required | Description                                                                                                                                        |
| ------------ | -------------------------------------------------------------------------- | ------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| type         | `bar`, `bubble`, `doughnut`, `line`,`pie`, `polarArea`, `radar`, `scatter` |               | yes      | Chart.js chart type.                                                                                                                               |
| data         | Object                                                                     |               | yes      | The data object that is passed into the Chart.js chart (required). [See more](https://react-chartjs-2.js.org/components/chart).                    |
| options      | Object                                                                     | `{}`          | no       | The options object that is passed into the Chart.js chart. [See more](https://www.chartjs.org/docs/latest/general/options.html)                    |
| redraw       | boolean                                                                    | `false`       | no       | Teardown and redraw chart on every update.                                                                                                         |
| datasetIdKey | string                                                                     | `"label"`     | no       | Key name to identificate dataset.                                                                                                                  |
| updateMode   | `resize`, `reset`, `none`, `hide`, `show`, `normal`, `active`              |               | no       | A mode string to indicate transition configuration should be used. [See more](https://www.chartjs.org/docs/latest/developers/api.html#update-mode) |

Examples:

<Tabs>
  <TabItem value="Pie" default>

````mdx
```chartjs
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
```
````

```chartjs width=300px
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
```

  </TabItem>
  <TabItem value="Bar" >

````mdx
```chartjs
type: bar
data:
  labels: ["January", "February", "March", "April", "May", "June", "July"]
  datasets:
    - name: "In"
      data: [0,2,6,1,7,13,2]
      backgroundColor: "rgba(255, 99, 132, 0.5)"

    - name: "Out"
      data: [4,2,11,8,6,1,4]
      backgroundColor: "rgba(53, 162, 235, 0.5)"
options:
  plugins: { legend: { position: 'bottom' } }
```
````

```chartjs width=300px
type: bar
data:
  labels: ["January", "February", "March", "April", "May", "June", "July"]
  datasets:
    - label: "In"
      data: [0,2,6,1,7,13,2]
      backgroundColor: "rgba(255, 99, 132, 0.5)"

    - label: "Out"
      data: [4,2,11,8,6,1,4]
      backgroundColor: "rgba(53, 162, 235, 0.5)"
options:
  plugins: { legend: { position: 'bottom' } }
```

  </TabItem>
  <TabItem value="Radar">

````mdx
```chartjs
type: radar
data:
  labels: ["Pressuers", "Shots", "Pass %", "Fouls Won", "Touches in Box", "Ball Recovery"]
  datasets:
    - label: "John Doe"
      data: [4,9,4,8,5,1]
      backgroundColor: "rgba(255, 99, 132, 0.5)"
redraw: false
```
````

```chartjs width=300px
type: radar
data:
  labels: ["Pressuers", "Shots", "Pass %", "Fouls Won", "Touches in Box", "Ball Recovery"]
  datasets:
    - label: "John Doe"
      data: [4,9,4,8,5,1]
      backgroundColor: "rgba(255, 99, 132, 0.5)"
redraw: false
```

  </TabItem>
</Tabs>

## Metadata

You can also specify some self-explanatory parameters inside the language metastring (leave a space
after the language): `width`, `height`, `center`, and `title`. The order is important! the `title`
should always be the last.

Example:

````mdx
```chartjs width=50% height=200px center title=Multitype Charts
{
  "type": "bar",
  "data": {
    "labels": ["January", "February", "March", "April", "May", "June", "July"],
    "datasets": [
      {
        "type": "line",
        "label": "Dataset 1",
        "borderColor": "rgb(255, 99, 132)",
        "borderWidth": 2,
        "fill": false,
        "data": [4,9,4,8,5,1,1]
      },
      {
        "type": "bar",
        "label": "Dataset 2",
        "backgroundColor": "rgb(53, 162, 235)",
        "data": [0,2,6,1,7,13,2]
      }
    ]
  }
}
```
````

```chartjs width=50% height=200px center title=Multitype Types
{
  "type": "bar",
  "data": {
    "labels": ["January", "February", "March", "April", "May", "June", "July"],
    "datasets": [
      {
        "type": "line",
        "label": "Dataset 1",
        "borderColor": "rgb(255, 99, 132)",
        "borderWidth": 2,
        "fill": false,
        "data": [4,9,4,8,5,1,1]
      },
      {
        "type": "bar",
        "label": "Dataset 2",
        "backgroundColor": "rgb(53, 162, 235)",
        "data": [0,2,6,1,7,13,2]
      }
    ]
  }
}
```
