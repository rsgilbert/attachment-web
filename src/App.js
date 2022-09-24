import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { UploadForm } from './components/UploadForm';
import { AttachmentList } from './components/AttachmentList';

function App() {
    return (
        <div className="App">
            <UploadForm />
            <AttachmentList /> 
        </div>
    );
}



export default App;
