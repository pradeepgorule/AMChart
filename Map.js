import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as parkDate from "./Data.json";
import 'semantic-ui-css/semantic.min.css'
import { Button, List, Container } from 'semantic-ui-react'
import { Grid, Image, Segment } from 'semantic-ui-react'
import './Map.css';

export default function Maps(props) {
    const [viewport, setViewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        width: "550px",
        height: "550px",
        zoom: 10
    });

    const [park, selectedPark] = useState(null)
    function displayData() {
        return (parkDate.features).map((data, index) => {
            return (
                <div className="dashboard">

                    <Marker
                        key={data.properties.PARK_ID}
                        latitude={data.geometry.coordinates[1]}
                        longitude={data.geometry.coordinates[0]}
                    >
                        <div class="pin"
                            style={data.properties.Rating < 3 ? { backgroundColor: "#f56060" } : data.properties.Rating == 3 ? { backgroundColor: "yellow" } : { backgroundColor: "#43bd43f7" }}
                            onClick={e => {
                                e.preventDefault()
                                selectedPark(data)
                            }}
                            id={data.properties.Rating}>

                        </div>


                    </Marker>
                        
                </div>
            )
        })
    }

    return (
        <div>
            <Container>
                <Grid columns='equal'>
                    <Grid.Row >
                        <Grid.Column width={9}>
                            <Segment>
                                <ReactMapGL
                                    {...viewport}
                                    mapboxApiAccessToken="pk.eyJ1IjoicHJhZGVlcGdvcnVsZSIsImEiOiJja2VwcTFqNzgyOTF4MnhwaTJpYnVsMjY2In0.hfC4FjAA9_2zvDVTvUuYzQ"
                                    // mapStyle="mapbox://styles/pradeepgorule/ckeqtcaxm6i2i19oc7inpu0dg"
                                    mapStyle="mapbox://styles/pradeepgorule/ckes1g47k7ckx19qq2ukiq0ff"
                                    onViewportChange={viewport => {
                                        setViewport(viewport);
                                    }}

                                >

                                    {displayData()}
                                    {
                                        park != null ?
                                            <Popup
                                                latitude={park.geometry.coordinates[1]}
                                                longitude={park.geometry.coordinates[0]}
                                                onClose={e => { selectedPark(null) }}
                                            >
                                                <h5>{park.properties.NAME}</h5>
                                                <p>{park.properties.DESCRIPTIO}</p>
                                            </Popup>
                                            : null
                                    }
                                </ReactMapGL>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Container>
            <h2>{props.Name}</h2>
            <h1>Wait</h1>
        </div>
    );
}