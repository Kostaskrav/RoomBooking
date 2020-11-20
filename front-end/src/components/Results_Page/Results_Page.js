import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Login from '../Welcome_Page/Login.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { StickyContainer, Sticky } from 'react-sticky';

import InputAdornment from '@material-ui/core/InputAdornment';

import Results_ from './Results_.js';
import Filters from './Filters.js';

import Image from '../../Pictures/Result_Page_Picturies.jpg';
import Welcome_Map from '../Map/Welcome_Map.js';
import Review_Notifications from '../Welcome_Page/Review_Notifications.js';

import './Results_Page.css';

const styles = {
    paperContainer: {
        height: 400,
        maxWidth:"110%",
        backgroundImage: `url(${Image})`,
        backgroundRepeat:"no-repeat",
        backgroundSize: "100% 100%"
    }
};


class Results_Page extends Component {
    constructor(props){
        super(props);

        this.state = {
            open:false,
            Filter_date_from:null,
            Filter_date_to:null,
            // username:"",
            // password:"",
            radius:this.props.location.state.detail.radius,
            people:0,
            page:1,
            open_prof:false,
            userData:null,
            Latlng:{lat:38.5953683,lng:24.9877132},
            max_price:0,
            private:true,
            public:true,
            apartment:true,
            wi_fi:false,
            cooling:false,
            heating:false,
            kitchen:false,
            tv:false,
            parking:false,
            elevator:false,
            resultData:[],
            flag:true,
        };

        this.Change_userData=this.Change_userData.bind(this);
        this.handleLatlng=this.handleLatlng.bind(this);
        // this.change_username=this.change_username.bind(this);
        // this.change_password=this.change_password.bind(this);
        this.Logout_handler=this.Logout_handler.bind(this);
        this.ReturnWelcome=this.ReturnWelcome.bind(this);
        this.handleChangeChecked=this.handleChangeChecked.bind(this);
        this.handleClickOpen=this.handleClickOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleRegister=this.handleRegister.bind(this);
        this.handleShow=this.handleShow.bind(this);
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
        this.Filters_submit_handler=this.Filters_submit_handler.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.fetch_Results=this.fetch_Results.bind(this);
        this.handleflag=this.handleflag.bind(this);

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

    handleflag=()=>{
        this.setState({
          flag:false
        })
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
        this.props.history.push({pathname: '/Welcome_Page'})
    }

    handleLatlng=(value)=>{
        this.setState({
            Latlng: value
        })    
        };

    ReturnWelcome=(e)=>{
        this.props.history.push({
            pathname: '/Welcome_Page',
            state: { detail: this.state.userData,
            Filter_date_from:this.state.Filter_date_from,
            Filter_date_to:this.state.Filter_date_to,
            Latlng:this.state.Latlng,
            radius:this.state.radius,
            people:this.state.people,
             }
        })
    }

    handleChangeChecked=(event)=>{
        const {name, checked} = event.target
        this.setState({
          [name]: checked
        })    
      };

      handleChange=(event)=>{
        const {name, value} = event.target
        this.setState({
          [name]: value
        })    
      };

      handleChangePage=(value)=>{
        this.setState({
          page: value
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

    componentWillReceiveProps(nextProps) {
        console.log("EFTASA1");
        if(nextProps.resultData!==null){
            this.setState({
                resultData:nextProps.resultData,
            })
        }        
      }
    componentWillMount(){
        console.log(this.props.location.state.detail);
        this.setState({
        userData:this.props.location.state.detail.userData, 
        resultData:this.props.location.state.detail.resultData,  
        // username:this.props.location.state.detail.username,
        // password:this.props.location.state.detail.password,
        people:this.props.location.state.detail.people,
        radius:this.props.location.state.detail.radius,
        Latlng:this.props.location.state.detail.Latlng,
        Filter_date_from:this.props.location.state.detail.Filter_date_from,
        Filter_date_to:this.props.location.state.detail.Filter_date_to,
      }, () => console.log(this.state));
      
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

    handleShow=()=>{
        if(this.state.open){
            return(<Login p_props={this.props} handleClose={this.handleClose} change_token={this.Change_userData} ></Login>);   //change_user={this.change_username} change_pass={this.change_password}
        }
        else{
            return null;
        }
        }


    Handle_to_date_time=()=>{
        // console.log("MALAKIAto"+this.state.Filter_date_to.toISOString().slice(0,10));
        if(this.state.Filter_date_from!==null){
            // console.log("-from "+this.state.Filter_date_from.toISOString());
           return(
            <TextField
                // value={new Date('2014-08-18T21:11:54').toLocaleString()}
                required 
                label="Εως"
                type="date"
                value={this.state.Filter_date_to.toISOString().slice(0,10)}
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
                    label="Εως"
                    type="date"
                    // value={new Date('2014-08-18T21:11:54').toLocaleString()}
                    value={this.state.Filter_date_to.toISOString().slice(0,10)}
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
        // console.log("-from "+this.state.Filter_date_from.toISOString().slice(0,10));
        if(this.state.Filter_date_to!==null){
            // console.log("MALAKIAto"+this.state.Filter_date_to.toISOString());
           return(
            <TextField
                required
                // value={this.state.Filter_date_from.toISOString()}
                value={this.state.Filter_date_from.toISOString().slice(0,10)}
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
                    value={this.state.Filter_date_from.toISOString().slice(0,10)}
                    // defaultValue={this.state.Filter_date_from.toISOString().slice(0,10)}
                    id="date"
                    label="Από"
                    type="date"
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


      handleRegister=()=>{
        this.props.history.push({
            pathname: '/Register'
        })
    }

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
        if(this.state.userData===null){
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
        const data = await fetch('http://localhost:3001/apartments/'+this.state.people+"/"+this.state.Latlng.lat+"/"+this.state.Latlng.lng+"/"+this.state.radius+"/"+this.state.Filter_date_from+"/"
        +this.state.Filter_date_to+"/"+this.state.private+"/"+this.state.public+"/"+this.state.apartment+"/"+this.state.max_price+"/"+this.state.wi_fi+"/"+
        this.state.cooling+"/"+this.state.heating+"/"+this.state.kitchen+"/"+this.state.tv+"/"+this.state.parking+"/"+this.state.elevator+"/"+this.state.page, {
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
          console.log(resultData);
          this.setState({ 
              resultData: resultData,
        });
        }
        else{
        
          console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
        }
    
      }

    

    Filters_submit_handler=(event)=>{
        event.preventDefault();
        this.setState({
            flag:true
        })//()=>this.fetch_Results()
        // this.fetch_Results()
        console.log(this.state);
    }
    submit_handler=(event)=>{
        event.preventDefault();
        this.setState({
            flag:true
        })//()=>this.fetch_Results()
        
        // console.log(this.state.username);
        // console.log(this.state.password);
        console.log(this.state.radius);
        console.log(this.state.Latlng);
        console.log(this.state.Filter_date_from);
        // console.log("Fri Sep 11 2020 03:00:00 GMT+0300 (Eastern European Summer Time)"<new Date("11/6/2020"));
        console.log(this.state.Filter_date_to);
        console.log(this.state.people);
        // this.props.history.push({
        //     pathname: '/Results_Page',
        //     state: { detail: this.state }
        //   })
  
    }


    render(){
        return(
            <div>
                <Grid container spacing={3} style={styles.paperContainer}>
                    <Grid item xs={12} >
                        <Box display="flex" flexDirection="row" justifyContent="flex-start">
                        {/* <Link to="/Welcome_Page"  > */}
                        <Typography className="title_class" onClick={this.ReturnWelcome} style={{cursor:"pointer"}}
                        align='center'variant='h4' fontWeight="bold">Best Booking</Typography>
                        {/* </Link>                         */}
                        </Box>
                        <Grid container >
                            <Grid item xs={3}>

                            </Grid>
                            <Grid item xs={6}>
                            <Box display="flex" alignItems="center"justifyContent="center" >
                            <form className="undoform_format" onSubmit={this.submit_handler}>
                                <Grid container>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={10}>
                                    <Grid container  direction="row" className="Custom_Searchbar" alignItems="center" justify="center" spacing={2} >
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
                                                value={this.state.people}
                                                style={{ width: "110%"}}
                                                    id="filled-number"
                                                    label="Άτομα"
                                                    type="number"
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
                                            <Grid item xs={6}>
                                            <Box display="flex" alignItems="center" justifyContent="center" >
                                                <Welcome_Map
                                                handleLatlng={this.handleLatlng}
                                                Latlng={this.state.Latlng}
                                                radius={this.state.radius*1000}></Welcome_Map>
                                            </Box>
                                            </Grid>     
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                </Grid>
                            
                            </form>
                        </Box>

                            </Grid>
                            <Grid item xs={3}>
                            <Box className="buttons_box" display="flex" flexDirection="row" justifyContent="flex-end">
                                    {this.log_sign_handler()}
                                </Box> 
                            </Grid>
                        </Grid>
                                         
                        
                        </Grid>
                        <Grid item xs={12} >
                        
                    </Grid>

                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h1 >
                            Δωμάτια στην περιοχή 
                        </h1>
                        </Grid>
                </Grid>
                <StickyContainer>
                <Grid container spacing={1}>
                    {/* <Grid item xs={12}>
                        <h1 >
                            Δωμάτια στην περιοχή 
                        </h1>
                    </Grid> */}
                    
                    
                    <Grid item xs={3}>
                    
                    <Sticky>
                    {({ style }) => (
                        <Filters
                        style={style}
                        Filters_submit_handler={this.Filters_submit_handler}
                        handleChangeChecked={this.handleChangeChecked}
                        handleChange={this.handleChange}
                        max_price={this.state.max_price}
                        private={this.state.private}
                        public={this.state.public}
                        apartment={this.state.apartment}
                        wi_fi={this.state.wi_fi}
                        cooling={this.state.cooling}
                        heating={this.state.heating}
                        kitchen={this.state.kitchen}
                        tv={this.state.tv}
                        parking={this.state.parking}
                        elevator={this.state.elevator}
                        ></Filters>
                    // <h2 style={style}  >Filtra</h2>
                    )}
                    
                        </Sticky>   
                                             
                        
                    </Grid>
                    
                    <Grid item xs={6}>
                        {console.log("___________________________________________________________________________")}
                        {console.log(this.state.userData)}
                        <Results_
                        userData={this.state.userData}
                        p_props={this.props}
                        handleChangePage={this.handleChangePage}
                        resultData={this.state.resultData}
                        parentState={this.state}
                        handleflag={this.handleflag}
                        page={1}
                        ></Results_>
                    </Grid>
                    <Grid item xs={3}>
                        
                    </Grid>
                </Grid>
                </StickyContainer>
                {this.handleShow()}
                {this.show_reviews()}
            </div>
        );
    }


}

export default Results_Page;