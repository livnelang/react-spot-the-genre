import React, { PureComponent } from "react";
import { connect } from "react-redux";
import './guesses.css';
import { setShowGuessResult, setCurrentArtist, setArtistCounter, incrementScore, setUserFinishedGame } from "../../actions/index";

class Guesses extends PureComponent {

    onGuessClick(isCorrectGenre) {

        //todo: wrap it in setTimeout or equivalent
        this.props.setShowGuessResult({ displayMessage: true, success: isCorrectGenre });
        if (isCorrectGenre) {
            //increment score 
            this.props.incrementScore();

            // update to next artist, artistCounter update
            if (this.userWon()) {
                this.props.setUserFinishedGame(true);
                return;
            }

            this.props.setArtistCounter();
            this.props.setCurrentArtist();


            window.confetti.start(1200);
            setTimeout(() => {
                this.props.setShowGuessResult({ displayMessage: false, success: false });
            }, 1500)
        }
    }


    userWon() {
        if (this.props.artistCounter === this.props.artists.length -1) {
            //declare game over, and user won!
            return true;
        }
    }


    render() {
        return (
            <div className="guesses">
                {this.props.guesses.map(function (guess, index) {
                    return <p onClick={() => this.onGuessClick(guess.value)}
                        value={guess.value}
                        key={index}>{guess.name}</p>
                }, this)
                }
            </div>
        );
    }
}




const mapStateToProps = (state) => {
    return {
        guesses: state.currentArtist.guesses,
        artists: state.artists,
        artistCounter: state.artistCounter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setShowGuessResult: guessResult => dispatch(setShowGuessResult(guessResult)),
        setArtistCounter: () => dispatch(setArtistCounter()),
        setCurrentArtist: () => dispatch(setCurrentArtist()),
        incrementScore: () => dispatch(incrementScore()),
        setUserFinishedGame: (value) => dispatch(setUserFinishedGame(value))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Guesses);