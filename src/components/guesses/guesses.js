import React, { PureComponent } from "react";
import { connect } from "react-redux";
import './guesses.css';
import { setShowGuessResult, setCurrentArtist, setArtistCounter, incrementScore } from "../../actions/index";

class Guesses extends PureComponent {

    onGuessClick(isCorrectGenre) {

        //todo: wrap it in setTimeout or equivalent
        this.props.setShowGuessResult({ displayMessage: true, success: isCorrectGenre });
        if (isCorrectGenre) {
            //increment score 
            this.props.incrementScore();

            // update to next artist, artistCounter update
            this.props.setArtistCounter();
            this.props.setCurrentArtist();


            window.confetti.start(1200);
            setTimeout(() => {
                this.props.setShowGuessResult({ displayMessage: false, success: false });
            }, 1500)
        }
    }


    render() {
        return (
            <div className="guesses">
                {/* {Object.keys(this.props.guesses).map((keyName, i) => {
                    return <p onClick={() => this.onGuessClick(this.props.guesses[keyName])}
                        value={this.props.guesses[keyName]}
                        key={i}>{keyName}</p>
                }, this)
                } */}

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
        incrementScore: () => dispatch(incrementScore())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Guesses);