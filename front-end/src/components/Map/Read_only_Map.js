import React, { createRef,useEffect } from "react";
import { Map as LeafletMap, TileLayer,MapControl,withLeaflet,useLeaflet,Marker, Popup } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import   'leaflet-geosearch/assets/css/leaflet.css';
import   'leaflet/dist/leaflet.css';
// import 'leaflet/dist/images/marker-icon-2x.png';
// import 'leaflet/dist/images/marker-icon.png';
// import 'leaflet/dist/images/marker-shadow.png';

import './Read_only_Map.css'

import * as ELG from "esri-leaflet-geocoder";
import L from "leaflet";
// import LatLng from "leaflet/src/"
import { Button } from "@material-ui/core";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


const provider = new OpenStreetMapProvider();

provider.search({ query: '...' }).then(function (result) {
    // do something with result;
    console.log(result);
  });

class SearchMap extends MapControl {

    createLeafletElement() {
        return GeoSearchControl({
            provider: this.props.provider,
            style: 'bar',
            showMarker: true,
            showPopup: false,
            autoClose: true,
            retainZoomLevel: false,
            animateZoom: true,
            keepResult: false,
            searchLabel: 'search'
          });
      
    }
}

class Read_only_Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        results:null,
    };
    this.handle_results=this.handle_results.bind(this);
    this.handle_results2=this.handle_results2.bind(this);
}
  mapRef = createRef();

componentDidMount() {
    // const map = this.mapRef.current.leafletElement;
    const provider2 = new OpenStreetMapProvider();
    const map = new L.Map('map', {
        // Set latitude and longitude of the map center (required)
        center: L.latLng(this.props.Latlng),
        // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
        zoom: 14
    });
    L.control.scale().addTo(map);

    // Create a Tile Layer and add it to the map
    //var tiles = new L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png').addTo(map);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // const searchControl = new GeoSearchControl({
    //     provider: provider2,
    //     style: 'bar',
    //     showMarker: true,
    //     showPopup: false,
    //     autoClose: true,
    //     retainZoomLevel: false,
    //     animateZoom: true,
    //     keepResult: false,
    //     searchLabel: 'search'
    //   });
    //   var results = new L.LayerGroup().addTo(map);
    //   map.addControl(searchControl);
      var results2 = new L.LayerGroup().addTo(map);
      var mark = L.marker(this.props.Latlng);
      results2.addLayer(mark);
    //   map.on('geosearch/showlocation', function (e) {
    //     results.clearLayers();
    //     console.log("DATA===");
    //     console.log(e.location.x);
    //     console.log(e.location.y);
    //     var mark = L.marker([
    //         parseFloat(e.location.y),
    //         parseFloat(e.location.x)
    //       ],
    //       {icon: redIcon});
    //     console.log(e);
    //     results.addLayer(mark);
    // });
    // map.on('click', function (e) {
    //     console.log(e.latlng);
    //     results.clearLayers();
    //     this.props.handleLatlng(e.latlng);
    //     var mark = L.marker(e.latlng);
    //     console.log(e);
        
    //     results.addLayer(mark);

    //   }.bind(this)); 
}

    

     handle_results=()=>{
        // console.log("AAAAAAAAAAAAAAA");
         console.log(this.state.results);
     }

     handle_results2=(result)=>{
        if(result!==null){
            this.setState({
                results:result
            });
        }
     }

  render() {
    

    return (
      <>
      <div id="map"></div>
        
      </>
    );
  }
}

export default Read_only_Map;
