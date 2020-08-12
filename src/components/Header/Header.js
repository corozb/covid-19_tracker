import React from 'react'
import { FormControl, Select, MenuItem } from '@material-ui/core'

const Header = ({ country, countries, handleCountry }) => {
	return (
		<div className='app__header'>
			<h1>COVID-19 Tracker</h1>
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
	)
}

export default Header
