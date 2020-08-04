import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

import Notification from '../Utils/Notification'
import { getUrl, casesTypeColors } from '../Utils/utils'

const options = {
	legend: {
		display: false,
	},
	elements: {
		point: {
			radius: 0,
		},
	},
	maintainAspectRatio: false,
	tooltips: {
		mode: 'index',
		intersect: false,
		callbacks: {
			label: function (tooltipItem, data) {
				return numeral(tooltipItem.value).format('+0,0')
			},
		},
	},
	scales: {
		xAxes: [
			{
				type: 'time',
				time: {
					parser: 'MM/DD/YY',
					tooltipFormat: 'll',
				},
			},
		],
		yAxes: [
			{
				gridLines: {
					display: false,
				},
				ticks: {
					// Include a dollar sign in the ticks
					callback: function (value, index, values) {
						return numeral(value).format('0a')
					},
				},
			},
		],
	},
}

const buildChartData = (data, casesType) => {
	let chartData = []
	let lastDataPoint

	for (let date in data.cases) {
		if (lastDataPoint) {
			let newDataPoint = {
				x: date,
				y: data[casesType][date] - lastDataPoint,
			}
			chartData.push(newDataPoint)
		}
		lastDataPoint = data[casesType][date]
	}
	return chartData
}

const Chart = ({ casesType, country, countryInfo }) => {
	const [dataChart, setDataChart] = useState({})
	const [alertMessage, setAlertMessage] = useState(null)

	const countryData = country === 'worldwide' ? (country = 'all') : country
	const url = `${getUrl.getHistory}${countryData}?lastdays=120`

	useEffect(() => {
		const fetchData = async () => {
			await fetch(url)
				.then((response) => response.json())
				.then((data) => {
					const stages = countryData === 'all' ? data : data.timeline
					let chartData = buildChartData(stages, casesType)
					setDataChart(chartData)
				})
				.catch((error) => {
					setAlertMessage({
						message: "Country doesn't have any historical data",
					})
				})
		}
		fetchData()
	}, [casesType, url, countryData])

	return (
		<>
			<h3 className='app__chartTitle'>
				{countryInfo.country} Total {casesType} evolution
			</h3>
			<div className='app__chart'>
				{dataChart?.length > 0 && (
					<Line
						data={{
							datasets: [
								{
									backgroundColor: casesTypeColors[casesType].half_op,
									borderColor: casesTypeColors[casesType].hex,
									data: dataChart,
								},
							],
						}}
						options={options}
					/>
				)}
			</div>
			{alertMessage && <Notification message={alertMessage.message} />}
		</>
	)
}

export default Chart
