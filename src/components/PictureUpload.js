import React, { Fragment, useState } from 'react';
import Button from '@mui/material/Button';

const PictureUpload = ({ onPictureSelected }) => {
  const [base64, setBase64] = useState(null);
  let input;

  const handleFileChange = async e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64(reader.result);
      onPictureSelected(reader.result);
    };
  };

  return (
    <Fragment>
      <input
        style={{ display: 'none' }}
        ref={ref => input = ref}
        type="file"
        onChange={handleFileChange}
      />
      
      {
        !base64 && (
          <Button variant="contained" onClick={() => input.click()}>
            Upload Photo
          </Button>
        )
      }

      {
        base64 && (
          <center><img style={{ width: 300, borderRadius: 5 }} src={base64} alt="PictureUpload" /></center>
        )
      }
    </Fragment>
  );
};

export default PictureUpload;