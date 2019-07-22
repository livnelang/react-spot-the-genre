import React, { PureComponent } from "react";
import { connect } from "react-redux";
import './answerDialog.css';
import { FaThumbsUp } from 'react-icons/fa';
import { resetGame } from "../../actions/index";

class AnswerDialog extends PureComponent {

    playAgain() {
        //todo: set currentartist to 0
        // set score to 0
        // hide answerDialog, show screen
        this.props.resetGame();
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
        resetGame: () => dispatch(resetGame()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AnswerDialog);