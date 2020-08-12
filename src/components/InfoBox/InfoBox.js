import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import numeral from 'numeral'

import { prettyPrintStat } from '../Utils/utils'
import './InfoBox.css'

const InfoBox = ({
	title,
	cases,
	active,
	isRed,
	isBlue,
	total,
	totalCases,
	...props
}) => {
	let percent = total / totalCases
	total = prettyPrintStat(total)
	let perDay = numeral(cases).format('0,0')

	return (
		<Card
			onClick={props.onClick}
			className={`infoBox ${active && 'infoBox-selected'} ${
				isRed && 'infoBox-red'
			} ${isBlue && 'infoBox-active'}`}>
			<CardContent>
				<Typography className='infoBox__title' color='textSecondary'>
					{title}
				</Typography>
				<h2
					className={`infoBox__cases ${isRed && 'infoBox__cases-red'} ${
						isBlue && 'infoBox__cases-blue'
					}`}>
					{total}
				</h2>
				<Typography className='infoBox__total' color='textSecondary'>
					{(parseFloat(percent) * 100).toFixed(2)} % over total
				</Typography>
				<Typography className='infoBox__total' color='textSecondary'>
					{perDay >= 0 ? '' : `${perDay}  today`}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default InfoBox
