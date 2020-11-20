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
            Name:'',
            Lastname:'',
            Email:'',
            Role:'',
            user_pass:'',
            photo:null,
            Disable_butt:true,
          };
        // this.handleChangeText=this.handleChangeText.bind(this);
        // this.event_handle=this.event_handle.bind(this);
        // this.handleConfirm=this.handleConfirm.bind(this);
        // this.handle_pass_check=this.handle_pass_check.bind(this);
        // this.fetchUser_update=this.fetchUser_update.bind(this);
        // this.fetchUser_pass_check=this.fetchUser_pass_check.bind(this);
    }




    render(){
          
       
        return(

           
          <Dialog open={true} onClose={this.props.handleClose}  aria-labelledby="form-dialog-title">
           
              <form onSubmit={this.event_handle}>
                  <DialogContent>
                  <DialogContentText>
                      Τα στοιχεία του user είναι:
                  </DialogContentText>
                  <TextField
                      
                      margin="dense"
                      label="ID"
                      variant="outlined"
                      fullWidth
                      defaultValue={this.props.ID}
                      InputProps={{
                        readOnly: true,
                        }}

                  />
                  <TextField
                      
                      margin="dense"
                      label="Username"
                      type="text"
                      fullWidth
                      value={this.props.Username}
                      InputProps={{
                        readOnly: true,
                        }}

                  />
                   <TextField
                      margin="dense"
                      label="Όνομα"
                      type="text"
                      fullWidth
                      value={this.props.Name}
                      InputProps={{
                        readOnly: true,
                        }}

                  />
                  <TextField
                      
                      margin="dense"
                      label="Επίθετο"
                      type="text"
                      fullWidth
                      value={this.props.Lastname}
                      InputProps={{
                        readOnly: true,
                        }}
                  />
                  <TextField
                      
                      margin="dense"
                      label="Ηλεκτρονική Διεύθυνση"
                      type="email"
                      fullWidth
                      value={this.props.Email}
                      InputProps={{
                        readOnly: true,
                        }}
                  />
                   
                  </DialogContent>
                  <DialogActions>
                  <Button onClick={this.props.handleClose} color="primary">
                      Ακύρωση
                  </Button>
                  </DialogActions>
              </form>

          </Dialog>

        );
    }


}


export default Change_prof;
