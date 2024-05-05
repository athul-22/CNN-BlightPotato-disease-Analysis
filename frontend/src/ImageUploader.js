import React, { useState } from 'react'

function ImageUploader() {

  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preverntDefault();

    if (!file) {
      console.log('No file selected')
      return
    }

    const formData = new FormData();
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)
      } else {
        console.error('Error:', response.statusText)
      }

    } catch (e) {
      console.error('Error:', e)
    }


  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input type='file' accept='image/*' onChange={handleFileChange} />
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default ImageUploader