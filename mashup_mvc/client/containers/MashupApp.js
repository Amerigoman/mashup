import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MashupActions from '../actions/MashupActions';
// import { InfoWindow } from '../utils/google-maps-react'
import Map, { Marker, InfoWindow,  GoogleApiWrapper} from '../utils/src'
import SearchContainer from '../components/SearchContainer';
import ArticlesContainer from '../components/ArticlesContainer'
import _ from 'underscore';


class MashupApp extends Component {
	
	render() {
		const { pos, articles, chosenMarker, foundCodes } = this.props.mashup;
		const { actions } = this.props;
		
		console.log(chosenMarker);
		
		return (
			<div>
				<Map google={this.props.google }
				     clickableIcons={true}
				     initialCenter={pos}
				     center={pos}
				     zoom={16}
				     zoomControl={true}
				     
				     onZoom_changed={this._handleZoomChanged}
				     onIdle={ this._update.bind(this) }
					>
					{this.renderMarkers()}
				</Map>
				<SearchContainer searchCodes={ actions.searchCodes }
				                 actions={actions}
				                 foundCodes={foundCodes} />
				<ArticlesContainer articles={articles}
				                   chosenMarker={chosenMarker}
				                   getArticles={actions.getArticles} />
			</div>
    )
  }
  
  renderMarkers() {
		const { codes } = this.props.mashup;
		
		console.log(codes);
		
		if(codes)
			return codes.map( code =>
				<Marker title={code.city + ' ' + code.postal_code}
				        name={code.city}
				        position={
				          { lat: code.latitude, lng: code.longitude }
				        }
				        onClick={ this._onMarkerClick.bind(this, code) }
				        key={code.url.split('/').slice(-2, -1)[0]}
				/>);
  }
  
  _onMarkerClick(code, props, marker) {
		
		// console.log(props);
		// console.log(marker);
		// this.props.actions.setInfoWindow(props, marker);
	  
	  let place = code.city + ',' + code.postal_code;
		this.props.actions.getArticles(place, 'ua');
  }
  
  // shouldComponentUpdate(nextProps, nextState) {
		// let codes = this.props.mashup.codes;
		// let nextCodes = nextProps.mashup.codes;
  //
		// if(typeof codes === 'undefined' || typeof nextCodes === 'undefined' ||
		// 	codes.length !== nextCodes.length) {
		// 	return true;
		// }
  //
		// let codesSorted = this.props.mashup.codes.sort(this._compare);
		// let nextCodesSorted = nextProps.mashup.codes.sort(this._compare);
		// let result = _.isEqual(codesSorted, nextCodesSorted);
  //
		// return !result;
  // }
  
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
