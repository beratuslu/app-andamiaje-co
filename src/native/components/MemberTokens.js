import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from '../constants/styles';

class MemberTokens extends Component {
  constructor(props) {
    super(props)
  }

  render = () => {
  	const {miembros, member } = this.props;

    // check if logged in member is Miembro
    const currentMiembro = miembros.find(miembro => miembro.id === member.uid);

    if (currentMiembro !== undefined && currentMiembro !== null) {
      return (
        <View style={[
          styles.container,
        ]}><Text style={[
          styles.fontSizeSmall,
          styles.fontFamilyMedium,
        ]}>ŧ 15</Text></View>
      )
    }

    return (
      <View></View>
    )
  }
}

const mapStateToProps = state => ({
  miembros: state.miembros.miembros || {},
  member: state.member || {},
});

export default connect(mapStateToProps, null)(MemberTokens);
