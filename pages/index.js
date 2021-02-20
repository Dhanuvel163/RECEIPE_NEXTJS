import Head from 'next/head'
import Layout from '../Components/layout'

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import {APITOKEN} from '../config'
import { useState } from 'react';
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
import Link from 'next/link'
import Pagination from '@material-ui/lab/Pagination';
import Container from '@material-ui/core/Container';
// export const config = {
//     unstable_runtimeJS:false
// }
const useStyles = makeStyles((theme) => ({
    alignCenter:{
      display: 'flex',width: '100%',justifyContent:'center',
    },
    root: {
      padding: '2px 4px',display: 'flex',alignItems: 'center',width: '60%'
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
    maxWidth: 345
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

export default function Home({receipes,pages}) {
  const classes = useStyles();
  const router = useRouter();
  const classesCard = useStylesCard();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let [page,setpage] = useState(parseInt(router.query?.page) || 1)
  const handleChange = (e,v) => {
    setpage(v)
    if(router.query?.query){
      router.push(`/?query=${router.query?.query}&page=${v}`)
    }
  }
  let [search,setsearch] = useState(router.query?.query)
  const searchFunction = () => {
    if(search && search.trim() != '' && search.trim() != ' '){
      router.push(`/?query=${search}&page=1`)
      setpage(parseInt(1))
    }
  }
  
  return (
    <div>
      <Head>
        <title>Receipe App</title>
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <Layout>

      <div className={classes.alignCenter} style={{marginTop:40}}>
        <Paper elevation={3} className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Search"
                defaultValue={search}
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

      {/* {router.isFallback && <div>loading...</div>} */}

      {receipes.length === 0  &&
      <div className={classes.alignCenter} style={{marginTop:20}}>
        <div>
          <h1 style={{textAlign:'center',color:'white',fontWeight:'bold',textShadow:'1px 1px 3px black'}}>
            OOPS ! NO DATA</h1>
          <img style={{maxWidth:'100vw'}} src="/no.svg"/>
        </div>
      </div>      
      }
      {
      (!router.query?.query && receipes.length !== 0 ) &&
        <Container style={{marginTop:40}}>
          <p style={{color:'white',fontWeight:'bold',textShadow:'0px 0px 1.3px black',textTransform:'uppercase',fontSize:'27px'}}>
            Trending Receipes
          </p>
          <Divider/>
        </Container>
      }
      {
      (router.query?.query && receipes.length !== 0 ) &&
        <Container>
          <h2 style={{color:'white',fontWeight:'bold',textShadow:'0px 0px 1.3px black',textTransform:'uppercase',fontSize:'27px'}}>
            Results for {router.query?.query}
          </h2>
          <Divider/>
        </Container>
      }
      {receipes.length !== 0  &&
      <div className={classes.alignCenter} style={{marginTop:20}}>
        <Paper elevation={3} className={classes.alignCenter} style={{width:'fit-content',paddingTop:5,paddingBottom:5}}>
          <Pagination count={pages} boundaryCount={2} siblingCount={0} color="secondary" page={page} onChange={handleChange}/>
        </Paper>
      </div>      
      }


      <Grid container style={{marginTop:20}}>
        {receipes.map((d,i)=>(
        <Grid key={i} item xs={12} sm={6} md={4} className={classes.alignCenter}>

        <Card className={classesCard.root} style={{marginTop:29}}>
          <Link href={`/${d.id}`}>
          <CardHeader style={{cursor:'pointer'}}
            avatar={
              <Avatar aria-label="recipe" className={classesCard.avatar}>
                {d.title[0]}
              </Avatar>
            }
            title={d.title}
            subheader={d?.dishTypes?.[0]}
          />          
          </Link>

          <CardMedia
            className={classesCard.media}
            image={d.image || 'https://spoonacular.com/recipeImages/157106-312x231.jpg'}
            title={d.title}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="div">
              <div dangerouslySetInnerHTML={{__html: `${d.summary}`}} />
              {/* <div dangerouslySetInnerHTML={{__html: `${d.summary?.substring(0,200)} ...`}} /> */}
            </Typography>
          </CardContent>
          
          {
          d.instructions 
          // true
          &&
          <>
          <CardActions disableSpacing>
            <IconButton
              className={clsx(classesCard.expand, {[classesCard.expandOpen]: expanded,})}
              onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more"
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

      {receipes.length !== 0  &&
      <div className={classes.alignCenter} style={{marginTop:20}}>
        <Paper elevation={3} className={classes.alignCenter} style={{width:'fit-content',paddingTop:5,paddingBottom:5}}>
          <Pagination count={pages} boundaryCount={2} siblingCount={0} color="secondary" page={page} onChange={handleChange}/>
        </Paper>
      </div>      
      }

      </Layout>
    </div>
  )
}
export const getServerSideProps = async(ctx) =>{
  if(ctx.query?.query){
    // console.log(ctx.query?.query)
    let offset = (ctx.query?.page-1)*9
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${ctx.query.query}&offset=${offset}&
      instructionsRequired=true&addRecipeInformation=true&number=9&apiKey=${APITOKEN}`)
    const response =await res.json()
    return{props:{receipes:response.results || [],pages:(Math.ceil(response.totalResults/12))}} 
  }
  const res = await fetch(`https://api.spoonacular.com/recipes/random?number=9&tags=vegetarian&apiKey=${APITOKEN}`)
  const response =await res.json()
  return{props:{receipes:response.recipes || [],pages:1}} 
}