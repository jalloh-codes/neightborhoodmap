import React, { Component } from 'react';
import ListItem from './Item';


// it add the <li> tag from ListItem and make it clikable to view the location marker
class VenueList extends Component {
    render() {
        return(
            <ol className='venueList' aria-label='venues location' tabIndex="0">
                {this.props.venues &&
                    this.props.venues.map((venue) => (
                        <ListItem key={venue.id} {...venue} controlListClick={this.props.controlListClick}/>
                    ))}
            </ol>
        );
    }
}
export default VenueList;
