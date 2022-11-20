import * as React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";



function About() {
  
    const marginLeft={
        marginLeft:500
    };
  return (
    
    

    <div style={{
        marginTop:200,
        marginLeft:20
    }} className="card">
        
      <h4 style={marginLeft}>How to use Give Input  in ReactJS?</h4>
      <Card
        style={{
          width: 400,
          marginLeft:500,
          marginRight:400,
          backgroundColor: "yellow",
        }}
      >
        <CardContent>
          <Typography
            style={{ fontSize: 14 }}
            color="textSecondary"
            gutterBottom
          >
            GoodMorning Hope the day goes Well
          </Typography>
          <Typography variant="h5" component="h2">
            How are you ?
          </Typography>
          <Typography
            style={{
              marginBottom: 12,
            }}
            color="textSecondary"
          >
            Keep Motivated
          </Typography>
          <Typography variant="body2" component="p">
            Stay Happy
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default About
