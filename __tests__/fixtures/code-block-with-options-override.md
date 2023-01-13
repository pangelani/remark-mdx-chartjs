# chartjs code block with options override

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
    title:
      display: true
      text: Chart.js Bar Chart
redraw: true
```
