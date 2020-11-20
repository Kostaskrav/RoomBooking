import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Login from './Login.js';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';

import Image from '../../Pictures/beach.jpg'; // Import using relative path;

import Suggests from '../Results_Page/Suggests.js';
import Review_Notifications from '../Welcome_Page/Review_Notifications.js';

import './Welcome_Page.css';

import Welcome_Map from '../Map/Welcome_Map.js';
// const styles = {
//     paperContainer: {
//         backgroundImage: `url(${Image})`
//     }
// };
const styles = {
    paperContainer: {
        height: 836,
        maxWidth:"100%",
        backgroundImage: `url(${Image})`,
        backgroundRepeat:"no-repeat",
        backgroundSize: "100% 100%"
    }
};



class Welcome_Page extends Component {

    constructor(props){
        super(props);

        this.state = {
            open:false,
            Filter_date_from:null,
            Filter_date_to:null,
            // username:"",
            // password:"",
            // location:null,
            radius:0,
            people:1,
            page:0,
            open_prof:false,
            userData:null,
            Latlng:{lat:38.5953683,lng:24.9877132},
            resultData:null,
        };
        
        this.Change_userData=this.Change_userData.bind(this);
        // this.change_username=this.change_username.bind(this);
        // this.change_password=this.change_password.bind(this);
        this.Logout_handler=this.Logout_handler.bind(this);
        this.handleLatlng=this.handleLatlng.bind(this);
        this.handleClickOpen=this.handleClickOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleShow=this.handleShow.bind(this);
        this.handleRegister=this.handleRegister.bind(this);
        this.change_radius=this.change_radius.bind(this);
        this.change_people=this.change_people.bind(this);
        this.change_Filter_date_from=this.change_Filter_date_from.bind(this);
        this.change_Filter_date_to=this.change_Filter_date_to.bind(this);
        this.Handle_from_date_time=this.Handle_from_date_time.bind(this);
        this.Handle_to_date_time=this.Handle_to_date_time.bind(this);
        this.log_sign_handler=this.log_sign_handler.bind(this);
        this.handleClickOpen_prof=this.handleClickOpen_prof.bind(this);
        this.handleClose_prof=this.handleClose_prof.bind(this);
        this.handleGo_prof=this.handleGo_prof.bind(this);
        this.handle_null_date=this.handle_null_date.bind(this);  
        this.handle_show_sugg=this.handle_show_sugg.bind(this);
        
        this.fetch_Results=this.fetch_Results.bind(this);       
        
        this.show_notifications=this.show_notifications.bind(this);
        this.hide_notifications=this.hide_notifications.bind(this);
        this.show_reviews=this.show_reviews.bind(this);

    }

    show_notifications=()=>{
        this.setState({
          notifications:true,
        })
    }
    hide_notifications=()=>{
      this.setState({
        notifications:false,
      })
      }
  
  show_reviews=()=>{
      if(this.state.notifications){
          return<Review_Notifications
          handleClose={this.hide_notifications}
          userData={this.state.userData}
          ></Review_Notifications>
      }
      else{
          return null;
      }
      
  }

    Change_userData=(userData)=>{
        this.setState({
            userData:userData
        });
    }

    Logout_handler=()=>{
        this.setState({
            userData:null
        });
        this.handleClose_prof();
    }

    handleLatlng=(value)=>{
        this.setState({
            Latlng: value
        })    
        };
        

    handleClickOpen = () => {
        this.setState({
            open:true
        });
      };
    
    handleClose = () => {
    this.setState({
        open:false
    });
    };

    handle_null_date=(item)=>{
        if(item!==null){
            return item.toISOString().slice(0,10);
        }
        else{
            return "";
        }
    };

    componentWillMount(){
        // console.log("AAAA");
        // console.log(this.props.location.state);
        if(this.props.location.state!==undefined){
            if(this.props.location.state.people!==undefined){
                this.setState({
                    people:this.props.location.state.people,
                    radius:this.props.location.state.radius,
                    Latlng:this.props.location.state.Latlng,
                    Filter_date_from:this.props.location.state.Filter_date_from,
                    Filter_date_to:this.props.location.state.Filter_date_to,
                    userData:this.props.location.state.detail,
                  }, () => console.log(this.state));
            }
            
            this.setState({
                 userData:this.props.location.state.detail,
               }, () => console.log(this.state));
        }
   }

    handleRegister=()=>{
        this.props.history.push({
            pathname: '/Register'
        })
    }

    handleShow=()=>{
    if(this.state.open){
        return(<Login p_props={this.props} handleClose={this.handleClose} change_token={this.Change_userData} ></Login>); //change_user={this.change_username} change_pass={this.change_password}
    }
    else{
        return null;
    }
    }

    change_Filter_date_from=(event)=>{
        this.setState({
            Filter_date_from:new Date(event.target.value)
        });
        
        // console.log(this.Filter_date_from.toISOString());
    }

