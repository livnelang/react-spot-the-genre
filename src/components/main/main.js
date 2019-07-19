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
        // this.getRandomArtist = this.getRandomArtist.bind(this);
    }

    componentDidMount() {
        this.getRandomArtist();
    }


    getRandomArtist() {
        axios.get('/getRandomArtist')
            .then((response) => {
                // console.log(response);
                this.setState({ artists: response.data });
                this.setState({ currentArtist: this.state.artists[0] });
                this.setGuesses()
            })
            .catch((error) => {
                console.log(error);
            });
    }




    setGuesses() {
        var randomCurrentGenreIndex = Math.floor(Math.random() * (this.state.currentArtist.genres.length - 1));
        // this.setState({ currentArtist.guesses = {}});

        this.state.currentArtist.guesses = {};
        this.state.currentArtist.guesses[this.state.currentArtist.genres[randomCurrentGenreIndex]] = true;

        var randomGenre;
        while (Object.keys(this.state.currentArtist.guesses).length   < 3      ) {
            randomGenre = this.state.allGenres[Math.floor(Math.random() * this.state.allGenres.length)];
            //check that is not one the artist genres, and - check that it is not already inside the guesses object
            if (this.isSuitableGuess(randomGenre)) {
                console.log('candidate genre: ' + randomGenre);
                this.state.currentArtist.guesses[randomGenre] = false;
            }
        }
    }

    isSuitableGuess(genre) {
        if (!this.state.currentArtist.genres.includes(genre) && this.state.currentArtist.guesses[genre] == null) {
            return true;
        }
    }

    render() {
        return (
            <div className="mainBoard">
                {this.state.currentArtist ?
                    <div>
                        <img src={this.state.currentArtist.images[0].url} alt="" />
                        {this.state.currentArtist.genres.map(function (genre, index) {
                            return <p key={index}>{genre}</p>
                        }, this)
                        }
                    </div>
                    : null}
            </div>
        );
    }
}