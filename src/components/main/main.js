import React, { PureComponent } from "react";
import axios from 'axios';
import './main.css';


export default class Main extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            randomArtist: null,
        }
        // this.getRandomArtist = this.getRandomArtist.bind(this);
    }

    componentDidMount() {
        this.getRandomArtist();
    }


    getRandomArtist() {
        axios.get('/getRandomArtist')
            .then((response) => {
                // console.log(response);
                this.setState({ randomArtist: response.data.items[0] });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="mainBoard">
                {this.state.randomArtist ? <img src={this.state.randomArtist.images[0].url} alt="" /> : null}
            </div>
        );
    }
}