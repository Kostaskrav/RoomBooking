import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Step6.css";
import {Carousel} from 'react-responsive-carousel';
import Gallery from 'react-grid-gallery';



class Apart_imgs extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            photos:this.props.Photos_list,
            images: props.Photos_list.map((element,index) => {
               return({
                    src: element,
                    thumbnail: element,
                    thumbnailWidth: 200,
                    thumbnailHeight: 174,
                    // isSelected: true,
                    // caption: "After Rain (Jeshu John - designerspics.com)"
            })
            }),
            currentImage: 0
        };
        this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        // this.handlePhotoChange=this.handlePhotoChange.bind(this);
        
    }

    onCurrentImageChange(index) {
        this.setState({ currentImage: index });
    }

    deleteImage() {
        if (window.confirm(`Are you sure you want to delete image number ${this.state.currentImage}?`)) {
            var images = this.state.images.slice();
            images.splice(this.state.currentImage, 1)
            this.setState({
                images: images
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        var joined=nextProps.Photos_list.map((element,index) => {
            const img = new Image();
            var width;
            var height;
            img.onload = function() {
                width=this.width;
                height=this.height;
                // alert(this.width + 'x' + this.height+" "+150*(width/height)+" "+150);
              }
            img.src =element;
            return({
                 src: element,
                 thumbnail: element,
                 thumbnailWidth: 150*(width/height),
                 thumbnailHeight: 150,
                 // isSelected: true,
                 // caption: "After Rain (Jeshu John - designerspics.com)"
         })
         })
        this.setState({ images: joined });  
      }

    render() {      
      return(
        <div key={this.props.Photos_list}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" align="center">Επιλογή Φωτογραφιών για το διαμέρισμα</Typography>
                </Grid>
                <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="center" >
                {/* infiniteLoop={true} */}
                    
                </Box>
                </Grid>
                <Grid item xs={12}>
                <Gallery images={this.state.images} 
                backdropClosesModal={true}
                lightboxWidth={2000}
                currentImageWillChange={this.onCurrentImageChange}
                enableLightbox={true}
                enableImageSelection={false}
                customControls={[
                    <button key="deleteImage" onClick={(e)=>{this.props.handleRemovePhotos_list(e,this.state.currentImage);this.deleteImage()}}>Delete Image</button>
                ]}
                showLightboxThumbnails={true}/>
                </Grid>
                
                
                <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="center" >
                    <Button
                        // variant="contained"
                        component="label"
                        >
                        Upload Photo
                        <AddCircleIcon className="btn-add-date"></AddCircleIcon>
                        <input
                            onChange={(e)=>{this.props.handleChangePhotosList(e);}}
                            type="file"
                            style={{ display: "none" }}
                        />
                    </Button>
                </Box>
                
                </Grid>
                <Grid item xs={12}>
                {/* <Box display="flex" alignItems="center" justifyContent="center" >
                    <Button
                        // variant="contained"
                        component="label"
                        onClick={()=>{console.log(this.state)}}
                        >
                        TEST
                        
                        
                    </Button>
                </Box> */}
                
                </Grid>
                    
            </Grid>
            
        </div >
      )
    }
  }

  export default Apart_imgs;