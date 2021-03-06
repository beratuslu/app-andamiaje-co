import { Firebase, FirebaseRef } from '../lib/firebase';
import { updateCountdown } from './countdownActions';

/**
 * Set an Error Message
 */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'CATALOGOS_ERROR',
    data: message,
  })));
}

/**
 * Get Catalogos
 */
export function getCatalogos() {
  if (Firebase === null) {
    return () => new Promise(resolve => resolve());
  }

  return dispatch => new Promise(resolve => FirebaseRef.child('catalogos').orderByChild('startDate')
    .on('value', (snapshot) => {
      const catalogos = snapshot.val() || {};

      dispatch({
        type: 'CATALOGOS_REPLACE',
        data: catalogos,
      });

      dispatch(updateCountdown);

      return resolve();
    }))
    .catch(e => console.log(e));
}

/**
 * Change Catalogo Layout Setting
 */
export function changeCatalogoLayout(grid) {
  return dispatch => dispatch({
    type: 'CHANGE_CATALOGO_LAYOUT',
    grid,
  });
}

/*
 * Change Catalogo Ordering
 */
export function changeCatalogoOrder(order) {
  return dispatch => dispatch({
    type: 'CHANGE_CATALOGO_ORDER',
    order,
  });
}

/*
 * Change Catalogo Filtering
 */
export function changeCatalogoFilter(tecnica) {
  return dispatch => dispatch({
    type: 'CHANGE_CATALOGO_FILTER',
    tecnica,
  });
}
