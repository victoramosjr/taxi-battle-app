import React, { Component } from 'react';
import css from '../style/style.scss';

function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}

class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.initMap = this.initMap.bind(this);
  }

  componentDidMount() {
    const mapsApiKey = 'AIzaSyBB3U2peonxbj2LOnS3JqQLXO6aeqd4vdE';
    window.initMap = this.initMap;
    loadJS(`https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&callback=initMap`);
  }

  initMap() {
    const currentAddress = { lat: this.props.latitude, lng: this.props.longitude };
    const zoom = this.props.zoom;
    
    const map = new google.maps.Map((this.refs.map), {
      zoom: zoom,
      gestureHandling: "none",
      center: currentAddress
    });
    
    var marker = new google.maps.Marker({
      position: currentAddress,
      map: map
    });
  }

  render() {
    const mapStyle = { width: 800, height: 400 };

    return <div ref="map" className="search__map"></div>
  }
}

export default GoogleMap;
