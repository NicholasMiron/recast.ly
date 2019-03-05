import YOUTUBE_API_KEY from '../config/youtube.js';

var searchYouTube = (options, callback, errorCB) => {
  const url = 'https://www.googleapis.com/youtube/v3/search';
  const data = {
    q: options.query || 'french bulldog puppies',
    part: 'snippet',
    maxResults: options.max || 5,
    key: YOUTUBE_API_KEY,
    type: 'video',
    videoEmbeddable: true
  };

  $.ajax({
    url: url,
    type: 'GET',
    data: data,
    success: function (data) {
      callback(data.items);
    },
    error: errorCB || function(error) {
      console.error('ERRORROROROR!', error);
    }
  });
};

export default searchYouTube;
