import React from 'react'
import { Circle, Popup } from 'react-leaflet'
import numeral from 'numeral'

import { casesTypeColors } from '../Utils/utils'
import './Bubble.css'

const Bubble = ({ data, casesType }) =>
	data.map((country) => (
		<Circle
			key={country.country}
			center={[country.countryInfo.lat, country.countryInfo.long]}
			color={casesTypeColors[casesType].hex}
			fillColor={casesTypeColors[casesType].hex}
			fillOpacity={0.4}
			radius={
				Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
			}>
			<Popup>
				<div className='info-container'>
					<div
						className='info-flag'
						style={{
							backgroundImage: `url(${country.countryInfo.flag})`,
						}}
					/>
					<div className='info-data'>
						<div className='info-name'>{country.country}</div>
						<div className='info-confirmed'>
							Cases: {numeral(country.cases).format('0,0')}
						</div>
						<div className='info-active'>
							Active: {numeral(country.active).format('0,0')}
						</div>
						<div className='info-recovered'>
							Recovered: {numeral(country.recovered).format('0,0')}
						</div>
						<div className='info-deceases'>
							Deceased: {numeral(country.deaths).format('0,0')}
						</div>
					</div>
				</div>
			</Popup>
		</Circle>
	))

export default Bubble
