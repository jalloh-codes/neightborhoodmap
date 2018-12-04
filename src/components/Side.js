import React, { Component } from 'react';
import VenueList from './List';





class Side extends Component {
    constructor(){
        super()
        this.state ={
            query:'',
            venues: [],
        }
    }
    handleFilterVenues = () =>{
        if (this.state.query.trim() !== "") {
            const venues = this.props.venues.filter(venue =>
                venue.name.toLowerCase().includes(this.state.query.toLowerCase())
            )
            return venues;
        }
        return this.props.venues;
    };
    handleChange = e => {
        this.setState({query: e.target.value});
        const markers = this.props.venues.map(venue =>{
            const isMatched = venue.name.toLowerCase().includes( e.target.value.toLowerCase());
            const marker = this.props.markers.find(marker => marker.id === venue.id);
            if(isMatched){
                marker.isVisble = true;
            }else {
                marker.isVisble = false;
            }
            return marker;
        });
        this.props.updateState({markers})
    }

    render() {
        return(
            // the side bar menu that contain the filter input and venues datails
            <nav  aria-label="sidebar menu" className='sideBar'>
                <p>Bart Location</p>
                <input aria-label='filter locations' tabIndex="0" type={'search'} id={'search'} placeholder={'Filter'}
                onChange={this.handleChange}/>
                <VenueList
                {...this.props}
                venues={this.handleFilterVenues()}
                controlListClick={this.props.controlListClick}/>
            </nav>
        );
    }
}
export default Side;
