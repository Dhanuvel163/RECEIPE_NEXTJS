import Head from 'next/head'
import Layout from '../Components/layout'

import {APITOKEN} from '../config'
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Link from 'next/link'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// import Image from 'next/image' 

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';

import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import { red, blue, green } from "@material-ui/core/colors";
import SwipeableViews from 'react-swipeable-views';
export default function Home({receipe}) {
  console.log(receipe)
  return (
    <div>
      <Head>
        <title>Receipe App</title>
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <Layout>

        <div>
            <Container>
            <h1>{receipe.title}</h1>
            <Divider/>

            <Paper elevation={0} style={{overflow:'hidden',marginTop:30}}>
            <Container>
            <Grid container style={{marginTop:20}}>
                    <Grid item xs={12} sm={6}>
                      <img src={receipe.image} style={{width:'100%',height:'100%'}}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <h3>Diets</h3>
                      {
                        receipe.diets.map((d,i)=>(<Chip key={i} style={{marginLeft:5}} label={d} color="primary"/>))
                      }
                      <h3>Dish Types</h3>
                      {
                        receipe.dishTypes.map((d,i)=>(<Chip key={i} style={{marginLeft:5}} label={d} color="primary"/>))
                      }
                      <h3>Type</h3>
                      <Chip label={receipe.vegetarian?'Vegetarian':'Non Vegetarian'} color="secondary"/> 
                      <h3>Time</h3>
                      <Chip label={`${receipe.readyInMinutes} minutes`} color="secondary"/> 
                    </Grid>
            </Grid>
            <Grid container style={{marginTop:20}}>
                    <Grid item xs={12} sm={6}>
                      <h3>Ingredients</h3>
                      <div>
                      <List dense={true}>
                      {receipe.extendedIngredients.map((d,i)=>(
                          <ListItem key={i}>
                            <ListItemAvatar>
                              <Avatar>
                                <EmojiFoodBeverageIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={d.name}
                              secondary={d.original}
                            />
                          </ListItem>
                      ))}
                      </List>
                        {/* <ul>
                        {receipe.extendedIngredients.map((d,i)=>(<li key={i}>{d.original}</li>))}
                        </ul> */}
                      </div>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <h3>Instructions</h3>
                      <div>
                        <ul>
                        {receipe.analyzedInstructions[0].steps.map((d,i)=>(<li key={i}>{d.step}</li>))}
                        </ul>
                      </div>
                      <h3>Summary</h3>
                      <div dangerouslySetInnerHTML={{__html: `${receipe.summary}`}}></div>                      
                      <h3>Source</h3>
                      <p><b style={{marginRight:10,color:'rgb(66, 46, 117)'}}>{receipe.sourceName}</b> 
                      <Link href={receipe.sourceUrl}>
                      <Button size="small" color="primary" variant="outlined">More Info
                      <ArrowRightIcon/>
                      </Button>                      
                      </Link>
                      </p>

                    </Grid>
            </Grid>
            </Container>
            <div style={{height:20}}></div>
            </Paper>
            </Container>
        </div>

      {/* <AutoRotatingCarousel
        label="Get started"
        open={true}
        // onClose={() => setHandleOpen({ open: false })}
        // onStart={() => setHandleOpen({ open: false })}
        autoplay={true}
        // mobile={isMobile}
        style={{ position: "static" }}
      >
        <Slide
          media={
            <img src="http://www.icons101.com/icon_png/size_256/id_79394/youtube.png" />
          }
          mediaBackgroundStyle={{ backgroundColor: red[400] }}
          style={{ backgroundColor: red[600] }}
          title="This is a very cool feature"
          subtitle="Just using this will blow your mind."
        />
        <Slide
          media={
            <img src="http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png" />
          }
          mediaBackgroundStyle={{ backgroundColor: blue[400] }}
          style={{ backgroundColor: blue[600] }}
          title="Ever wanted to be popular?"
          subtitle="Well just mix two colors and your are good to go!"
        />
        <Slide
          media={
            <img src="http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png" />
          }
          mediaBackgroundStyle={{ backgroundColor: green[400] }}
          style={{ backgroundColor: green[600] }}
          title="May the force be with you"
          subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
        />
      </AutoRotatingCarousel> */}

  <SwipeableViews enableMouseEvents>
    <div >
      slide n°1
    </div>
    <div >
      slide n°2
    </div>
    <div >
      slide n°3
    </div>
  </SwipeableViews>

      </Layout>
    </div>
  )
}
export const getServerSideProps = async(ctx) =>{
  if(ctx.params?.id){
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${ctx.params?.id}/information?includeNutrition=false&apiKey=${APITOKEN}`)
    const response =await res.json()
    return{props:{receipe:response }} 
  }
  return{props:{receipe:{}}} 
}