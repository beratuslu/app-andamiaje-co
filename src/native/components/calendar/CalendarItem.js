import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View } from 'react-native';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import styles from '../../constants/styles';

const CalendarItem = ({item}) => (
  <View style={[ styles.container, styles.calendarItem ]}>
    <Text style={[ styles.calendarLabel, styles.fontBold ]}>{item.label}</Text>
    <View style={styles.calendarDate}>
      <Text style={[ styles.fontBold, styles.textAlignCenter, styles.colorWhite, styles.fontSizeLarge ]}>{format(item.date, 'DD')}</Text>
      <Text style={[ styles.fontBold, styles.textAlignCenter, styles.colorWhite, styles.fontSizeSmall ]}>{format(item.date, 'MMMM', { locale: es }).toUpperCase()}</Text>
    </View>
  </View>
);

export default CalendarItem;
