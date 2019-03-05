import VideoData from '../../src/data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedVideo: VideoData[0],
      videoData: VideoData,
      searchBarValue: 'Austin Texas Food',
      canSearch: true,
    };

  }
  
  componentDidMount() {
    this.props.searchYouTube( { query: this.state.searchBarValue, max: 10 }, (data) => {
      this.setState( {videoData: data, loadedVideo: data[0]} );
    });
    this.setState({searchBarValue: ''});
  }

  //Change loaded video in player on click
  handleVideoClick(video) {
    this.setState( {loadedVideo: video} ); 
  }

  //Get the value of the search bar
  handleSearch(event) {
    this.setState( {searchBarValue: event.target.value} );
    if (this.state.canSearch === true) {
      this.props.searchYouTube( { query: this.state.searchBarValue, max: 10 }, (data) => {
        this.setState( {videoData: data, canSearch: false}, () => {
          setTimeout( () => { this.setState({canSearch: true}); }, 500);
        });
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchYouTube({query: this.state.searchBarValue, max: 10}, (data) => {
      this.setState({videoData: data});
    });
    this.setState( {searchBarValue: ''});
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><Search stateValue={this.state.searchBarValue} cb={this.handleSearch.bind(this)} cbSubmit={this.handleSubmit.bind(this)}/></div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.loadedVideo}/>
          </div>
          <div className="col-md-5">
            <div><VideoList videos={this.state.videoData} cb={this.handleVideoClick.bind(this)}/></div>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
