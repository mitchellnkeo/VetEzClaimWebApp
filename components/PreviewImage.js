import React, { useState } from 'react';

function PreviewImage(file) {
    const [preview, setPreview] = useState();
    if(file.length !== 0){
    setPreview(URL.createObjectURL(file));
    }
    //   if(file) {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(file)
    //     reader.onload = ()=>{
    //         setPreview(reader.result)
    //     }
    //   }
  return (
    <div>
        <image style={{width:"300px"}} src={preview} alt="preview"/>
    </div>
  )
}

export default PreviewImage;