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

import Dates_comp from './Dates_.js';
import House_info from './House_info.js'
import House_Rules from './House_Rules.js'
import Apart from './Apart.js'
import Apart_imgs from './Apart_imgs.js'
import Services from './Services.js'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography component={'div'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }


class Review_Notifications extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            undone_reviews:[{title:"Vraio meros",host:"kalos"},
            {title:"Vraio meros",host:"kalos"},
            {title:"Vraio meros",host:"kalos"},
            ],
            value:0,
            apartments:null,
        };
        this.handleClickOpen=this.handleClickOpen.bind(this);
        this.change_report_text=this.change_report_text.bind(this);
        this.init_comments_text=this.init_comments_text.bind(this);
        this.fetch_getApartments=this.fetch_getApartments.bind(this);
        this.fetchApart_update=this.fetchApart_update.bind(this);
        this.fetchApart_delete=this.fetchApart_delete.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handlesubmit=this.handlesubmit.bind(this);
        this.handleChangeChecked=this.handleChangeChecked.bind(this);


        this.handleAddDate_list=this.handleAddDate_list.bind(this);
        this.handleChangeList=this.handleChangeList.bind(this); 
        this.handleRemoveDate_list=this.handleRemoveDate_list.bind(this); 

        this.handleAddRules_list=this.handleAddRules_list.bind(this);
        this.handleChangeRulesList=this.handleChangeRulesList.bind(this); 
        this.handleRemoveRules_list=this.handleRemoveRules_list.bind(this);

        this.handleChangePhotosList=this.handleChangePhotosList.bind(this); 
        this.handleRemovePhotos_list=this.handleRemovePhotos_list.bind(this);  
        this.Dates_organizer=this.Dates_organizer.bind(this);
      }

      
      handleClickOpen = (event,newValue) => {
        this.setState({  
            value: newValue 
        });
      };

      init_comments_text(index_num){
        if(this.state.reviews[index_num]== null){
          var joined=this.state.reviews;
          joined[index_num]="";
          this.setState({
            reviews:joined
          })
        }
      }

      handleChange=(event)=>{
        const {name, value} = event.target;
        let joined=this.state.apartments;
        joined[this.state.value].doc[name]=value;
        this.setState({
            apartments: joined
        })    
      };
    
  
      change_report_text=(event,index)=>{        
        
        let newVal = event.target.value;  
        var joined=this.state.reviews;
        joined[index]=newVal;    
          this.setState({
            reviews:joined
          });
      }

      componentWillMount(){
          this.fetch_getApartments();
      }

      

      handlesubmit=()=>{
          console.log(this.state);
        //   this.fetchApart_update();
          this.fetchApart_delete(1);
          this.props.handleClose();
      }

      handleChangeChecked=(event)=>{
          
        const {name, checked} = event.target
        let joined=this.state.apartments;
        joined[this.state.value].doc[name]=checked;
        this.setState({
            apartments: joined
        })     
      };

      fetchApart_delete = async (value) => { 
        
        const id=this.state.apartments[this.state.value].doc._id;
        const data = await fetch('http://localhost:3001/apartments/'+id, {
          method: 'DELETE',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': 'Bearer ' + this.props.token
          },
          //body: JSON.stringify(this.state.apartments[this.state.value].doc)
        });
        if(data.status===200){
            // const userData = await data.json();
            console.log("petyxe");
            if(value===1){
              this.fetchApart_update();
            }
            
        //   this.props.handleClose();
        }
        else{
        //   this.handleLoginError(data.status);
        // this.handleLoginError()
          console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
        }
    
      }

      fetchApart_update = async () => { 
        const formData = new FormData();
        for(var propName in this.state.apartments[this.state.value].doc) {
            if(propName!=="date_array" && propName!=="rules" && propName!=="apart_images"){
            console.log(propName+"____"+this.state.apartments[this.state.value].doc[propName]);
            formData.append(propName, this.state.apartments[this.state.value].doc[propName]);
            // var value = this.state[propName];
            // updateOps[propName] = value;
            }
            
        }
        // formData.append("lat", this.state.apartments[this.state.value].doc.lat);
        // formData.append("lon", this.state.apartments[this.state.value].doc.lng);
        // formData.append("host_id", this.state.apartments[this.state.value].doc.host_id);
        this.state.apartments[this.state.value].doc.date_array.map((item,index)=>{
        Object.keys(item).forEach(key => {
            formData.append("date_array["+index+"]["+key+"]", item[key]);
        });
        });
        this.state.apartments[this.state.value].doc.rules.map((item,index)=>{
            formData.append("rules["+index+"]", item);
        
        });
        this.state.apartments[this.state.value].doc.apart_images.map((item,index)=>{
        formData.append("apart_images["+index+"]", item);
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
          }
    });
        const data = await fetch('http://localhost:3001/apartments/update', {
          method: 'POST',
          headers:{
            'Authorization': 'Bearer ' + this.props.host_token
          },
        //   headers: { 
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     //'Authorization': 'Bearer ' + this.props.token
        //   },
          body: formData
        });
        if(data.status===200){
            //const userData = await data.json();
            console.log("petyxe");
        //   this.props.handleClose();
        }
        else{
        //   this.handleLoginError(data.status);
        // this.handleLoginError()
          console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
        }
    
      }

      fetch_getApartments= async () => { 
        const data = await fetch('http://localhost:3001/apartments/byhost/'+this.props.host_id, {
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
            resultData.apartment.map((item,index)=>{
                this.setState({ 
                    
                    // rules:this.state.rules.concat(resultData.apartment.doc.rules),
                    // apart_images:resultData.apartment.doc.apart_images,
                    // area:resultData.apartment.doc.area,
                    // bath_num:resultData.apartment.doc.bath_num,
                    // bed_num:resultData.apartment.doc.bed_num,
                    // cooling:resultData.apartment.doc.cooling,
                    // date_array:resultData.apartment.doc.date_array,
                    // description:resultData.apartment.doc.description,
                    // elevator:resultData.apartment.doc.elevator,
                    // heating:resultData.apartment.doc.heating,
                    // kitchen:resultData.apartment.doc.kitchen,
                    // liv_room:resultData.apartment.doc.liv_room,
                    // max_people:resultData.apartment.doc.max_people,
                    // min_price:resultData.apartment.doc.min_price,
                    // parking:resultData.apartment.doc.parking,
                    // price_per_person:resultData.apartment.doc.price_per_person,
                    //pub_tra:this.state.pub_tra.push(resultData.apartment.doc.pub_tra),
                    // room_num:resultData.apartment.doc.room_num,
                    // title:resultData.apartment.doc.title,
                    // tv:resultData.apartment.doc.tv,
                    // type:resultData.apartment.doc.type,
                    // wi_fi:resultData.apartment.doc.wi_fi,
                  });
            })
            this.setState({ 
                apartments: resultData.apartment,
              },()=>{console.log(this.state)});
          }
          else{
            console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
          }
}
        // const {name, value} = event.target;
        // let joined=this.state.apartments;
        // joined[this.state.value].doc[name]=value;
        // const name2="apartments["+this.state.value+"].doc."+name;
        // console.log(name2);
        // this.setState({
        //     apartments: joined
        // }) 
    handleRemovePhotos_list=(e,index)=>{
        let joined=this.state.apartments;
        joined[this.state.value].doc.apart_images.splice(index, 1);
        this.setState({
            apartments: joined
        })
        }
        
        handleChangePhotosList=(event)=>{
            var file = event.target.files[0];
            // console.log(file);
            if(file!==null){
              const reader = new FileReader();
              var url = reader.readAsDataURL(file);
              let file_size = event.target.files[0].size;
              
              if(file_size>1000000){
                  return;
              }
          
              let joined=this.state.apartments;
              // joined[index]=value;      
              reader.onloadend = function(e) {
                joined[this.state.value].doc.apart_images.push(reader.result)
                  this.setState({
                    apartments: joined
                  });
              }.bind(this);
              event.target.value = null;
            }
          };

handleRemoveDate_list=(e,index)=>{
    let joined=this.state.apartments;
    joined[this.state.value].doc.date_array.splice(index, 1);
    this.setState({
        apartments: joined
    })
  }
  handleChangeList=(event,index)=>{
    event.persist();
    let joined=this.state.apartments;
    // console.log(index);
    // console.log(event);
    const {name, value} = event.target;
    joined[this.state.value].doc.date_array[index][name]=new Date(value);
    
    this.setState({
        apartments: joined
    })
  };

  handleAddDate_list=()=>{
    let joined=this.state.apartments;
    joined[this.state.value].doc.date_array.push({Date_from:null,Date_to:null})
    this.setState({
        apartments: joined
    })
  };

  handleRemoveRules_list=(e,index)=>{
    let joined=this.state.apartments;
    joined[this.state.value].doc.rules.splice(index, 1);
    this.setState({
        apartments: joined
    })
  }

  handleChangeRulesList=(event,index)=>{
    event.persist();
    const { value} = event.target;
    let joined=this.state.apartments;
    joined[this.state.value].doc.rules[index]=value;
    this.setState({
        apartments: joined
    })
  };

  handleAddRules_list=()=>{
    let joined=this.state.apartments;
    joined[this.state.value].doc.rules.push("")
    this.setState({
        apartments: joined
    })
  };


    
    render() {
        if (this.state.apartments ===null || this.state.apartments ===undefined) { 
            return (
                <Dialog open={true} fullWidth={true} maxWidth = {'md'} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Επεξεργασία Δωματίων</DialogTitle>
            <div className="sweet-loading" style={{
                display: "flex",
                height: 224}}>
                    <ClipLoader
                    css={override}
                    size={150}
                    color={"#123abc"}
                    loading={true}
                    />
                </div>
        </Dialog>
                
            )
          }
      return(
        <React.Fragment>
            <Dialog open={true} fullWidth={true} maxWidth = {'md'} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Επεξεργασία Δωματίων</DialogTitle>
            <div style={{
                display: "flex",
                height: 467}}>
            <Tabs 
                value={this.state.value}
                onChange={this.handleClickOpen}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                orientation="vertical"
                aria-label="Vertical tabs example"
                >
                {this.state.apartments.map((item,index_num) =>                     
                    <Tab key={index_num} label={item.doc.title} {...a11yProps(index_num)} />
                    
                )}                    
            </Tabs>
            {this.state.apartments.map((item,index_num)=>
                <TabPanel style={{width:"100%"}} className="tabpanel_fix" key={index_num} value={this.state.value} index={index_num}>
                     <Grid container>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                
                                <Typography variant="h6" align="left">Περιγραφή Διέλευσης στο κατάλυμα</Typography>
                                
                                </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                value={item.doc.pub_tra}
                                className="boxesStyle"
                                name="pub_tra"
                                onChange={this.handleChange}
                                variant="outlined" 
                                multiline
                                fullWidth
                                rows={3}
                                rowsMax={5}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Dates_comp
                            handleAddDate_list={this.handleAddDate_list}
                            Date_list={item.doc.date_array}
                            handleChangeList={this.handleChangeList}
                            handleRemoveDate_list={this.handleRemoveDate_list}
                            >

                            </Dates_comp>
                        </Grid>
                        <Grid item xs={12}>
                            <House_info
                            handleChange={this.handleChange}
                            Min_price={item.doc.min_price}
                            Extra_person_price={item.doc.price_per_person}
                            Max_people={item.doc.max_people}
                            Place_type={item.doc.type}
                            ></House_info>
                        </Grid>
                        <Grid item xs={12}>
                            <House_Rules
                            handleAddRules_list={this.handleAddRules_list}
                            handleChangeRulesList={this.handleChangeRulesList}
                            handleRemoveRules_list={this.handleRemoveRules_list}
                            Rules_list={item.doc.rules}
                            ></House_Rules>
                        </Grid>
                        <Grid item xs={12}>
                            <Apart
                            Description={item.doc.description}
                            Beds_num={item.doc.bed_num}
                            WC_num={item.doc.bath_num}
                            Bedroom_num={item.doc.room_num}
                            Livingroom={item.doc.liv_room}
                            Room_area={item.doc.area}
                            handleChange={this.handleChange}
                            ></Apart>
                        </Grid>
                        <Grid item xs={12}>
                            <Apart_imgs
                            handleAddPhotos_list={this.handleAddPhotos_list}
                            handleChangePhotosList={this.handleChangePhotosList}
                            handleRemovePhotos_list={this.handleRemovePhotos_list}
                            Photos_list={item.doc.apart_images}
                            ></Apart_imgs>
                        </Grid>
                        <Grid item xs={12}>
                            <Services
                            wi_fi={item.doc.wi_fi}
                            cooling={item.doc.cooling}
                            heating={item.doc.heating}
                            kitchen={item.doc.kitchen}
                            tv={item.doc.tv}
                            parking={item.doc.parking}
                            elevator={item.doc.elevator}
                            
                            handleChangeChecked={this.handleChangeChecked}
                            ></Services>
                        </Grid>
                        
                        <Grid item xs={12}>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                        </Button>
                        
                        <Button onClick={()=>{this.fetchApart_delete(0)}} color="error">
                            Delete
                        </Button>
                        <Button onClick={this.handlesubmit} color="primary">
                            Submit
                        </Button>
                        </Grid>
                        
                    </Grid>
                    
                            
                        
                    {/* {console.log(index_num)} */}
                </TabPanel>
            )}
            </div>
            

            
            
            
            
        </Dialog>
        </React.Fragment>
      )
    }
  }

export default Review_Notifications;