import React from 'react'
import numeral from 'numeral'
import './Table.css'

const Table = ({ countries }) => {
	return (
		<>
			<h3 className='table__title'>Live Cases by Country</h3>
			<div className='table'>
				<ol>
					{countries.map(({ country, cases }) => (
						<li key={country}>
							<span>
								<h4>{country}</h4>
								<h4 className='table__number'>
									{numeral(cases).format('0,0')}
								</h4>
							</span>
						</li>
					))}
				</ol>
			</div>
		</>
	)
}

export default Table
