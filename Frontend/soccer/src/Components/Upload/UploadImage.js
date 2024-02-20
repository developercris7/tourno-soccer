import React from 'react'
import './uploadimage.css'
const UploadImage = ({setProfileImage,label}) => {
 const handleChange = (e) => {
  setProfileImage(e.target.files[0])
 }

  return (
    <div className='upload'>
        <label htmlFor="file" className='upload-label'>{label}</label>
        <input id="file" type="file" name="image" onChange={handleChange} />
    </div>
  )
}

export default UploadImage