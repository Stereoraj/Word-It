import React from 'react';
import Axios from 'axios';
import StringSimilarity from 'string-similarity';
import AnimatedNumber from 'react-animated-number';

import getRandomStrList from './utils/randomString';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: '',
      imageDesc: 'Loading Image Description',
      randomImageDesc: 'Loading Image Description',
      imageDescInput: '',
      descMatch: null,
      photographer: {
        fullName: '',
        link: ''
      },
      imagePlatformLink: 'https://unsplash.com/'
    };

  }

  componentDidMount() {
    // fetch the image and the description
    this.fetchImage();
  }

  fetchImage = async () => {
    // here the api key for the config is fetched from the external environment file
    // the configuration is specification for authentication by unsplash API
    const config = {
      headers: {
        "Authorization": "Client-ID " + process.env.REACT_APP_UNSPLASH_API_KEY
      }
    };

    let imageDesc = "";
    let res = "";

    // sometimes the image data doesn't contain the main description and also no alt description
    // if no any description is available, keep on fetching the data until available
    while(imageDesc === "") {

      try {
        res = await Axios.get("https://api.unsplash.com/photos/random/", config);
      }catch(ex) {
        throw new Error(ex);
      }

      if(res.data.description === null) {
        if(res.data.alt_description !== null) {
          imageDesc = res.data.alt_description;
        }
      } else {
        imageDesc = res.data.description;
      }
    }

    console.log(res.data.user.first_name + " " + res.data.user.last_name);
    console.log(res.data.user.links.html);

    // Once the image data is loaded with the description,
    // set the state value to render back
    this.setState({
      imageUrl: res.data.urls.regular,
      imageDesc: imageDesc,
      randomImageDesc: getRandomStrList(imageDesc),
      photographer: {
        fullName: (res.data.user.first_name === null ? "" : res.data.user.first_name) + " " + (res.data.user.last_name === null ? "" : res.data.user.last_name),
        link: res.data.user.links.html 
      }
    });
  }

  nextImageClickHandler = () => {
    // reset the state
    this.setState({
      imageUrl: '',
      imageDesc: 'Loading Image Description',
      imageDescInput: '',
      descMatch: null, 
    });
    this.componentDidMount();
  }

  submitBtnHandler = () => {
    let stringSim = (StringSimilarity.compareTwoStrings(this.state.imageDesc.toLowerCase(), this.state.imageDescInput.toLowerCase()) * 100).toFixed(2);

    this.setState({
      descMatch: stringSim
    });
  }

  descInputChangeHandler = (e) => {
    this.setState({
      imageDescInput: e.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <div className="image-container">
          <img src={this.state.imageUrl} alt='random image'/>
          <span>Photo by <a href={this.state.photographer.link} target="_blank">{this.state.photographer.fullName}</a> on <a href={this.state.imagePlatformLink} target="_blank">Unsplash</a></span>
        </div>
        <div className="input-controls">

          <h3 className="header">
            <span>W</span>
            <span>o</span>
            <span>r</span>
            <span>d</span>
            <span> </span>
            <span>I</span>
            <span>t</span>
          </h3>

          <h3 className="header-desc">Give your own words to the image</h3>

          <div>
            <div className={`image-desc ${this.state.descMatch === null ? `blurry-text` : `underlined`}`}>
              <p>{this.state.descMatch === null ? this.state.randomImageDesc : this.state.imageDesc}</p>
            </div>

            <p className="description-match">Your description match :&nbsp; 
              <span>{this.state.descMatch === null ? 
                    <span className="blurry-text">"--" </span> : 
                    <AnimatedNumber component="text" value={this.state.descMatch} /> }
              </span>
            </p>

            <input className="input-text" type="text" placeholder="Describe the image" value={this.state.imageDescInput} onChange={this.descInputChangeHandler}/>
            
            <div className="action-btns">
              {this.state.descMatch === null ? 
                <div className="submit-btn" onClick={this.submitBtnHandler}>submit</div> : 
                null}
              <div className="next-btn" onClick={this.nextImageClickHandler}>
                Next Image
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
 
}

export default App;