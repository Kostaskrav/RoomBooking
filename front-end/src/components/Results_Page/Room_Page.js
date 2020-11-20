import React,{Component} from 'react';
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
import Divider from '@material-ui/core/Divider';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Room_Dates_Box from './Room_Dates_Box.js';

import Image from '../../Pictures/Result_Page_Picturies.jpg';
import image from '../../Pictures/room_pic.jpg';
import Images_display from './Images_display.js'
import Gallery from 'react-grid-gallery';
import KingBedIcon from '@material-ui/icons/KingBed';
import WcIcon from '@material-ui/icons/Wc';
import WeekendIcon from '@material-ui/icons/Weekend';
import img2 from '../../Pictures/prof_pic.jpg';
import { DatePicker,KeyboardDatePicker  } from '@material-ui/pickers';
import { StickyContainer, Sticky } from 'react-sticky';
import Review_Notifications from '../Welcome_Page/Review_Notifications.js';
import Avatar from '@material-ui/core/Avatar';


import Read_only_Map from '../Map/Read_only_Map.js';
import Reviews from './Reviews.js';
import "./Room_Page.css";


const styles = {
    paperContainer: {
        height: 110,
        maxWidth:"110%",
        boxShadow:" 0 10px 8px -2px rgb(220, 220, 220)",
        
    }
};

class Room_Page extends Component{
  constructor(props){
    super(props);
    this.state = {
        open:false,
        Filter_date_from:null,
        Filter_date_to:null,
        radius:0,
        // username:"",
        // password:"",
        location:"",
        people:0,
        page:0,
        open_prof:false,
        userData:null,
        apart_id:'',
        images:[],
        pub_tra:'Ela me to treno apejv se bgazei',
        Address:'Metamorfvsh kapoy 12',
        Latlng:{lat:37.96740736369813,lng:23.72731073541712},
        Title_dep:'Τέλειο Δωμάτιο',
        Date_list:[{Date_from:new Date("9-5-2020"),Date_to:new Date("9-29-2020")},
            {Date_from:new Date("10-5-2020"),Date_to:new Date("10-15-2020")}
            // {Date_from:null,Date_to:null},
            // {Date_from:null,Date_to:null},
            // {Date_from:null,Date_to:null}
        ],
        total_days:0,
        Min_price:0,
        Extra_person_price:18,
        Max_people:8,
        Place_type:'Ολόκληρο κατάλυμα',
        Rules_list:["oxi gatia","oxi skylia"],
        Photos_list:[],
        Description:'Poly kalo dvmatio me hlio kai ta ola toy',
        Beds_num:2,
        WC_num:1,
        Bedroom_num:1,
        Livingroom:2,
        Room_area:80,
        supp:{},
        flag:true,
        notifications:false,
        hostData:null,
        host_id:'',
        reviews:[],
    };

    this.log_sign_handler=this.log_sign_handler.bind(this);
    this.Logout_handler=this.Logout_handler.bind(this);
    this.ReturnWelcome=this.ReturnWelcome.bind(this);
    this.handleClickOpen=this.handleClickOpen.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.handleRegister=this.handleRegister.bind(this);
    this.handleShow=this.handleShow.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleChangeState=this.handleChangeState.bind(this);
    this.handleDisableDates=this.handleDisableDates.bind(this);
    this.handleDisableDatesto=this.handleDisableDatesto.bind(this);    
    this.handle_submit=this.handle_submit.bind(this);

    this.handleClickOpen_prof=this.handleClickOpen_prof.bind(this);
    this.handleClose_prof=this.handleClose_prof.bind(this);
    this.handleGo_prof=this.handleGo_prof.bind(this);
    this.Change_userData=this.Change_userData.bind(this);

    this.show_notifications=this.show_notifications.bind(this);
    this.hide_notifications=this.hide_notifications.bind(this);
    this.show_reviews=this.show_reviews.bind(this);

    this.fetch_getHost=this.fetch_getHost.bind(this);
    this.show_host=this.show_host.bind(this);
    this.fetch_make_reservation=this.fetch_make_reservation.bind(this);
    
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

fetch_getHost= async () => { 
        const data = await fetch('http://localhost:3001/user/'+this.state.host_id, {
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
                hostData: resultData,
              });
          }
          else{
            console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
          }
}
  
