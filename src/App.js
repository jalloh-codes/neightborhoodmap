import React, { Component } from 'react';
import './App.css';
import Maps from './components/Maps';
import SideBar from './components/SideBar';
import API from './components/Source';
import Side from './components/Side';


class App extends Component {
    constructor(props){
        super(props);
        this.state= {
            venues:[],
            markers:[],
            center: [],
            zoom: 12,
            sideBarOpen: false,
            updateState: obj => {
                this.setState(obj)
            }
        };
    }


    // close the a marker is open
    closeMarker = () => {
        const markers = this.state.markers.map(marker =>{
            marker.isOpen = false;
            return marker
        });
        this.setState({markers: Object.assign(this.state.markers, markers)});
    }
    controlMarker = (marker) =>{
        this.closeMarker();
        marker.isOpen = true;
        this.setState({markers: Object.assign(this.state.markers, marker)});
        const venue = this.state.venues.find(venue => venue.id === marker.id);
        API.getVenuesDetails(marker.id).then(res => {
            const newVenue = Object.assign(venue, res.response.venue);
            this.setState({venues: Object.assign(this.state.venues, newVenue)});
        })
        .catch(error => {
            console.log('Error loading venue details', error);
        })
    }

    // when venues list is click under the menu it open the targeted location marker
    controlListClick = venue => {
        const marker = this.state.markers.find(marker => marker.id === venue.id);
        this.controlMarker(marker)
    }
    // set the sideBar true or false
    handleSideBarOpen = () =>{
        this.setState((prevState) => {
            return {sideBarOpen: !prevState.sideBarOpen}
        });
    }

    //collecting locations informtions
    componentDidMount(){
        API.search({
            query: 'food',
            near: 'NY',
        }).then(results => {
            const { venues} = results.response;
            const { center} = results.response.geocode.feature.geometry;
            const markers = venues.map(venue =>{
                return{
                    lat: venue.location.lat,
                    lng: venue.location.lng,
                    isOpen: false,
                    isVisble: true,
                    id: venue.id
                };
            });
            this.setState({ venues, center, markers})
        })
        .catch((err) =>{
            console.log(`Data not loading  ${err}`);
        });
    }

    render() {
        // help control the sideBar menu by targeting the header button
        let sideOpen;
        if(this.state.sideBarOpen){
            sideOpen =<Side {...this.state} controlListClick={this.controlListClick}/>;
        }
        return (
            <div className="App">

                <header className="App-header">
                    <SideBar drawOpen={this.handleSideBarOpen}/>
                </header>
                <main style={{display:'flex'}}>
                    {sideOpen}
                    <Maps {...this.state}controlMarker={this.controlMarker}/>
                </main>
            </div>
        );
    }
}

export default App;
