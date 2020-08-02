import React, { useState, useEffect } from 'react'
import { FormControl, Select, MenuItem } from '@material-ui/core'

import InfoBox from './components/InfoBox'
import './App.css'

function App() {
	const [countries, setCountries] = useState([])
	const [country, setCountry] = useState('worldwide')

	useEffect(() => {
		const getCountries = async () => {
			await fetch('https://disease.sh/v3/covid-19/countries')
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						iso: country.countryInfo.iso2,
					}))
					setCountries(countries)
				})
		}
		getCountries()
	}, [])

	const handleCountry = (event) => {
		const countryCode = event.target.value
		console.log('code', countryCode)
		setCountry(countryCode)
	}

	return (
		<div className='App'>
			<div className='app__header'>
				<h1>COVID 19 Tracker</h1>
				<FormControl className='app_dropdown'>
					<Select variant='outlined' value={country} onChange={handleCountry}>
						<MenuItem value='worldwide'>Worldwide</MenuItem>
						{countries.map((country) => (
							<MenuItem value={country.iso} key={country.name}>
								{country.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>

			<div className='app__stats'>
				<InfoBox title='Total Cases' cases='4568' total='8547' />
				<InfoBox title='Recovered' cases='4568' total='8547' />
				<InfoBox title='Deceased' cases='4568' total='8547' />
			</div>

			{/* InfoBox */}
			{/* InfoBox */}
			{/* InfoBox */}

			{/* Map */}
			{/* Table */}
			{/* Graph */}
		</div>
	)
}

export default App
