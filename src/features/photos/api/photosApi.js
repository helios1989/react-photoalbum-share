import {listPhotos} from '../../../graphql/queries';
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createPhoto, deletePhoto, updatePhoto } from '../../../graphql/mutations';

export const   fetchPhotoApi = () => { return API.graphql(graphqlOperation(listPhotos))};
export const   deletePhotoApi = (myId) => {
    return API.graphql(graphqlOperation(deletePhoto, {input: {'id': myId}}))
}
export const createPhotoApi = (myData) => API.graphql(graphqlOperation(createPhoto, {input: myData}))
export const updatePhotoApi = (myData) => API.graphql(graphqlOperation(updatePhoto, {input: myData}))