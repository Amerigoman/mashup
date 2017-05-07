import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as MashupActions from '../actions/MashupActions';
import Map, { GoogleApiWrapper} from 'google-maps-react'


class MashupApp extends Component {
	
	render() {
		const { pos } = this.props.mashup;
		
		return (
			<div>
				<Map google={this.props.google}
				     initialCenter={pos}
				     zoom={14}>
				</Map>
			</div>
    )
  }
}

function mashup() {
	return GoogleApiWrapper({
		apiKey: 'AIzaSyBZsJgZdfRSQkB0ogr1Wwmxq0ckoQDphfE',
		libraries: [
			'places',
			'visualization'
		],
		version: '3.26'
	})(MashupApp)
}

// class MashupApp extends Component {
//   render() {
//
//     return (
//       <div>
//         <Map google={this.props.google} zoom={14}>
//
//           <Marker onClick={this.onMarkerClick}
//                   name={'Current location'} />
//
//           <InfoWindow onClose={this.onInfoWindowClose}>
//             <div>
//               <h1>{this.state.selectedPlace.name}</h1>
//             </div>
//           </InfoWindow>
//         </Map>
//       </div>
//     );
//   }
// }

function mapState(state) {
  return {
    mashup: state.mashup
  };
}

// function mapDispatch(dispatch) {
//   return {
//     actions: bindActionCreators(MashupActions, dispatch)
//   };
// }

export default connect(mapState)(mashup());
