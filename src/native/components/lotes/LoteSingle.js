import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, TouchableOpacity, RefreshControl, Image, View, Text } from 'react-native';

import Loading from '../Loading';
import Error from '../Error';
import Spacer from '../Spacer';

import LoteSingleObra from './LoteSingleObra';
import LoteHeader from './LoteHeader';
import CountdownTitle from '../countdown/CountdownTitle';
import CountdownClock from '../countdown/CountdownClock';
import BuyButton from '../BuyButton';
import Toast from '../Toast';

const LoteSingle = ({
  lote,
  obras,
  activeCatalogo,
  countdown,
  error,
  loading,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const loteObras = obras.filter(obra => lote.obras.some(loteObra => loteObra.id === obra.id));

  const {
    saleSoon,
    saleStarted,
    saleEnded,
    loteCountdown,
  } = countdown;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        stickyHeaderIndices={saleSoon || saleStarted ? [1] : [0]}
        contentContainerStyle={[
        styles.backgroundWhite,
        styles.paddingBottomLarge,
      ]}
      >

        { loteCountdown && (saleSoon || saleStarted || saleEnded) &&
        <CountdownTitle title={activeCatalogo.title} saleStarted={saleStarted} saleEnded={saleEnded} />
      }
        { loteCountdown && saleSoon &&
        <CountdownClock countdownTo={activeCatalogo.saleDate} />
      }
        { loteCountdown && saleStarted &&
        <CountdownClock countdownTo={activeCatalogo.endDate} />
      }

        <LoteHeader lote={lote} />
        <View>
          {loteObras.map((item, key) => {
            let border = true;
            if (key >= (loteObras.length - 1)) {
              border = false;
            }
            return (
              <LoteSingleObra key={key} obra={item} border={border} />
            );
          })}
        </View>

        <BuyButton lote={lote} />
      </ScrollView>
      <Toast />
    </View>
  );
};

LoteSingle.propTypes = {
  lote: PropTypes.object.isRequired,
  obras: PropTypes.array.isRequired,
  activeCatalogo: PropTypes.object.isRequired,
  countdown: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default LoteSingle;
