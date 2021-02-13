import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link'
export default function Layout(props) {
    return (
        <div >
            <AppBar position="static">
                <Toolbar >
                    <>
                    <Link href="/" style={{cursor:'pointer'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <FastfoodIcon />
                    </IconButton>
                    </Link>
                    <Link href="/" >
                    <Typography style={{cursor:'pointer'}} variant="h5" style={{fontWeight:'bold'}}> 
                        Receipo
                    </Typography>
                    </Link>
                    </>
                </Toolbar>
            </AppBar>
            {props.children}
            <div style={{height:40}}></div>
        </div>
    )
}
