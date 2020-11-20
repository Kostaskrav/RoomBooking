import React ,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import { DatePicker,KeyboardDatePicker  } from '@material-ui/pickers';
// import Autocomplete from '@material-ui/lab/Autocomplete';

import { StickyContainer, Sticky } from 'react-sticky';
import './Room_Dates_Box.css';


class Room_Dates_Box extends Component {
    constructor(props){
        super(props);
        this.state={
            open:null,
            total_days:0,
            // Filter_date_from:null,
            // Filter_date_to:null
        }

        this.handleClickOpen=this.handleClickOpen.bind(this);
        this.handleClickClose=this.handleClickClose.bind(this);
        this.Total_days_calc=this.Total_days_calc.bind(this);
        this.disable_to=this.disable_to.bind(this);
        this.handle_show=this.handle_show.bind(this);
        this.disable_reservation=this.disable_reservation.bind(this);
        this.handle_error=this.handle_error.bind(this);
        this.handle_error2=this.handle_error2.bind(this);
    }
    disable_reservation=()=>{
        if(this.props.Min_price<=this.state.total_days*this.props.people*this.props.Extra_person_price && this.props.userData!==null){
            return false;
        }
        return true;
    }

    handleClickOpen=(event)=>{
        this.setState({
            open:event.currentTarget
        })
    }

    handleClickClose=()=>{
        this.setState({
            open:null
        })
    }
    componentWillReceiveProps(nextProps) {
        this.Total_days_calc(nextProps.Filter_date_from,nextProps.Filter_date_to);
        // this.setState({ 
        //     Filter_date_from:nextProps.Filter_date_from,
        //     Filter_date_to:nextProps.Filter_date_to,
        //     people:this.state.people
        // });  
        
      }
    
      componentWillMount(){
        this.Total_days_calc(this.props.Filter_date_from,this.props.Filter_date_too);
        // this.setState({ 
        //     Filter_date_from:this.props.Filter_date_from,
        //     Filter_date_to:this.props.Filter_date_to,
        //     people:this.state.people
        // });
      }

    Total_days_calc=(date_from,date_to)=>{
        if(date_from!==null && date_to!==null && date_from!==undefined && date_to!==undefined){
            const diffTime = Math.abs(date_from.getTime() - date_to.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
            // this.props.handleChange("total_days",diffDays);
            this.setState({
                total_days:diffDays
            })
        }
        
    }

    disable_to=()=>{
        if(this.props.Filter_date_from!==null &&this.props.Filter_date_from!==undefined){
            return false;
        }
        else{
            return true;
        }
    }

    handle_error=()=>{
        if(this.props.Min_price<=this.state.total_days*this.props.people*this.props.Extra_person_price){
            return(<Typography variant="subtitle" align="left">Ελάχιστη Τιμή Ενοικίασης: {this.props.Min_price} €</Typography>)
        }
        else{
            return(<Typography color="error" variant="subtitle" align="left">Ελάχιστη Τιμή Ενοικίασης: {this.props.Min_price} €</Typography>)
        }
    }
    handle_error2=()=>{
        if(this.props.userData===null){
            return(<Typography display="block" color="error" variant="subheading" align="left">Πρέπει να συνδεθείτε πρώτα</Typography>)
        }
    }

    handle_show=()=>{
        if(this.state.total_days!==0){
            return(
                <div className="title_padding">
                    <Typography variant="h6" align="left">Μέρες Διαμονής: {this.state.total_days}</Typography>
                    <Typography variant="h6" align="left">Συνολικό Ποσό: {(this.state.total_days*this.props.people*this.props.Extra_person_price)} €</Typography>
                    {this.handle_error()}
                    {this.handle_error2()}
                </div>
            )
        }
    }


    render() {
        return (<div style={this.props.style}>
        <Grid container spacing={2}>
        
        <form onSubmit={this.props.handle_submit}>
        <Box  border={1} borderRadius={10} className="Filters_box">
            <Grid container alignContent='center' spacing={3}>
                <Grid  item xs={12}>
                <Grid container spacing={1}>
                    <Grid  item xs={12}>
                        <Grid container spacing={1}>
                        <Grid  item xs={12}>
                            <div className="title_padding">
                                <Typography variant="h6" align="left">Τιμή/Άτομο {this.props.Extra_person_price}€</Typography>
                            </div>
                        </Grid>
                        <Grid  item xs={12}>
                         <KeyboardDatePicker
                            disablePast
                            
                            shouldDisableDate={this.props.handleDisableDates}
                            autoOk
                            
                            variant="inline"
                            inputVariant="outlined"
                            name="Filter_date_from"
                            label="Από"
                            format="MM/dd/yyyy"
                            value={this.props.Filter_date_from}
                            InputAdornmentProps={{ position: "start" }}
                            onChange={(date) => this.props.handleChange("Filter_date_from",date)}
                        />

                        </Grid>
                        <Grid  item xs={12}>
                         <KeyboardDatePicker
                            disabled={this.disable_to()}
                            disablePast
                            
                            shouldDisableDate={this.props.handleDisableDatesto}
                            autoOk
                            
                            variant="inline"
                            inputVariant="outlined"
                            name="Filter_date_to"
                            label="Εώς"
                            format="MM/dd/yyyy"
                            value={this.props.Filter_date_to}
                            InputAdornmentProps={{ position: "start" }}
                            onChange={(date) => {this.props.handleChange("Filter_date_to",date);}}
                        />

                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={0} className="mrg_box22">
                            <Grid item xs={12}>
                                <div className="title_padding">
                                    <Typography variant="h6" align="left">Αριθμός Ατόμων</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="title_box">
                                    <TextField 
                                    value={this.props.people}
                                    
                                    name="people"
                                    onChange={this.props.handleChangeState}
                                    variant="outlined" 
                                    type="number"
                                    size="medium"
                                    InputProps={{
                                        // endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                        inputProps: { min: 1 ,max:this.props.Max_people}
                                    }}
                                    />
                                </div>
                            </Grid>
                        </Grid> 
                    </Grid>
                    <Grid  item xs={12}>
                    {/* <Button  variant="contained" onClick={this.handleClickOpen}>
                        Παροχές
                    </Button> */}
                   {this.handle_show()}
                    </Grid>
                    
                    
                </Grid>

                </Grid>
                <Grid  item xs={12}>
                    <Button
                        disabled={this.disable_reservation()}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Κρατηση
                    </Button>
                </Grid>

            </Grid>
        </Box>
        </form>
        </Grid>
        </div>)
    
    }

    // this.fetchFormalsReports=this.fetchFormalsReports.bind(this);
}


export default Room_Dates_Box;