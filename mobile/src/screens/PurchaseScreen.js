import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { creditService } from '../services/creditService';
import OperatorButton from '../components/OperatorButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PurchaseScreen = ({ navigation }) => {
  const [operators, setOperators] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOperators();
  }, []);

  const loadOperators = async () => {
    try {
      const response = await creditService.getOperators();
      if (response.success) {
        setOperators(response.data);
      }
    } catch (error) {
      Alert.alert('Erreur', error.message);
    }
  };

  const handlePurchase = async () => {
    if (!selectedOperator) {
      Alert.alert('Erreur', 'Veuillez sélectionner un opérateur');
      return;
    }

    if (!phoneNumber || phoneNumber.length < 9) {
      Alert.alert('Erreur', 'Numéro de téléphone invalide');
      return;
    }

    if (!amount || parseInt(amount) < 500) {
      Alert.alert('Erreur', 'Montant minimum : 500 FCFA');
      return;
    }

    setLoading(true);
    try {
      const response = await creditService.purchaseCredit(
        parseInt(amount),
        phoneNumber,
        selectedOperator.code
      );

      if (response.success) {
        Alert.alert(
          'Succès',
          'Crédit acheté avec succès !',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert('Erreur', response.message);
      }
    } catch (error) {
      Alert.alert('Erreur', error.message);
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sélectionnez l'opérateur</Text>
        <View style={styles.operatorsContainer}>
          {operators.map((operator) => (
            <OperatorButton
              key={operator.code}
              operator={operator}
              selected={selectedOperator?.code === operator.code}
              onPress={setSelectedOperator}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Numéro de téléphone</Text>
        <View style={styles.inputContainer}>
          <Icon name="phone" size={24} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Ex: 0812345678"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={10}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Montant rapide</Text>
        <View style={styles.quickAmountsContainer}>
          {quickAmounts.map((quickAmount) => (
            <TouchableOpacity
              key={quickAmount}
              style={[
                styles.quickAmountButton,
                amount === quickAmount.toString() && styles.quickAmountSelected,
              ]}
              onPress={() => setAmount(quickAmount.toString())}
            >
              <Text
                style={[
                  styles.quickAmountText,
                  amount === quickAmount.toString() && styles.quickAmountTextSelected,
                ]}
              >
                {quickAmount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Montant personnalisé</Text>
        <View style={styles.inputContainer}>
          <Icon name="currency-usd" size={24} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Montant en FCFA"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.purchaseButton, loading && styles.purchaseButtonDisabled]}
        onPress={handlePurchase}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Icon name="credit-card" size={24} color="#fff" />
            <Text style={styles.purchaseButtonText}>Acheter le crédit</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  operatorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    color: '#333',
  },
  quickAmountsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    width: '18%',
    aspectRatio: 1.5,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  quickAmountSelected: {
    backgroundColor: '#1E88E5',
    borderColor: '#1E88E5',
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  quickAmountTextSelected: {
    color: '#fff',
  },
  purchaseButton: {
    flexDirection: 'row',
    backgroundColor: '#1E88E5',
    margin: 16,
    padding: 18,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1E88E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  purchaseButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
});

export default PurchaseScreen;
