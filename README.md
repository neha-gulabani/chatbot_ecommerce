This is a simple Node.js-based chatbot that allows users to upload documents, and then ask questions based on the content of those documents. The chatbot uses OpenAI's GPT-4 model to generate responses based on the uploaded content.

## Features

- **File Upload**: Upload multiple text files for processing.
- **Document Parsing**: The contents of uploaded files are parsed and analyzed.
- **Contextual Responses**: GPT-4 is used to generate responses based on the uploaded document content and the user's question.
- **CORS Support**: Cross-Origin Resource Sharing (CORS) is enabled for easy integration with front-end applications.

## Prerequisites

- Node.js v14 or higher
- OpenAI API Key (GPT-4)
- `multer` for handling file uploads

## Setup

### 1. **Clone the Repository**

Clone the repository to your local machine:

```bash
git clone https://github.com/neha-gulabani/chatbot_ecommerce.git
cd chatbot_ecommerce
```

### 2. **Install Dependencies**

```
npm install
```

### 3. ***In the backend, create a .env file and insert your openai api key***

```
OPENAI_API_KEY=your-openai-api-key
```

### 4. ***Run the web app on the frontend side***
```
cd ./frontend
npm start
```

### 5. ***Run the web app on the backend side***

```
cd ./backend
node index.js
```