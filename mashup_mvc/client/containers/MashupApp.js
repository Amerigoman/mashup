import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MashupActions from '../actions/MashupActions';
import Map, { Marker, GoogleApiWrapper} from '../utils/src'
import SearchContainer from '../components/SearchContainer';
import ArticlesContainer from '../components/ArticlesContainer'


class MashupApp extends Component {
	
	render() {
		const { pos, foundCodes } = this.props.mashup;
		const { actions } = this.props;
		
		return (
			<div>
				<Map google={this.props.google }
				     clickableIcons={true}
				     initialCenter={pos}
				     center={pos}
				     zoom={16}
				     zoomControl={true}
				     
				     onZoom_changed={this._handleZoomChanged}
				     onIdle={ this.update.bind(this) }
					>
					{this.renderMarkers()}
				</Map>
				<SearchContainer searchCodes={ actions.searchCodes }
				                 actions={actions}
				                 foundCodes={foundCodes} />
				<ArticlesContainer mashup={this.props.mashup}
				                   actions={actions} />
			</div>
    )
  }
  
  renderMarkers() {
		const { codes } = this.props.mashup;
		
		if(codes) {
			return codes.map(code =>
				<Marker title={code.city + ' ' + code.postal_code}
				        name={code.city}
				        position={
					        {lat: code.latitude, lng: code.longitude}
				        }
				        onClick={ this.onMarkerClick.bind(this, code) }
				        key={code.url.split('/').slice(-2, -1)[0]}
				/>
			)
		}
  }
  
  onMarkerClick(code, props, marker) {
		let { lang, chosenMarker } = this.props.mashup;
	  let place = code.city + ',' + code.postal_code;
	  
	  if (chosenMarker !== place)
	  	this.props.actions.resetPlace(place);
	  
		this.props.actions.getArticles(place, lang);
  }
  
  update(props, map) {
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
