import React, {useState, useCallback} from 'react';
import {useDropzone, FileWithPath} from 'react-dropzone';
import {MdCloudUpload} from 'react-icons/md';

type Props = {
  setFile: (file: FileWithPath) => void,
};

const Dropzone: React.FC<Props> = ({setFile}) => {

  const [filesToUpload, setFilesToUpload] = useState<any>();
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file:FileWithPath) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        setFile(file);
        setFilesToUpload(<div className={`${!acceptedFiles.length? 'invisible' : ''}`}>
          <h4 className='inline mr-1.5 text-gray-500'>File:</h4>
          {acceptedFiles.map((file: FileWithPath) => (
            <p className='inline' key={file.size}>
              {file.path} - {file.size} bytes
            </p>
          ))}</div>);
      }
      reader.readAsArrayBuffer(file)
    })
  }, [setFile])

  const {getRootProps, getInputProps} = useDropzone({accept: '.log', onDrop});

  return (
    <section className="mb-4 container bg-blue-100 container p-8 rounded-2xl">

      <div {...getRootProps({className: 'dropzone border border-blue-400 border-dashed p-10 focus:outline-none'})}>
        <MdCloudUpload className="m-auto text-6xl" />
        <input {...getInputProps()} />
        <p className="py-4 text-blue-800">Drag and drop the ".log" file here, or click to select the file</p>
      </div>
      <aside className="pt-4 text-left">
        {filesToUpload}
      </aside>
    </section>
  );
}

export default Dropzone;
