import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { useNavigate } from "react-router";


const FileUploadChat = ({ onFilesUploaded }) => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState();
    const fileInputRef = useRef(null);
    const navigate = useNavigate();



    const handleFileUpload = async (event) => {
        const allowedFileTypes = [
            'text/plain',
            'text/csv',
            'text/markdown',
            'application/json',
            'application/pdf',
            'application/msword',
            'image/jpeg',
            'image/png',
            'video/mp4',

        ];

        const uploadedFiles = Array.from(event.target.files);
        const validFiles = [];
        const invalidFiles = [];

        uploadedFiles.forEach((file) => {
            if (allowedFileTypes.includes(file.type)) {
                validFiles.push(file);
            } else {
                invalidFiles.push(file.name);

            }
        });

        if (invalidFiles.length > 0) {
            setError(`Error: Unsupported file types: ${invalidFiles.join(', ')}`)
            setTimeout(() => { setError('') }, 5000)

        }

        if (validFiles.length > 0) {
            setFiles((prev) => [...prev, ...validFiles]);
            onFilesUploaded([...files, ...validFiles]);
        }
    };
    return (
        <div className="flex flex-col h-screen bg-gray-50">

            <div className="p-4 bg-white border-b">
                <div className="flex items-center gap-3 max-w-4xl mx-auto">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Upload className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-semibold">Ecommerce Chat Assistant</h1>
                        <p className="text-sm text-gray-500">Upload files below. Allowed file types: .txt, .csv, .md, .json, .pdf, .doc, .jpg, .png, .mp4</p>
                    </div>
                </div>
            </div>


            <div className="flex-1 overflow-auto p-4">
                <div className="max-w-4xl mx-auto">

                    <div className="mb-6">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            className="hidden"
                            multiple
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <Upload className="w-8 h-8 text-gray-400" />
                                <span className="text-gray-600">Click to upload files</span>

                            </div>
                        </button>
                        {files.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {files.map((file, index) => (
                                    <div key={index} className="p-2 bg-blue-50 rounded flex justify-between items-center">
                                        <span className="text-sm text-blue-600">{file.name}</span>
                                        <button
                                            onClick={() => setFiles(files.filter((_, i) => i !== index))}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {error && <p className='text-red-600 bg-red-200 p-2 rounded-lg'>{error}</p>}

                    {files.length > 0 && (
                        <div className="mt-6">
                            <button
                                onClick={() => navigate('/demo')}
                                className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            >
                                See Chatbot Integration Demo →
                            </button>
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};

export default FileUploadChat;