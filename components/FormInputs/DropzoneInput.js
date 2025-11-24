import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DropzoneInput = ({ setFieldValue, name, placeholer }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length) {
        const file = acceptedFiles[0];
        setFieldValue(name ? name : 'file', file);
        setIsDragActive(false);
      }
    },
    [setFieldValue]
  );

  const onDragEnter = () => {
    setIsDragActive(true);
  };

  const onDragLeave = () => {
    setIsDragActive(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter,
    onDragLeave,
    accept: 'video/mp4',
  });

  const dropZoneClasses = [
    'border-2',
    'border-dashed',
    'rounded-md',
    'text-center',
    'py-32',
    'w-1/2',
    'mx-auto',
    'cursor-pointer',
    'transition-all',
    'duration-500',
    'ease-in-out',
    isDragActive
      ? 'border-red-600 bg-red-100 text-red-600'
      : 'border-gray-600 hover:border-blue-600 hover:bg-blue-100 hover:text-blue-600',
  ].join(' ');
  process.env.NODE_ENV === 'development' &&
    console.log('dropZoneClasses:', dropZoneClasses);

  return (
    <div {...getRootProps()} className={dropZoneClasses}>
      <input {...getInputProps()} />
      <h1 className="text-2xl">Drag and drop file or click to select</h1>
      <p>{placeholer}</p>
    </div>
  );
};

export default DropzoneInput;
