import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

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

const Chart = ({ casesType }) => {
	const [dataChart, setData] = useState({})
	// https://disease.sh/v3/covid-19/historical/CO?lastdays=120
	// https://disease.sh/v3/covid-19/historical/all?lastdays=30

	// const countryData = country === 'worldwide' ? (country = 'all') : country
	const url = `https://disease.sh/v3/covid-19/historical/all?lastdays=120`

	useEffect(() => {
		const fetchData = async () => {
			await fetch(url)
				.then((response) => response.json())
				.then((data) => {
					let chartData = buildChartData(data, casesType)
					setData(chartData)
				})
		}
		fetchData()
	}, [casesType])

	return (
		<div>
			{dataChart?.length > 0 && (
				<Line
					data={{
						datasets: [
							{
								backgroundColor: 'rgba(204, 16, 52, 0.5)',
								borderColor: '#CC1034',
								data: dataChart,
							},
						],
					}}
					options={options}
				/>
			)}
		</div>
	)
}

export default Chart
