import React from 'react'
import numeral from 'numeral'
import './Table.css'

const Table = ({ countries }) => {
	return (
		<div className='table'>
			<ol>
				{countries.map(({ country, cases }) => (
					<li key={country}>
						<tr>
							<td>{country}</td>
							<td>
								<strong>{numeral(cases).format('0,0')}</strong>
							</td>
						</tr>
					</li>
				))}
			</ol>
		</div>
	)
}

export default Table
