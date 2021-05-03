import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import Header from "./components/Header";
import Dropzone from "./components/Dropzone";
import {uploadViaPresignedPost} from "./lib";
import config from "./config";
import Notification from "./components/Notification";
import {ulid} from "ulid";
import SyntaxHighlighter from "react-syntax-highlighter";
import styles from "./App.module.css";

function App() {

  const NotificationRef = useRef<any>();
  const [ file, setFile ] = useState<File>();
  const [ sessionId, setSessionId ] = useState<any>();

  useEffect(()=>{
    const id = ulid();
    console.log(`sessionId: ${id}`);
    setSessionId(id);
  }, []);

  async function upload() {
    console.log('upload', file);
    const result = await uploadViaPresignedPost(config.API_URL, file, sessionId);
    console.log('result', result);
    NotificationRef.current.start(result.msg, result.severity);
  }

  const [ results, setResults ] = useState<any>(null);
  async function checkResults() {
    console.log('checkResults');
    let response = await fetch(config.API_URL + 'check-results?' +  new URLSearchParams({
      sessionId,
    }));
    let json = await response.json();
    console.log('results', json);
    for (const i of json.Items) {
      if (i.classification) i.classification = JSON.parse(i.classification);
    }
    setResults(json.Items);
  }

  return (
    <div className="App">
      <div className="container px-5 pb-12 mx-auto">

        <Header />

        <Dropzone setFile={setFile} />

        <button onClick={upload}
          className="mb-10 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg block m-auto">
          Upload
        </button>

        <div className='text-left'>
          <button onClick={checkResults}
                  className="mb-3 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Check for results!
          </button>

          {
            results &&
            <div className='mb-5'>
              <SyntaxHighlighter language='json' className={`${styles.json}`}>
                {JSON.stringify(results, null, 2)}
              </SyntaxHighlighter>
            </div>
          }
        </div>

      </div>

      <Notification ref={NotificationRef} />
    </div>
  );
}

export default App;
