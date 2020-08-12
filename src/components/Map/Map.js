import React from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import Bubble from '../Bubble/Bubble'
import './Map.css'

const Map = ({ casesType, stage, center, zoom, dark }) => {
	return (
		<div className='map'>
			<LeafletMap center={center} zoom={zoom}>
				{dark ? (
					<TileLayer
						url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
						attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
					/>
				) : (
					<TileLayer
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
				)}
				<Bubble data={stage} casesType={casesType} />
			</LeafletMap>
		</div>
	)
}

export default Map