  componentWillMount(){
      console.log(this.props.location.state.detail);
    var joined={}
    joined.Wi_Fi=this.props.location.state.detail.doc.wi_fi
    joined.Cooling=this.props.location.state.detail.doc.cooling
    joined.Heating=this.props.location.state.detail.doc.heating
    joined.Kitchen=this.props.location.state.detail.doc.kitchen
    joined.TV=this.props.location.state.detail.doc.tv
    joined.Parking=this.props.location.state.detail.doc.parking
    joined.Elevator=this.props.location.state.detail.doc.elevator
    console.log(this.props.location.state.detail);

    this.setState({
    supp:joined,
    radius:this.props.location.state.radius,
    Filter_date_from:this.props.location.state.Filter_date_from,
    Filter_date_to:this.props.location.state.Filter_date_to,
    people:this.props.location.state.people,
    apart_id:this.props.location.state.detail.doc._id,
    images:this.props.location.state.detail.doc.apart_images,
    pub_tra:this.props.location.state.detail.doc.pub_tra,
    Address:this.props.location.state.detail.doc.address,
    Latlng:{lat:this.props.location.state.detail.doc.lat,lng:this.props.location.state.detail.doc.lon},
    Title_dep:this.props.location.state.detail.doc.title,
    Date_list:this.props.location.state.detail.doc.date_array.map((item,index)=>{
        return {Date_from:new Date(item.Date_from),Date_to:new Date(item.Date_to)}
    }),
    Min_price:this.props.location.state.detail.doc.min_price,
    Extra_person_price:this.props.location.state.detail.doc.price_per_person,
    Max_people:this.props.location.state.detail.doc.max_people,
    Place_type:this.props.location.state.detail.doc.type,
    Rules_list:this.props.location.state.detail.doc.rules,
    Description:this.props.location.state.detail.doc.description,
    Beds_num:this.props.location.state.detail.doc.bed_num,
    WC_num:this.props.location.state.detail.doc.bath_num,
    Bedroom_num:this.props.location.state.detail.doc.room_num,
    Livingroom:this.props.location.state.detail.doc.liv_room,
    Room_area:this.props.location.state.detail.doc.area,
    userData:this.props.location.state.userData,
    host_id:this.props.location.state.detail.doc.host_id,
  }, () => this.fetch_getHost());

  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }
  

  handleChange=(name,date)=>{
    //   console.log(date);
      if(name==="Filter_date_from"){
          for(let item of this.state.Date_list){
              console.log(item);
            if(item.Date_from.toISOString().slice(0,10)<=new Date(date).toISOString().slice(0,10) && new Date(date).toISOString().slice(0,10)<=item.Date_to.toISOString().slice(0,10)){
                if(this.state.Filter_date_to!==null && this.state.Filter_date_to!==undefined ){
                    if(item.Date_from.toISOString().slice(0,10)<=this.state.Filter_date_to.toISOString().slice(0,10) && this.state.Filter_date_to.toISOString().slice(0,10)<=item.Date_to.toISOString().slice(0,10)){
                        this.setState({
                            [name]:new Date(date) 
                        })
                    }
                    else{
                        this.setState({
                            Filter_date_from:new Date(date),
                            Filter_date_to:null
                        })
                    }
                }
                else{
                    this.setState({
                        [name]:new Date(date) 
                    })
                }
                break;
            }
          }
      }
      else{
        this.setState({
            [name]:new Date(date) 
        }) 
      }
    // const {name, value} = event.target
       
  };

