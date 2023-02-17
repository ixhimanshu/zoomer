/**
 * loof - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import colors
import Colors from '../../theme/colors';

// Icon Config
const ICON_COLOR = Colors.black;
const ICON_SIZE = 22;

// Icon Styles
const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    textAlign: 'center',
  },
});

// Icon Props
type Props = {
  color: string,
  name: string,
  size: number,
};

// Icon
const MaterialIcon = ({color = ICON_COLOR, name, size = ICON_SIZE}: Props) => {
  const iconSize = Platform.OS === 'ios' ? size + 2 : size;

  return (
    <Icon
      name={name}
      color={color}
      size={iconSize}
      style={[
        {
          height: iconSize,
          width: iconSize,
        },
        styles.icon,
      ]}
    />
  );
};

export default MaterialIcon;
