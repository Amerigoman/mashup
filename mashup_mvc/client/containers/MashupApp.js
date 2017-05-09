import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MashupActions from '../actions/MashupActions';
// import Map, { GoogleApiWrapper} from '../utils/google-maps-react'
import Map, { Marker, GoogleApiWrapper} from '../utils/src'
import _ from 'underscore';


class MashupApp extends Component {
	
	render() {
		const { pos } = this.props.mashup;
		// const { actions } = this.props;
		
		// console.log(this.props.mashup);
		// console.log('In render!!!');
		
		return (
			<div>
				<Map google={this.props.google}
				     clickableIcons={true}
				     initialCenter={pos}
				     zoom={13}
				     
				     onIdle={ this._update.bind(this) }
				     // onDragend={ this._update }
				     // onZoom_changed={ this._update }
				     // onDragstart={ this._removeMarkers }
					>
					{ this._renderCodes() }
				</Map>
			</div>
    )
  }
  
  shouldComponentUpdate(nextProps, nextState) {
		let codes = this.props.mashup.codes;
		let nextCodes = nextProps.mashup.codes;
		
		if(typeof codes === 'undefined' || typeof nextCodes === 'undefined' ||
			codes.length !== nextCodes.length) {
			return true;
		}
		
		let codesSorted = this.props.mashup.codes.sort(this._compare);
		let nextCodesSorted = nextProps.mashup.codes.sort(this._compare);
		let result = _.isEqual(codesSorted, nextCodesSorted);
		
		return !result;
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
		
		this.props.actions.getPostalCodes(
			sw.lat() + ',' + sw.lng(),
			ne.lat() + ',' + ne.lng()
		);
	}
	
	_removeMarkers() {
		console.log('remove markers');
	}
	
	_compare(a, b) {
		let a_value = Number(a.url.split('/').slice(-2, -1)[0]);
		let b_value = Number(b.url.split('/').slice(-2, -1)[0]);
		
		
		if(a_value < b_value) return -1;
		if(a_value > b_value) return 1;
		return 0;
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