    change_Filter_date_to=(event)=>{
        
        this.setState({
            Filter_date_to:new Date(event.target.value)
        });
        // console.log(this.Filter_date_to.toISOString());
    }

    change_radius=(event)=>{
        this.setState({
            radius:event.target.value
        });
    }

    change_people=(event)=>{
        this.setState({
            people:event.target.value
        });
    }


    Handle_to_date_time=()=>{
        if(this.state.Filter_date_from!==null){
            // console.log("-from "+this.state.Filter_date_from.toISOString());
           return(
            <TextField
                value={this.handle_null_date(this.state.Filter_date_to)}
                required 
                label="Εως"
                type="date"
                // defaultValue="2017-05-24T10:30"
                InputProps={{inputProps: { min: this.state.Filter_date_from.toISOString().slice(0,10)} }}
                onChange={this.change_Filter_date_to}
                InputLabelProps={{
                shrink: true,
            }}/>
           ); 
        }
        else{
            return(
                <TextField
                    required 
                    value={this.handle_null_date(this.state.Filter_date_to)}
                    label="Εως"
                    type="date"
                    // defaultValue="2017-05-24T10:30"
                    // InputProps={{inputProps: { min:this.state.Filter_date_from.show_Date_Time()} }}
                    onChange={this.change_Filter_date_to}
                    InputProps={{inputProps: { min: new Date().toISOString().slice(0,10)} }}
                    InputLabelProps={{
                    shrink: true,
                }}/>
               ); 
        }
    }

    Handle_from_date_time=()=>{
        if(this.state.Filter_date_to!==null){
            // console.log("MALAKIAto"+this.state.Filter_date_to.toISOString());
           return(
            <TextField
                required
                value={this.handle_null_date(this.state.Filter_date_from)}
                label="Από"
                type="date"
                // defaultValue="2017-05-24T10:30"
                InputProps={{inputProps: { min: new Date().toISOString().slice(0,10),max:this.state.Filter_date_to.toISOString().slice(0,10)} }}
                onChange={this.change_Filter_date_from}
                InputLabelProps={{
                shrink: true,
            }}/>
           ); 
        }
        else{
            return(
                <TextField
                    required
                    id="date"
                    label="Από"
                    type="date"
                    value={this.handle_null_date(this.state.Filter_date_from)}
                    // defaultValue="2017-05-24T10:30"
                    // InputProps={{inputProps: { min:this.state.Filter_date_to.show_Date_Time()} }}
                    onChange={this.change_Filter_date_from}
                    InputProps={{inputProps: { min: new Date().toISOString().slice(0,10)} }}
                    InputLabelProps={{
                    shrink: true,
                }}/>
               ); 
        }
    }

    handleClickOpen_prof = (event) => {
        this.setState({
            open_prof:event.currentTarget
        });
      };

    handleClose_prof = () => {
    this.setState({
        open_prof:null
    });
    }; 

    handleGo_prof = () => {
        this.handleClose_prof();
        this.props.history.push({
            pathname: '/Profile',
            state: { detail: this.state.userData }
          })
        }; 


