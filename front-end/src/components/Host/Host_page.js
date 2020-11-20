import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CardActionArea from "@material-ui/core/CardActionArea";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';
// import Search from '../Map/Search.js';

import My_apartment from './my_apartment.js';
import Request_Handle from './Request_Handle.js';

import Step1 from './Step1.js';
import Step2 from './Step2.js';
import Step3 from './Step3.js';
import Step4 from './Step4.js';
import Step5 from './Step5.js';
import Step6 from './Step6.js';
import Step7 from './Step7.js';



import './Host_page.css';

import Image from '../../Pictures/register_pic.jpg'; // Import using relative path;

 

const styles = {
    paperContainer: {
        height: 200,
        maxWidth:"100%",
        backgroundImage: `url(${Image})`,
        backgroundRepeat:"no-repeat",
        backgroundSize: "100% 100%"
    }
};

class Host_page extends Component{
  constructor(props){
    super(props);
    this.state = {
        username:"Mikeee",
        password:"",
        open_prof:false,
        currentStep: 1,
        userData:null,
        Address:'',
        Latlng:null,
        Title_dep:'',
        pub_tra:'',
        Date_list:[{Date_from:null,Date_to:null}],
       
        Price_per_night:'',
        Min_price:'',
        Extra_person_price:'',
        Max_people:'',
        Place_type:'',
        Rules_list:[],
        Photos_list:[],
        Description:'',
        Beds_num:0,
        WC_num:0,
        Bedroom_num:0,
        Livingroom:false,
        Room_area:0,
        wi_fi:false,
        cooling:false,
        heating:false,
        kitchen:false,
        tv:false,
        parking:false,
        elevator:false,

        apartments:false,
        requests:false,
    };
    this.openInNewTab=this.openInNewTab.bind(this);
    this.handleClickOpen_prof=this.handleClickOpen_prof.bind(this);
    this.handleClose_prof=this.handleClose_prof.bind(this);
    this.handleGo_prof=this.handleGo_prof.bind(this);
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleChangeChecked=this.handleChangeChecked.bind(this);
    this.handleLatlng=this.handleLatlng.bind(this);
    this.handleSubmitButton=this.handleSubmitButton.bind(this);

    this.handleAddRules_list=this.handleAddRules_list.bind(this);
    this.handleChangeRulesList=this.handleChangeRulesList.bind(this); 
    this.handleRemoveRules_list=this.handleRemoveRules_list.bind(this);
    
    this.handleAddDate_list=this.handleAddDate_list.bind(this);
    this.handleChangeList=this.handleChangeList.bind(this); 
    this.handleRemoveDate_list=this.handleRemoveDate_list.bind(this); 

    this.handleChangePhotosList=this.handleChangePhotosList.bind(this); 
    this.handleRemovePhotos_list=this.handleRemovePhotos_list.bind(this);  
    this.Dates_organizer=this.Dates_organizer.bind(this);
    
    this.fetchUser_apartment_create=this.fetchUser_apartment_create.bind(this);  

    this.show_notifications=this.show_notifications.bind(this);
    this.hide_notifications=this.hide_notifications.bind(this);
    this.show_apartments=this.show_apartments.bind(this);

    this.show_requests=this.show_requests.bind(this);
    this.hide_requests=this.hide_requests.bind(this);
    this.show_my_requests=this.show_my_requests.bind(this);
    
  }

  show_requests=()=>{
    this.setState({
      requests:true,
    })
}
hide_requests=()=>{
  this.setState({
    requests:false,
  })
  }

show_my_requests=()=>{
  if(this.state.requests){
      return<Request_Handle
      handleClose={this.hide_requests}
      host_id={this.state.userData._id}
      ></Request_Handle>
  }
  else{
      return null;
  }
  
}

  show_notifications=()=>{
    this.setState({
      apartments:true,
    })
}
hide_notifications=()=>{
  this.setState({
    apartments:false,
  })
  }

show_apartments=()=>{
  if(this.state.apartments){
      return<My_apartment
      handleClose={this.hide_notifications}
      host_id={this.state.userData._id}
      host_token={this.state.userData.token}
      ></My_apartment>
  }
  else{
      return null;
  }
  
}

