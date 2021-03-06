import Store from '../store/countdown';

export const initialState = Store;

export default function countdownReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_COUNTDOWN': {
      const currentTime = Date.now();
      const activeCatalogo = action.activeCatalogo;

      const oneDay = 86400000;
      const countdownBeforeSale = oneDay * 5;
      const timeUntilSale = activeCatalogo.saleDate - currentTime;

      const saleSoon = !!((timeUntilSale < countdownBeforeSale) && (currentTime < activeCatalogo.saleDate));

      const saleStarted = !!((currentTime > activeCatalogo.saleDate) && (currentTime < activeCatalogo.endDate));

      const saleEnded = !!((currentTime > activeCatalogo.endDate) && (currentTime < oneDay + activeCatalogo.endDate));

      return {
        ...state,
        currentTime,
        saleSoon,
        saleStarted,
        saleEnded,
      };
    }

    case 'START_NOTICIAS_COUNTDOWN': {
      return {
        ...state,
        noticiasCountdown: true,
      };
    }

    case 'STOP_NOTICIAS_COUNTDOWN': {
      return {
        ...state,
        noticiasCountdown: false,
      };
    }

    case 'START_CATALOGOS_COUNTDOWN': {
      return {
        ...state,
        catalogosCountdown: true,
      };
    }

    case 'STOP_CATALOGOS_COUNTDOWN': {
      return {
        ...state,
        catalogosCountdown: false,
      };
    }

    case 'START_WISHLIST_COUNTDOWN': {
      return {
        ...state,
        wishlistCountdown: true,
      };
    }

    case 'STOP_WISHLIST_COUNTDOWN': {
      return {
        ...state,
        wishlistCountdown: false,
      };
    }

    case 'START_ARTISTA_COUNTDOWN': {
      return {
        ...state,
        artistaCountdown: true,
      };
    }

    case 'STOP_ARTISTA_COUNTDOWN': {
      return {
        ...state,
        artistaCountdown: false,
      };
    }

    case 'START_LOTE_COUNTDOWN': {
      return {
        ...state,
        loteCountdown: true,
      };
    }

    case 'STOP_LOTE_COUNTDOWN': {
      return {
        ...state,
        loteCountdown: false,
      };
    }

    default:
      return state;
  }
}

