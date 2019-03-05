import VideoListEntry from './VideoListEntry.js';

var VideoList = (props) => {
  const renderList = function(videos) {
    return videos.map( (video) => {
      return <VideoListEntry key={video.id.videoId} video={video} cb={props.cb}/>;
    });
  };
  return (
    <div className="video-list">{renderList(props.videos)}</div>
  );
};

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoList.propTypes = {
  videos: React.PropTypes.array.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
export default VideoList;
