---
sidebar_position: 5
---

# Config

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