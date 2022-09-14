import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts"

const TestBoxChart = () => {
  const [myData, setMyData] = useState<any>(null)
  useEffect(() => {
    let bpData = []
    for (let i = 0; i < 200; i++) {
      bpData.push(
        {
          x: i,
          y: [i, i + 1, i + 2, i + 3, i + 4]
        }
      )
    }
    setMyData(bpData)
  }, [])
  if (!myData) return <p></p>
  return (
    <Chart
      type='boxPlot'
      options={{}}
      series={
        [{ data: myData }]
      }
    />
  )
}

export default TestBoxChart