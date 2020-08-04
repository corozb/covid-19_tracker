import React, { useState, useEffect } from 'react'
import { CardContent, Card } from '@material-ui/core'

import Header from './components/Header/Header'
import InfoBox from './components/InfoBox/InfoBox'
import Map from './components/Map/Map'
import Table from './components/Table/Table'
import Chart from './components/Chart/Chart'
import { getUrl, sortData, prettyPrintStat } from './components/Utils/utils'
import './App.css'

function App() {
	const [countries, setCountries] = useState([])
	const [country, setCountry] = useState('worldwide')
	const [countryInfo, setCountryInfo] = useState({})
	const [tableData, setTableData] = useState([])
	const [mapLocation, setMapLocation] = useState({
		lat: 34.80746,
		lng: -40.4796,
	})
	const [mapZoom, setMapZoom] = useState(3)
	const [stage, setStage] = useState([])
	const [casesType, setCasesType] = useState('cases')

	useEffect(() => {
		const getWorldwide = async () => {
			await fetch(getUrl.getAll)
				.then((response) => response.json())
				.then((data) => {
					setCountryInfo(data)
				})
		}
		getWorldwide()
	}, [])

	useEffect(() => {
		const getCountries = async () => {
			await fetch(getUrl.getCountries)
				.then((response) => response.json())
				.then((data) => {
					setCountries(data)
					const sortedData = sortData(data)
					setTableData(sortedData)
					setStage(data)
				})
		}
		getCountries()
	}, [])

	const handleCountry = async (event) => {
		const countryCode = event.target.value
		setCountry(countryCode)

		const url =
			countryCode === 'worldwide'
				? getUrl.getAll
				: `${getUrl.getCountries}${countryCode}`

		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCountry(countryCode)
				setCountryInfo(data)
				setMapLocation([data.countryInfo.lat, data.countryInfo.long])
				setMapZoom(5)
			})
	}

	return (
		<div className='app'>
			<div className='app__left'>
				<Header
					country={country}
					countries={countries}
					handleCountry={handleCountry}
				/>
				<h5>{prettyPrintStat(countryInfo.cases)} total cases</h5>
				<div className='app__stats'>
					<InfoBox
						isRed
						active={casesType === 'cases'}
						onClick={(event) => setCasesType('cases')}
						title='Active'
						total={prettyPrintStat(countryInfo.active)}
						cases={prettyPrintStat(countryInfo.todayCases)}
					/>
					<InfoBox
						active={casesType === 'recovered'}
						onClick={(event) => setCasesType('recovered')}
						title='Recovered'
						total={prettyPrintStat(countryInfo.recovered)}
						cases={prettyPrintStat(countryInfo.todayRecovered)}
					/>
					<InfoBox
						isRed
						active={casesType === 'deaths'}
						onClick={(event) => setCasesType('deaths')}
						title='Deceased'
						total={prettyPrintStat(countryInfo.deaths)}
						cases={prettyPrintStat(countryInfo.todayDeaths)}
					/>
				</div>
				<Map
					casesType={casesType}
					stage={stage}
					center={mapLocation}
					zoom={mapZoom}
				/>
			</div>

			<Card className='app__right'>
				<CardContent className='app__table'>
					<Table countries={tableData} />
				</CardContent>
				<CardContent className='app__chart'>
					<Chart
						casesType={casesType}
						country={country}
						countryInfo={countryInfo}
					/>
				</CardContent>
			</Card>
		</div>
	)
}

export default App
