import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BalanceCard = ({ solde, stockCredits }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Icon name="wallet" size={32} color="#1E88E5" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Solde disponible</Text>
          <Text style={styles.value}>{solde?.toLocaleString('fr-FR')} FCFA</Text>
        </View>
      </View>
      
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Icon name="package-variant" size={32} color="#43A047" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Stock de crédits</Text>
          <Text style={styles.value}>{stockCredits?.toLocaleString('fr-FR')} FCFA</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    margin: 4,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
});

export default BalanceCard;
