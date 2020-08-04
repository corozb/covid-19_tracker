import numeral from 'numeral'

export const getUrl = {
	getCountries: 'https://disease.sh/v3/covid-19/countries/',
	getAll: 'https://disease.sh/v3/covid-19/all',
	getHistory: 'https://disease.sh/v3/covid-19/historical/',
}

export const casesTypeColors = {
	cases: {
		hex: '#CC1034',
		half_op: 'rgba(204, 16, 52, 0.5)',
		multiplier: 800,
	},
	recovered: {
		hex: '#7dd71d',
		half_op: 'rgba(125,215,29,0.5)',
		multiplier: 1200,
	},
	deaths: {
		hex: '#fb4443',
		half_op: 'rgba(251,68,67,0.5)',
		multiplier: 2000,
	},
}

export const sortData = (data) => {
	const sortedData = [...data]

	return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
}

export const prettyPrintStat = (stat) =>
	stat ? `${numeral(stat).format('0.0a')}` : '+0'
