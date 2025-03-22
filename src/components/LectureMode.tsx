import React, { useState, useCallback } from 'react';
import { Link } from 'lucide-react';
import { validateYouTubeUrl, extractVideoId, getVideoMetadata, type YouTubeMetadata } from '../lib/youtube';
import toast from 'react-hot-toast';
import { StudyMaterials } from './StudyMaterials';
import { CheckSquare, Brain, FileText, BookOpen, Youtube } from 'lucide-react';

interface FileUpload {
  file: File;
  preview?: string;
  progress: number;
}

interface LectureModeProps {
  onProcessContent: (type: string) => void;
}

export const LectureMode: React.FC<LectureModeProps> = ({ onProcessContent }) => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoMetadata, setVideoMetadata] = useState<YouTubeMetadata | null>(null);
  const [documents, setDocuments] = useState<FileUpload[]>([]);
  const [videos, setVideos] = useState<FileUpload[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'youtube' | 'document' | 'video'>('youtube');
  const [studyMaterialType, setStudyMaterialType] = useState<'quiz' | 'flashcards' | 'summary' | 'notes' | null>(null);
  // Clear content when switching tabs
  const handleTabChange = (tab: 'youtube' | 'document' | 'video') => {
    setActiveTab(tab);
    setStudyMaterialType(null);
    
    // Clear content based on tab
    if (tab === 'youtube') {
      setDocuments([]);
      setVideos([]);
    } else if (tab === 'document') {
      setVideoMetadata(null);
      setYoutubeUrl('');
      setVideos([]);
    } else if (tab === 'video') {
      setVideoMetadata(null);
      setYoutubeUrl('');
      setDocuments([]);
    }
  };

  const handleYouTubeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateYouTubeUrl(youtubeUrl)) {
      toast.error('Please enter a valid YouTube URL');
      return;
    }

    setLoading(true);
    try {
      const videoId = extractVideoId(youtubeUrl);
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }

      const metadata = await getVideoMetadata(videoId);
      setVideoMetadata(metadata);
      toast.success('Video loaded successfully');
    } catch (error) {
      console.error('Error fetching video metadata:', error);
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          toast.error('YouTube API key error. Please contact support.');
        } else if (error.message.includes('Video not found')) {
          toast.error('Video not found. Please check the URL.');
        } else {
          toast.error('Failed to load video. Please try again.');
        }
      }
      setVideoMetadata(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = useCallback((files: FileList | null, type: 'document' | 'video') => {
    if (!files?.length) return;

    const file = files[0];
    const maxSize = type === 'document' ? 10 * 1024 * 1024 : 20 * 1024 * 1024; // 10MB or 20MB
    
    if (file.size > maxSize) {
      toast.error(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
      return;
    }

    // Validate file type
    const allowedTypes = type === 'document' 
      ? ['.pdf', '.docx', '.txt']
      : ['.mp4', '.mov', '.avi'];
    
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (!allowedTypes.includes(fileExtension)) {
      toast.error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
      return;
    }

    // Create file preview for supported types
    let preview = undefined;
    if (type === 'video') {
      preview = URL.createObjectURL(file);
    }

    const upload: FileUpload = {
      file,
      preview,
      progress: 0
    };

    if (type === 'document') {
      setDocuments(prev => [...prev, upload]);
    } else {
      setVideos(prev => [...prev, upload]);
    }

    // Simulate upload progress
    const interval = setInterval(() => {
      if (type === 'document') {
        setDocuments(prev => 
          prev.map(doc => 
            doc.file === file 
              ? { ...doc, progress: Math.min(doc.progress + 10, 100) }
              : doc
          )
        );
      } else {
        setVideos(prev => 
          prev.map(vid => 
            vid.file === file 
              ? { ...vid, progress: Math.min(vid.progress + 10, 100) }
              : vid
          )
        );
      }
    }, 500);

    setTimeout(() => clearInterval(interval), 5000);
  }, []);

  const removeFile = (file: File, type: 'document' | 'video') => {
    if (type === 'document') {
      setDocuments(prev => prev.filter(doc => doc.file !== file));
    } else {
      setVideos(prev => prev.filter(vid => vid.file !== file));
    }
  };

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'youtube'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          onClick={() => handleTabChange('youtube')}
        >
          YouTube Link
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'document'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          onClick={() => handleTabChange('document')}
        >
          Document Upload
        </button>
        <button
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'video'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          onClick={() => handleTabChange('video')}
        >
          Video Upload
        </button>
      </div>

      {/* YouTube Link Input */}
      <div className={activeTab === 'youtube' ? 'block' : 'hidden'}>
        <form onSubmit={handleYouTubeSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              YouTube Video URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-1 px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load Video'}
              </button>
            </div>
          </div>

          {videoMetadata && (
            <div className="bg-[#1F2937] rounded-xl overflow-hidden shadow-lg mt-4">
              <div className="flex">
                {/* Thumbnail Side */}
                <div className="w-64 relative">
                  <img
                    src={videoMetadata.thumbnail}
                    alt={videoMetadata.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 right-2">
                    <span className="text-xs font-medium text-white/90 bg-black/50 px-2 py-0.5 rounded-md flex items-center gap-1.5">
                      <Youtube className="w-3.5 h-3.5 text-red-500" />
                      {videoMetadata.duration}
                    </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 p-4">
                  <h3 className="text-base font-medium text-white mb-1 line-clamp-1">
                    {videoMetadata.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
                    <span>{videoMetadata.channelTitle}</span>
                    <span>•</span>
                    <span>{videoMetadata.viewCount} views</span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-2 mb-3">
                    {videoMetadata.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="h-1 flex-1 bg-[#374151] rounded-full">
                      <div className="h-full w-0 bg-[#6366F1] rounded-full transition-all duration-300" />
                    </div>
                    <span className="text-xs text-white/60">Ready to generate materials</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Document Upload */}
      <div className={activeTab === 'document' ? 'block' : 'hidden'}>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => handleFileUpload(e.target.files, 'document')}
              className="hidden"
              id="document-upload"
            />
            <label
              htmlFor="document-upload"
              className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium"
            >
              Click to upload
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              PDF, DOCX, or TXT (max. 10MB)
            </p>
          </div>

          {documents.map((doc, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{doc.file.name}</span>
                <button
                  onClick={() => removeFile(doc.file, 'document')}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all"
                  style={{ width: `${doc.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Upload */}
      <div className={activeTab === 'video' ? 'block' : 'hidden'}>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".mp4,.mov,.avi"
              onChange={(e) => handleFileUpload(e.target.files, 'video')}
              className="hidden"
              id="video-upload"
            />
            <label
              htmlFor="video-upload"
              className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium"
            >
              Click to upload
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              MP4, MOV, or AVI (max. 20MB)
            </p>
          </div>

          {videos.map((video, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
            >
              {video.preview && (
                <video
                  src={video.preview}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  controls
                />
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{video.file.name}</span>
                <button
                  onClick={() => removeFile(video.file, 'video')}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all"
                  style={{ width: `${video.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      {(videoMetadata || documents.length > 0 || videos.length > 0) && (
        <div className="grid grid-cols-4 gap-4 mt-8">
          {[
            { type: 'quiz', label: 'Generate Quiz', icon: CheckSquare },
            { type: 'flashcards', label: 'Create Flashcards', icon: Brain },
            { type: 'notes', label: 'Generate Notes', icon: FileText },
            { type: 'summary', label: 'Create Summary', icon: BookOpen }
          ].map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              onClick={() => {
                onProcessContent(type);
                setStudyMaterialType(type as 'quiz' | 'flashcards' | 'summary' | 'notes');
              }}
              className={`
                flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-medium text-base
                transition-all duration-300 hover:scale-[1.02]
                ${studyMaterialType === type 
                  ? 'bg-[#6366F1] text-white shadow-lg shadow-[#6366F1]/25' 
                  : 'bg-[#1F2937] text-white/90 hover:text-white'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Study Materials Display */}
      {studyMaterialType && (
        <StudyMaterials
          type={studyMaterialType}
          content={videoMetadata?.description || documents[0]?.file.name || videos[0]?.file.name || ''}
        />
      )}
    </div>
  );
};