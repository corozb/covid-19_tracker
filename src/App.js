import React, { useState, useEffect } from 'react'
import {
	FormControl,
	Select,
	MenuItem,
	CardContent,
	Card,
} from '@material-ui/core'
import 'leaflet/dist/leaflet.css'

import InfoBox from './components/InfoBox/InfoBox'
import Map from './components/Map/Map'
import Table from './components/Table/Table'
import Chart from './components/Chart/Chart'
import { sortData, prettyPrintStat } from './utils'
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
			await fetch('https://disease.sh/v3/covid-19/all')
				.then((response) => response.json())
				.then((data) => {
					setCountryInfo(data)
				})
		}
		getWorldwide()
	}, [])

	useEffect(() => {
		const getCountries = async () => {
			await fetch('https://disease.sh/v3/covid-19/countries')
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
				? 'https://disease.sh/v3/covid-19/all'
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`

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
				<div className='app__header'>
					<h1>COVID 19 Tracker</h1>
					<FormControl className='app__dropdown'>
						<Select variant='outlined' value={country} onChange={handleCountry}>
							<MenuItem value='worldwide'>Worldwide</MenuItem>
							{countries.map(({ country, countryInfo }) => (
								<MenuItem value={countryInfo.iso2} key={country}>
									{country}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				<div className='app__stats'>
					<InfoBox
						isRed
						active={casesType === 'cases'}
						onClick={(event) => setCasesType('cases')}
						title='Total Cases'
						cases={prettyPrintStat(countryInfo.todayCases)}
						total={prettyPrintStat(countryInfo.cases)}
					/>
					<InfoBox
						active={casesType === 'recovered'}
						onClick={(event) => setCasesType('recovered')}
						title='Recovered'
						cases={prettyPrintStat(countryInfo.todayRecovered)}
						total={prettyPrintStat(countryInfo.recovered)}
					/>
					<InfoBox
						isRed
						active={casesType === 'deaths'}
						onClick={(event) => setCasesType('deaths')}
						title='Deceased'
						cases={prettyPrintStat(countryInfo.todayDeaths)}
						total={prettyPrintStat(countryInfo.deaths)}
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
				<CardContent>
					<h3>Live Cases by Country</h3>
					<Table countries={tableData} />
				</CardContent>
				<CardContent>
					<h3 className='app__chartTitle'>Worldwide new {casesType}</h3>
					<Chart casesType={casesType} />
				</CardContent>
			</Card>
		</div>
	)
}

export default App
