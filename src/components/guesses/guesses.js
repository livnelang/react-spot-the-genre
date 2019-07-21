import React, { PureComponent } from "react";
import { connect } from "react-redux";
import './guesses.css';

class Guesses extends PureComponent {

    render() {
        return (
            <div className="guesses">
                {Object.keys(this.props.guesses).map((keyName, i) => {
                    return <p value={this.props.guesses[keyName]} key={i}>{keyName}</p>
                }, this)
                }
            </div>
        );
    }
}




const mapStateToProps = (state) => {
    return {
        guesses: state.currentArtist.guesses
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setSelectedImage: (selectedImage) => {
//             dispatch({
//                 type: "SET_SELECTED_IMAGE",
//                 payload: selectedImage
//             });
//         }
//     };
// };


export default connect(mapStateToProps, null)(Guesses);