  handleChangeState=(event)=>{
    const {name, value} = event.target
    this.setState({
        [name]:value
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

    handleRegister=()=>{
        this.props.history.push({
            pathname: '/Register'
        })
    }

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
    

  Logout_handler=()=>{
    this.setState({
        userData:null
    });
    this.handleClose_prof();
    this.props.history.push({pathname: '/Welcome_Page'})
}


    handleDisableDates=(day)=>{
        var flag=true;
        var dayt=day.toISOString().slice(0,10)
        this.state.Date_list.map((item,index)=>{
            // console.log(index);
            if(item.Date_from.toISOString().slice(0,10)<=dayt && dayt<=item.Date_to.toISOString().slice(0,10)){
                // console.log(item.Date_from);
                // console.log(item.Date_from.toISOString().slice(0,10));
                // console.log(day);
                // console.log("MPHKE");
                flag=false;
            }
        });
        return flag;
        console.log(day);
    }

    handleDisableDatesto=(day)=>{
        var flag=true;
        var dayt=day.toISOString().slice(0,10)
        var dayf=this.state.Filter_date_from.toISOString().slice(0,10)
        this.state.Date_list.map((item,index)=>{
            // console.log(index);
            if(item.Date_from.toISOString().slice(0,10)<=dayf && dayf<=item.Date_to.toISOString().slice(0,10)){
                if(dayt>dayf && dayt<=item.Date_to.toISOString().slice(0,10)){
                    flag=false;
                }
                // console.log(item.Date_from);
                // console.log(item.Date_from.toISOString().slice(0,10));
                // console.log(day);
                // console.log("MPHKE");
                
            }
        });
        return flag;
        console.log(day);
    }

    Change_userData=(userData)=>{
        this.setState({
            userData:userData
        });
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

handleShow=()=>{
    if(this.state.open){
        return(<Login p_props={this.props} handleClose={this.handleClose} change_token={this.Change_userData} ></Login>);   //change_user={this.change_username} change_pass={this.change_password}
    }
    else{
        return null;
    }
    }

    fetch_make_reservation= async () => { 
        const data = await fetch('http://localhost:3001/reservation/', {
          method: 'POST',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          // body: JSON.stringify(this.state)
        body: JSON.stringify({
            renterid: this.state.userData._id,
            hostid: this.state.host_id,
            apartid: this.state.apart_id,
            date_from: this.state.Filter_date_from,
            date_to: this.state.Filter_date_to,
            accepted:false
        })
        });
        if(data.status===200){
            const resultData = await data.json();
            // console.log(resultData);
            // this.setState({ 
            //     hostData: resultData,
            //   });
          }
          else{
            console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
          }
}

    handle_submit=(event)=>{
        event.preventDefault();
        this.fetch_make_reservation();
        // console.log(this.state);
    }

    show_host=()=>{
        if(this.state.hostData!==null && this.state.hostData!==undefined){
            return(
                <div>
                    <Box display="flex" alignItems="center" justifyContent="center" >
                        <Avatar alt={this.state.hostData.user.username} src={this.state.hostData.user.Image} />
                    </Box>
                    
                    <Box display="flex" alignItems="center" justifyContent="center" >
                        <Typography variant="body1" align="left">{this.state.hostData.user.username}</Typography>
                    </Box>
                    
                </div>
            )
        }
    }

  render(){
    return (
      <div>
          <Grid container spacing={3} style={styles.paperContainer}>
          <Grid item xs={6} >
                <Box display="flex" flexDirection="row" justifyContent="flex-start">
                
                <Typography className="title_class" onClick={this.ReturnWelcome} style={{cursor:"pointer"}}
                align='center'variant='h4' fontWeight="bold">Best Booking</Typography>
                
                </Box>
            </Grid>   
            <Grid item xs={6}>
                <Box className="buttons_box" display="flex" flexDirection="row" justifyContent="flex-end">
                        {this.log_sign_handler()}
                    </Box> 
                </Grid>         
          </Grid>
          <Grid container style={{marginTop:"3%"}}>
              <Grid item xs={2}>

              </Grid>
              <Grid item xs={8}>
                  <Box >
                  <Images_display Images={this.state.images}>

                    </Images_display>
                  </Box>
                  
                 
              {/* <Gallery images={this.state.images} 
                backdropClosesModal={true}
                lightboxWidth={2000}
                // rowHeight={500}
                // currentImageWillChange={this.onCurrentImageChange}
                enableLightbox={true}
                enableImageSelection={false}
                // customControls={[
                //     <button key="deleteImage" onClick={(e)=>{this.props.handleRemovePhotos_list(e,this.state.currentImage);this.deleteImage()}}>Delete Image</button>
                // ]}
                showLightboxThumbnails={true}/> */}
              </Grid>
              <Grid item xs={2}>
                  
                  </Grid>
          </Grid>
          <StickyContainer>
          <Grid container>
              <Grid item xs={2}></Grid>
              <Grid item xs={7}>
                <Grid item xs={12}>
                        <div className="title_padding">
                            <Grid container>
                                <Grid item xs={8}>
                                    <Typography variant="h4" align="left">{this.state.Title_dep}</Typography>
                                    <Typography variant="body1" align="left">{this.state.Description}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    {this.show_host()}
                                </Grid>
                            </Grid>
                            
                        </div>
                        <div className="title_padding">
                            
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                   
                    <Grid item xs={12}>                        
                        <div className="title_padding">
                            <Typography variant="h4" align="left"><Box fontSize="1.8rem">Παροχές</Box></Typography>
                            <Grid container>
                                <Grid item xs={6}>
                                {Object.keys(this.state.supp).slice(0, 4).map((key, index)=>{
                                    if(this.state.supp[key]){
                                        return(
                                            <div key={index}>
                                                <Typography variant="h6"  align="left"><Box fontWeight="fontWeightRegular">{key}</Box></Typography>
                                            </div>
                                        )
                                    }
                                    else{
                                        return(
                                            <div key={index} style={{textDecoration:"line-through"}}>
                                                <Typography variant="h6" align="left"><Box fontWeight="fontWeightRegular">{key}</Box></Typography>
                                            </div>
                                        )
                                    }
                                })}
                                </Grid>
                                <Grid item xs={6}>
                                {Object.keys(this.state.supp).slice(4, 7).map((key, index)=>{
                                    if(this.state.supp[key]){
                                        return(
                                            <div key={index}>
                                                <Typography variant="h6"  align="left"><Box fontWeight="fontWeightRegular">{key}</Box></Typography>
                                            </div>
                                        )
                                    }
                                    else{
                                        return(
                                            <div key={index} style={{textDecoration:"line-through"}}>
                                                <Typography variant="h6" align="left"><Box fontWeight="fontWeightRegular">{key}</Box></Typography>
                                            </div>
                                        )
                                    }
                                })}
                                </Grid>
                            </Grid>
                            
                        </div>
                        
                    </Grid>

                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>

                    <Grid item xs={12}>
                    <div className="title_padding">
                    <Typography variant="h4" align="left"><Box fontSize="1.8rem">Χώροι</Box></Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Card >
                                    <CardMedia>
                                        <KingBedIcon style={{fontSize:"80px"}}></KingBedIcon>
                                    </CardMedia>
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Υπνοδωμάτια {this.state.Bedroom_num}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Αριθμός Κρεβατιών {this.state.Beds_num}
                                    </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            
                            <Grid item xs={4}>
                                <Card >
                                    <CardMedia>
                                        <WeekendIcon style={{fontSize:"80px"}}></WeekendIcon>
                                    </CardMedia>
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Αριθμός Καθιστικών {this.state.Livingroom}
                                    </Typography>
                                    
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card >
                                    <CardMedia>
                                        <WcIcon style={{fontSize:"80px"}}></WcIcon>
                                    </CardMedia>
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Αριθμός Μπάνιων {this.state.WC_num}
                                    </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                    <div className="title_padding">
                        <Typography variant="h4" align="left"><Box fontSize="1.8rem">Κανόνες</Box></Typography>
                        {this.state.Rules_list.map((item,index)=>{
                            return(
                                <div key={index}>
                                     <TextField
                                     style={{height:"auto"}}
                                    //id="standard-disabled"
                                    defaultValue={ "Κανόνας"+(index+1)+"\n"+item}
                                    multiline
                                    fullWidth
                                    rows={3}
                                    variant="outlined"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    />
                                </div>
                                )
                        })}
                    </div>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                    <div className="title_padding">
                        <Typography variant="h4" align="left"><Box fontSize="1.8rem">Τοποθεσία</Box></Typography>
                        <Typography variant="body1" align="left">Διεύθυνση: {this.state.Address}</Typography>
                        <Read_only_Map
                        Latlng={this.state.Latlng}
                        ></Read_only_Map>
                            <Typography variant="h6" align="left"><Box fontSize="1.5rem">Συγκοινωνίες</Box></Typography>
                            <TextField
                            style={{height:"auto"}}
                            //id="standard-disabled"
                            defaultValue={this.state.pub_tra}
                            multiline
                            fullWidth
                            rows={3}
                            
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                        </div>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Divider style={{border: "2px solid"}}/>
                    </Grid>
                    <Grid item xs={12}>
                    <div className="title_padding">
                        
                        <Reviews
                        apart_id={this.state.apart_id}
                        userDate={this.state.userData}
                        >
                        </Reviews>
                    </div>
                        
                    </Grid>
                    
              </Grid>
                    
              
              <Grid item xs={3}>
              <Sticky>
                    {({ style }) => (
                  <Room_Dates_Box
                  style={style}
                  userData={this.state.userData}
                  people={this.state.people}
                  total_days={this.state.total_days}
                  Extra_person_price={this.state.Extra_person_price}
                  Min_price={this.state.Min_price}
                  Max_people={this.state.Max_people}
                  Filter_date_from={this.state.Filter_date_from}
                  Filter_date_to={this.state.Filter_date_to}
                  handleDisableDates={this.handleDisableDates}
                  handleDisableDatesto={this.handleDisableDatesto}
                  handleChangeState={this.handleChangeState}
                  handleChange={this.handleChange}
                  handle_submit={this.handle_submit}
                  ></Room_Dates_Box>
                
                )}
                </Sticky>
            </Grid> 
                    
                    
            </Grid>
            </StickyContainer>
          {this.handleShow()}
          {this.show_reviews()}
      </div>
    );
  }
  


}


export default Room_Page;
