import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface StudyMaterial {
  flashcards?: Array<{ front: string; back: string }>;
  quiz?: Array<{ question: string; options: string[]; correctAnswer: number }>;
  summary?: string;
  notes?: string;
}

export const generateChatResponse = async (messages: { role: 'user' | 'assistant'; content: string }[]) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI tutor that assists students with their studies. You provide clear, concise, and accurate answers while encouraging critical thinking."
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
};

export const generateStudyMaterials = async (
  content: string,
  type: 'flashcards' | 'quiz' | 'summary' | 'notes'
): Promise<StudyMaterial> => {
  try {
    let prompt = '';
    
    switch (type) {
      case 'flashcards':
      case 'quiz':
        // Add system message to ensure proper JSON formatting
        prompt = `Create 5 ${type === 'flashcards' ? 
           'flashcards from this content. Each flashcard should have a question on the front and the answer on the back. Format as JSON array with "front" and "back" properties.' :
           'multiple choice questions from this content. Each question should have 4 options with one correct answer. Format as JSON array with "question", "options" (array), and "correctAnswer" (index) properties.'
        } Return ONLY the JSON array without any additional text, markdown formatting, or code blocks. Content: ${content}`;
        break;
      case 'summary':
        prompt = `Create a concise summary of this content, highlighting the key points. Content: ${content}`;
        break;
      case 'notes':
        prompt = `Create detailed study notes from this content, organized with headings and bullet points. Content: ${content}`;
        break;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert educator who creates high-quality study materials. Focus on key concepts and ensure accuracy."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const response = completion.choices[0].message.content;

    // Parse response based on type
    switch (type) {
      case 'flashcards':
      case 'quiz':
        try {
          // Clean the response to ensure it's valid JSON
          const cleanedResponse = response.replace(/```json\n|\n```|```/g, '').trim();
          return { [type]: JSON.parse(cleanedResponse) };
        } catch (e) {
          console.error('Failed to parse JSON response:', e);
          throw new Error('Failed to generate study materials');
        }
      case 'summary':
      case 'notes':
        return { [type]: response };
      default:
        throw new Error('Invalid study material type');
    }
  } catch (error) {
    console.error('Error generating study materials:', error);
    throw error;
  }
};