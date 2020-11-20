import React,{Component} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

import image from '../../Pictures/room_pic.jpg'

import './Results_.css'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

class Results_ extends Component{
    constructor(props){
      super(props);

      this.state = {
        page:1,
        rooms_per_page:3,
        Filter_date_from:null,
        Filter_date_to:null,
        radius:0,
        Latlng:{lat:38.5953683,lng:24.9877132},
        people:0,
        private:true,
        public:true,
        apartment:true,
        max_price:0,
        wi_fi:false,
        cooling:false,
        heating:false,
        kitchen:false,
        tv:false,
        parking:false,
        elevator:false,
        resultData:[],
        page_num:0,
        userData:null,
    };
    this.handleChange=this.handleChange.bind(this);
    this.house_info=this.house_info.bind(this);
    this.fetch_Results=this.fetch_Results.bind(this);

    }

    handleChange=(event,value)=>{
        // const offset = value * this.state.rooms_per_page;
        this.setState({
            page:value,
            resultData:null
        },()=>{this.fetch_Results(false)});
    }



    house_info=(i)=>{
        console.log(this.state.userData);
        console.log(i);
        this.props.p_props.history.push({
            pathname: '/Room_page',
            state: { detail: this.state.resultData[i],
                userData:this.state.userData,
                Filter_date_from:this.state.Filter_date_from,
                Filter_date_to:this.state.Filter_date_to,
                people:this.state.people,
                radius:this.state.radius,
             }
          })
    }

    // https://medium.com/how-to-react/create-pagination-in-reactjs-e4326c1b9855
    // receivedData() { 
    //     const data = res.data;
    //     const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    //     const postData = slice.map(pd => <React.Fragment>
    //         <p>{pd.title}</p>
    //         <img src={pd.thumbnailUrl} alt=""/>
    //     </React.Fragment>)

    //     this.setState({
    //         pageCount: Math.ceil(data.length / this.state.perPage),
            
    //         postData
    //     })
           