  openInNewTab=(url)=> {
    var win = window.open(url, '_blank');
    if (win != null) {
      win.focus();
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

componentWillMount(){
  this.setState({
   userData:this.props.location.state.detail,   
 }, () => console.log(this.state));
 }

handleAddRules_list=()=>{
  this.setState({
    Rules_list: this.state.Rules_list.concat("")
  })
};

handleGo_prof = () => {
  this.handleClose_prof();
  this.props.history.push({
      pathname: '/Profile',
      state: { detail: this.state.userData }
    })
  }; 


handleAddDate_list=()=>{
  this.setState({
    Date_list: this.state.Date_list.concat({Date_from:null,Date_to:null})
  })
};

handleChangeList=(event,index)=>{
  event.persist();
  // console.log(index);
  // console.log(event);
  const {name, value} = event.target;
  let joined = this.state.Date_list.slice();
  joined[index][name]=new Date(value);
  
  this.setState({
    Date_list: joined
  })
};

handleChangeRulesList=(event,index)=>{
  event.persist();
  console.log(index);
  console.log(event);
  const {name, value} = event.target;
  let joined = this.state.Rules_list.slice();
  joined[index]=value;
  
  this.setState({
    Rules_list: joined
  })
};

handleChangePhotosList=(event)=>{
  // event.persist();
  // console.log("HELLO");
  // console.log(event);
  
  var file = event.target.files[0];
  // console.log(file);
  if(file!==null){
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    let file_size = event.target.files[0].size;
    
    if(file_size>1000000){
        return;
    }

    let joined = this.state.Photos_list.slice();
    // joined[index]=value;      
    reader.onloadend = function(e) {
      
      joined=this.state.Photos_list.concat(reader.result);
      // console.log(joined);
        this.setState({
          Photos_list: joined
        });
    }.bind(this);
    event.target.value = null;
    // console.log(url);
  }
   // Would see a path?
    
  // this.setState({
  //     // mainState: "uploaded",
  //     Photos_list: joined,
  //     // imageUploaded: 1
  // });
  // const {name, value} = event.target;
  
  
  // this.setState({
  //   Photos_list: joined
  // })
};


handleRemovePhotos_list=(e,index)=>{

  let joined = this.state.Photos_list.slice();
  joined.splice(index, 1);
  console.log(joined);
  this.setState({
    Photos_list: joined
  })
}

handleRemoveDate_list=(e,index)=>{

  let joined = this.state.Date_list.slice();
  joined.splice(index, 1);
  this.setState({
    Date_list: joined
  })
}

handleRemoveRules_list=(e,index)=>{

  let joined = this.state.Rules_list.slice();
  joined.splice(index, 1);
  this.setState({
    Rules_list: joined
  })
}

handleChange=(event)=>{
    const {name, value} = event.target
    this.setState({
      [name]: value
    })    
  };

  handleChangeChecked=(event)=>{
    const {name, checked} = event.target
    this.setState({
      [name]: checked
    })    
  };

handleLatlng=(value)=>{
this.setState({
    Latlng: value
})    
};

get previousButton(){
    let currentStep = this.state.currentStep;
    // If the current step is not 1, then render the "previous" button
    if(currentStep !==1){
      return (
        <Button className="btn btn-secondary" 
        type="button" onClick={this._prev} variant="contained">Previous</Button>
        // <button 
        //   className="btn btn-secondary" 
        //   type="button" onClick={this._prev}>
        // Previous
        // </button>
      )
    }
    // ...else return nothing
    return null;
  }
  
  get nextButton(){
    let currentStep = this.state.currentStep;
    
    // If the current step is not 3, then render the "next" button
    if(currentStep <7){
      return (
        <Button className="btn btn-secondary" color="primary"
        type="button" onClick={this._next} variant="contained">Next</Button>
        // <button 
        //   className="btn btn-primary float-right" 
        //   type="button" onClick={this._next}>
        // Next
        // </button>        
      )
    }
    // ...else render nothing
    
    return null;
  }

_next() {
    let currentStep = this.state.currentStep
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 6? 7: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev() {
    let currentStep = this.state.currentStep
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  fetchUser_apartment_create = async () => { 
    const formData = new FormData();
    for(var propName in this.state) {
        if(propName!=="Date_list" && propName!=="Rules_list" && propName!=="Photos_list"){
          console.log(propName+"____"+this.state[propName]);
          formData.append(propName, this.state[propName]);
          // var value = this.state[propName];
          // updateOps[propName] = value;
        }
        
    }
    formData.append("lat", this.state.Latlng.lat);
    formData.append("lon", this.state.Latlng.lng);
    formData.append("host_id", this.state.userData._id);
    formData.append("host_username", this.state.userData.username);
    formData.append("host_img", this.state.userData.photo);
    this.state.Date_list.map((item,index)=>{
      Object.keys(item).forEach(key => {
        formData.append("Date_list["+index+"]["+key+"]", item[key]);
      });
    });
    this.state.Rules_list.map((item,index)=>{
        formData.append("Rules_list["+index+"]", item);
      
    });
    this.state.Photos_list.map((item,index)=>{
      formData.append("Photos_list["+index+"]", item);
    
  });
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
  
    
    const data = await fetch('http://localhost:3001/apartments/', {
      method: 'POST',
      headers:{
        'Authorization': 'Bearer ' + this.props.location.state.detail.token
      },
    //   headers: { 
    //     'Accept': 'application/json',
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   file:JSON.stringify({path:this.state.photo}),
      body: formData
    
    });
    if(data.status===200){

    //   const userData = await data.json();
      
    }
    else{
    //   this.handleLoginError(data.status);
      console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
    }

  }

  Dates_organizer=()=>{
    var joined=this.state.Date_list
    function compare( a, b ) {
      if ( a.Date_from < b.Date_from ){
        return -1;
      }
      if ( a.Date_from > b.Date_from ){
        return 1;
      }
      return 0;
    }
    
    joined.sort( compare );
    console.log(joined);
    var merged_Dates=[];
    var len=joined.length
    joined.map((item,index)=>{
      if(index===0){
        merged_Dates.push(item);
      }
      if(index+1<len){
        if(joined[index+1].Date_from.toISOString().slice(0,10)<=item.Date_to.toISOString().slice(0,10)){
          if(joined[index+1].Date_to.toISOString().slice(0,10)<=item.Date_to.toISOString().slice(0,10)){

          }
          else if(joined[index+1].Date_to.toISOString().slice(0,10)>item.Date_to.toISOString().slice(0,10)){
            console.log("ITEM");
            console.log(item);
            merged_Dates[merged_Dates.length-1] = {Date_from:merged_Dates[merged_Dates.length-1].Date_from,Date_to:joined[index+1].Date_to};
          }
        }
        else{
          merged_Dates.push(joined[index+1]);
        }
      }
      console.log(index);
      
      console.log(merged_Dates);
    })
    console.log(merged_Dates);
    this.setState({
      Date_list:merged_Dates
    })
  }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("GINETAI SUBMIT");
        console.log(this.state);
        this.Dates_organizer();
        this.fetchUser_apartment_create();
        // const { email, username, password } = this.state
        // alert(`Your registration detail: \n 
        //   Email: ${email} \n 
        //   Username: ${username} \n
        //   Password: ${password}`)
      }

      handleSubmitButton=()=>{
        if(this.state.currentStep ===7){
          return(
            <Button className="btn btn-secondary" color="primary"
            type="submit" variant="contained">SUBMIT</Button>
          )
        }
        else{
          return null;
        }
      }

      

  render(){
    return (
      <div>
          <Grid container style={styles.paperContainer}>
                <Grid item xs={12}>
                    <Box display="flex" flexDirection="row" justifyContent="flex-start">
                    <Link to="/Welcome_Page"  >
                    <Typography className="title_class"
                        align='center'variant='h4' fontWeight="bold">Best Booking</Typography>
                    </Link>    
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography className="reg_class" align="center" variant="h3" >Καλωσήρθες {this.state.username}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box className="buttons_box" display="flex" flexDirection="row" justifyContent="flex-end">
                    <AccountCircleIcon className="prof_icon" aria-haspopup="true" onClick={this.handleClickOpen_prof}></AccountCircleIcon>
                    
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.open_prof}
                        keepMounted
                        open={Boolean(this.state.open_prof)}
                        onClose={this.handleClose_prof}
                        >
                        <MenuItem onClick={this.handleGo_prof}>Profile</MenuItem>
                        <MenuItem onClick={this.show_notifications}>Τα καταλύματά μου</MenuItem>
                        <MenuItem onClick={()=>{this.props.history.push({pathname: '/Welcome_Page'})}}>Logout</MenuItem>
                        </Menu>
                </Box>
        
                </Grid>
            </Grid>
            <Grid container spacing={1} >
              <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                    <Typography  align="center" variant="h4" >Προσθήκη Νέου Καταλύματος</Typography>
                </Grid>
                <Grid item xs={2}>
                <Box style={{marginTop:"4%"}} display="flex" flexDirection="row" justifyContent="flex-end">
                  <Button variant="contained" onClick={this.show_requests}>Αιτήματα Ενοικίασης</Button>
                </Box>
                  
                </Grid>
                <Divider style={{backgroundColor:"black"}}  />
                <Grid item xs={12}>
                <hr></hr>
                </Grid>
                <Grid item xs={3}>

                </Grid>
                <Grid item xs={6}>
                <p>Step {this.state.currentStep} </p> 
                <form onSubmit={this.handleSubmit}>
                <Step1 
                currentStep={this.state.currentStep} 
                handleChange={this.handleChange}
                handleLatlng={this.handleLatlng}
                Latlng={this.state.Latlng}
                Address={this.state.Address}
                pub_tra={this.state.pub_tra}
                Title_dep={this.state.Title_dep}
                />
                <Step3
                currentStep={this.state.currentStep} 
                handleChange={this.handleChange}
                
                
                Min_price={this.state.Min_price}
                Extra_person_price={this.state.Extra_person_price}
                Max_people={this.state.Max_people}
                Place_type={this.state.Place_type}
                Price_per_night={this.state.Price_per_night}
                
                />
                <Step2
                currentStep={this.state.currentStep} 
                handleAddDate_list={this.handleAddDate_list}
                Date_list={this.state.Date_list}
                handleChangeList={this.handleChangeList}
                handleRemoveDate_list={this.handleRemoveDate_list}
                />
                <Step4
                currentStep={this.state.currentStep} 
                handleAddRules_list={this.handleAddRules_list}
                handleChangeRulesList={this.handleChangeRulesList}
                handleRemoveRules_list={this.handleRemoveRules_list}
                Rules_list={this.state.Rules_list}
                />
                <Step5
                currentStep={this.state.currentStep} 
                Description={this.state.Description}
                Beds_num={this.state.Beds_num}
                WC_num={this.state.WC_num}
                Bedroom_num={this.state.Bedroom_num}
                Livingroom={this.state.Livingroom}
                Room_area={this.state.Room_area}
                handleChange={this.handleChange}
                />
                <Step6
                currentStep={this.state.currentStep} 
                handleAddPhotos_list={this.handleAddPhotos_list}
                handleChangePhotosList={this.handleChangePhotosList}
                handleRemovePhotos_list={this.handleRemovePhotos_list}
                Photos_list={this.state.Photos_list}
                />
                 <Step7
                currentStep={this.state.currentStep} 
                wi_fi={this.state.wi_fi}
                cooling={this.state.cooling}
                heating={this.state.heating}
                kitchen={this.state.kitchen}
                tv={this.state.tv}
                parking={this.state.parking}
                elevator={this.state.elevator}
                
                handleChangeChecked={this.handleChangeChecked}
                />
                <Grid container>
                    <Grid item xs={6}>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start">
                            {this.previousButton}
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box display="flex" flexDirection="row" justifyContent="flex-end">
                            {this.nextButton}
                            {this.handleSubmitButton()}
                        </Box>
                    </Grid>
                </Grid>
{/*                 
                <Button className="btn btn-secondary" color="primary"
        type="submit" variant="contained">SUBMIT</Button> */}
            </form>
                
                
                
                </Grid>
                <Grid item xs={3}>

                </Grid>
            </Grid>

            
            {this.show_my_requests()}
            {this.show_apartments()}
      </div>
    );
  }
  


}


export default Host_page;
