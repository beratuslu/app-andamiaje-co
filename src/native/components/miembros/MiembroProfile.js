import React from 'react';
import { ScrollView, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import DraftContentRenderer from '../DraftContentRenderer';
import { Actions } from 'react-native-router-flux';
import { getResizedImageUrl } from '../../../lib/utilities';
import MiembroCollection from './MiembroCollection';

import styles from '../../constants/styles';

const MiembroProfile = ({
  miembros,
  miembroId,
  member,
}) => {
  // Get this miembro from all miembros
  let miembro = null;

  if (miembroId && miembros) {
    miembro = miembros.find(item => item.id === miembroId);
  }

  const {
    displayName,
    images,
    collection,
  } = miembro;

  let imageSource = require('../../../images/placeholder.png');

  if (images !== undefined) {
    imageSource = { uri: getResizedImageUrl(images[0], 350, true) };
  }

  const renderOptionsButton = () => {
    if (miembroId === member.uid) {
      return (
        <TouchableOpacity
          onPress={() => { Actions.options(); }}
          style={[
          styles.container,
          styles.flexCenter,
          {
            height: 30,
          },
        ]}
        >
          <Image source={require('../../../images/icons/icon-dots-white.png')} style={{ width: 4.5, height: 17.5 }} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  const collectionLength = collection !== undefined && collection !== {} ? Object.keys(collection).length : 0;
  const collectionLengthString = collectionLength === 1 ? '1 obra' : `${collectionLength.toString()} obras`;

  return (
    <ScrollView style={[styles.backgroundWhite]}>
      <View style={[
        styles.container,
        styles.bordered,
        styles.flexRow,
        styles.paddingTopBasic,
        styles.paddingBottomBasic,
      ]}
      >
        <View>
          <Image source={imageSource} style={[styles.profileAvatarImage]} />
        </View>
        <View style={[styles.profileHeaderTextHolder]}>
          { displayName !== undefined &&
          <View style={[styles.paddingBottomSmall]}><Text style={[styles.fontBold, styles.fontSizeMid]}>{displayName}</Text></View>
          }
          <Text style={[styles.fontSizeSmall]}>Colección de {collectionLengthString}</Text>
        </View>
        {renderOptionsButton()}
      </View>
      <MiembroCollection miembroId={miembroId} memberId={member.uid} collection={collection} />
    </ScrollView>
  );
};

MiembroProfile.propTypes = {
  error: PropTypes.string,
  miembroId: PropTypes.string.isRequired,
  miembros: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  member: PropTypes.object.isRequired,
};

MiembroProfile.defaultProps = {
  error: null,
};

export default MiembroProfile;
