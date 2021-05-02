import React, {useState} from 'react';
import './App.css';
import Header from "./components/Header";
import Dropzone from "./components/Dropzone";
import {FileWithPath} from 'react-dropzone';
import {uploadViaPresignedPost} from "./lib";
import config from "./config";

function App() {

  const [ file, setFile ] = useState<FileWithPath>();

  async function upload() {
    const result = await uploadViaPresignedPost(config.SIGNER_URL, file);
    console.log('result', result);
    alert(result);
  }

  return (
    <div className="App">
      <div className="container px-5 pb-12 mx-auto">

        <Header />

        <Dropzone setFile={setFile} />

        <button onClick={upload}
          className="mb-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          Upload
        </button>

      </div>
    </div>
  );
}

export default App;
