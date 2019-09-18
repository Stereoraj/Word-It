import React from 'react';
import Axios from 'axios';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: ''
    };

  }

  componentDidMount() {
    // set up the config for the api auth
    const config = {
      headers: {
        "Authorization": "Client-ID " + process.env.REACT_APP_UNSPLASH_API_KEY
      }
    };

    // make the api call to the unsplash server
    Axios.get(
      'https://api.unsplash.com/photos/random/',
      config
    ).then(res => {
      console.log(res)

      console.log(res.data.urls.regular);

      // set the image url state
      this.setState({
        imageUrl: res.data.urls.regular
      });
    }).catch(err => {
      console.log(err);
    });

  }

  render() {
    return (
      <div className="App">
       <h3>Word It</h3> 

       <img src={this.state.imageUrl} alt='random image' width="300px"/>
      </div>
    );
  }
 
}

export default App;