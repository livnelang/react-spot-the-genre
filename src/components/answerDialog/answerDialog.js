import React, { PureComponent } from "react";
import { connect } from "react-redux";
import './answerDialog.css';
import { FaThumbsUp } from 'react-icons/fa';

class AnswerDialog extends PureComponent {

    // onGuessClick(isCorrectGenre) {
    //     console.log('guess is .. : ' + isCorrectGenre);

    //     //todo: wrap it in setTimeout or equivalent
    //     this.props.setShowGuessResult({ displayMessage: true, success: isCorrectGenre });
    // }


    render() {
        // return (
        //     <div className="answerDialog">
        //       <p>You answered: {this.props.showGuessResult.success.toString()}</p>
        //     </div>
        // );

        if (this.props.showGuessResult.success) {
            return (
                <div className="successDialog">
                    {/* <p>You answered: {this.props.showGuessResult.success.toString()}</p> */}
                    <span>
                        <FaThumbsUp size="50"/>
                    </span>
                </div>
            )
        }
        else {
            return (
                <div className="failedDialog">
                    <p>No matter, please try again!</p>
                </div>
            )
        }

    }
}



const mapStateToProps = (state) => {
    return {
        showGuessResult: state.showGuessResult
    };
};


// const mapDispatchToProps = (dispatch) => {
//     return {
//         setShowGuessResult: guessResult => dispatch(setShowGuessResult(guessResult)),
//     };
// };


export default connect(mapStateToProps, null)(AnswerDialog);