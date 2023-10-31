import { log } from 'node:console'
import chalk from 'chalk'

const procs = async (data) => {
  const labels = ['cpu', 'mem', 'pid', 'time', 'user', 'process']
  let headers = {}
  labels.forEach((el) => (headers[el] = el))

//   sortProcess === 'mem' ? dbObject.unshift(headers) : cpuObject.unshift(headers)

const logProcs = (dataSet) => {
    log(`Sorting by ${dataSet} useage`)
  data.processes[dataSet].forEach((row, i) => {
 

    if (i == 0) {
      log(chalk.greenBright.underline(
        `cpu\tmem\tpid\t${'time'.padEnd(8,' ')}\t${'user'.padEnd(8, ' ')}\tprocess`
      ))
    } else {
        log(`${row.cpu}\t${row.mem}\t${row.pid}\t${row.time.padEnd(
        8,
        ' '
      )}\t${row.user.padEnd(8, ' ')}\t${row.process}`)
    }
  })
}

if (data.processes.mem) logProcs('mem')
if (data.processes.cpu) logProcs('cpu')

//   return (await sortProcess) === 'mem' ? dbObject : cpuObject
}

export default procs