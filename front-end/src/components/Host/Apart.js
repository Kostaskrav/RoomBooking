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


class Apart extends React.Component {
    render() {
      return(
        <React.Fragment>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                
                <Typography variant="h5" align="center">Περιγραφή Καταλύματος</Typography>
                
                </Grid>
            <Grid item xs={12}>
                <TextField 
                value={this.props.Description}
                className="boxesStyle"
                name="description"
                onChange={this.props.handleChange}
                variant="outlined" 
                multiline
                fullWidth
                rows={3}
                rowsMax={5}
                />
            </Grid>
            </Grid>

            <Grid container spacing={0} className="mrg_box22">
                    <Grid item xs={6}>
                        <div className="title_padding">
                            <Typography variant="h6" align="right">Αριθμός Κρεβατιών</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="title_box">
                            <TextField 
                            value={this.props.Beds_num}
                            className="boxesStyle"
                            name="bed_num"
                            onChange={this.props.handleChange}
                            variant="outlined" 
                            type="number"
                            size="medium"
                            />
                        </div>
                    </Grid>
                </Grid> 
                <Grid container spacing={0} className="mrg_box22">
                    <Grid item xs={6}>
                        <div className="title_padding">
                            <Typography variant="h6" align="right">Αριθμός Μπάνιων</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="title_box">
                            <TextField 
                            value={this.props.WC_num}
                            className="boxesStyle"
                            name="bath_num"
                            onChange={this.props.handleChange}
                            variant="outlined" 
                            type="number"
                            size="medium"
                            />
                        </div>
                    </Grid>
                </Grid> 
                <Grid container spacing={0} className="mrg_box22">
                    <Grid item xs={6}>
                        <div className="title_padding">
                            <Typography variant="h6" align="right">Αριθμός Κρεβατοκάμαρων</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="title_box">
                            <TextField 
                            value={this.props.Bedroom_num}
                            className="boxesStyle"
                            name="room_num"
                            onChange={this.props.handleChange}
                            variant="outlined" 
                            type="number"
                            size="medium"
                            />
                        </div>
                    </Grid>
                </Grid> 
                <Grid container spacing={0} className="mrg_box22">
                    <Grid item xs={6}>
                        <div className="title_padding">
                            <Typography variant="h6" align="right">Αριθμός Καθιστικών</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="title_box">
                            <TextField 
                            value={this.props.Livingroom}
                            className="boxesStyle"
                            name="liv_room"
                            onChange={this.props.handleChange}
                            variant="outlined" 
                            type="number"
                            size="medium"
                            />
                        </div>
                    </Grid>
                </Grid> 
                <Grid container spacing={0} className="mrg_box22">
                    <Grid item xs={6}>
                        <div className="title_padding">
                            <Typography variant="h6" align="right">Εμβαδόν Καταλύματος</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="title_box">
                            <TextField 
                            value={this.props.Room_area}
                            className="boxesStyle"
                            name="area"
                            onChange={this.props.handleChange}
                            variant="outlined" 
                            type="number"
                            size="medium"
                            />
                        </div>
                    </Grid>
                </Grid> 
        </React.Fragment>
      )
    }
  }

  export default Apart;