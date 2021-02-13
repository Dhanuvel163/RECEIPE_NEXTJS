import Head from 'next/head'
import Layout from '../Components/layout'

import {APITOKEN} from '../config'
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image' 
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
            <h1>{receipe.title}</h1>
            <Divider/>

            <Grid container style={{marginTop:20}}>
                    <Grid item xs={12} sm={6}>
                        {/* <Paper elevation={0} style={{overflow:'hidden'}}> */}
                            {/* <Image 
                            width="800px" height="310px"
                            /> */}
                            <img src={receipe.image} style={{width:'100%',height:'100%'}}/>
                        {/* </Paper> */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={0} style={{overflow:'hidden'}}>
                            <p>{receipe.summary}</p>
                        </Paper>
                    </Grid>
            </Grid>
            <pre>
            {JSON.stringify(receipe)}                
            </pre>    
            </Container>
        </div>
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