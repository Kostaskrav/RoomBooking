import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


class Step4 extends React.Component {
    render() {
      if (this.props.currentStep !== 4) { // Prop: The current step
        return null
      }
      // The markup for the Step 1 UI
      return(
        <React.Fragment>
          <div className="title_padding">
                <Typography variant="h6" align="center">
                    Κανόνες κατά την ενοικίαση</Typography>
            </div>
            <List>
                {this.props.Rules_list.map((item,index_num)=>{
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
                            <Grid item xs={6}>
                            <div className="title_padding">
                            <Typography variant="body1" align="left">Κανόνας {index_num+1}</Typography>
                            </div>
                            </Grid>
                            <Grid item xs={6}>
                            <Box display="flex" alignItems="flex-end"justifyContent="flex-end" >
                                    <IconButton edge="end" aria-label="delete" onClick={(e)=>this.props.handleRemoveRules_list(e,index_num)}>
                                        <DeleteIcon />
                                    </IconButton>
                            </Box>    
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                value={item}
                                className="boxesStyle"
                                name="Place_type"
                                onChange={(e)=>this.props.handleChangeRulesList(e,index_num)}
                                variant="outlined" 
                                multiline
                                fullWidth
                                rows={2}
                                rowsMax={4}
                                />
                            </Grid>
                        </Grid>

                        {/* {this.handle_FirstDate(index_num)} */}
                        
                        
                        </ListItem>
                        
                    );
                })}
            </List>
            <Box display="flex" alignItems="center"justifyContent="center" >
            
            <Button  color="primary" 
                 onClick={this.props.handleAddRules_list}><AddCircleIcon className="btn-add-date"></AddCircleIcon></Button>
                </Box>
        </React.Fragment>
      )
    }
  }

  export default Step4;