    // }
    componentWillReceiveProps(nextProps) {
        console.log("EFTASA");
        if(nextProps.resultData!==null){
            if(nextProps.parentState.flag){
                this.setState({
                    private:nextProps.parentState.private,
                    public:nextProps.parentState.public,
                    apartment:nextProps.parentState.apartment,
                    Filter_date_from:nextProps.parentState.Filter_date_from,
                    Filter_date_to:nextProps.parentState.Filter_date_to,
                    radius:nextProps.parentState.radius,
                    Latlng:nextProps.parentState.Latlng,
                    people:nextProps.parentState.people,
                    max_price:nextProps.parentState.max_price,
                    wi_fi:nextProps.parentState.wi_fi,
                    cooling:nextProps.parentState.cooling,
                    heating:nextProps.parentState.heating,
                    kitchen:nextProps.parentState.kitchen,
                    tv:nextProps.parentState.tv,
                    parking:nextProps.parentState.parking,
                    elevator:nextProps.parentState.elevator,
                    resultData:null,
                    page_num:nextProps.resultData.pages,
                    page:1,
                    //userData:nextProps.userData,
                },()=>this.fetch_Results(true))
                this.props.handleflag();
            }
            
        } 
      }
      fetch_Results = async (flag) => { 
        const data = await fetch('http://localhost:3001/apartments/'+this.state.people+"/"+this.state.Latlng.lat+"/"+this.state.Latlng.lng+"/"+this.state.radius+"/"+this.state.Filter_date_from+"/"
        +this.state.Filter_date_to+"/"+this.state.private+"/"+this.state.public+"/"+this.state.apartment+"/"+this.state.max_price+"/"+this.state.wi_fi+"/"+
        this.state.cooling+"/"+this.state.heating+"/"+this.state.kitchen+"/"+this.state.tv+"/"+this.state.parking+"/"+this.state.elevator+"/"+this.state.page, {
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
          this.setState({ 
              resultData: resultData.apartments,
              page_num: resultData.pages
            });
            if(flag){
                this.setState({ 
                    page:1
                  });
            }
        }
        else{
        
          console.log("Error Code : " + data.status + "\nError Message : " + data.statusText);
        }
    
      }

    componentWillMount() {
        if(this.props.resultData!==null){
            if(this.props.parentState.flag){
                this.setState({
                    private:this.props.parentState.private,
                    public:this.props.parentState.public,
                    apartment:this.props.parentState.apartment,
                    Filter_date_from:this.props.parentState.Filter_date_from,
                    Filter_date_to:this.props.parentState.Filter_date_to,
                    radius:this.props.parentState.radius,
                    Latlng:this.props.parentState.Latlng,
                    people:this.props.parentState.people,
                    max_price:this.props.parentState.max_price,
                    wi_fi:this.props.parentState.wi_fi,
                    cooling:this.props.parentState.cooling,
                    heating:this.props.parentState.heating,
                    kitchen:this.props.parentState.kitchen,
                    tv:this.props.parentState.tv,
                    parking:this.props.parentState.parking,
                    elevator:this.props.parentState.elevator,
                    resultData:null,
                    page_num:this.props.resultData.pages,
                    page:1,
                    
                },()=>this.fetch_Results(true))
                this.props.handleflag();
            }
        }
        this.setState({
            userData:this.props.userData,
        })
        // this.receivedData()
    }

    
  
    render(){
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
        console.log("resultData");
        console.log(this.state.resultData);
      
    //   let page_num=Math.ceil(room_array.length/rooms_per_page);
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
      return (
        <div>
            
            <Box display="flex" alignItems="center"justifyContent="center" >
                <Pagination count={this.state.page_num} page={this.state.page} onChange={this.handleChange} />
            </Box>
            {console.log(this.state.resultData)}
            {this.state.resultData.map((item,i) => 
            <Box key={i} display="flex" alignItems="center"justifyContent="center" >
                {/* <Typography>Page: {this.state.page}</Typography> */}
                {console.log(item)}
                {/* <img src={item.doc.apart_images[0]}></img> */}
                    <Card key={i} onClick={()=>this.house_info(i)} className="Card_style">
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        alt={item.doc.title}
                        height="190"
                        image={item.doc.apart_images[0]}
                        title={item.doc.title}
                        />
                        <CardContent>
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography gutterBottom variant="h5" style={{display: 'inline-block'}}>
                                    {item.doc.title}
                                    </Typography>
                                    
                                    <Rating name="read-only" value={item.doc.average} precision={0.5} readOnly />
                                    <Typography variant="h6" color="textSecondary" style={{display: 'inline-block'}}>
                                        ({item.doc.rep_num})
                                    </Typography>
                                <Typography variant="body1" color="textPrimary" >
                                    Τύπος Δωματίου: {Room_type(item.doc.type)}
                                </Typography>
                                <Typography variant="body1" color="textPrimary" >
                                    Αριθμός Κρεβατιών: {item.doc.bed_num}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                            <Box className="buttons_box" display="flex" flexDirection="row" justifyContent="flex-end">
                                <Typography variant="h6" color="textSecondary" >
                                        Τιμή/Βράδυ
                                </Typography>                                
                            </Box>
                            <Box className="buttons_box" display="flex" flexDirection="row" justifyContent="flex-end">
                               
                                <Typography variant="h4" color="textPrimary" >
                                        {item.doc.price_per_person}€
                                </Typography>
                                
                            </Box>
                               
                            </Grid>
                        </Grid>   
                        
                        </CardContent>
                    </CardActionArea>
                </Card>
                
                
            </Box>
            )}
            <Box display="flex" alignItems="center"justifyContent="center" >
                <Pagination count={this.state.page_num} page={this.state.page} onChange={this.handleChange} />
            </Box>
            
        </div>
      );
    }
    
  
  
  }
  
  
  export default Results_;