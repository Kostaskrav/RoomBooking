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
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

import Rating from '@material-ui/lab/Rating';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;



class Reviews extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            grade:0,
            comment:'',
            reviews:null,
        };
        // this.Handle_to_date_time=this.Handle_to_date_time.bind(this);
        // this.fetch_personal_review=this.fetch_personal_review.bind(this); 
        this.fetch_reviews=this.fetch_reviews.bind(this);           
      }

      componentWillMount(){
        this.fetch_reviews();
      }

    
      fetch_reviews= async () => { 
        const data = await fetch('http://localhost:3001/review/byapart/'+this.props.apart_id, {
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
                reviews: resultData.review,
              });
          }
          else{
            console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
          }
    }

    // fetch_personal_review= async () => { 
    //     const data = await fetch('http://localhost:3001/reservation/byrenter/'+this.props.userData._id, {
    //       method: 'GET',
    //       headers: { 
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //       },
    //       // body: JSON.stringify(this.state)
    //     // body: JSON.stringify({
    //     //     password:this.state.password,
    //     //     username:this.state.username,
    //     // })
    //     });
    //     if(data.status===200){
    //         const resultData = await data.json();
    //         console.log("DATA");
    //         console.log(resultData);
    //         this.setState({ 
    //             reviews: resultData.review,
    //           });
    //       }
    //       else{
    //         console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
    //       }
    // }

    render() {
        if (this.state.reviews ===null || this.state.reviews ===undefined) {
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
      // The markup for the Step 1 UI
      return(
        <React.Fragment>
            <Typography variant="h4" align="left"><Box fontSize="1.8rem">Κριτικές</Box></Typography>

            {this.state.reviews.map((item,index)=>{
              return(
                
                <div key={index}>
                    <Typography variant="h4" align="left"><Box fontSize="1.4rem">{item.doc.renterid}</Box></Typography>
                    <Rating defaultValue={item.doc.grade} precision={0.5} readOnly/>
                    <TextField
                    style={{height:"auto"}}
                    //id="standard-disabled"
                    defaultValue={item.doc.text}
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
        </React.Fragment>
      )
    }
  }

export default Reviews;