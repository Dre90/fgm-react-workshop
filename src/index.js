import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetails from './components/video_details';
import { youtubeAPI } from '../api_key';
const API_KEY = youtubeAPI;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedVideo: null, videos: [] };

    this.videoSearch('eminem');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({videos: videos, selectedVideo: videos[0]});
    })
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
    return (
      <div className="container">
        <SearchBar onSearchTermChange={videoSearch} />
        <div className="row">
          <VideoDetails video={this.state.selectedVideo} />
          <VideoList
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos={this.state.videos}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("appContainer"));