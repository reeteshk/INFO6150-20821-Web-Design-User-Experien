import React from "react";
import Card from 'react-bootstrap/Card';


export const CardDetail = (CardDetailProps) => {

    console.log(process.env.REACT_APP_ICON_URL);

    const url = process.env.REACT_APP_ICON_URL.concat(CardDetailProps.icon, '@2x.png');
    console.log(url);

    return(

        <Card border="secondary">
            <Card.Img variant="top" src={url} />
            <Card.Body>
                <Card.Title>{CardDetailProps.date}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{CardDetailProps.description}</Card.Subtitle>
                <Card.Text>
                    <span>Highest Temperature: {CardDetailProps.highestTemp}</span>
                    <br/>
                    <span>Lowest Temperature:  {CardDetailProps.lowestTemp}</span>
                    <br/>
                    <span>Average Temperature:  {CardDetailProps.averageTemp}</span>
                    <br/>

                </Card.Text>
            </Card.Body>
        </Card>
    );
}