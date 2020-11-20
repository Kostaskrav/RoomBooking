import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


class Services extends React.Component {
    render() {
      // The markup for the Step 1 UI
    //   Description={this.state.Description}
    //     Beds_num={this.state.Beds_num}
    //     WC_num={this.state.WC_num}
    //     Bedroom_num={this.state.Bedroom_num}
    //     Livingroom={this.state.Livingroom}
    //     Room_area={this.state.Room_area}
      return(
        <React.Fragment>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5" align="center">Επιλογή Παροχών Καταλύματος</Typography>
            </Grid>
            <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="center" >
                <FormControlLabel
                        control={
                        <Checkbox
                            checked={this.props.wi_fi}
                            onChange={this.props.handleChangeChecked}
                            name="wi_fi"
                            color="primary"
                        />
                        
                        }
                        label={<Box display="flex" alignItems="center" justifyContent="center" >
                                    <Typography variant="h6" >Ασύρματο Internet</Typography>
                                </Box>}
                        labelPlacement="start"
                    />
            </Box>
            </Grid>
            <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="center" >
                <FormControlLabel
                        control={
                        <Checkbox
                            checked={this.props.cooling}
                            onChange={this.props.handleChangeChecked}
                            name="cooling"
                            color="primary"
                        />
                        
                        }
                        label={<Box display="flex" alignItems="center" justifyContent="center" >
                                    <Typography variant="h6" >Ψύξη</Typography>
                                </Box>}
                        labelPlacement="start"
                    />
            </Box>
            </Grid>
            <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="center" >
                <FormControlLabel
                        control={
                        <Checkbox
                            checked={this.props.heating}
                            onChange={this.props.handleChangeChecked}
                            name="heating"
                            color="primary"
                        />
                        
                        }
                        label={<Box display="flex" alignItems="center" justifyContent="center" >
                                    <Typography variant="h6" >Θέρμανση</Typography>
                                </Box>}
                        labelPlacement="start"
                    />
            </Box>
            </Grid>
            <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="center" >
                <FormControlLabel
                        control={
                        <Checkbox
                            checked={this.props.kitchen}
                            onChange={this.props.handleChangeChecked}
                            name="kitchen"
                            color="primary"
                        />
                        
                        }
                        label={<Box display="flex" alignItems="center" justifyContent="center" >
                                    <Typography variant="h6" >Κουζίνα</Typography>
                                </Box>}
                        labelPlacement="start"
                    />
            </Box>
            </Grid>
            <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="center" >
                <FormControlLabel
                        control={
                        <Checkbox
                            checked={this.props.tv}
                            onChange={this.props.handleChangeChecked}
                            name="tv"
                            color="primary"
                        />
                        
                        }
                        label={<Box display="flex" alignItems="center" justifyContent="center" >
                                    <Typography variant="h6" >Τηλεόραση</Typography>
                                </Box>}
                        labelPlacement="start"
                    />
            </Box>
            </Grid>
            <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="center" >
                <FormControlLabel
                        control={
                        <Checkbox
                            checked={this.props.parking}
                            onChange={this.props.handleChangeChecked}
                            name="parking"
                            color="primary"
                        />
                        
                        }
                        label={<Box display="flex" alignItems="center" justifyContent="center" >
                                    <Typography variant="h6" >Χώρος Στάθμευσης</Typography>
                                </Box>}
                        labelPlacement="start"
                    />
            </Box>
            </Grid>
            <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="center" >
                <FormControlLabel
                        control={
                        <Checkbox
                            checked={this.props.elevator}
                            onChange={this.props.handleChangeChecked}
                            name="elevator"
                            color="primary"
                        />
                        
                        }
                        label={<Box display="flex" alignItems="center" justifyContent="center" >
                                    <Typography variant="h6" >Ανελκυστήρας</Typography>
                                </Box>}
                        labelPlacement="start"
                    />
            </Box>
            </Grid>
            
            
            

           
        </Grid> 
        </React.Fragment>
      )
    }
  }

  export default Services;