import React from "react";

import { Bar } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'

function BarChartTwo({chartData}) {
    
    return <Bar data={chartData} />
} 

export default BarChartTwo;