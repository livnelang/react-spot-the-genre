import React, { PureComponent } from "react";
import axios from 'axios';
import './main.css';
import jsonData from './genres.json';

export default class Main extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            allGenres: jsonData.genres,
            artists: null,
            currentArtist: null
        }
    }

    componentDidMount() {
        this.getRandomArtist();
    }


    getRandomArtist() {
        axios.get('/getRandomArtist')
            .then((response) => {
                // console.log(response);
                this.setState({ artists: response.data });
                var currentArtist = this.prepareCurrentArtist(this.state.artists[0]);
                this.setState({ currentArtist: currentArtist });
            })
            .catch((error) => {
                console.log(error);
            });
    }




    prepareCurrentArtist(artist) {
        var randomCurrentGenreIndex = Math.floor(Math.random() * (artist.genres.length - 1));
        artist.guesses = {};
        artist.guesses[artist.genres[randomCurrentGenreIndex]] = true;



        var randomGenre;
        while (Object.keys(artist.guesses).length < 3) {
            randomGenre = this.state.allGenres[Math.floor(Math.random() * this.state.allGenres.length)];
            //check that is not one the artist genres, and - check that it is not already inside the guesses object
            if (this.isSuitableGuess(artist, randomGenre)) {
                console.log('candidate genre: ' + randomGenre);
                artist.guesses[randomGenre] = false;
            }
        }
        return artist;
    }

    isSuitableGuess(artist, genre) {
        if (!artist.genres.includes(genre) && artist.guesses[genre] == null) {
            return true;
        }
    }

    render() {
        if (this.state.currentArtist) {

            return (
                <div className="mainBoard flex">
                    <div className="artistImageBox">
                        <img src={this.state.currentArtist.images[0].url} alt="" />
                    </div>
                    <div className="guesses">
                        {Object.keys(this.state.currentArtist.guesses).map((keyName, i) => {
                            return <p value={this.state.currentArtist.guesses[keyName]} key={i}>{keyName}</p>
                        }, this)
                        }   
                    </div>
                </div>
            );
        }
        else {
            return (null)
        }
    }
}