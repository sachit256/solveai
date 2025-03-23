# BrainlyAi Chrome Extension

BrainlyAi is a powerful Chrome extension that provides instant answers and explanations for any question using advanced AI technology. With a sleek dark-mode interface and premium features, it helps users get quick, accurate responses to their queries.

## Features

### Core Functionality
- **Instant Answers**: Select any text on a webpage to get immediate, AI-powered answers
- **Detailed Explanations**: Receive step-by-step explanations with visual aids for complex questions
- **Unlimited Usage**: Premium users get unlimited access to all features

### User Interface
- **Dark Mode by Default**: Modern, eye-friendly dark theme
- **Responsive Sidepanel**: Easy-to-use interface with intuitive navigation
- **Keyboard Shortcuts**: Quick access with Cmd+B (Mac) or Ctrl+B (Windows/Linux)

### Premium Features
- Advanced AI-powered responses
- Unlimited questions and explanations
- Priority support

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/brainlyai.git
cd brainlyai
```

2. Install dependencies:
```bash
npm install
```

3. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `extension` directory from this project

## Configuration

### Environment Variables
Create a `.env` file in the extension directory with the following variables:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_api_key
```

### API Keys
- **Supabase**: Sign up at [Supabase](https://supabase.com) to get your project URL and anonymous key
- **OpenAI**: Get your API key from [OpenAI Platform](https://platform.openai.com)

## Usage

1. Click the BrainlyAi icon in your Chrome toolbar or use the keyboard shortcut (Cmd+B/Ctrl+B) to open the sidepanel
2. Select any text on a webpage
3. Get instant answers and explanations
4. Access additional features through the sidebar navigation

## Development

### Project Structure
```
extension/
├── manifest.json        # Extension configuration
├── background.js       # Service worker
├── content.js         # Content script
├── sidepanel.html     # Sidepanel UI
├── sidepanel.js      # Sidepanel logic
└── icons/            # Extension icons
```

### Building
```bash
npm run build
```

### Testing
```bash
npm test
```

## Links

- [Chrome Web Store](https://chrome.google.com/webstore/detail/brainlyai/your-extension-id)
- [Official Website](https://calm-horse-4892b7.netlify.app)
- [Pricing](https://calm-horse-4892b7.netlify.app/pricing)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Report bugs through the extension's bug report feature
- Email: support@brainlyai.app
- Visit our [website](https://calm-horse-4892b7.netlify.app) for more information