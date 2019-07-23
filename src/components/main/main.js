import React, { PureComponent } from "react";
import { connect } from "react-redux";

import axios from 'axios';
import './main.css';
import Guesses from "../guesses/guesses";
import ArtistBox from "../artistBox/artistBox";
import AnswerDialog from "../answerDialog/answerDialog";

import { setArtists, setCurrentArtist } from "../../actions/index";


class Main extends PureComponent {

    componentDidMount() {
        this.getRandomArtist();
    }


    getRandomArtist() {
        axios.post('/getRandomArtist')
            .then((response) => {
                //set store (state) artists
                this.props.setArtists(response.data);

                //set store (state) currentArtist
                // var currentArtist = this.prepareCurrentArtist(this.props.artists[0]);

                this.props.artists.forEach(artist => {
                    this.prepareCurrentArtist(artist);
                });


                // this.props.setCurrentArtist(currentArtist);

                //after the enrichment
                this.props.setCurrentArtist();
            })
            .catch((error) => {
                console.log(error);
            });
    }


    prepareCurrentArtist(artist) {
        var randomCurrentGenreIndex = Math.floor(Math.random() * (artist.genres.length - 1));
        artist.guesses = [];
        var correctGuess = {
            "name": artist.genres[randomCurrentGenreIndex], "value": true
        };
        artist.guesses.push(correctGuess);


        var randomGenre;
        while (artist.guesses.length < 3) {
            randomGenre = this.props.allGenres[Math.floor(Math.random() * this.props.allGenres.length)];
            //check that is not one the artist genres, and - check that it is not already inside the guesses object
            if (this.isSuitableGuess(artist, randomGenre)) {
                // console.log('candidate genre: ' + randomGenre);
                artist.guesses.push({ "name": randomGenre, "value": false });
            }
        }

        this.arrayShuffle(artist.guesses);
    }

    isSuitableGuess(artist, genre) {
        for (var i = 0; i < artist.guesses.length; i++) {
            if (artist.guesses[i].name === genre) {
                return false;
            }
        }

        return true;
    }


    arrayShuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    render() {
        if (this.props.currentArtist && !this.props.showGuessResult.displayMessage) {
            return (
                <div className="mainBoard flex">
                    <ArtistBox />
                    <Guesses />
                </div>
            );
        }
        else if (this.props.showGuessResult.displayMessage) {
            return (
                <AnswerDialog />
            )
        }
        else {
            return (
                null
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        allGenres: state.allGenres,
        artists: state.artists,
        currentArtist: state.currentArtist,
        showGuessResult: state.showGuessResult,
        artistCounter: state.artistCounter
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        setArtists: artists => dispatch(setArtists(artists)),
        setCurrentArtist: () => dispatch(setCurrentArtist())
    };

};


export default connect(mapStateToProps, mapDispatchToProps)(Main);




