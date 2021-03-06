import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Loading from '../Loading';
import Error from '../Error';

import LotesListItem from './LotesListItem';

const LotesList = ({
  loading,
  error,
  lotes,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  return (
    <FlatList
      numColumns={1}
      data={lotes}
      renderItem={({ item }) => <LotesListItem lote={item} />}
      keyExtractor={keyExtractor}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={reFetch}
        />
      }
    />
  );
};

LotesList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  lotes: PropTypes.array.isRequired,
  reFetch: PropTypes.func,
};

LotesList.defaultProps = {
  error: null,
  reFetch: null,
};

export default LotesList;
