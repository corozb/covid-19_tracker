import React from 'react'
import './Table.css'

const Table = ({ countries }) => {
	return (
		<div className='table'>
			<ol>
				{countries.map(({ country, cases }) => (
					<li>
						<tr>
							<td>{country}</td>
							<td>
								<strong>{cases}</strong>
							</td>
						</tr>
					</li>
				))}
			</ol>
		</div>
	)
}

export default Table
