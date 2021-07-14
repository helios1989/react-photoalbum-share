import React,{useState} from 'react';
import './UploadImage.css';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

const UploadImage = ({uploadImage}) => {
    const [thumb, setThumb] = useState();
    const [uploadData, setuploadData] = useState();
    const [myFile, setFile] = useState();
    let fileRef = React.createRef()
    let thumbStyle;
    const imageUpload = (e) => {
        console.log(e);
        let file = e.currentTarget.files[0];
        setFile(file);
        checkType(file);
    }

    const checkType = (file) => {
        let imageType = /image.*/;
        if (!file.type.match(imageType)) {
          throw "this is not image"
        } else if (!file){
          throw 'Kein Bild gewählt';
        } else {
          previewImage(file);
        }
    }

    const previewImage = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function() {
          thumbStyle = {
            backgroundImage: `url(${reader.result})`,
            backgroundRepat: 'no-repeat',
            // width: '100%',
            backgroundSize: 'cover',
            height: '225px',            
            position: 'relative',
            overflow: 'hidden'
         }
         setThumb(thumbStyle);
         const currentTime = new Date().getTime();
         const photoAlbumId = 'd8942565-21f4-4d1a-bf44-8f77d9f49286';
         let mydata = {
             photoAlbumId,
             bucket: 'amplify-amplifyreactapp-dev-90807-deployment',
             fullsize: {
                 key: "photoalbums/" + currentTime + file.name,
                 width: file.size,
                 height: file.size,
             },
             thumbnail: {
                 key: "photoalbums/" + currentTime,
                 width: file.size,
                 height: file.size,
             }
         }
         setuploadData(mydata);
        //  props.uploadImage(mydata);
         // don't save yet to db
        }
    }
    const uploadHandler = () => {
        uploadImage(uploadData, myFile);
    }

  const  triggerClick = () => {
    fileRef.current.click()
   }
    return (
        <>
        <h1>VERGEL</h1>
                <div className="wrapper">
                <div className="box">
                    <div className="js--image-preview" onClick={triggerClick} style={thumb}>XXXX</div>
                    <div className="upload-options">
                    <label>
             
                            <input type="file" ref={fileRef} onChange={(e)=>imageUpload(e)} className="image-upload hidden" accept="image/*" />
                        <Button variant="contained" color="primary" onClick={uploadHandler}>UPLOAD</Button>
                    </label>
                    </div>
                </div>

                </div>
        </>
    );
};

export default UploadImage;