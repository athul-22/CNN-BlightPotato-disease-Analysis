import React, { useState } from 'react';
import './App.css';

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [responz, setResOk] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResOk(null);
    handleSubmit()
  };

  const handleSubmit = async (event) => {
    //event.preventDefault();

    if (!file) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setResOk(true)
        const data = await response.json();
        console.log(data);
        setPrediction(data);
      } else {
        console.error('Error:', response.statusText);
      }

    } catch (e) {
      console.error('Error:', e);
    }
  };

  return (
    <div >
       <h1 style={{textAlign:'center' ,marginTop:'50px'}}>Potato Blight Disease Prediction Model 🧬</h1>
       <div style={{display:'flex'}}>
      <main style={{ 
        marginLeft: '240px', 
        marginTop: '30px', 
        alignItems: 'center',
        position: 'relative',
        height: '530px', 
        width: '600px', 
        background: 'rgba(0,0,0, 0.5)', 
        backdropFilter: 'blur(100px)',
        color: 'white',
        padding: '20px', 
        borderRadius: '20px'
      }} className='main'>
       
        <form onSubmit={handleSubmit}>
          <label htmlFor="file-upload" className="upload-panel">
            <input type="file" id="file-upload" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
            {file && <img src={URL.createObjectURL(file)} alt="Uploaded Image" />}
            {!file && <span>Drag & Drop or Click to Upload</span>}
          </label>
          <button className='button' type="submit">Upload</button>
        </form>
      </main>

     {responz && 
      <div style={{ 
        marginTop: '30px', 
        height:'300px',
        marginLeft: '20px', 
        padding: '20px', 
        borderRadius: '20px', 
        background: 'black', 
        color: 'white',
        width: '300px' 
      }}>
        <h3 style={{fontSize:'30px'}}>Result</h3>
        {prediction &&  (
          <div >
            <p style={{fontSize:'40px'}}>{prediction.class === 'Early Blight' ? '🥲' : prediction.class === 'Late Blight' ? '🥹' : '😀'}</p>
            <p style={{fontSize:'20px'}}>{prediction.class}</p>
            <p>Confidence: {Math.round(prediction.confidence * 100)} %</p>
            <p>Confidence Precisly: {prediction.confidence *100} %</p>
          </div>
        )}
      </div>
      
      }
    </div>
    </div>
  );
}

export default ImageUploader;
