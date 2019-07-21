import React, { PureComponent } from "react";
import { connect } from "react-redux";
import './guesses.css';
import { setShowGuessResult, setCurrentArtist, setArtistCounter } from "../../actions/index";

class Guesses extends PureComponent {

    onGuessClick(isCorrectGenre) {
        console.log('guess is .. : ' + isCorrectGenre);

        //todo: wrap it in setTimeout or equivalent
        this.props.setShowGuessResult({ displayMessage: true, success: isCorrectGenre });
        if (isCorrectGenre) {
            // update to next artist, artistCounter update
            this.props.setArtistCounter(this.props.artistCounter + 1);
            this.props.setCurrentArtist(this.props.artists[this.props.artistCounter]);

            setTimeout(() => {
                this.props.setShowGuessResult({ displayMessage: false, success: false });
            }, 1500)
        }
    }


    render() {
        return (
            <div className="guesses">
                {Object.keys(this.props.guesses).map((keyName, i) => {
                    return <p onClick={() => this.onGuessClick(this.props.guesses[keyName])}
                        value={this.props.guesses[keyName]}
                        key={i}>{keyName}</p>
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
        setArtistCounter: updatedCounter => dispatch(setArtistCounter(updatedCounter)),
        setCurrentArtist: artist => dispatch(setCurrentArtist(artist))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Guesses);