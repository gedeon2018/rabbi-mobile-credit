import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const OperatorButton = ({ operator, onPress, selected }) => {
  const operatorConfig = {
    MTN: { icon: 'cellphone', color: '#FFD700' },
    Orange: { icon: 'cellphone', color: '#FF6600' },
    Moov: { icon: 'cellphone', color: '#009DDC' },
    Vodacom: { icon: 'cellphone', color: '#E60000' },
    Airtel: { icon: 'cellphone', color: '#FF0000' },
  };

  const config = operatorConfig[operator.code] || { icon: 'cellphone', color: '#666' };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.selected,
        { borderColor: config.color },
      ]}
      onPress={() => onPress(operator)}
    >
      <Icon name={config.icon} size={40} color={config.color} />
      <Text style={styles.name}>{operator.nom}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '30%',
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#fff',
  },
  selected: {
    backgroundColor: '#E3F2FD',
    borderWidth: 3,
  },
  name: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default OperatorButton;
