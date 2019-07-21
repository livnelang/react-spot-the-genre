import React, { PureComponent } from "react";
import { connect } from "react-redux";

class ArtistBox extends PureComponent {

    render() {
        return (
            <div className="artistImageBox">
                <img src={this.props.artistImage} alt="" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        artistImage: state.currentArtist.images[0].url
    };
};

export default connect(mapStateToProps, null)(ArtistBox);