import React, { Component } from 'react';
import ListItem from './Item';

class VenueList extends Component {
    render() {
        return(
            <ol className='venueList' aria-label='food locations'>
                {this.props.venues &&
                    this.props.venues.map((venue, id) => (
                        <ListItem key={id} {...venue} controlListClick={this.props.controlListClick}/>
                    ))}
            </ol>
        );
    }
}
export default VenueList;
