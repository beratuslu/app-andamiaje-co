import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import _filter from 'lodash/filter';

import LotesList from '../native/components/lotes/LotesList';
import LotesGrid from '../native/components/lotes/LotesGrid';
import CatalogoViewControl from '../native/components/catalogos/CatalogoViewControl';

import { getLotes, setError as setLotesError } from '../actions/lotesActions';
import { getObras, setError as setObrasError } from '../actions/obrasActions';
import { getCatalogos, setError as setCatalogosError } from '../actions/catalogosActions';

class LotesContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func,
    lotes: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      lotes: PropTypes.array.isRequired,
    }).isRequired,
    obras: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      obras: PropTypes.array.isRequired,
    }).isRequired,
    catalogos: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      activeCatalogo: PropTypes.object.isRequired,
    }).isRequired,
    viewSettings: PropTypes.object.isRequired,
    getLotes: PropTypes.func.isRequired,
    setLotesError: PropTypes.func.isRequired,
    getObras: PropTypes.func.isRequired,
    setObrasError: PropTypes.func.isRequired,
    getCatalogos: PropTypes.func.isRequired,
    setCatalogosError: PropTypes.func.isRequired,
    includeObras: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    if (this.props.includeObras) {
      this.fetchLotesObrasAndCatalogos();
    } else {
      this.fetchLotes();
    }
  }

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchLotesObrasAndCatalogos = () => {
    return this.props.getLotes()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setLotesError(err);
      })
      .then(this.props.getObras)
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setObrasError(err);
      })
      .then(this.props.getCatalogos)
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setCatalogosError(err);
      });

  }

  fetchLotes = () => {
    return this.props.getLotes()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setLotesError(err);
      });

  }

  applyFilter = (lotes) => {
    let filteredLotes = lotes;
    const filterLotesBy = this.props.viewSettings.filterBy;

    if (filterLotesBy !== '' && filterLotesBy !== undefined && filterLotesBy !== null) {
      filteredLotes = _filter(lotes, lote => lote.tecnica.includes(filterLotesBy) );
    }

    return filteredLotes;
  }

  applyOrder = (lotes) => {
    const orderLotesBy = this.props.viewSettings.orderBy;

    switch (orderLotesBy) {
      case 'artist-az': {
        const orderedLotes = orderBy(lotes, lote => lote.artista.name, 'asc');
        return orderedLotes;
      }
      case 'artist-za': {
        const orderedLotes = orderBy(lotes, lote => lote.artista.name, 'desc');
        return orderedLotes;
      }
      case 'price-asc': {
        const orderedLotes = orderBy(lotes, lote => lote.price, 'asc');
        return orderedLotes;
      }
      case 'price-desc': {
        const orderedLotes = orderBy(lotes, lote => lote.price, 'desc');
        return orderedLotes;
      }
      case '': {
        return lotes;
      }
      default: {
        return lotes;
      }
    }
  }

  returnLotesLayout = () => {
    const { error, loading, lotes } = this.props.lotes;
    const { grid } = this.props.viewSettings;

    const orderedLotes = this.applyOrder(lotes);
    const orderedFilteredLotes = this.applyFilter(orderedLotes);

    if (orderedFilteredLotes.length) {
      if (grid) {
        return (
          <LotesGrid
            error={error}
            loading={loading}
            lotes={orderedFilteredLotes}
            orderBy={orderBy}
            reFetch={() => this.fetchLotes()}
          />
        );
      }
      return (
        <LotesList
          error={error}
          loading={loading}
          lotes={orderedFilteredLotes}
          orderBy={orderBy}
          reFetch={() => this.fetchLotes()}
        />
      );
    } else {
      return (
        <View style={[
          styles.container,
          styles.flexCenter,
          styles.emptyItemsHeight,
        ]}>
          <Text style={[
            styles.textAlignCenter
          ]}>No hay lotes con esa técnica</Text>
        </View>
      )
    }
  }

  render = () => {
    const { viewSettings, Layout, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    if (id !== null) {
      const { obras } = this.props.obras;
      const { lotes } = this.props.lotes;
      const { activeCatalogo, countdown } = this.props.catalogos;

      const loading = this.props.lotes.loading || this.props.obras.loading || this.props.catalogos.loading ? true : false;

      let error = null;

      if(this.props.lotes.error !== null) {
        error = this.props.lotes.error;
      }

      if(this.props.obras.error !== null) {
        error = this.props.obras.error;
      }

      if(this.props.catalogos.error !== null) {
        error = this.props.catalogos.error;
      }

      const lote = lotes.find(item => item.id === id);

      return (
        <Layout
          lote={lote}
          obras={obras}
          activeCatalogo={activeCatalogo}
          countdown={countdown}
          loading={loading}
          error={error}
          reFetch={() => this.fetchLotesObrasAndCatalogos()}
        />
      );
    }

    return (
      <View>
        <CatalogoViewControl
          viewSettings={viewSettings}
        />
        {this.returnLotesLayout()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  lotes: state.lotes || {},
  viewSettings: state.catalogos.viewSettings || {},
  obras: state.obras || [],
  catalogos: state.catalogos || {},
});

const mapDispatchToProps = {
  getLotes,
  setLotesError,
  getObras,
  setObrasError,
  getCatalogos,
  setCatalogosError,
};

export default connect(mapStateToProps, mapDispatchToProps)(LotesContainer);
