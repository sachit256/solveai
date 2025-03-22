import axios from 'axios';

// YouTube URL validation and metadata extraction
const YOUTUBE_URL_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
const YOUTUBE_ID_REGEX = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

export interface YouTubeMetadata {
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  channelTitle: string;
  viewCount: string;
}

export const validateYouTubeUrl = (url: string): boolean => {
  const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
  return pattern.test(url);
};

export const extractVideoId = (url: string): string | null => {
  const pattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(pattern);
  return match ? match[1] : null;
};

export const getVideoMetadata = async (videoId: string): Promise<YouTubeMetadata> => {
  try {
    // Log the environment variable access attempt
    console.log('Attempting to access YouTube API key...');
    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
    
    if (!API_KEY) {
      console.error('YouTube API key is missing in environment variables');
      throw new Error('YouTube API key is not configured');
    }

    console.log('Making API request for video ID:', videoId);
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${API_KEY}`
    );

    if (!response.data || !response.data.items || response.data.items.length === 0) {
      console.error('No video data received from API');
      throw new Error('Video not found');
    }

    const video = response.data.items[0];

    // Format view count
    const viewCount = Number(video.statistics?.viewCount || 0).toLocaleString();
    
    // Format duration from ISO 8601 to readable format
    const duration = video.contentDetails?.duration || 'PT0M0S';
    const durationMatch = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const hours = durationMatch?.[1] || '0';
    const minutes = durationMatch?.[2] || '0';
    const seconds = durationMatch?.[3] || '0';
    const formattedDuration = [
      hours !== '0' ? hours.padStart(2, '0') : null,
      minutes.padStart(2, '0'),
      seconds.padStart(2, '0')
    ].filter(Boolean).join(':');

    return {
      title: video.snippet.title || 'Untitled Video',
      description: video.snippet.description || 'No description available',
      duration: formattedDuration,
      thumbnail: video.snippet.thumbnails.maxres?.url || 
                video.snippet.thumbnails.high?.url || 
                video.snippet.thumbnails.default?.url ||
                'https://via.placeholder.com/1280x720',
      channelTitle: video.snippet.channelTitle || 'Unknown Channel',
      viewCount
    };
  } catch (error) {
    console.error('Detailed error in getVideoMetadata:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Response:', error.response?.data);
      if (error.response?.status === 403) {
        throw new Error('Invalid or expired YouTube API key');
      } else if (error.response?.status === 404) {
        throw new Error('Video not found');
      }
    }
    console.error('Error fetching video metadata:', error);
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      throw new Error('Invalid or expired YouTube API key');
    }
    throw new Error('Failed to fetch video metadata');
  }
};