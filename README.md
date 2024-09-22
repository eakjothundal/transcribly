# Meeting Assistant Audio Transcribe

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

The **Node.js Transcription and Summarization App** is a powerful tool designed to transcribe audio files and generate comprehensive summaries of the transcriptions. Leveraging the capabilities of [Deepgram](https://deepgram.com/) for transcription and [OpenAI's GPT-4](https://openai.com/) for summarization, this application is ideal for transforming meeting recordings, interviews, lectures, and other audio content into actionable insights.

## Features

- **Audio Transcription:** Converts audio files (e.g., `.m4a`, `.mp3`) into text using Deepgram's advanced transcription services.
- **Text Summarization:** Generates detailed and structured summaries of transcribed text using OpenAI's GPT-4 model.
- **Environment Configuration:** Easily manage API keys and other settings using environment variables.
- **Structured Output:** Summaries are formatted using Markdown for clarity and ease of reading.
- **Extensible:** Modular codebase allows for easy additions and modifications.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** Version 14.x or higher. [Download Node.js](https://nodejs.org/)
- **npm or Yarn:** Package manager for installing dependencies.
- **API Keys:**
  - **Deepgram API Key:** Sign up at [Deepgram](https://deepgram.com/) to obtain your API key.
  - **OpenAI API Key:** Sign up at [OpenAI](https://openai.com/) to obtain your API key.

## Installation

Follow these steps to set up the application locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add your API keys:

   ```env
   DEEPGRAM_API_KEY=your_deepgram_api_key
   OPENAI_API_KEY=your_openai_api_key
   OPENAI_PROJECT_KEY=your_openai_project_key
   ```

   > **Note:** Replace `your_deepgram_api_key`, `your_openai_api_key`, and `your_openai_project_key` with your actual API keys.

## Configuration

The application uses environment variables to manage sensitive information and configuration settings. Ensure the following variables are set in your `.env` file:

- `DEEPGRAM_API_KEY`: Your Deepgram API key for transcription services.
- `OPENAI_API_KEY`: Your OpenAI API key for accessing GPT-4.
- `OPENAI_PROJECT_KEY`: (Optional) Your OpenAI project key if applicable.

Example `.env` file:

```env
DEEPGRAM_API_KEY=abcdef1234567890
OPENAI_API_KEY=sk-abcdefghij1234567890
OPENAI_PROJECT_KEY=project_key_example
```

## Usage

To run the application, use the following command:

```bash
npx tsx app.ts
```

### What Happens When You Run the App

1. **Transcription:**

   - The application reads an audio file (`testData/section.m4a` by default) and sends it to Deepgram for transcription.
   - The transcribed text is logged to the console.

2. **Summarization:**
   - If transcription is successful, the transcribed text is sent to OpenAI's GPT-4 model.
   - A structured summary is generated and displayed in the console.

### Customizing the Audio File

By default, the application transcribes the audio file located at `testData/section.m4a`. To use a different audio file:

1. Place your audio file in the `testData` directory.
2. Update the file path in the `transcribe` function within `app.ts`:

   ```typescript
   fs.readFileSync("testData/your-audio-file.m4a");
   ```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**

2. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Make Your Changes**

4. **Commit Your Changes**

   ```bash
   git commit -m "Add Your Feature"
   ```

5. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

6. **Open a Pull Request**

Please ensure your code adheres to the project's coding standards and includes appropriate documentation.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or support, please contact eakjothundal@gmail.com(mailto:eakjothundal@gmail.com).

---

**Happy Coding!** 🚀
