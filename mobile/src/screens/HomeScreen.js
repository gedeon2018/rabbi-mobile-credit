import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { creditService } from '../services/creditService';
import { transactionService } from '../services/transactionService';
import BalanceCard from '../components/BalanceCard';
import TransactionCard from '../components/TransactionCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [balanceRes, transactionsRes] = await Promise.all([
        creditService.getBalance(),
        transactionService.getTransactions(1),
      ]);

      if (balanceRes.success) {
        setBalance(balanceRes.data);
      }

      if (transactionsRes.success) {
        setTransactions(transactionsRes.data.transactions.slice(0, 5));
      }
    } catch (error) {
      console.error('Erreur chargement données:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bonjour,</Text>
          <Text style={styles.userName}>{user?.prenom} {user?.nom}</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Icon name="logout" size={24} color="#F44336" />
        </TouchableOpacity>
      </View>

      <BalanceCard
        solde={balance?.solde || 0}
        stockCredits={balance?.stockCredits || 0}
      />

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Purchase')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
            <Icon name="phone-plus" size={32} color="#1E88E5" />
          </View>
          <Text style={styles.actionText}>Acheter du crédit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('History')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
            <Icon name="history" size={32} color="#43A047" />
          </View>
          <Text style={styles.actionText}>Historique</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transactions récentes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('History')}>
            <Text style={styles.seeAll}>Tout voir</Text>
          </TouchableOpacity>
        </View>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionCard
              key={transaction._id}
              transaction={transaction}
              onPress={() => navigation.navigate('TransactionDetail', { transaction })}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>Aucune transaction</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  recentSection: {
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#1E88E5',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    padding: 40,
    fontSize: 16,
  },
});

export default HomeScreen;
