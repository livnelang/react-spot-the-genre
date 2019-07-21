import React, { PureComponent } from "react";
import { connect } from "react-redux";

import axios from 'axios';
import './main.css';
import jsonData from './genres.json';
import { setArtists, setCurrentArtist, setAllGenres } from "../../actions/index";


class Main extends PureComponent {

    componentDidMount() {
        this.props.setAllGenres(jsonData.genres);
        this.getRandomArtist();
    }


    getRandomArtist() {
        axios.get('/getRandomArtist')
            .then((response) => {
                //set store (state) artists
                this.props.setArtists(response.data);

                //set store (state) currentArtist
                var currentArtist = this.prepareCurrentArtist(this.props.artists[0]);
                this.props.setCurrentArtist(currentArtist);
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
            randomGenre = this.props.allGenres[Math.floor(Math.random() * this.props.allGenres.length)];
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
        if (this.props.currentArtist) {

            return (
                <div className="mainBoard flex">
                    <div className="artistImageBox">
                        <img src={this.props.currentArtist.images[0].url} alt="" />
                    </div>
                    <div className="guesses">
                        {Object.keys(this.props.currentArtist.guesses).map((keyName, i) => {
                            return <p value={this.props.currentArtist.guesses[keyName]} key={i}>{keyName}</p>
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

const mapStateToProps = (state) => {
    return {
        allGenres: state.allGenres,
        artists: state.artists,
        currentArtist: state.currentArtist
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        setArtists: artists => dispatch(setArtists(artists)),
        setCurrentArtist: artist => dispatch(setCurrentArtist(artist)),
        setAllGenres: genresObject => dispatch(setAllGenres(genresObject))
    };

};


export default connect(mapStateToProps, mapDispatchToProps)(Main);
