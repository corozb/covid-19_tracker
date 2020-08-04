import React from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import Bubble from '../Bubble/Bubble'
import './Map.css'

const Map = ({ casesType, stage, center, zoom }) => {
	return (
		<div className='map'>
			<LeafletMap center={center} zoom={zoom}>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				<Bubble data={stage} casesType={casesType} />
			</LeafletMap>
		</div>
	)
}

export default Map
