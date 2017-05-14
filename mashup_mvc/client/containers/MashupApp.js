import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MashupActions from '../actions/MashupActions';
// import { InfoWindow } from '../utils/google-maps-react'
import Map, { Marker, InfoWindow,  GoogleApiWrapper} from '../utils/src'
import SearchContainer from '../components/SearchContainer';
import _ from 'underscore';


class MashupApp extends Component {
	
	render() {
		const { pos, iwIsVisible, activeMarker, codes } = this.props.mashup;
		const { actions } = this.props;
		
		// console.log('In render!!!');
		
		return (
			<div>
				<Map google={this.props.google }
				     clickableIcons={true}
				     initialCenter={pos}
				     zoom={16}
				     
				     onIdle={ this._update.bind(this) }
					>
					{codes && codes.map( (code, index) => (
						(<Marker title={code.city + ' ' + code.url.split('/').slice(-2, -1)[0]}
						        name={code.city}
						        position={
						        	{ lat: code.latitude, lng: code.longitude }
						        }
						        onClick={ (props, marker) => this._onMarkerClick(props, marker) }
						        key={code.url.split('/').slice(-2, -1)[0]}
						>
								<InfoWindow
									marker={activeMarker}
									visible={iwIsVisible}
									key={(index+1)*code.url.split('/').slice(-2, -1)[0]}>
									<div>
										<h1>{iwIsVisible}</h1>
									</div>
								</InfoWindow>
							</Marker>
						)))}
					
				</Map>
				<SearchContainer searchCodes={ actions.searchCodes } />
			</div>
    )
  }
  
  _onMarkerClick(props, marker) {
		console.log(props);
		console.log(marker);
		// console.log(index);
		this.props.actions.setInfoWindow(props, marker);
		//
		// this.props.actions.getArticles.bind(
		// 	this,
		// 	code.city + ',' + code.url.split('/').slice(-2, -1)[0],
		// 	'ua'
		// )
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
  
  _compare(a, b) {
		let a_value = Number(a.url.split('/').slice(-2, -1)[0]);
		let b_value = Number(b.url.split('/').slice(-2, -1)[0]);
		
		
		if(a_value < b_value) return -1;
		if(a_value > b_value) return 1;
		return 0;
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
