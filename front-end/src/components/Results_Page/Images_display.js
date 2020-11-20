import React,{Component} from 'react';


import './Images_display.css';
import { Grid, Button } from '@material-ui/core';
import image from '../../Pictures/room_pic.jpg';
import img2 from '../../Pictures/prof_pic.jpg'

import ReactBnbGallery from 'react-bnb-gallery'
import 'react-bnb-gallery/dist/style.css';
import Gallery from 'react-grid-gallery';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';



class Images_display extends Component{
  constructor(props){
    super(props);
    this.state = { 
        galleryOpened: false,
        photoIndex:0
        
    };

    this.toggleGallery = this.toggleGallery.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.closeGallery=this.closeGallery.bind(this);
    this.showGallery=this.showGallery.bind(this);
    
  }


  showGallery=()=>{
      if(!this.state.galleryOpened){
          return null;
      }else{
        return(
            <div>
                
                {/* {console.log("MPLA")} */}
                {true && (
                <Lightbox
                  mainSrc={this.props.Images[this.state.photoIndex]}
                  nextSrc={this.props.Images[(this.state.photoIndex + 1) % this.props.Images.length]}
                  prevSrc={this.props.Images[(this.state.photoIndex + this.props.Images.length - 1) % this.props.Images.length]}
                  onCloseRequest={() => this.setState({ galleryOpened: false })}
                  onMovePrevRequest={() =>
                    this.setState({
                     photoIndex: (this.state.photoIndex + this.props.Images.length - 1) % this.props.Images.length,
                    })
                  }
                  onMoveNextRequest={() =>
                    this.setState({
                      photoIndex: (this.state.photoIndex + 1) % this.props.Images.length,
                    })
                  }
                />
                )}
                
                
            </div>
            
          );
      }
      
  }
  

  toggleGallery=()=> {
        
        // console.log("hello");
        // return  (<Button1></Button1>);
        
        this.setState({
            galleryOpened: true,
            // flag:2
          });
    // }
    
  }

  closeGallery=()=> {
    // console.log("BYEE");
    this.setState({
        galleryOpened: false,
        // flag:2
      });
  }

  handleClick=()=>{
    //   console.log("hello");
  }

  render(){
    // console.log("HELLO");
    // const {openLightbox} = useLightbox()
    
    
    return (
        <div>
            <div className="container" onClick={this.toggleGallery}>
                <Grid  className="image" container  spacing={1}>
                    <Grid item xs={6}>
                        <img className="main_img" src={this.props.Images[0]}></img>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <img className="secondary_img" src={this.props.Images[1]}></img>
                            </Grid>
                            <Grid item xs={6}>
                                <img className="secondary_img" src={this.props.Images[2]}></img>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <img className="secondary_img" src={this.props.Images[3]}></img>
                            </Grid>
                            <Grid item xs={6}>
                                <img className="secondary_img" src={this.props.Images[4]}></img>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <div className="overlay">
                    <div className="text">Πατήστε για να δείτε ολόκληρη την συλλογή φωτογραφιών</div>
                </div>
            </div>
            {/* <ReactBnbGallery
                show={this.state.galleryOpened}
                photos={photos}
                onClose={this.closeGallery} /> */}
                
                {this.showGallery()}
                {/* <SRLWrapper images={images}> */}
                {/* {this.props.Images.map((element,index) =>{
                    return(<div>
                        <img src={element} />
                    </div>)
                })} */}
            {/* </SRLWrapper> */}
        </div>
      
    );
  }
  


}

// this.props.Images.map((element,index) => {
//     return({
//          src: element,
//          thumbnail: element,
//         //  thumbnailWidth: 200,
//         //  thumbnailHeight: 174,
//          // isSelected: true,
//          // caption: "After Rain (Jeshu John - designerspics.com)"
//  })
//  })

export default Images_display;
