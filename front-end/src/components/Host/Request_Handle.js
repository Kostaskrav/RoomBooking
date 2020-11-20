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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Rating from '@material-ui/lab/Rating';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider';

//import "./Request_Handle.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;


class Request_Handle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             requests:[],
             username:'',
            // reviews:[],
            //stars:[],
            // value:0,
        };
        this.handleClickOpen=this.handleClickOpen.bind(this);
        this.check_handle=this.check_handle.bind(this);
        this.decline_handle=this.decline_handle.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.fetch_check=this.fetch_check.bind(this);
        this.fetch_reservations=this.fetch_reservations.bind(this);
        this.fetch_decline=this.fetch_decline.bind(this);
        this.fetch_username=this.fetch_username.bind(this);
      }
      handleClickOpen = (event,newValue) => {
        this.setState({  
            value: newValue 
        });
      };

      

      componentWillMount(){
        this.fetch_reservations();
        
      }

      fetch_reservations= async () => { 
        const data = await fetch('http://localhost:3001/reservation/byaccept/'+this.props.host_id, {
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
            console.log("DATA");
            console.log(resultData);        
            this.setState({ 
                requests: resultData.reservation,
              });
              
              this.fetch_username(resultData.reservation[0].doc.renterid);
          }
          else{
            console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
          }

    }

    fetch_username= async (user_id) => { 
      console.log("user_id = "+user_id);
      const data = await fetch('http://localhost:3001/user/'+user_id, {
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
          console.log("DATA2");
          console.log(resultData);        
          this.setState({ 
              username: resultData.user.username,
            });
        }
        else{
          console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
        }
  }


    fetch_decline= async (index) => { 
        const data = await fetch('http://localhost:3001/reservation/'+this.state.requests[index].doc._id, {
          method: 'DELETE',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
         //body: JSON.stringify({accepted:true})
        // body: JSON.stringify({
        //     password:this.state.password,
        //     username:this.state.username,
        // })
        });
        if(data.status===200){
            //const resultData = await data.json();
            console.log("PETYXE");
          }
          else{
            console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
          }
    }

  fetch_check= async (index) => { 
    const data = await fetch('http://localhost:3001/reservation/'+this.state.requests[index].doc._id, {
      method: 'PATCH',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
     body: JSON.stringify({accepted:true})
    // body: JSON.stringify({
    //     password:this.state.password,
    //     username:this.state.username,
    // })
    });
    if(data.status===200){
        //const resultData = await data.json();
        console.log("PETYXE");
      }
      else{
        console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
      }
}
  


      check_handle=(index)=>{
        this.fetch_check(index);
        this.props.handleClose()
      }

      decline_handle=(index)=>{
          this.fetch_decline(index);
          this.props.handleClose()
        }

      handleSubmit=()=>{
        console.log(this.state);
        this.fetch_create_review();
        //this.fetch_review_reservation()
        this.props.handleClose();
      }


    
    render() {
      if (this.state.requests ===null || this.state.requests ===undefined || this.state.username === undefined) {
        return (
            <div className="sweet-loading">
                <ClipLoader
                css={override}
                size={150}
                color={"#123abc"}
                loading={true}
                />
            </div>
        )
      }
      return(
        <React.Fragment>
            <Dialog open={true} fullWidth={true} maxWidth = {'md'} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Requests</DialogTitle>
            <div style={{
                display: "flex",
                height: 224}}>
            <Grid container>
                {this.state.requests.map((item,index)=>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={10}>
                                <Typography variant="body" align="left" >{new Date(item.doc.date_from).toISOString().slice(0,10)} εώς {new Date(item.doc.date_to).toISOString().slice(0,10)} από τον {this.state.username}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Button onClick={()=>this.check_handle(index)}><CheckIcon></CheckIcon></Button>
                                <Button onClick={()=>this.decline_handle(index)}><ClearIcon></ClearIcon></Button>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                )}
            </Grid>
            
            </div>
            

            
            <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
                Cancel
            </Button>
            {/* <Button onClick={this.handleSubmit} color="primary">
                Subscribe
            </Button> */}
            </DialogActions>
        </Dialog>
        </React.Fragment>
      )
    }
  }

export default Request_Handle;