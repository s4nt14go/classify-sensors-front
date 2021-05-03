import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import Header from "./components/Header";
import Dropzone from "./components/Dropzone";
import {uploadViaPresignedPost} from "./lib";
import config from "./config";
import Notification from "./components/Notification";
import {ulid} from "ulid";

function App() {

  const NotificationRef = useRef<any>();
  const [ file, setFile ] = useState<File>();
  const [ sessionId, setSessionId ] = useState<any>();

  useEffect(()=>{
    setSessionId(ulid());
  }, []);

  async function upload() {
    console.log('upload', file);
    const result = await uploadViaPresignedPost(config.API_URL, file, sessionId);
    console.log('result', result);
    NotificationRef.current.start(result.msg, result.severity);
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

      <Notification ref={NotificationRef} />
    </div>
  );
}

export default App;
