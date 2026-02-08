import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TransactionCard = ({ transaction, onPress }) => {
  const getStatusColor = (statut) => {
    switch (statut) {
      case 'reussi':
        return '#4CAF50';
      case 'echoue':
        return '#F44336';
      case 'en_attente':
        return '#FF9800';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusText = (statut) => {
    switch (statut) {
      case 'reussi':
        return 'Réussi';
      case 'echoue':
        return 'Échoué';
      case 'en_attente':
        return 'En attente';
      case 'annule':
        return 'Annulé';
      default:
        return statut;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'achat_credit':
        return 'phone';
      case 'depot':
        return 'arrow-down-circle';
      case 'retrait':
        return 'arrow-up-circle';
      default:
        return 'swap-horizontal';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(transaction)}>
      <View style={styles.leftSection}>
        <View style={[styles.iconContainer, { backgroundColor: getStatusColor(transaction.statut) + '20' }]}>
          <Icon
            name={getTypeIcon(transaction.type)}
            size={24}
            color={getStatusColor(transaction.statut)}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.operateur}>{transaction.operateur}</Text>
          <Text style={styles.numero}>{transaction.numeroTelephone}</Text>
          <Text style={styles.date}>{formatDate(transaction.dateTransaction)}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.montant}>{transaction.montant} FCFA</Text>
        <View style={[styles.statutBadge, { backgroundColor: getStatusColor(transaction.statut) }]}>
          <Text style={styles.statutText}>{getStatusText(transaction.statut)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  operateur: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  numero: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  montant: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  statutBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statutText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
});

export default TransactionCard;
