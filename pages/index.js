import Head from 'next/head'
import Layout from '../Components/layout'

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import {APITOKEN} from '../config'
import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import {useRouter} from 'next/router'

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles((theme) => ({
    alignCenter:{
      display: 'flex',width: '100%',justifyContent:'center',
    },
    root: {
      padding: '2px 4px',display: 'flex',alignItems: 'center',width: '60%',
    },
    input: {marginLeft: theme.spacing(1),flex: 1,
    },
    iconButton: {padding: 10,
    },
    divider: {height: 28,margin: 4,
    }
  }));

const useStylesCard = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Home({receipes}) {
  const classes = useStyles();
  const router = useRouter();
  const classesCard = useStylesCard();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let [search,setsearch] = useState('')
  const searchFunction = () => {
    router.push(`/?query=${search}`)
  }
  return (
    <div>
      <Head>
        <title>Receipe App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>

      <div className={classes.alignCenter} style={{marginTop:40}}>
        <Paper elevation={3} className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Search"
                onChange={(val)=>{
                    setsearch(val.target.value)
                }}
                onKeyDown={(e)=>{
                  if(e.code === 'Enter' ){
                    searchFunction()
                  }
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton onClick={searchFunction} className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
        </Paper>
      </div>

      {router.isFallback && <div>loading...</div>}
      <Grid container style={{marginTop:40}}>
        {receipes.map((d)=>(
        <Grid key={d.title} item xs={12} sm={6} md={4} className={classes.alignCenter}>

        <Card className={classesCard.root} style={{marginTop:29}}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classesCard.avatar}>
                {d.title[0]}
              </Avatar>
            }
            // action={
            //   <IconButton aria-label="settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={d.title}
            subheader={d?.dishTypes?.[0]}
          />
          <CardMedia
            className={classesCard.media}
            image={d.image}
            title={d.title}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="div">
              <div dangerouslySetInnerHTML={{__html: `${d.summary?.substring(0,300)} ...`}} />
            </Typography>
          </CardContent>
          
          {d.instructions &&
          <>
          <CardActions disableSpacing>
            <IconButton
              className={clsx(classesCard.expand, {
                [classesCard.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <div dangerouslySetInnerHTML={{__html: d.instructions}} />
            </CardContent>
          </Collapse>   
          </>       
          }

        </Card>

        </Grid>
        ))}
      </Grid>

      </Layout>
    </div>
  )
}
export const getServerSideProps = async(ctx) =>{
  if(ctx.query?.query){
    console.log(ctx.query?.query)
    const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${ctx.query.query}&instructionsRequired=true&addRecipeInformation=true&number=12&apiKey=${APITOKEN}`)
    const response =await res.json()
    return{props:{receipes:response.results}} 
  }
  const res = await fetch(`https://api.spoonacular.com/recipes/random?number=12&tags=vegetarian&apiKey=${APITOKEN}`)
  const response =await res.json()
  return{props:{receipes:response.recipes}} 
}