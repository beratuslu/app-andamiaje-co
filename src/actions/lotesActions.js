import { Firebase, FirebaseRef } from '../lib/firebase';

/**
 * Set an Error Message
 */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'LOTES_ERROR',
    data: message,
  })));
}

/**
 * Get Lotes
 */
export function getLotes() {
  if (Firebase === null) {
    return () => new Promise(resolve => resolve());
  }

  return (dispatch, getState) => {
    // Get active lotes from store state
    const activeLotes = getState().catalogos.activeCatalogo.lotes;

    if(activeLotes === undefined) {
      resolve => resolve();
    }

    return new Promise(resolve => FirebaseRef.child('lotes').orderByChild('title')
      .on('value', (snapshot) => {
        const lotes = snapshot.val() || {};

        return resolve(dispatch({
          type: 'LOTES_REPLACE',
          data: lotes,
          activeLotes, // pass activeLotes to loteReducer as action.activeLotes
        }));
      })).catch(e => console.log(e));
  }
}
