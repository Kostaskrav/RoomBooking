import React, { createRef,useEffect } from "react";
import { Map as LeafletMap, TileLayer,MapControl,withLeaflet,useLeaflet,Marker, Popup } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import   'leaflet-geosearch/assets/css/leaflet.css';
import   'leaflet/dist/leaflet.css';

import './Welcome_Map.css'

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



class Welcome_Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        results:null,
        radius:this.props.radius
    };
    this.results=null;
    this.results2=null;
    this.handle_results=this.handle_results.bind(this);
    this.handle_results2=this.handle_results2.bind(this);
}
  mapRef = createRef();

  componentWillReceiveProps(nextProps) {
    this.setState({ 
        radius: nextProps.radius 
    });  
    if(this.results2!==undefined && this.results2!==null){
        this.results2.clearLayers();
        var radius=L.circle(nextProps.Latlng, {radius: nextProps.radius});
        this.results2.addLayer(radius);
    }
    
  }

  componentWillMount(){
    this.setState({ 
      radius: this.props.radius
    });
  }

componentDidMount() {
    // this.setState({ 
    //     radius: this.props.radius
    // });
    // const map = this.mapRef.current.leafletElement;
    const provider2 = new OpenStreetMapProvider();
    const map = new L.Map('welcome_map', {
        // Set latitude and longitude of the map center (required)
        center: L.latLng(38.5953683,24.9877132),
        // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
        zoom: 4
    });
    L.control.scale().addTo(map);
    // Create a Tile Layer and add it to the map
    //var tiles = new L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png').addTo(map);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    
    const searchControl = new GeoSearchControl({
        provider: provider2,
        style: 'bar',
        showMarker: true,
        showPopup: false,
        autoClose: true,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: false,
        searchLabel: 'search'
      });
      
      map.addControl(searchControl);
      this.results = new L.LayerGroup().addTo(map);
      this.results2 = new L.LayerGroup().addTo(map);
     var mark = L.marker(L.latLng(this.props.Latlng));
     var circle=L.circle(L.latLng(this.props.Latlng), {radius: this.state.radius});
        this.results.addLayer(mark);
        this.results2.addLayer(circle);
      map.on('geosearch/showlocation', function (e) {
        this.results.clearLayers();
        this.results2.clearLayers();
        console.log("DATA===");
        console.log(e.location.x);
        console.log(e.location.y);
        // console.log(this.state.radius);
        
        this.props.handleLatlng([e.location.y,e.location.x]);
        var circle=L.circle([e.location.y,e.location.x], {radius: this.props.radius});
        var mark = L.marker([
            parseFloat(e.location.y),
            parseFloat(e.location.x)
          ]);
        console.log(e);
        this.results2.addLayer(circle);
        this.results.addLayer(mark);
        
    }.bind(this));
    map.on('click', function (e) {
        console.log(e.latlng);
        this.results.clearLayers();
        this.results2.clearLayers();
        this.props.handleLatlng(e.latlng);
        var mark = L.marker(e.latlng);
        console.log(e);
        var circle=L.circle(e.latlng, {radius: this.state.radius});
        this.results2.addLayer(circle);
        this.results.addLayer(mark);
        
      }.bind(this)); 
      setTimeout(function(){ map.invalidateSize()}, 100);
    //   radius.setRadius(this.state.radius);
    //   this.results2.addLayer(radius);
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
    
      // Initialize the map and assign it to a variable for later use
    // setup
    
    const Search = withLeaflet(SearchMap);

// setTimeout(function(){$('.pointer').fadeOut('slow');},3400);
    return (
      <>
      <div id="welcome_map"></div>
      
        
      </>
    );
  }
}

export default Welcome_Map;
