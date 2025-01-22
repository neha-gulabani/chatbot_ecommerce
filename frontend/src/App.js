import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import FileUploadChat from './component/FileUploadChat';
import Ecommerce from './component/Ecommerce';

const App = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <FileUploadChat
              onFilesUploaded={(files) => setUploadedFiles(files)}
            />
          }
        />
        <Route
          path="/demo"
          element={
            uploadedFiles.length > 0 ? (
              <Ecommerce files={uploadedFiles} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;