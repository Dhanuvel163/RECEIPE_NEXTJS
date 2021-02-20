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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
// import SwipeableViews from 'react-swipeable-views';
// export const config = {
//     unstable_runtimeJS:false
// }
export default function Home({receipe}) {
  return (
    <div>
      <Head>
        <title>Receipe App</title>
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <Layout>

        <div>
            <Container>
            <h1 style={{color:'white'}}>{receipe.title}</h1>
            <Divider/>

            <Paper elevation={0} style={{overflow:'hidden',marginTop:30}}>
            <Container>
            <Grid container style={{marginTop:20}}>
                    <Grid item xs={12} sm={6}>
                      <img src={receipe.image} style={{width:'100%',height:'100%'}}/>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{paddingLeft:30}}>
                      <h3>Diets</h3>
                      {
                        receipe.diets.map((d,i)=>(<Chip key={i} style={{marginLeft:5,marginTop:5}} label={d} color="primary"/>))
                      }
                      <h3>Dish Types</h3>
                      {
                        receipe.dishTypes.map((d,i)=>(<Chip key={i} style={{marginLeft:5,marginTop:5}} label={d} color="primary"/>))
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
                      <p><b style={{marginRight:10}}>{receipe.sourceName}</b> 
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

            {/* <Paper elevation={0} style={{overflow:'hidden',marginTop:30}}>
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
            </Paper> */}


            </Container>
        </div>

      </Layout>
    </div>
  )
}
export const getServerSideProps = async(ctx) =>{
  if(ctx.params?.id){
    const [res] = await Promise.all([
      (await fetch(`https://api.spoonacular.com/recipes/${ctx.params?.id}/information?includeNutrition=false&apiKey=${APITOKEN}`)).json(),
      // (await fetch(`https://api.spoonacular.com/recipes/${ctx.params?.id}/similar?apiKey=${APITOKEN}`)).json(),
    ]) 
    // const response =await res.json()
    // const similar = await

    // https://api.spoonacular.com/recipes/715538/similar
    return{props:{receipe:res }} 
  }
  return{props:{receipe:{}}} 
}