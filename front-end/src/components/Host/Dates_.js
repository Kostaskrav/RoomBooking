import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';


import "./Step2.css";

class Dates_ extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // Filter_date_from:null,
            // Filter_date_to:null,
        };
        this.Handle_to_date_time=this.Handle_to_date_time.bind(this);
        this.Handle_from_date_time=this.Handle_from_date_time.bind(this); 
        this.handle_FirstDate=this.handle_FirstDate.bind(this); 
        this.handle_null_date=this.handle_null_date.bind(this);           
      }


    handle_null_date=(item)=>{
        if(item!==null){
            return item.toISOString().slice(0,10);
        }
        else{
            return "";
        }
    };

    Handle_to_date_time=(item,index_num)=>{
        // console.log("AAAAAAAAAA=== "+index_num);
        if(item.Date_from!==null){
            // console.log("-from "+this.state.Filter_date_from.toISOString());
           return(
            <TextField
                value={this.handle_null_date(new Date(item.Date_to))}
                // required 
                label="Εως"
                type="date"
                name="Date_to"

                // defaultValue="2017-05-24T10:30"
                InputProps={{inputProps: { min: new Date(item.Date_from).toISOString().slice(0,10)} }}
                onChange={(e)=>{console.log("BBBBB==="+index_num);this.props.handleChangeList(e,index_num)}}
                InputLabelProps={{
                shrink: true,
            }}/>
           ); 
        }
        else{
            return(
                <TextField
                    // required 
                    value={this.handle_null_date(new Date(item.Date_to))}
                    label="Εως"
                    type="date"
                    name="Date_to"
                    // defaultValue="2017-05-24T10:30"
                    // InputProps={{inputProps: { min:this.state.Filter_date_from.show_Date_Time()} }}
                    onChange={(e)=>this.props.handleChangeList(e,index_num)}
                    InputProps={{inputProps: { min: new Date().toISOString().slice(0,10)} }}
                    InputLabelProps={{
                    shrink: true,
                }}/>
               ); 
        }
    }

    Handle_from_date_time=(item,index_num)=>{
        if(new Date(item.Date_to)!==null){
            // console.log("MALAKIAto"+item.toISOString());
           return(
            <TextField
                // required
                value={this.handle_null_date(new Date(item.Date_from))}
                name="Date_from"
                label="Από"
                type="date"
                // defaultValue="2017-05-24T10:30"
                InputProps={{inputProps: { min: new Date().toISOString().slice(0,10),max: new Date(item.Date_to).toISOString().slice(0,10)} }}
                onChange={(e)=>this.props.handleChangeList(e,index_num)}
                InputLabelProps={{
                shrink: true,
            }}/>
           ); 
        }
        else{
            return(
                <TextField
                    // required
                    value={this.handle_null_date(new Date(item.Date_from))}
                    id="date"
                    label="Από"
                    type="date"
                    name="Date_from"
                    // defaultValue="2017-05-24T10:30"
                    // InputProps={{inputProps: { min:this.state.Filter_date_to.show_Date_Time()} }}
                    onChange={(e)=>this.props.handleChangeList(e,index_num)}
                    InputProps={{inputProps: { min: new Date().toISOString().slice(0,10)} }}
                    InputLabelProps={{
                    shrink: true,
                }}/>
               ); 
        }
    }

    handle_FirstDate=(index_num)=>{
        if(index_num!==0){
            return(
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={(e)=>this.props.handleRemoveDate_list(e,index_num)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            );
        }
    }
    render() {
      // The markup for the Step 1 UI
      return(
        <React.Fragment>
            <div className="title_padding">
                <Typography variant="h6" align="center">
                    Επιλέξτε ημερoμηνίες που το κατάλυμα είναι διαθέσιμο προς ενοικίαση</Typography>
            </div>
            <List>
                {this.props.Date_list.map((item,index_num)=>{
                    return(
                        <ListItem key={index_num}>
                        {/* <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon> */}
                        {/* <ListItemText
                            primary="Single-line item"
                            secondary={secondary ? 'Secondary text' : null}
                        /> */}
                        
                        
                        <Grid container spacing={2}>
                            <Grid item>
                                {this.Handle_from_date_time(item,index_num)}
                            </Grid>
                            <Grid item>
                                {this.Handle_to_date_time(item,index_num)}
                            </Grid>
                        </Grid>

                        {this.handle_FirstDate(index_num)}
                        
                        </ListItem>
                    );
                })}
            </List>
            <Box display="flex" alignItems="center"justifyContent="center" >
            
            <Button  color="primary" 
                onClick={this.props.handleAddDate_list}><AddCircleIcon className="btn-add-date"></AddCircleIcon></Button>
                </Box>
                </React.Fragment>
      )
    }
  }

export default Dates_;