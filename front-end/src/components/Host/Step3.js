import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import "./Step3.css";

class Step3 extends React.Component {
    render() {
      if (this.props.currentStep !== 3) { // Prop: The current step
        return null
      }
      // The markup for the Step 1 UI
      return(
        <React.Fragment>
            <div className="title_padding">
                <Typography variant="h5" align="center">
                    Πληροφορίες Ενοικίασης σχετικά με το Κατάλυμα</Typography>
            </div>
        {/* <Grid container spacing={0} className="mrg_box22">
                    <Grid item xs={6}>
                        <div className="title_padding">
                            <Typography variant="h6" align="right">Τιμή/Βράδυ</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="title_box">
                            <TextField 
                            value={this.props.Price_per_night}
                            className="boxesStyle"
                            name="Price_per_night"
                            onChange={this.props.handleChange}
                            variant="outlined" 
                            type="number"
                            size="medium"
                            />
                        </div>
                    </Grid>
                </Grid>     */}
        <Grid container spacing={0} className="mrg_box22">
                    <Grid item xs={6}>
                        <div className="title_padding">
                            <Typography variant="h6" align="right">Ελάχιστη Τιμή</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="title_box">
                            <TextField 
                            value={this.props.Min_price}
                            className="boxesStyle"
                            name="Min_price"
                            onChange={this.props.handleChange}
                            variant="outlined" 
                            size="medium"
                            type="number"
                            InputProps={{ inputProps: { min: 0} }}
                            />
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={0} className="mrg_box22">
                    <Grid item xs={6}>
                        <div className="title_padding">
                            <Typography variant="h6" align="right">Τιμή ανά Άτομο</Typography>
                        </div>
                    </Grid>
                    <Grid item  xs={6}>
                        <div className="title_box">
                            <TextField 
                            value={this.props.Extra_person_price}
                            className="boxesStyle"
                            name="Extra_person_price"
                            onChange={this.props.handleChange}
                            variant="outlined" 
                            size="medium"
                            type="number"
                            InputProps={{ inputProps: { min: 0} }}
                            />
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={0} className="mrg_box22">
                    <Grid item xs={6}>
                        <div className="title_padding">
                            <Typography variant="h6" align="right">Μέγιστος Αριθμός Ατόμων</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="title_box">
                            <TextField 
                            value={this.props.Max_people}
                            className="boxesStyle"
                            name="Max_people"
                            onChange={this.props.handleChange}
                            variant="outlined" 
                            size="medium"
                            type="number"
                            InputProps={{ inputProps: { min: 0} }}
                            />
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={0} className="mrg_box22">
                    <Grid item xs={6}>
                        <div className="title_padding">
                            <Typography variant="h6" align="right">Τύπος Καταλύματος</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="title_box">
                            <InputLabel  id="demo-customized-select-label">Type</InputLabel>
                                    <Select
                                    style={{width:"76%"}}
                                    labelId="demo-customized-select-label"
                                    id="demo-customized-select"
                                    value={this.props.Place_type}
                                    name="Place_type"
                                    onChange={this.props.handleChange}
                                    // input={<BootstrapInput />}
                                    >
                                    <MenuItem value={"private"}>Ιδιωτικό Δωμάτιο</MenuItem>
                                    <MenuItem value={"public"}>Κοινόχρηστο Δωμάτιο</MenuItem>
                                    <MenuItem value={"apartment"}>Ολόκληρη Κατοικία</MenuItem>
                                    </Select>
                            {/* <TextField 
                            value={this.props.Place_type}
                            className="boxesStyle"
                            name="Place_type"
                            onChange={this.props.handleChange}
                            variant="outlined" 
                            size="medium"
                            /> */}
                        </div>
                    </Grid>
                </Grid>
                
                </React.Fragment>
      )
    }
  }

export default Step3;