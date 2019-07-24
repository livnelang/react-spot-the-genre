import React, { PureComponent } from "react";
import { connect } from "react-redux";
import './answerDialog.css';
import { FaThumbsUp } from 'react-icons/fa';
import { shuffleArtists, resetGame, setCurrentArtist } from "../../actions/index";

class AnswerDialog extends PureComponent {


    playAgain() {

        //shuffle artists array ( make it interesting )
        this.props.shuffleArtists();

        // set score to 0
        // hide answerDialog, show screen
        this.props.resetGame();

        // dispatch currentArtist actiobn
        this.props.setCurrentArtist();
    }


    render() {

        if (this.props.showGuessResult.success) {
            return (
                <div className="successDialog">
                    {/* <p>You answered: {this.props.showGuessResult.success.toString()}</p> */}
                    <span>
                        <FaThumbsUp size="50" />
                    </span>
                </div>
            )
        }
        else {
            return (
                <div className="failedDialog">
                    <p>your score: {this.props.score}</p>
                    <p className="playAgain" onClick={() => { this.playAgain() }}>Play again?</p>
                </div>
            )
        }

    }
}



const mapStateToProps = (state) => {
    return {
        showGuessResult: state.showGuessResult,
        score: state.score,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        shuffleArtists: () => dispatch(shuffleArtists()),
        resetGame: () => dispatch(resetGame()),
        setCurrentArtist: () => dispatch(setCurrentArtist())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AnswerDialog);