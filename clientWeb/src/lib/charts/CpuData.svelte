<script>
  import { Line } from 'svelte-chartjs'
  import options from './dataOptions.js'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    Filler
  } from 'chart.js'

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    Filler
  )
  export let metrics
  // console.log(metrics)
  let chartData
  async function updateData(metrics) {
    chartData = await new Promise(async (res, rej) => {
      await metrics
      res({
        title: 'System metrics',
        labels: metrics?.map((x) => x.time),
        // return `${time.getMinutes()} : ${time.getSeconds()}`
        datasets: [
          {
            label: 'cpu usage percentage',
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0,
            data: metrics?.map((x) => (x.cpu * 100).toFixed(2)),
            showLine: true,
            borderWidth: 1
          }
        ]
      })
    })
  }
  $: if (metrics) updateData(metrics)
  // $: if (metrics) {
  //   chartData.datasets[0].data = metrics?.map((x) => (x.cpu * 100).toFixed(2))
  //   chartData.labels = metrics?.map((x) => x.time)
  //   options = options
  // }
  ChartJS.defaults.color = 'white'
  // $: data = data
  // chartRef.update()

  //   function updateCharts(chartRef) {
  //     chartRef.update()
  //   }
  //   $: if (metrics.length < 300) {
  //     updateCharts()
  //   }
</script>

<!-- <div class="inner-chart-container" style="position: relative;"> -->
{#await metrics && chartData then}
  <Line class="inner-chart-container" data={chartData} {options} />
{/await}

<!-- </div> -->
