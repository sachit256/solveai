import React, { useEffect, useState } from 'react';
import { Brain, BookOpen, FileText, CheckSquare, Check, X, Upload, Link, Image, FileUp, Youtube } from 'lucide-react';
import { generateStudyMaterials } from '../lib/openai';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';

interface StudyMaterialsProps {
  type: 'quiz' | 'flashcards' | 'summary' | 'notes';
  content: string;
}

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface StudyMaterialData {
  flashcards?: Flashcard[];
  quiz?: QuizQuestion[];
  summary?: string;
  notes?: string;
}

interface YouTubeInfo {
  thumbnail: string;
  title: string;
  duration: string;
}

const StudyMaterials: React.FC<StudyMaterialsProps> = ({ type, content }) => {
  const [currentCard, setCurrentCard] = React.useState(0);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [selectedAnswers, setSelectedAnswers] = React.useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = React.useState(false);
  const [flipping, setFlipping] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [studyData, setStudyData] = useState<StudyMaterialData>({});
  const [error, setError] = useState<string | null>(null);
  const [inputMethod, setInputMethod] = useState<'text' | 'file' | 'link' | 'image'>('text');
  const [inputContent, setInputContent] = useState('');
  const [youtubeInfo, setYoutubeInfo] = useState<YouTubeInfo | null>(null);
  const [selectedType, setSelectedType] = useState<'quiz' | 'flashcards' | 'summary' | 'notes' | null>(null);

  useEffect(() => {
    generateMaterials();
  }, [type, content]);

  const generateMaterials = async () => {
    setLoading(true);
    setError(null);
    try {
      const materials = await generateStudyMaterials(content, type);
      const processedMaterials: StudyMaterialData = {
        ...materials,
        flashcards: materials.flashcards?.map(card => ({
          ...card,
          id: nanoid()
        })),
        quiz: materials.quiz?.map(question => ({
          ...question,
          id: nanoid()
        }))
      };
      setStudyData(processedMaterials);
    } catch (err) {
      console.error('Error generating study materials:', err);
      setError('Failed to generate study materials');
      toast.error('Failed to generate study materials');
    } finally {
      setLoading(false);
    }
  };

  const handleCardFlip = () => {
    setFlipping(true);
    setShowAnswer(!showAnswer);
    setTimeout(() => setFlipping(false), 300);
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    if (!showResults) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: answerIndex
      }));
    }
  };

  const calculateScore = () => {
    if (!studyData.quiz) return 0;
    return studyData.quiz.reduce((score, question) => {
      return score + (selectedAnswers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  const isYoutubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYoutubeInfo = async (url: string) => {
    try {
      // Here you would make an API call to get YouTube video info
      // For now, we'll mock the response
      setYoutubeInfo({
        thumbnail: `https://img.youtube.com/vi/${url.split('v=')[1]}/maxresdefault.jpg`,
        title: 'Video Title',
        duration: '10:30'
      });
    } catch (error) {
      toast.error('Failed to fetch video information');
    }
  };

  const handleInputChange = async (value: string) => {
    setInputContent(value);
    if (inputMethod === 'link' && isYoutubeUrl(value)) {
      await getYoutubeInfo(value);
    } else {
      setYoutubeInfo(null);
    }
  };

  const renderYoutubePreview = () => {
    if (!youtubeInfo) return null;

    return (
      <div className="mt-6 space-y-6">
        {/* Video Preview Card */}
        <div className="bg-[#1F2937] rounded-2xl shadow-xl overflow-hidden">
          <div className="flex items-stretch">
            {/* Thumbnail Side */}
            <div className="w-1/3 relative">
              <div className="absolute inset-0">
                <img 
                  src={youtubeInfo.thumbnail} 
                  alt="Video thumbnail" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1.5">
                <Youtube className="w-3.5 h-3.5 text-red-500" />
                {youtubeInfo.duration}
              </div>
            </div>

            {/* Content Side */}
            <div className="flex-1 p-6">
              <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{youtubeInfo.title}</h3>
              <p className="text-white/60 text-sm mb-4">Select a study method to generate materials from this video</p>
              
              {/* Method Selection */}
              <div className="flex flex-wrap gap-2">
                {[
                  { type: 'quiz', icon: CheckSquare, label: 'Quiz', color: 'bg-green-500' },
                  { type: 'flashcards', icon: Brain, label: 'Flashcards', color: 'bg-blue-500' },
                  { type: 'notes', icon: FileText, label: 'Notes', color: 'bg-purple-500' },
                  { type: 'summary', icon: BookOpen, label: 'Summary', color: 'bg-orange-500' }
                ].map(item => (
                  <button
                    key={item.type}
                    onClick={() => setSelectedType(item.type as typeof selectedType)}
                    className={`
                      group flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300
                      ${selectedType === item.type 
                        ? `${item.color} text-white shadow-lg shadow-${item.color}/20` 
                        : 'bg-[#374151] hover:bg-[#404B5F] text-white/80 hover:text-white'
                      }
                    `}
                  >
                    <item.icon className={`w-4 h-4 transition-transform duration-300 ${
                      selectedType === item.type ? 'scale-110' : 'group-hover:scale-110'
                    }`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Method Preview */}
        {selectedType && (
          <div className="bg-[#1F2937] rounded-2xl p-6 shadow-lg border border-[#374151]">
            <div className="flex items-center gap-3 mb-4">
              {selectedType === 'quiz' && <CheckSquare className="w-5 h-5 text-green-500" />}
              {selectedType === 'flashcards' && <Brain className="w-5 h-5 text-blue-500" />}
              {selectedType === 'notes' && <FileText className="w-5 h-5 text-purple-500" />}
              {selectedType === 'summary' && <BookOpen className="w-5 h-5 text-orange-500" />}
              <h4 className="text-lg font-medium text-white">
                {selectedType === 'quiz' && 'Interactive Quiz'}
                {selectedType === 'flashcards' && 'Study Flashcards'}
                {selectedType === 'notes' && 'Detailed Notes'}
                {selectedType === 'summary' && 'Quick Summary'}
              </h4>
            </div>
            <p className="text-white/70 text-sm">
              {selectedType === 'quiz' && 'Test your understanding with multiple-choice questions'}
              {selectedType === 'flashcards' && 'Review key concepts with interactive flashcards'}
              {selectedType === 'notes' && 'Get comprehensive notes from the video content'}
              {selectedType === 'summary' && 'Get a concise overview of the main points'}
            </p>
            <button 
              className="mt-4 w-full bg-[#6366F1] hover:bg-[#5558E3] text-white py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
              onClick={generateMaterials}
            >
              Generate {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
        <button
          onClick={generateMaterials}
          className="block mx-auto mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  const renderContent = () => {
    switch (type) {
      case 'flashcards':
        if (!studyData.flashcards?.length) return null;
        const currentFlashcard = studyData.flashcards[currentCard];
        if (!currentFlashcard) return null;

        return (
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-[#374151] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#6366F1] transition-all duration-500 ease-out rounded-full"
                style={{ 
                  width: `${((currentCard + 1) / studyData.flashcards.length) * 100}%` 
                }}
              />
            </div>

            {/* Card Counter */}
            <div className="flex justify-between items-center text-sm font-medium text-white">
              <span>Card {currentCard + 1} of {studyData.flashcards.length}</span>
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#6366F1]" />
                <span>Flashcards</span>
              </div>
            </div>

            {/* Card Container */}
            <div className="relative min-h-[400px] w-full perspective-[2000px]">
              <div 
                onClick={handleCardFlip}
                className="relative w-full h-[400px] cursor-pointer preserve-3d transition-transform duration-500"
                style={{ 
                  transform: showAnswer ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Front */}
                <div 
                  className="absolute inset-0 w-full h-full backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="w-full h-full bg-[#1F2937] rounded-2xl p-8 flex flex-col items-center justify-center border-2 border-[#374151] hover:border-[#6366F1]/50 transition-colors duration-300">
                    <div className="text-2xl font-medium text-white text-center">
                      {currentFlashcard.front}
                    </div>
                    <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-3 text-[#6366F1]/70">
                      <div className="h-[2px] w-12 bg-[#6366F1]/20 rounded-full" />
                      <span className="text-sm font-medium">Click to reveal</span>
                      <div className="h-[2px] w-12 bg-[#6366F1]/20 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div 
                  className="absolute inset-0 w-full h-full backface-hidden"
                  style={{ 
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="w-full h-full bg-[#1F2937] rounded-2xl p-8 flex flex-col items-center justify-center border-2 border-[#6366F1] hover:border-[#6366F1] transition-colors duration-300">
                    <div className="text-2xl font-medium text-white text-center">
                      {currentFlashcard.back}
                    </div>
                    <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-3 text-[#6366F1]/70">
                      <div className="h-[2px] w-12 bg-[#6366F1]/20 rounded-full" />
                      <span className="text-sm font-medium">Click to flip back</span>
                      <div className="h-[2px] w-12 bg-[#6366F1]/20 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="absolute -left-16 top-1/2 -translate-y-1/2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentCard > 0) {
                      setShowAnswer(false);
                      setTimeout(() => setCurrentCard(prev => prev - 1), 300);
                    }
                  }}
                  disabled={currentCard === 0}
                  className={`
                    p-3 rounded-xl transition-all duration-300
                    ${currentCard === 0 
                      ? 'bg-[#374151] text-gray-500 cursor-not-allowed opacity-50' 
                      : 'bg-[#6366F1] text-white hover:bg-[#4F46E5] hover:-translate-x-1 hover:shadow-lg hover:shadow-[#6366F1]/25'
                    }
                  `}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>

              <div className="absolute -right-16 top-1/2 -translate-y-1/2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (studyData.flashcards && currentCard < studyData.flashcards.length - 1) {
                      setShowAnswer(false);
                      setTimeout(() => setCurrentCard(prev => prev + 1), 300);
                    }
                  }}
                  disabled={!studyData.flashcards || currentCard === studyData.flashcards.length - 1}
                  className={`
                    p-3 rounded-xl transition-all duration-300
                    ${currentCard === studyData.flashcards.length - 1
                      ? 'bg-[#374151] text-gray-500 cursor-not-allowed opacity-50' 
                      : 'bg-[#6366F1] text-white hover:bg-[#4F46E5] hover:translate-x-1 hover:shadow-lg hover:shadow-[#6366F1]/25'
                    }
                  `}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center items-center gap-2 pt-4">
              {studyData.flashcards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setShowAnswer(false);
                    setTimeout(() => setCurrentCard(index), 300);
                  }}
                  className={`
                    h-2 rounded-full transition-all duration-300
                    ${index === currentCard 
                      ? 'w-8 bg-[#6366F1]' 
                      : 'w-2 bg-[#374151] hover:bg-[#4B5563]'
                    }
                  `}
                />
              ))}
            </div>
          </div>
        );

      case 'quiz':
        if (!studyData.quiz?.length) return null;

        return (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-[#374151] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#6366F1] transition-all duration-500 ease-out rounded-full"
                style={{ 
                  width: `${(Object.keys(selectedAnswers).length / studyData.quiz.length) * 100}%` 
                }}
              />
            </div>

            {/* Score Display */}
            <div className="flex justify-between items-center text-sm font-medium text-white">
              <span>Progress: {Object.keys(selectedAnswers).length}/{studyData.quiz.length}</span>
              <span>Score: {calculateScore()}/{studyData.quiz.length}</span>
            </div>

            {/* Questions */}
            <div className="space-y-8">
              {studyData.quiz.map((question, index) => {
                const isAnswered = selectedAnswers[question.id] !== undefined;
                const selectedAnswer = selectedAnswers[question.id];
                const isCorrect = selectedAnswer === question.correctAnswer;

                return (
                  <div 
                    key={question.id}
                    className={`
                      transform transition-all duration-500
                      ${isAnswered ? 'opacity-75' : 'opacity-100'}
                      ${index === Object.keys(selectedAnswers).length ? 'scale-100' : 'scale-95'}
                    `}
                  >
                    <div className="bg-[#1F2937] rounded-2xl p-6 shadow-lg border border-[#374151]">
                      <div className="flex items-start gap-4 mb-6">
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#374151] flex items-center justify-center text-white font-medium">
                          {index + 1}
                        </span>
                        <h3 className="text-xl text-white font-medium">{question.question}</h3>
                      </div>

                      <div className="grid gap-3">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = selectedAnswer === optionIndex;
                          const isCorrectAnswer = question.correctAnswer === optionIndex;
                          
                          let buttonStyle = `
                            relative w-full p-4 rounded-xl text-left transition-all duration-300
                            flex items-center justify-between group
                            ${!isAnswered ? 'hover:bg-[#374151] bg-[#1F2937] border-2 border-[#374151] hover:border-[#6366F1]' : ''}
                            ${isAnswered && isSelected && isCorrect ? 'bg-green-500/10 border-2 border-green-500' : ''}
                            ${isAnswered && isSelected && !isCorrect ? 'bg-red-500/10 border-2 border-red-500' : ''}
                            ${isAnswered && !isSelected && isCorrectAnswer ? 'bg-green-500/10 border-2 border-green-500' : ''}
                            ${isAnswered && !isSelected && !isCorrectAnswer ? 'opacity-50 border-2 border-[#374151]' : ''}
                          `;

                          return (
                            <button
                              key={optionIndex}
                              onClick={() => !isAnswered && handleAnswerSelect(question.id, optionIndex)}
                              disabled={isAnswered}
                              className={buttonStyle}
                            >
                              <div className="flex items-center gap-4 text-white">
                                <div className={`
                                  w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium
                                  ${!isAnswered ? 'bg-[#374151] group-hover:bg-[#6366F1]' : ''}
                                  ${isAnswered && isSelected && isCorrect ? 'bg-green-500' : ''}
                                  ${isAnswered && isSelected && !isCorrect ? 'bg-red-500' : ''}
                                  ${isAnswered && !isSelected && isCorrectAnswer ? 'bg-green-500' : ''}
                                  ${isAnswered && !isSelected && !isCorrectAnswer ? 'bg-[#374151]' : ''}
                                `}>
                                  {String.fromCharCode(65 + optionIndex)}
                                </div>
                                <span className="text-lg">{option}</span>
                              </div>

                              {isAnswered && (
                                <div className="flex-shrink-0">
                                  {isSelected && isCorrect && <Check className="w-6 h-6 text-green-500" />}
                                  {isSelected && !isCorrect && <X className="w-6 h-6 text-red-500" />}
                                  {!isSelected && isCorrectAnswer && <Check className="w-6 h-6 text-green-500" />}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="max-w-2xl mx-auto bg-[#1F2937] rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Summary</h2>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(studyData.summary || '');
                  toast.success('Summary copied to clipboard');
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#374151] hover:bg-[#4B5563] text-white/90 hover:text-white transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span className="text-sm font-medium">Copy</span>
              </button>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-white/90 leading-relaxed">
                {studyData.summary?.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        );

      case 'notes':
        return (
          <div className="max-w-2xl mx-auto bg-[#1F2937] rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Detailed Notes</h2>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(studyData.notes || '');
                  toast.success('Notes copied to clipboard');
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#374151] hover:bg-[#4B5563] text-white/90 hover:text-white transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span className="text-sm font-medium">Copy</span>
              </button>
            </div>
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-white/90">
                {studyData.notes?.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </pre>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {renderYoutubePreview()}
      {renderContent()}
    </div>
  );
};

export { StudyMaterials }