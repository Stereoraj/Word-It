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
        <div className="image-container">
          <img src={this.state.imageUrl} alt='random image'/>
          {/* <img className="center-fit" src="https://images.unsplash.com/photo-1566332242436-086c43cfe91e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjY0MTI5fQ" alt='random image'/> */}
        </div>
        <div className="input-controls">
          <h3 className="header">Word It</h3>
          <h3 className="header-desc">Give your own words to the image to your left.</h3>
        </div>
      </div>
    );
  }
 
}

export default App;