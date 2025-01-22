require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


app.post('/api/chat', upload.array('files'), async (req, res) => {
    try {
        const { message } = req.body;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const fileContents = await Promise.all(files.map(async (file) => {
            const content = await fs.promises.readFile(file.path, 'utf8');

            await fs.promises.unlink(file.path);
            return content;
        }));


        const messages = [
            {
                role: "system",
                content: "You are a helpful assistant that analyzes documents and answers questions about them. Provide clear, concise answers based on the document content."
            },
            {
                role: "user",
                content: `Documents content: ${fileContents.join('\n\n')}\n\nQuestion: ${message}`
            }
        ];


        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: messages,
            temperature: 0.7,
            max_tokens: 2000
        });

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});