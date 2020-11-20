import React, { createRef,useEffect } from "react";
import { Map as LeafletMap, TileLayer,MapControl,withLeaflet,useLeaflet,Marker, Popup } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import   'leaflet-geosearch/assets/css/leaflet.css';
import   'leaflet/dist/leaflet.css';
// import 'leaflet/dist/images/marker-icon-2x.png';
// import 'leaflet/dist/images/marker-icon.png';
// import 'leaflet/dist/images/marker-shadow.png';

import './Map.css'

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
// import Search from './Search.js';


// make new leaflet element
// const Search = (props) => {
//     const { map } = useLeaflet() // access to leaflet map
//     const { provider } = props

//     useEffect(() => {
//         const searchControl = new GeoSearchControl({
//             provider,
//             style: 'bar',
//             showMarker: true,
//             showPopup: false,
//             marker: {
//                 // optional: L.Marker    - default L.Icon.Default
//                 icon: new L.Icon.Default(),
//                 draggable: false,
//               },
//             autoClose: true,
//             retainZoomLevel: false,
//             animateZoom: true,
//             keepResult: false,
//             searchLabel: 'search'
//         })


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

//         map.addControl(searchControl) // this is how you add a control in vanilla leaflet
//         return () => map.removeControl(searchControl)
//     }, [props])

//     return null // don't want anything to show up from this comp
// }

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        results:null,
    };
    this.handle_results=this.handle_results.bind(this);
    this.handle_results2=this.handle_results2.bind(this);
}
  mapRef = createRef();
//   plugin = createRef();

//   componentDidMount() {
    // var map = L.map('map', {
    //     // Set latitude and longitude of the map center (required)
    //     center: [37.7833, -122.4167],
    //     // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
    //     zoom: 10
    // });
    
    // L.control.scale().addTo(map);
    
    // // Create a Tile Layer and add it to the map
    // //var tiles = new L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png').addTo(map);
    // L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //   }).addTo(map);
    
    //   var searchControl = new L.esri.Controls.Geosearch().addTo(map);
    
    //   var results = new L.LayerGroup().addTo(map);
    
    //   searchControl.on('results', function(data){
    //     results.clearLayers();
    //     for (var i = data.results.length - 1; i >= 0; i--) {
    //       results.addLayer(L.marker(data.results[i].latlng));
    //     }
    //   });
//     // map instance
    // const map = this.mapRef.current.leafletElement;

    // const searchcontrol = new ELG.Geosearch();
    // const results = new L.LayerGroup().addTo(map);
    // searchcontrol.on("results", function (data) {
    //   results.clearLayers();
    //   for (let i = data.results.length - 1; i >= 0; i--) {
    //     results.addLayer(L.marker(data.results[i].latlng));
    //   }
    // });
//     const searchContainer = searchcontrol.onAdd(map);
//     this.plugin.current.appendChild(searchContainer);
//   }

componentDidMount() {
    // const map = this.mapRef.current.leafletElement;
    const provider2 = new OpenStreetMapProvider();
    const map = new L.Map('map', {
        // Set latitude and longitude of the map center (required)
        center: L.latLng(38.5953683,24.9877132),
        // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
        zoom: 6
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
      var results = new L.LayerGroup().addTo(map);
    //   var searchC=new L.Control.GeoSearchControl({
    //     provider: provider2,
    //     style: 'bar',
    //     showMarker: true,
    //     showPopup: false,
    //     autoClose: true,
    //     retainZoomLevel: false,
    //     animateZoom: true,
    //     keepResult: false,
    //     searchLabel: 'search'
    //   }).addTo(map);
      map.addControl(searchControl);
      var results = new L.LayerGroup().addTo(map);
      map.on('geosearch/showlocation', function (e) {
        results.clearLayers();
        console.log("DATA===");
        console.log(e.location.x);
        console.log(e.location.y);
        // await e.Location
        // while(e===null){
        //     // this.forceUpdate();
        // }
        // parseFloat(e.location.x)
        // parseFloat(e.location.y)
        var mark = L.marker([
            parseFloat(e.location.y),
            parseFloat(e.location.x)
          ]);
        console.log(e);
        results.addLayer(mark);
        // e.Locations.forEach(function (Location) {
        //     console.log(Location.label);
        //     results.addLayer(L.marker(Location.X,Location.Y));
        // });
    });
    map.on('click', function (e) {
        console.log(e.latlng);
        results.clearLayers();
        this.props.handleLatlng(e.latlng);
        var mark = L.marker(e.latlng);
        console.log(e);
        
        results.addLayer(mark);
        //   geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
        //       if (error) {  return; }
        //       let elems = result.address.LongLabel.split(',')
        //       if(elems.length==6) {
        //         address = result.address.LongLabel;
        //       }
        //       if(elems.length==7) {
        //         // remove commercial name
        //         address = result.address.LongLabel.replace(result.address.Match_addr+',','');
        //       }
        //       let ad = address.split(',');
        //       alert(ad[0]+', '+ad[2]+' '+ad[1]+'');
        //   });  

      }.bind(this)); 
    //   map.on('geosearch/showlocation', function(data){
    //     results.clearLayers();
    //     console.log("DATA===");
    //     console.log(data);
    //     for (var i = data.location.length - 1; i >= 0; i--) {
    //         console.log(data.location[i]);
    //       results.addLayer(L.marker(data.location[i].latlng));
    //     }
    //   });
    
    // const searchControl = new ELG.Geosearch().addTo(map);
    // const results = new L.LayerGroup().addTo(map);

    // searchControl.on('results', function(data){
    //     results.clearLayers();
    //     for (let i = data.results.length - 1; i >= 0; i--) {
    //         results.addLayer(L.marker(data.results[i].latlng));
    //     }
    // });
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
    

    // const results =  provider.search({ query: '...' });
    // search
    // provider.search({ query: '...' }).then(function (result) {
    //     // do something with result;
    //     handle_results2(result);
        
    //   });
      const Search = withLeaflet(SearchMap);

// setTimeout(function(){$('.pointer').fadeOut('slow');},3400);
    return (
      <>
      <div id="map"></div>
      {/* <LeafletMap
        
        center={[50, 10]}
        zoom={6}
        maxZoom={10}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        // ref={this.mapRef}
        // easeLinearity={0.35}
      > */}
        {/* <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        /> */}
        {/* <Marker position={[50, 10]}>
          <Popup>
            Popup for any custom information.
          </Popup>
        </Marker> */}
        {/* <Search provider={provider} />      */}
         {/* </LeafletMap> */}
      {/* <div id="map"></div>
        <LeafletMap
          zoom={4}
          style={{ height: "50vh" }}
          ref={this.mapRef}
          center={[33.852169, -100.5322]}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LeafletMap> */}
        {/* <div ref={this.plugin} /> */}
        {/* <Button onClick={this.handle_results}>
            PATA MALAKA
        </Button> */}
        
      </>
    );
  }
}

export default Map;
