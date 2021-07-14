import React ,{useEffect,useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import {listPhotos} from '../../graphql/queries';
import {createPhoto} from '../../graphql/mutations';
import {Storage} from 'aws-amplify';
import { S3Image } from 'aws-amplify-react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './photo.css';


// import {\}  from '../../features/photos/photoSlice';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotos, photoSelector, deletePhotos, createPhotos} from '../../features/photos/photoSlice';

import {UploadImage} from '../../components';
const validationSchema = yup.object({
    name: yup
      .string('Enter your Name')
      .min(8,"Name should be 8 minimum")
      .required('Name is required'),
    owner: yup
      .string('Enter your password')
      .min(8, 'MyOwner should be of minimum 8 characters length')
      .required('MyOwner is required'),
});
  
// const uploadS3Photo = await Storage.put(mydata.fullsize.key, myFile, {
//     contentType: 'image/*'
// });

const Photos = (props) => {
    const dispatch = useDispatch();
    const onAllPhotos = useSelector(photoSelector.selectAll)
    const onDeletePhotos = useCallback((id) => dispatch(deletePhotos(id),[]));
    const onCreatePhotos = useCallback((myData) => dispatch(createPhotos(myData), []));
    
    const [albumslist, setAlbumlist] = useState();
    const [isUdpate, setIsUpdate] = useState();
    const formik = useFormik({
        initialValues: {
           name: 'Personal',
           owner: 'Vergel',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
        //   createAlbumHandler(values);
        console.log("data",values);
        },
      });
    useEffect(()=>{
        dispatch(fetchPhotos());
    },[]);



    const handleUploadImage = async (d1, d2) => {
        const dataInput = {
            keyAko: d1.fullsize.key,
            fullsize: d1.fullsize,
            thumbnail: d1.thumbnail,
            bucket: d1.bucket,
            photoAlbumId: '98cebf47-9e39-4fdc-a435-42d51e4b4cc8'
        }

        // console.log(
        const uploadS3Photo = await Storage.put(d1.fullsize.key, d2, {
            contentType: 'image/*'
        });
        onCreatePhotos(dataInput);
        console.log('sucess input');
    }

    const gridPhoto = () => {
        return (
          <Grid item xs={12}>
              {console.log(onAllPhotos)}
            <Grid container justify="flex-start" >
                {onAllPhotos?.map((value) => (
                    <Grid key={value.id} sm={4} className="grid-item" item>
                        <Paper>
                             <S3Image className="photo-ko" key={value.id} imgKey={value.fullsize.key}/>
                             <a onClick={()=>onDeletePhotos(value.id)}>DELETE PHOTO</a>
                        </Paper>
                    </Grid>
                ))}
          </Grid>
        </Grid>
        )
    }
    return (
        <div>
         <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              id="owner"
              name="owner"
              label="owner"
              type="owner"
              value={formik.values.owner}
              onChange={formik.handleChange}
              error={formik.touched.owner && Boolean(formik.errors.owner)}
              helperText={formik.touched.owner && formik.errors.owner}
            />

            <UploadImage uploadImage={handleUploadImage}/>
    
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form> 
          {gridPhoto()}
        </div>
    );
};

export default Photos;