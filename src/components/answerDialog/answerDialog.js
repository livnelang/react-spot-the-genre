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


        if (this.props.userFinishedGame) {
            return (
                <div className="userWonContainer">
                    <div>
                        Congrats! you won the game with sum of: {this.props.score} points!
                    </div>
                    <div className="playAgain" onClick={() => { this.playAgain() }}>Play again?</div>
                </div>
            )
        }

        else if (this.props.showGuessResult.success) {
            return (
                <div className="successDialog">
                    <span>
                        <FaThumbsUp size="50" />
                    </span>
                </div>
            )
        }
        else {
            return (
                <div className="failedDialog">
                    <div className="scoreContainer">
                        <p>your score: {this.props.score}</p>
                    </div>
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
        userFinishedGame: state.userFinishedGame
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