    log_sign_handler=()=>{
        if(this.state.userData===null || this.state.userData===undefined){
            return(
                <React.Fragment>
                    <Button className="Log_button" variant="contained" color="primary" onClick={this.handleClickOpen}>
                        Σύνδεση
                    </Button>
                
                    <Button className="Sing_button" variant="contained" color="primary" onClick={this.handleRegister}>
                        Εγγραφή
                    </Button>
                </React.Fragment>           
            );
        }
        else{
            return(
                <React.Fragment>
                    <AccountCircleIcon className="prof_icon" aria-haspopup="true" onClick={this.handleClickOpen_prof}></AccountCircleIcon>
                    
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.open_prof}
                        keepMounted
                        open={Boolean(this.state.open_prof)}
                        onClose={this.handleClose_prof}
                        >
                        <MenuItem onClick={this.handleGo_prof}>Profile</MenuItem>
                        <MenuItem onClick={this.show_notifications}>Reviews</MenuItem>
                        <MenuItem onClick={this.Logout_handler}>Logout</MenuItem>
                        </Menu>
                    
                    
                                        
                   
                </React.Fragment>
                
            );
        }
    }

    fetch_Results = async () => { 
        
        const data = await fetch('http://localhost:3001/apartments/'+this.state.people+"/"+this.state.Latlng.lat+"/"+this.state.Latlng.lng+"/"+this.state.radius+
        "/"+this.state.Filter_date_from+"/"+this.state.Filter_date_to+"/"+true+"/"+true+"/"+true+"/"+0+"/"+false+"/"
        +false+"/"+false+"/"+false+"/"+false+"/"+false+"/"+false+"/"+1, {
          method: 'GET',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          // body: JSON.stringify(this.state)
        // body: JSON.stringify({
        //     password:this.state.password,
        //     username:this.state.username,
        // })
        });
        if(data.status===200){
          const resultData = await data.json();
        //   console.log(resultData);
          this.setState({ resultData: resultData });
        //   if(userData.role==="renter"){
        //     const userData = await data.json();
        //     console.log(userData);
        //     this.props.change_token(userData);
        //     this.props.handleClose();
        //   }
        //   else if(userData.role==="hoster"){
        //     this.props.p_props.history.push({
        //       pathname: '/Host',
        //       state: { detail: userData }
        //     })  
        //   }
        }
        else{
          console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
        }
    
      }

      handle_show_sugg=()=>{
          if(this.state.userData!==null && this.state.userData!==undefined){
            //   console.log("MPHKA");
            return(<Suggests
                p_props={this.props}
                userData={this.state.userData}
                ></Suggests>);
          }
      }

    submit_handler=(event)=>{
        event.preventDefault();
        // console.log(this.state.username);
        // console.log(this.state.password);
        // console.log(this.state.radius);
        // console.log(this.state.Filter_date_from);
        // console.log(this.state.Filter_date_to);
        // console.log(this.state.people);
        this.fetch_Results().then(() => {
            this.props.history.push({
                pathname: '/Results_Page',
                state: { detail: this.state
                 }
              })
          })
        
  
    }



    render(){
        const {classes} = this.props;
        
        return(
            <div  style={styles.paperContainer}>
                
                {/* <Container maxWidth='md'>
                          <Paper className={classes.paper}>xs=6</Paper>
                    <Typography className={classes.titleStyle}
                     align='center'variant='h1'>999 ΚΈΝΤΡΟ ΕΛΈΓΧΟΥ</Typography>
                </Container> */}

                <Grid container spacing={3} >
                    <Grid item xs={12} >
                    <Box display="flex" flexDirection="row" justifyContent="flex-start">
                    <Link to="/Welcome_Page"  >
                    <Typography className="title_class"
                        align='center'variant='h4' fontWeight="bold">Best Booking</Typography>
                    </Link>
                    
                    </Box>
                    <Box className="buttons_box" display="flex" flexDirection="row" justifyContent="flex-end">
                        
                        {this.log_sign_handler()}
                    </Box>
                    
                    
                    </Grid>
                    
                    <Grid item xs={12} className="Searchbar" >
                        <Box display="flex" alignItems="center"justifyContent="center" >
                        {/*  */}
                        <form className="undoform_format" onSubmit={this.submit_handler}>
                            <Grid container>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={8}>
                                <Grid container   direction="row" className="Custom_Searchbar" alignItems="center" justify="center" spacing={2} >
                                    {/* style={{ backgroundColor: "white"}} */}
                                    
                                        <Grid item xs='auto' >
                                            {this.Handle_from_date_time()}
                                        </Grid>
                                        <Grid item xs='auto'>
                                            {this.Handle_to_date_time()}
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                                value={this.state.radius}
                                                style={{ width: "100%"}}
                                                id="filled-number"
                                                label="Απόσταση Αναζήτησης"
                                                type="number"
                                                onChange={this.change_radius}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">Km</InputAdornment>,
                                                    inputProps: { min: 0 }
                                                }}
                                                required
                                                />
                                        </Grid>
                                        <Grid item xs='auto'>
                                            <TextField
                                            style={{ width: "110%"}}
                                                id="filled-number"
                                                label="Άτομα"
                                                type="number"
                                                value={this.state.people}
                                                onChange={this.change_people}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                required
                                                InputProps={{ inputProps: { min: 1, max: 20 } }}
                                                />
                                        </Grid>
                                        
                                        <Grid item xs='auto'>
                                            <Button variant="contained" color="primary"  type="submit">
                                                Αναζήτηση
                                            </Button>
                                        </Grid>
                                        
                                        {/* <Grid item xs={12}> */}
                                            {/* <Grid container> */}
                                            {/* <Grid item xs={3}>
                                                
                                            </Grid> */}
                                            <Grid item xs={6}>
                                            <Box display="flex" alignItems="center" justifyContent="center" >
                                                <Welcome_Map
                                                handleLatlng={this.handleLatlng}
                                                Latlng={this.state.Latlng}
                                                radius={this.state.radius*1000}></Welcome_Map>
                                            </Box>
                                            </Grid>     
                                            {/* <Grid item xs={3}></Grid>  */}
                                            {/* </Grid> */}
                                        {/* </Grid> */}
                                                    
                                        
                                    </Grid>
                                </Grid>
                                <Grid item xs={2}></Grid>
                            </Grid>
                            
                            
                        </form>    
                            
                            
                        </Box>
                        

                    {/* {icon_handler()} */}
                    </Grid>
                    <Grid item xs={12}>
                        {this.handle_show_sugg()}
                    </Grid>
                </Grid>
                {this.handleShow()}
                {this.show_reviews()}
            </div>
        );
    }

}


export default Welcome_Page;