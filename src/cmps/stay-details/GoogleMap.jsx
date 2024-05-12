import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Component } from 'react';

class _GoogleMap extends Component {

    state = {
        lat: -8.61308,
        lng: 41.1413
    }

    componentDidMount() {
        this.setState({ lat: this.props.pos.lat, lng: this.props.pos.lng })
    }

    render() {
        return (
            <section className="google-map">
                <Map
                    className="map"
                    google={this.props.google}
                    zoom={14}
                    initialCenter={{
                        lat: this.state.lat,
                        lng: this.state.lng
                    }}
                    center={this.state}
                >
                    <Marker
                        position={this.state}
                        name={'Current location'} />

                    <InfoWindow
                        visible={true}
                        position={this.state}
                    >
                        <div>
                            <h1>Your next trip is here!</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </section>
        )
    }
}

export const GoogleMap = GoogleApiWrapper({
    apiKey: ('AIzaSyCUEnEL-D59JCymx_6jmOZ6FkBaCKTYTTI')
})(_GoogleMap)