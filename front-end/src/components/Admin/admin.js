import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import Userinfo from './user_info.js';




class Admin extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            users:[],
            user:'',
            not_accepted_users:[],
            username:'',
            open_change:false,
            // reviews:[],
            //stars:[],
            // value:0,
        };
       
        this.fetch_users=this.fetch_users.bind(this);
        this.check_user=this.check_user.bind(this);
        this.delete_user=this.delete_user.bind(this);
        this.change_username=this.change_username.bind(this);
        this.submit_handler=this.submit_handler.bind(this);
        this.fetchUser_=this.fetchUser_.bind(this);
        this.fetch_accepted=this.fetch_accepted.bind(this);
        this.patch_user=this.patch_user.bind(this);
        this.handle_open=this.handle_open.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.fetch_accepted=this.fetch_accepted.bind(this)
      }

    //   componentWillMount(){
    //     //this.fetch_users();
    //     this.fetch_accepted=this.fetch_accepted.bind(this)
    //   }

      componentWillMount(){
        this.fetch_users();
        this.fetch_accepted();
      }

      handle_open=()=>{
        this.setState({
          open_change:true
        })
      };

      handleClose = () => {
        this.setState({
          open_change:false
        });
        };

      handleShow=()=>{
        if(this.state.open_change){
          return(
            <Userinfo
            ID={this.state.user._id}
            Username={this.state.user.username}
            Name={this.state.user.name}
            Lastname={this.state.user.lastname}
            Email={this.state.user.email}
            Role={this.state.user.role}
            photo={this.state.user.Image}
            handleClose={this.handleClose}
            >
            </Userinfo>
          )
        }
        else{
            return null;
        }
        }

      fetchUser_= async () => { 
        const name=this.state.username;
        const data = await fetch('http://localhost:3001/admin/byusername/'+name, {
          method: 'GET',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.location.state.detail.token
          },
          // body: JSON.stringify(this.state)
        // body: JSON.stringify({
        //     password:this.state.password,
        //     username:this.state.username,
        // })
        });
        if(data.status===200){
            const resultData = await data.json();
            console.log("DATA");
            console.log(resultData);        
            this.setState({ 
                users: resultData.user,
                
              });
              
          }
          else{
            console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
          }
    }


    fetch_users= async () => { 
        const data = await fetch('http://localhost:3001/admin/', {
          method: 'GET',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.location.state.detail.token
          },
          // body: JSON.stringify(this.state)
        // body: JSON.stringify({
        //     password:this.state.password,
        //     username:this.state.username,
        // })
        });
        if(data.status===200){
            const resultData = await data.json();
            console.log("DATA");
            console.log(resultData);        
            this.setState({ 
                users: resultData.user,
              });
              
          }
          else{
            console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
          }
    }

    fetch_accepted= async () => { 
        const data = await fetch('http://localhost:3001/admin/byaccept/show', {
          method: 'GET',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.location.state.detail.token
          },
          // body: JSON.stringify(this.state)
        // body: JSON.stringify({
        //     password:this.state.password,
        //     username:this.state.username,
        // })
        });
        if(data.status===200){
            const resultData = await data.json();
            console.log("DATAccept");
            console.log(resultData);        
            this.setState({ 
                not_accepted_users: resultData.user,
              });

              
              
          }
          else{
            console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
          }
    }


    check_user= async (userid) => { 
        const data = await fetch('http://localhost:3001/admin/'+userid, {
          method: 'GET',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.location.state.detail.token
          },
          // body: JSON.stringify(this.state)
        // body: JSON.stringify({
        //     password:this.state.password,
        //     username:this.state.username,
        // })
        });
        if(data.status===200){
            const resultData = await data.json();
            console.log("DATA");
            console.log(resultData);
            this.setState({ 
              user: resultData.user,
              
            },()=>{this.handle_open()});
                    
            
              
          }
          else{
            console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
          }

    }

    patch_user= async (userid) => { 
      const data = await fetch('http://localhost:3001/admin/'+userid, {
        method: 'PATCH',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.location.state.detail.token
        },
        body: JSON.stringify({accepted:true})
      // body: JSON.stringify({
      //     password:this.state.password,
      //     username:this.state.username,
      // })
      });
      if(data.status===200){
          const resultData = await data.json();
          console.log("DATA");
          console.log("Accepted successfully");        
        }
        else{
          console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
        }

  }

    delete_user= async (userid) => { 
        const data = await fetch('http://localhost:3001/admin/'+userid, {
          method: 'DELETE',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.location.state.detail.token
          },
          // body: JSON.stringify(this.state)
        // body: JSON.stringify({
        //     password:this.state.password,
        //     username:this.state.username,
        // })
        });
        if(data.status===200){
            const resultData = await data.json();
            console.log("DATA");
            console.log(resultData);        
            this.setState({ 
                user: resultData.user,
              });
              
          }
          else{
            console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
          }

    }

    submit_handler=(event)=>{
      event.preventDefault();
      console.log(this.state.username);
      console.log(this.state.password);
      if(this.state.username===''){
        this.fetch_users();
      }
      else{
        this.fetchUser_();
      }
      
      console.log(this.state.token);
      // alert("username: "+this.state.username + " password: "+this.state.password);
      // console.log(this.state.username+" "+this.state.password);
      // this.fetchUser();
      // this.props.change_pass(this.state.password);
      // this.props.change_user(this.state.username);
      
    }

    change_username=(event)=>{
      this.setState({
          username:event.target.value
      });
      }

    render() {
      return(
      <React.Fragment>
          <Typography variant="h5" align="center">Admin here</Typography>
          <form onSubmit={this.submit_handler}>
            <Grid container>
              <Grid item justify="right" xs={6}>
              <Box display="flex" flexDirection="row" justifyContent="flex-end">
              <TextField variant="outlined" label="Username"  onChange={this.change_username}></TextField>
              </Box>
               
              </Grid>
              <Grid item   xs={6}>
              <Button  
                type="submit"
                variant="contained" 
                // onClick={this.props.handleClose} 
                color="primary">
                Αναζήτηση
            </Button>
              </Grid>

            </Grid>
               

                
          </form>
          
          {this.state.users.map((item,index)=>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                            <Box display="flex" alignItems="center"justifyContent="center" >
                              
                                <Typography variant="body" align="left" >Username: "{item.doc.username}"       με  id     "{item.doc._id}"</Typography>
                                <Button onClick={()=>this.check_user(item.doc._id)}> Περισσοτερες πληροφορίες(console) </Button>
                                <Button onClick={()=>this.delete_user(item.doc._id)}> Διαγραφή χρήστη </Button>
                                {this.handleShow(index)}
                                </Box>
                            </Grid>            
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                        </Grid>
                    </Grid>
                    
            )}

            <Typography variant="body" align="left" >NOT ACCEPTED USERS BELLOW</Typography>




             {this.state.not_accepted_users.map((item,index)=>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={10}>
                                <Typography variant="body" align="left" >Username: "{item.username}"       με  id     "{item._id}"</Typography>
                                <Button onClick={()=>this.check_user(item._id)}> Περισσοτερες πληροφορίες(console) </Button>
                                
                            </Grid>            
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                        </Grid>
                    </Grid>
                    
            )}
            
            
      </React.Fragment>
      )
    }
}

export default Admin;