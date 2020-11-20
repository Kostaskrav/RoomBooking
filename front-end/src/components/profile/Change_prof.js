import React ,{Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DoneIcon from '@material-ui/icons/Done';
import Box from '@material-ui/core/Box';

class Change_prof extends Component{
    constructor(props){
        super(props);

        this.state = {
            Username:'',
            Password:'',
            Confirm_pass:'',
            Name:'',
            Lastname:'',
            Email:'',
            Role:'',
            user_pass:'',
            photo:null,
            Disable_butt:true,
          };

        // this.handle_Email_change=this.handle_Email_change.bind(this);
        // this.handle_gender_change=this.handle_gender_change.bind(this);
        // this.handle_phone_change=this.handle_phone_change.bind(this);
        // this.handle_x_change=this.handle_x_change.bind(this);
        // this.handle_y_change=this.handle_y_change.bind(this);
        // this.handleClose=this.handleClose.bind(this);
        
        this.handleChangeText=this.handleChangeText.bind(this);
        this.event_handle=this.event_handle.bind(this);
        this.handleConfirm=this.handleConfirm.bind(this);
        this.handle_pass_check=this.handle_pass_check.bind(this);
        this.fetchUser_update=this.fetchUser_update.bind(this);
        this.fetchUser_pass_check=this.fetchUser_pass_check.bind(this);
    }

    // fetchUser = async () => { 
    //     const data = await fetch('http://localhost:3001/control-center/api/profile', {
    //         method: 'GET',
    //         headers: { 
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //           'Authorization': 'Bearer ' + this.props.location.state.detail.token

    //         }
    //     });
    //     if(data.status===200){
    
    //       const userData = await data.json();
    //       console.log(userData);
         
    //     }
    //     else{
    //       console.log("Unauthorized");
    //     }
    //   }

    //  handleClose = () => {
    //     return false;
    //   };

    fetchUser_update = async (obj_) => { 
        let id="";
        id=this.props._id;
        console.log(this.props.token);
        const data = await fetch('http://localhost:3001/user/'+id, {
          method: 'PATCH',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.token
          },
          // body: JSON.stringify(this.state)
        body: JSON.stringify({
            name:obj_.name,
            username:obj_.username,
            lastname:obj_.lastname,
            email:obj_.email,
        })
        });
        if(data.status===200){
            const userData = await data.json();

          this.props.handleClose();
        }
        else{
        //   this.handleLoginError(data.status);
        // this.handleLoginError()
          console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
        }
    
      }

      fetchUser_pass_check = async () => { 
        const data = await fetch('http://localhost:3001/user/passval', {
          method: 'POST',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + this.props.token
          },
          // body: JSON.stringify(this.state)
        body: JSON.stringify({
            email:this.props.email,
            password:this.state.user_pass,
        })
        });
        if(data.status===200){
            const userData = await data.json();
            console.log(userData.value);
            this.setState({
                Disable_butt:!userData.value
            })
          
        }
        else{
        //   this.handleLoginError(data.status);
        // this.handleLoginError()
          console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
        }
    
      }

    handleConfirm=()=>{
        if(this.state.Confirm_pass===""){
            return null;
        }
        if(this.state.Confirm_pass===this.state.Password){
            return(<Typography >Όλα καλά</Typography>)
        }
        if(this.state.Confirm_pass!==this.state.Password){
            return(<Typography >οχι Όλα καλά</Typography>)
        }
    }

    handle_pass_check=()=>{
        // this.fetchUser_pass_check();
        return this.state.Disable_butt;
        // var x= this.fetchUser_pass_check();
        // console.log(x);
        // return !x;
        // if(this.state.user_pass==="123"){
        //     return false;
        // }
        // else{
        //     return true;
        // }
    }

    handleChangeText=(e,name)=>{
        this.setState({
            [name]:e.target.value
        });
    }

    handlePhotoChange= (event) => {
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);
        let file_size = event.target.files[0].size;
        console.log(file_size);
        if(file_size>1000000){
            return;
        }
        reader.onloadend = function(e) {
            this.setState({
            photo: [reader.result]
            });
        }.bind(this);
        console.log(url); // Would see a path?
    
        this.setState({
            mainState: "uploaded",
            photo: event.target.files[0],
            imageUploaded: 1
        });
          
        
        // this.setState({
        //     photo : e.target.value
        // })
    }

      event_handle=(e)=>{
        e.preventDefault();
        var obj_body={};
        if(this.state.Name!==null && this.state.Name!==""){
            // this.props.change_name(this.state.Name);
            obj_body.name=this.state.Name;
        }
        if(this.state.Username!==null && this.state.Username!==""){
            // this.props.change_username(this.state.Username);
            obj_body.username=this.state.Username;
        }
        if(this.state.Lastname!==null && this.state.Lastname!==""){
            // this.props.change_lastname(this.state.Lastname);
            obj_body.lastname=this.state.Lastname;
        }
        if(this.state.Email!==null && this.state.Email!==""){
            // this.props.change_email(this.state.Email);
            obj_body.email=this.state.Email;
        }

        this.fetchUser_update(obj_body);
        
        // if(this.state.photo!==null && this.state.photo!==""){
        //     this.props.change_photo(this.state.photo);
        //     obj_body.photo=this.state.photo;
        // }
        // this.props.email2(this.state.email);
        // this.props.gender2(this.state.gender);
        // this.props.phone2(this.state.phone);
        // this.props.x2(this.state.spotx);
        // this.props.y2(this.state.spoty);
        this.props.handleClose();
      };

    render(){
          
       
        return(

           
          <Dialog open={true} onClose={this.props.handleClose}  aria-labelledby="form-dialog-title">
           
              <form onSubmit={this.event_handle}>
                  <DialogContent>
                  <DialogContentText>
                      Συμπληρώστε τις πληροφορίες που επιθυμήτε να αλλάξετε
                  </DialogContentText>
                  <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Username"
                      type="text"
                      fullWidth
                      value={this.state.Username}
                      onChange={(e)=>this.handleChangeText(e,"Username")}

                  />
                   <TextField
                      margin="dense"
                      id="name"
                      label="Όνομα"
                      type="text"
                      fullWidth
                      value={this.state.Name}
                      onChange={(e)=>this.handleChangeText(e,"Name")}

                  />
                  <TextField
                      
                      margin="dense"
                      id="name"
                      label="Επίθετο"
                      type="text"
                      fullWidth
                      value={this.state.Lastname}
                      onChange={(e)=>this.handleChangeText(e,"Lastname")}

                  />
                  <TextField
                      
                      margin="dense"
                      id="name"
                      label="Ηλεκτρονική Διεύθυνση"
                      type="email"
                      fullWidth
                      value={this.state.email}
                      onChange={(e)=>this.handleChangeText(e,"Email")}

                  />
                  <TextField
                      
                      margin="dense"
                      id="name"
                      label="Νέος Κωδικός"
                      type="password"
                      fullWidth
                      value={this.state.Password}
                      onChange={(e)=>this.handleChangeText(e,"Password")}

                  />
                   <TextField
                      
                      margin="dense"
                      id="name"
                      label="Επιβεβαίωση Νέου Κωδικού"
                      type="password"
                      fullWidth
                      value={this.state.Confirm_pass}
                      onChange={(e)=>this.handleChangeText(e,"Confirm_pass")}

                  />
                  {this.handleConfirm()}
                  <Grid container spacing={0} className="mrg_box2">
                            <Grid item xs={5}>
                                <div className="title_padding">
                                    <Typography align="left">Φωτογραφία</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={7}>
                                <div className="title_padding">
                                <input
                                    onChange={this.handlePhotoChange}
                                    type="file"
                                    // style={{ display: "none" }}
                                />
                                </div>
                            </Grid>
                        </Grid>
                  <Grid container spacing={0} className="mrg_box2">
                    <Grid item xs={6}>
                        <div className="title_padding">
                            <Typography align="right">Για την όποια αλλαγή των όποιων στοιχείων επαναλάβετε τον Κωδικό σας</Typography>
                        </div>
                    </Grid>
                    <Grid item justify="left" xs={4}>
                        <div className="title_box">
                            <TextField 
                            value={this.state.user_pass}
                            className="boxesStyle"
                            onChange={(e)=>this.handleChangeText(e,"user_pass")} 
                            variant="outlined" 
                            size="medium"
                            type="password"
                            borderColor="green"
                            
                            />
                            {/* {this.handleConfirm()} */}
                        </div>
                        
                    </Grid>
                    <Grid item justify="left" xs={2}>
                    <Box display="flex" alignItems="center"justifyContent="center" >
                        <Button  color="primary" 
                     onClick={this.fetchUser_pass_check}><DoneIcon className="btn-add-date"></DoneIcon></Button>
                     </Box>
                    </Grid>
                    
                </Grid>
                  
                  </DialogContent>
                  <DialogActions>
                  <Button onClick={this.props.handleClose} color="primary">
                      Ακύρωση
                  </Button>
                  <Button type="submit"  color="primary" disabled={this.state.Disable_butt}>
                      Αποστολή
                  </Button>
                  </DialogActions>
              </form>

          </Dialog>

        );
    }


}


export default Change_prof;
