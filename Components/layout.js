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
            <AppBar position="fixed">
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
            <div style={{height:60}}></div>
            {props.children}
            <div style={{height:40}}></div>

            <div style={{backgroundColor:'black',padding:20,color:'white'}}>
                <p style={{textAlign:'center'}}>
                    <b>
                    All rights reserved @ 2021 - Receipo
                    </b>
                </p>
            </div>
        </div>
    )
}
