
# Audibly

Audibly is an AI powered tool that transforms any PDF into an engaging podcast style conversation between two speakers. It uses advanced language models to generate natural dialogue and AI voices to bring the conversation to life, making learning and consuming information more interactive and fun.


## Features

- PDF Upload: Users can upload any PDF document; the text is extracted directly on the frontend.

- Conversation Draft Generation: The backend sends extracted text to an LLM via the Groq API to generate a dialogue between two speakers (Speaker A and Speaker B).

- Audio Generation: Kokoro AI voices (running locally) generate individual audio files for each speaker’s lines.

- Audio Merging: Using ffmpeg, the system merges all the generated audio clips sequentially into a single podcast file.

- Temporary Storage: Each user session creates a unique temporary folder (using UUIDs) to manage audio files separately, ensuring smooth handling of multiple concurrent users.

## How it Works

- User uploads a PDF through the frontend.

- Text is extracted and sent to the backend.

- Backend generates a conversation draft using the Groq API.

- Each dialogue line is converted into an audio file using Kokoro voices (separate voices for Speaker A and Speaker B).

- All audio files are merged sequentially into a single podcast file using FFmpeg.

- The final podcast file is sent back to the user for download or streaming.

## Tech Stack

**Client:** React.js, Tailwind CSS

**Server:** Node.js, Express.js , FFmpeg

**AI Models:** Groq API, Kokoro TTS 
