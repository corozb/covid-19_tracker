import React, { useState, useEffect } from 'react'
import { CardContent, Card, Typography } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import Switch from '@material-ui/core/Switch'
import Toolbar from '@material-ui/core/Toolbar'
import { orange, lightBlue } from '@material-ui/core/colors'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import numeral from 'numeral'

import Header from './components/Header/Header'
import InfoBox from './components/InfoBox/InfoBox'
import Map from './components/Map/Map'
import Table from './components/Table/Table'
import Chart from './components/Chart/Chart'
import { getUrl, sortData } from './components/Utils/utils'
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

	const [darkState, setDarkState] = useState(false)
	const palletType = darkState ? 'dark' : 'light'
	const darkTheme = createMuiTheme({
		palette: {
			type: palletType,
			primary: {
				main: orange[500],
			},
			secondary: {
				main: lightBlue[500],
			},
		},
	})
	const handleThemeChange = () => {
		setDarkState(!darkState)
	}

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
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Toolbar>
				<Switch checked={darkState} onChange={handleThemeChange} />
			</Toolbar>
			<div className='app'>
				<div className='app__left'>
					<Header
						country={country}
						countries={countries}
						handleCountry={handleCountry}
					/>
					<Typography variant='h4'>
						{numeral(countryInfo.cases).format('0,0')}
						<h6>total cases</h6>
					</Typography>
					<div className='app__stats'>
						<InfoBox
							isRed
							active={casesType === 'cases'}
							onClick={(event) => setCasesType('cases')}
							title='Active'
							total={countryInfo.active}
							cases={countryInfo.todayCases}
							totalCases={countryInfo.cases}
						/>
						<InfoBox
							active={casesType === 'recovered'}
							onClick={(event) => setCasesType('recovered')}
							title='Recovered'
							total={countryInfo.recovered}
							cases={countryInfo.todayRecovered}
							totalCases={countryInfo.cases}
						/>
						<InfoBox
							isRed
							active={casesType === 'deaths'}
							onClick={(event) => setCasesType('deaths')}
							title='Deceased'
							total={countryInfo.deaths}
							cases={countryInfo.todayDeaths}
							totalCases={countryInfo.cases}
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
		</ThemeProvider>
	)
}

export default App
