import React from 'react'
import { FormControl, Select, MenuItem } from '@material-ui/core'
import './App.css'

function App() {
	return (
		<div className='App'>
			<h1>COVID 19</h1>
			<FormControl className='app_dropdown'>
				<Select variant='outlined' value='abc'>
					<MenuItem value='worldwide'>Worldwide</MenuItem>
					<MenuItem value='worldwide'>Worldwide</MenuItem>
					<MenuItem value='worldwide'>Worldwide</MenuItem>
					<MenuItem value='worldwide'>Worldwide</MenuItem>
					<MenuItem value='worldwide'>Worldwide</MenuItem>
				</Select>
			</FormControl>

			{/* Header */}
			{/* Title + Select input dropdown field */}
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
