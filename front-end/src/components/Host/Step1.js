import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Map from '../Map/Map.js';

class Step1 extends React.Component {
    render() {
      if (this.props.currentStep !== 1) { // Prop: The current step
        return null
      }
      // The markup for the Step 1 UI
      return(
        <React.Fragment>
          <Grid container spacing={0} className="mrg_box2">
                    <Grid item xs={6}>
                        <div className="title_padding">
                            <Typography variant="h6" align="right">Τίτλος Καταλύματος</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="title_box">
                            <TextField 
                            value={this.props.Title_dep}
                            name="Title_dep"
                            className="boxesStyle"
                            onChange={this.props.handleChange}
                            variant="outlined" 
                            size="medium"
                            />
                        </div>
                    </Grid>
                </Grid>
          <Typography variant="h5" align="center">Επιλογή Τοποθεσίας</Typography>
                <Box display="flex" alignItems="center" justifyContent="center" >
                    
                    <Map
                    handleLatlng={this.props.handleLatlng}
                    Latlng={this.props.Latlng}></Map>
                </Box>
                <Grid container spacing={0} className="mrg_box2">
                    <Grid item xs={6}>
                        <div className="title_padding">
                            <Typography variant="h6" align="right">Διεύθυνση Καταλύματος</Typography>
                        </div>
                    </Grid>
                    <Grid item  xs={6}>
                      
                        <div className="title_box">
                            <TextField 
                            value={this.props.Adress}
                            name="Address"
                            className="boxesStyle"
                            onChange={this.props.handleChange}
                            variant="outlined" 
                            // size="medium"
                            // width="100%"
                            />
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
            <Grid item xs={12}>
                
                <Typography variant="h6" align="left">Περιγραφή Διέλευσης στο κατάλυμα</Typography>
                
                </Grid>
            <Grid item xs={12}>
                <TextField 
                value={this.props.pub_tra}
                className="boxesStyle"
                name="pub_tra"
                onChange={this.props.handleChange}
                variant="outlined" 
                multiline
                fullWidth
                rows={3}
                rowsMax={5}
                />
            </Grid>
            </Grid>
        </React.Fragment>
      )
    }
  }

  export default Step1;