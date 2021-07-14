// A mock function to mimic making an async request for data
// export function fetchCount(amount = 1) {
//     return new Promise((resolve) =>
//       setTimeout(() => resolve({ data: amount }), 500)
//     );
// }
import {listAlbums} from '../../../graphql/queries';
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createAlbum, deleteAlbum, updateAlbum } from '../../../graphql/mutations';

export const   fetchAlbumApi = () => { return API.graphql(graphqlOperation(listAlbums))};
export const   deleteAlbumApi = (myId) => {
    return API.graphql(graphqlOperation(deleteAlbum, {input: {'id': myId}}))
}
export const createAlbumApi = (myData) => API.graphql(graphqlOperation(createAlbum, {input: myData}))
export const updateAlbumAPi = (myData) => API.graphql(graphqlOperation(updateAlbum, {input: myData}))