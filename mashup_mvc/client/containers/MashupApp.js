import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MashupActions from '../actions/MashupActions';
// import Map, { GoogleApiWrapper} from '../utils/google-maps-react'
import Map, { Marker, GoogleApiWrapper} from '../utils/src'


class MashupApp extends Component {
	
  componentDidMount() {
  	this.props.actions.getPostalCodes('49.8,36.4', '50,36.5');
  }
  
  _getBounds(props, map) {
  		this.props.actions.getBounds(map)
  }
	
	render() {
		const { pos, codes } = this.props.mashup;
		const { actions } = this.props;
		
		console.log(this.props.mashup);
		console.log(actions);
		
		return (
			<div>
				<Map google={this.props.google}
				     clickableIcons={true}
				     initialCenter={pos}
				     zoom={14}
				     
				     // onReady={ this._getBounds }
				     onDragend={ this._update  }
				     onZoom_changed={ this._update }
				     onDragstart={ this._removeMarkers }>
					{ this._renderCodes() }
				</Map>
			</div>
    )
  }
  
  _renderCodes() {
    const { codes } = this.props.mashup;
    
    if (codes) {
      return codes.map(
      	code => <Marker title={code.city + ' ' + code.url.split('/').slice(-2, -1)[0]}
	                      position={
	                      	{
	                      		lat: code.latitude,
			                      lng: code.longitude
	                      	}
	                      }
	                      key={code.url.split('/').slice(-2, -1)[0]}
	      />)
    }
  }
  
  _update(props, map) {
		let bounds = map.getBounds();
		let ne = bounds.getNorthEast();
		let sw = bounds.getSouthWest();
		
		// console.log(ne.lat(), ne.lng());
		// console.log(sw.lat(), sw.lng());
	// 	actions.getPostalCodes(
	// 		sw.lat() + ',' + sw.lng(),
	// 		ne.lat() + ',' + ne.lng(),
	// 	)
	}
	
	_removeMarkers() {
		console.log('remove markers');
	}
}

function mashup() {
	return GoogleApiWrapper({
		apiKey: 'AIzaSyBZsJgZdfRSQkB0ogr1Wwmxq0ckoQDphfE',
		libraries: [
			'places',
			'visualization'
			// 'roadmap'
		],
		version: '3.26'
	})(MashupApp)
}

function mapState(state) {
  return {
    mashup: state.mashup
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(MashupActions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(mashup());
