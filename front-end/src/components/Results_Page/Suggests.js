import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

//import "./Suggests.css";



const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;


class Suggests extends React.Component {

    constructor(props){
        super(props);
  
        this.state = {
          resultData:[],       
      };
      this.fetch_sugg=this.fetch_sugg.bind(this);
      this.house_info=this.house_info.bind(this);

    }


    house_info=(i)=>{
        // console.log(this.state.userData);
        // console.log(i);
        this.props.p_props.history.push({
            pathname: '/Room_page',
            state: { detail: this.state.resultData[i],
                userData:this.props.userData,
                Filter_date_from:null,
                Filter_date_to:null,
                people:1,
                radius:null,
             }
          })
    }

    fetch_sugg= async () => { 
        const data = await fetch('http://localhost:3001/apartments/suggested/'+this.props.userData._id, {
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
            // console.log(resultData);
            this.setState({ 
                resultData: resultData.apartment,
              });
          }
          else{
            console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
          }
}
    componentWillMount(){
        // console.log("EFTASA")
            this.fetch_sugg();
        
    }

    render() {
        if (this.state.resultData ===null || this.state.resultData ===undefined) { // Prop: The current step
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
        const Room_type=(name)=>{
            if(name==="private"){
                return "Ιδιωτικό Δωμάτιο"
            }
            else if(name==="public"){
                return "Κοινόχρηστο Δωμάτιο"
            }
            else if(name==="apartment"){
                return "Ολόκληρο Διαμέρισμα"
            }
            return name
        }
      return(
        <div>
            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                <Grid container   direction="row" className="Custom_Searchbar" alignItems="center" justify="center" spacing={2} >
                    {/* style={{ backgroundColor: "white"}} */}
                    
                    {this.state.resultData.map((item,i) => 
                    <React.Fragment>
                    <Grid item xs={2}>
                    <Box key={i} display="flex" alignItems="center"justifyContent="center" >
                        {/* <Typography>Page: {this.state.page}</Typography> */}
                        {/* {console.log(item)} */}
                        {/* <img src={item.doc.apart_images[0]}></img> */}
                            <Card key={i} onClick={()=>this.house_info(i)} className="Card_style">
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                alt={item.doc.title}
                                height="120"
                                image={item.doc.apart_images[0]}
                                title={item.doc.title}
                                />
                                <CardContent>
                                <Grid container>
                                    <Grid item xs={8}>
                                        <Typography gutterBottom variant="h6" style={{display: 'inline-block'}}>
                                            {item.doc.title}
                                            </Typography>
                                            
                                            <Rating name="read-only" value={item.doc.average} precision={0.5} readOnly />
                                            <Typography variant="body1" color="textSecondary" style={{display: 'inline-block'}}>
                                                ({item.doc.rep_num})
                                            </Typography>
                                        {/* <Typography variant="body1" color="textPrimary" >
                                            Τύπος Δωματίου: {Room_type(item.doc.type)}
                                        </Typography>
                                        <Typography variant="body1" color="textPrimary" >
                                            Αριθμός Κρεβατιών: {item.doc.bed_num}
                                        </Typography> */}
                                    </Grid>
                                    <Grid item xs={4}>
                                    {/* <Box className="buttons_box" display="flex" flexDirection="row" justifyContent="flex-end">
                                        <Typography variant="body1" color="textSecondary" >
                                                Τιμή/Βράδυ
                                        </Typography>                                
                                    </Box> */}
                                    <Box className="buttons_box" display="flex" flexDirection="row" justifyContent="flex-end" style={{marginTop:"50%"}}>
                                    
                                        <Typography variant="h5" color="textPrimary" >
                                                {item.doc.price_per_person}€
                                        </Typography>
                                        
                                    </Box>
                                    
                                    </Grid>
                                </Grid>   
                                
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        
                        
                    </Box>
                    </Grid>
                    </React.Fragment>
                    )}
                                    
                        
                    </Grid>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </div>
      )
    }
  }

export default Suggests;