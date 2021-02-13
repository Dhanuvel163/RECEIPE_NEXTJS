import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import IconButton from '@material-ui/core/IconButton';
export default function Layout(props) {
    return (
        <div>
            <AppBar position="sticky">
                <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <FastfoodIcon />
                </IconButton>
                <Typography variant="h5" style={{fontWeight:'bold'}}> 
                    Receipo
                </Typography>
                </Toolbar>
            </AppBar>
            {props.children}
        </div>
    )
}
