import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    // customizing the map, center it based of the venues locations
  <GoogleMap
    role="application"
    aria-label="Google Map"
    defaultZoom={8}
    zoom={props.zoom}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    center={props.center}
  >
    {props.markers &&
        props.markers.filter(marker => marker.isVisble).map((marker, id) => {
            const venueInfo = props.venues.find(venue => venue.id === marker.id);
            return(
                // add a markers that contain details about the location
                <Marker
                key={id}
                position={{ lat: marker.lat, lng: marker.lng }}
                animation= {window.google.maps.Animation.DROP}
                onClick={() => props.controlMarker(marker)}

                >
                    {marker.isOpen &&
                        venueInfo.bestPhoto && (
                        <InfoWindow>
                            <React.Fragment>
                                <img src={`${venueInfo.bestPhoto.prefix}100x100${venueInfo.bestPhoto.suffix}`} alt={`${venueInfo.name}`}/>
                                <p> {venueInfo.name}</p>
                                <p> {venueInfo.location.address}</p>
                            </React.Fragment>
                        </InfoWindow>
                        // Data collected from FourSquare
                    )}
                </Marker>
            );
        })}

  </GoogleMap>
))


export default class Maps extends Component {


    render() {
        return (
            <MyMapComponent
            {...this.props}

            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAk5yr8x3RpnZuSbnq4tAV6Uzrme5u6QC4"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100vh`, width:'-webkit-fill-available'  }} />}
            mapElement={<div style={{ height: `100%`, overflow:'auto', position:'sticky'}} />}
            />
        );
    }
}
