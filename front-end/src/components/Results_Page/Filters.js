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
// import Autocomplete from '@material-ui/lab/Autocomplete';
import './Filters.css';


class Filters extends Component {
    constructor(props){
        super(props);
        this.state={
            open:null
        }

        this.handleClickOpen=this.handleClickOpen.bind(this);
        this.handleClickClose=this.handleClickClose.bind(this);
        this.checkDisable=this.checkDisable.bind(this);
        
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

    checkDisable=(name)=>{
        if(this.props.private+this.props.public+this.props.apartment===1){
            if(name==="private" && this.props.private){
                return true
            }
            if(name==="public" && this.props.public){
                return true
            }
            if(name==="apartment" && this.props.apartment){
                return true
            }
            
        }
        return false;
    }

    render() {
        return (<div style={this.props.style}>
        <Grid container spacing={2}>
        <Grid  item xs={12}>
            <h2>Φίλτρα</h2>
        </Grid>
        <form onSubmit={this.props.Filters_submit_handler}>
        <Box  border={1} borderRadius={10} className="Filters_box">
            <Grid container alignContent='center' spacing={3}>
                <Grid  item xs={12}>
                <Grid container spacing={1}>
                    <Grid  item xs={12}>
                        <Grid container spacing={0}>
                        <Grid  item xs={12}>
                            <div className="title_padding">
                                <Typography variant="h6" align="left">Τύπος Καταλύματος</Typography>
                            </div>
                        </Grid>
                        <Grid  item xs={12}>
                            <FormControlLabel
                                className="padding_checks"
                                control={
                                <Checkbox
                                    disabled={this.checkDisable("private")}
                                    checked={this.props.private}
                                    onChange={this.props.handleChangeChecked}
                                    name="private"
                                    color="primary"
                                />
                                }
                                label="Ιδιοτικό Δωμάτιο"
                            />

                        </Grid>
                        <Grid  item xs={12}>
                            <FormControlLabel
                                className="padding_checks"
                                control={
                                <Checkbox
                                    disabled={this.checkDisable("public")}
                                    checked={this.props.public}
                                    onChange={this.props.handleChangeChecked}
                                    name="public"
                                    color="primary"
                                />
                                }
                                label="Κοινόχρηστο Δωμάτιο"
                            />

                        </Grid>
                        <Grid  item xs={12}>
                            <FormControlLabel
                                className="padding_checks"
                                control={
                                <Checkbox
                                    disabled={this.checkDisable("apartment")}
                                    checked={this.props.apartment}
                                    onChange={this.props.handleChangeChecked}
                                    name="apartment"
                                    color="primary"
                                />
                                }
                                label="Ολόκληρη Κατοικία"
                            />

                        </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={0} className="mrg_box22">
                            <Grid item xs={12}>
                                <div className="title_padding">
                                    <Typography variant="h6" align="left">Μέγιστη Τιμή/άτομο</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="title_box">
                                    <TextField 
                                    value={this.props.max_price}
                                    
                                    name="max_price"
                                    onChange={this.props.handleChange}
                                    variant="outlined" 
                                    type="number"
                                    size="medium"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                        inputProps: { min: 0 }
                                    }}
                                    />
                                </div>
                            </Grid>
                        </Grid> 
                    </Grid>
                    <Grid  item xs={12}>
                    <Button  variant="contained" onClick={this.handleClickOpen}>
                        Παροχές
                    </Button>
                    <Popover 
                    id='simple-popover'
                    style={{maxWidth:"26%"}}
                    open={Boolean(this.state.open)}
                    onClose={this.handleClickClose}
                    anchorEl={this.state.open}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    >
                    <Grid container >
                    {/* <Grid  item xs={12}>
                        Παροχές
                    </Grid> */}
                        <Grid  item xs={12}>
                        <FormControlLabel
                            className="padding_checks"
                            control={
                            <Checkbox
                                checked={this.props.wi_fi}
                                onChange={this.props.handleChangeChecked}
                                name="wi_fi"
                                color="primary"
                            />
                            }
                            label="wi_fi"
                        />
                        </Grid>
                        <Grid  item xs={12}>
                        <FormControlLabel
                            className="padding_checks"
                            control={
                            <Checkbox
                                checked={this.props.cooling}
                                onChange={this.props.handleChangeChecked}
                                name="cooling"
                                color="primary"
                            />
                            }
                            label="Ψύξη"
                        />
                        </Grid>
                        <Grid  item xs={12}>
                        <FormControlLabel
                            className="padding_checks"
                            control={
                            <Checkbox
                                checked={this.props.heating}
                                onChange={this.props.handleChangeChecked}
                                name="heating"
                                color="primary"
                            />
                            }
                            label="Θέρμανση"
                        />
                        </Grid>
                        <Grid  item xs={12}>
                        <FormControlLabel
                            className="padding_checks"
                            control={
                            <Checkbox
                                checked={this.props.kitchen}
                                onChange={this.props.handleChangeChecked}
                                name="kitchen"
                                color="primary"
                            />
                            }
                            label="Κουζίνα"
                        />
                        </Grid>
                        <Grid  item xs={12}>
                        <FormControlLabel
                            className="padding_checks"
                            control={
                            <Checkbox
                                checked={this.props.tv}
                                onChange={this.props.handleChangeChecked}
                                name="tv"
                                color="primary"
                            />
                            }
                            label="Τηλεόραση"
                        />
                        </Grid>
                        <Grid  item xs={12}>
                        <FormControlLabel
                            className="padding_checks"
                            control={
                            <Checkbox
                                checked={this.props.parking}
                                onChange={this.props.handleChangeChecked}
                                name="parking"
                                color="primary"
                            />
                            }
                            label="Χώρος Στάθμευσης"
                        />
                        </Grid>
                        <Grid  item xs={12}>
                        <FormControlLabel
                            className="padding_checks"
                            control={
                            <Checkbox
                            checked={this.props.elevator}
                            onChange={this.props.handleChangeChecked}
                            name="elevator"
                                color="primary"
                            />
                            }
                            label="Ανελκυστήρας"
                        />
                        </Grid>
                    </Grid>
                    </Popover>
                    </Grid>
                    
                    
                </Grid>

                </Grid>
                <Grid  item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Αποθήκευση
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


export default Filters;
