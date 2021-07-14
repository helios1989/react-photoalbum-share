import React ,{useEffect,useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import {listAlbums} from '../../graphql/queries';


import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './Albums.css';


import {albumsSelectors, fetchAlbums, deleteAlbum, createAlbum,updateAlbum} from '../../features/albums/albumSlice';
import { useDispatch, useSelector } from 'react-redux'
import { createAlbumApi } from '../../features/albums/api/albumApi';

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
  


const Albums = () => {
    const [isUpdate, setIsUpdate] = useState();
    const dispatch = useDispatch();
    const allAlbums = useSelector(albumsSelectors.selectAll)
    const onDelete = useCallback((id) => dispatch(deleteAlbum(id)), [])
    const onCreateAlbum = useCallback((myData) => dispatch(createAlbum(myData)),[]); 
    const onUpdateAlbum = useCallback((myData) => dispatch(updateAlbum(myData)),[]); 

    const [albumslist, setAlbumlist] = useState();
    const formik = useFormik({
        initialValues: {
           id: '',
           name: 'Personal',
           owner: 'Vergel',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (!isUpdate) {
                createAlbumHandler(values);
            } else {
                onUpdateAlbum(values);
            }
        },
      });
    useEffect(() => {
        dispatch(fetchAlbums())
    
      }, [])
    
    const fetchAlbumsko = async () => {
        const albumsData = await API.graphql(graphqlOperation(listAlbums));
        setAlbumlist(albumsData.data.listAlbums.items);
    }
    const createAlbumHandler = (data) => {
        console.log(data);
        onCreateAlbum(data);
    }
    const updateAlbumHandler = (data) => {
        formik.setFieldValue("id", data.id);
        formik.setFieldValue("name", data.name);
        formik.setFieldValue('owner', data.owner);
    }
    const albumContainer = (data) => {
        return (
            <Grid item xs={12}>
                {console.log(allAlbums)}
                <Grid container justify="flex-start" >
                    {allAlbums?.map((value) => (
                        <Grid key={value.id} sm={4} className="grid-item" item>
                            <Paper>
                                <div>{value.name}</div> 
                                <div>{value.owner}</div>
                                <a  onClick={()=>onDelete(value.id)}>DELETE</a>
                                <div>
                                    <a  onClick={()=>updateAlbumHandler(value)}>UPDATE</a>
                                </div>

                            </Paper>
                        </Grid>
                    ))}
              </Grid>
            </Grid>
        )
    }
      return (
        <div>
          <Button color="primary" onClick={()=>setIsUpdate(!isUpdate)}>{isUpdate ? "UPDATE" : "CREATE"} </Button>
          {isUpdate}
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="id"
              name="id"
              label="id"
              value={formik.values.id}
              onChange={formik.handleChange}
              error={formik.touched.id && Boolean(formik.errors.id)}
              helperText={formik.touched.id && formik.errors.id}
            />
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
           <Button type="submit" color="primary">SUBMIT</Button>
          </form>
          <div className="grid-container">
            {albumContainer(albumslist)}
          </div>
        </div>
      );
};

export default Albums;