import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import CardActionArea from "@material-ui/core/CardActionArea";
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';

import Change_prof from './Change_prof.js';

import './profile.css';
import Image from '../../Pictures/register_pic.jpg'; // Import using relative path;


const styles = {
    paperContainer: {
        height: 170,
        maxWidth:"100%",
        backgroundImage: `url(${Image})`,
        backgroundRepeat:"no-repeat",
        backgroundSize: "100% 100%"
    }
};

class Profile extends Component{
  constructor(props){
    super(props);

    this.state = {
        Username:'',
        Name:'',
        Lastname:'',
        Email:'',
        Role:'',
        photo:require('../../Pictures/prof_pic.jpg'),
        open_change:false,
        token:'',
        userData:null,
    };

    this.Logout_handler=this.Logout_handler.bind(this);
    this.ReturnWelcome=this.ReturnWelcome.bind(this);
    this.handle_open=this.handle_open.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.handleShow=this.handleShow.bind(this);
    this.change_name=this.change_name.bind(this);
    this.change_username=this.change_username.bind(this);
    this.change_lastname=this.change_lastname.bind(this);
    this.change_email=this.change_email.bind(this);
    this.change_photo=this.change_photo.bind(this);
    // change_name
    // change_username
    // change_lastname
    // change_email
    // change_photo

  }

  componentWillMount(){
    this.setState({
     token:this.props.location.state.detail.token,   
     // username:this.props.location.state.detail.username,
     // password:this.props.location.state.detail.password,
     Username:this.props.location.state.detail.username,
     Name:this.props.location.state.detail.name,
     Email:this.props.location.state.detail.email,
     Role:this.props.location.state.detail.role,
     Lastname:this.props.location.state.detail.lastname,
     userData:this.props.location.state.detail,
    //  photo:this.props.location.state.detail.photo,
   }, () => console.log(this.state));
   
   if(this.props.location.state.detail.photo!==null){
    this.setState({
      photo:this.props.location.state.detail.photo,
    }, () => console.log(this.state));
   }
  

   }

  handle_open=()=>{
    this.setState({
      open_change:true
    })
  };
  
  Logout_handler=()=>{
    this.setState({
        userData:null
    });
    this.props.history.push({
      pathname: '/Welcome_Page'
  })
}

  handleClose = () => {
    this.setState({
      open_change:false
    });
    };

    handleShow=()=>{
      if(this.state.open_change){
          return(<Change_prof 
            handleClose={this.handleClose}
            change_name={this.change_name}
            change_username={this.change_username}
            change_lastname={this.change_lastname}
            change_email={this.change_email}
            change_photo={this.change_photo}
            _id={this.state.userData._id}
            token={this.state.userData.token}
            email={this.state.userData.email}
            ></Change_prof>);
      }
      else{
          return null;
      }
      }

  ReturnWelcome=(e)=>{
    this.props.history.push({
        pathname: '/Welcome_Page',
        state: { detail: this.state.userData }
    })
}


  change_name=(value)=>{
    this.setState({
      Name:value
    });
  };

  change_username=(value)=>{
    this.setState({
      Username:value
    });
  };
  change_lastname=(value)=>{
    this.setState({
      Lastname:value
    });
  };

  change_email=(value)=>{
    this.setState({
      Email:value
    });
  };

  change_photo= (value) => {
    this.setState({
      photo:value
    });
}


  render(){
    return (
      <div>
          <Grid container style={styles.paperContainer}>
                <Grid item xs={12}>
                    <Box display="flex" flexDirection="row" justifyContent="flex-start">
                    {/* <Link  to="/Welcome_Page"  > */}
                    <Typography className="title_class" onClick={this.ReturnWelcome} style={{cursor:"pointer"}}
                        align='center'variant='h4' fontWeight="bold">Best Booking</Typography>
                    {/* </Link>     */}
                    
                    </Box>
                </Grid>
                {/* <Grid item xs={12}>
                    <Typography className="reg_class" align="center" variant="h3" >Εγγραφή</Typography>
                </Grid> */}
            </Grid>
            

            <Grid container spacing={2}>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6} >

              <Box display="flex" flexDirection="row" justifyContent="flex-end">
              <Button onClick={()=>{this.props.history.goBack({
            
            state: { detail: this.props.location.state.detail }
          })}}>Go Back</Button>
                
                <Box>
                <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.Logout_handler}
              >
                  Logout
              </Button>

                </Box>
              </Box>
          </Grid>
       
       
        </Grid>

        <Grid container>
          <Grid item xs={2}>

          </Grid>
          <Grid item xs={8}>
          <Box display="flex" alignItems="center" justifyContent="center" >
            <img className= "prof_image"  src={this.state.photo} />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" >
            <List>
                  <ListItemText  primary={
                    <React.Fragment>
                      <Typography variant="body1">
                        Username: {this.state.Username}
                      </Typography>
                    </React.Fragment>
                  }/>
                  <Divider/>
                  <ListItemText primary={
                    <React.Fragment>
                      <Typography variant="body1" >
                        Όνομα: {this.state.Name}
                      </Typography>
                    </React.Fragment>
                  }/>
                  <Divider/>
                  <ListItemText primary={
                    <React.Fragment>
                      <Typography variant="body1">
                        Επίθετο: {this.state.Lastname}
                      </Typography>
                    </React.Fragment>
                  }/>
                  <Divider/>
                  <ListItemText  primary={
                    <React.Fragment>
                      <Typography variant="body1">
                        Ρόλος: {this.state.Role}
                      </Typography>
                    </React.Fragment>
                  }/>
                  <Divider/>
                  <ListItemText  primary={
                    <React.Fragment>
                      <Typography variant="body1">
                        Email: {this.state.Email}
                      </Typography>
                    </React.Fragment>
                  }/>
                  <Divider/>
              </List>
            </Box>
          </Grid>
          <Grid item xs={2}>
          <Box display="flex" flexDirection="row" justifyContent="flex-end">
              <Button
              startIcon={<SettingsIcon /> } onClick = {this.handle_open} >Επεξεργασία Προφίλ</Button>
          </Box>
          </Grid>
        </Grid>
        
        
        {this.handleShow()}

            {/* <Grid container >
                <Grid item xs={6}>
                    <Box fontWeight="fontWeightBold">
                        <Typography  variant="h5" align="right">Όνομα Χρήστη</Typography>
                    </Box>
                </Grid>
                <Grid item justify="left" xs={6}>
                    <div>
                    <Typography variant="h6"  display="inline">
                        :{this.state.Username}
                      </Typography>

                    </div>
                </Grid>
            </Grid> */}
      </div>
    );
  }
  


}


export default Profile;
