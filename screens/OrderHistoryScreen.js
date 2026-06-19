import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function OrderHistoryScreen() {
  const mockOrders = [
    { id: '1', date: 'Oct 12, 2023', status: 'Delivered', items: '2x Maggi, 1x Coke', total: '₹55' },
    { id: '2', date: 'Oct 10, 2023', status: 'Delivered', items: '1x Notebook, 2x Pens', total: '₹120' },
    { id: '3', date: 'Oct 05, 2023', status: 'Cancelled', items: '3x Lays', total: '₹60' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Order History</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {mockOrders.map((order) => (
            <View key={order.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.orderDate}>{order.date}</Text>
                <View style={[
                  styles.statusBadge, 
                  order.status === 'Cancelled' ? styles.statusBadgeCancelled : null
                ]}>
                  <Text style={[
                    styles.statusBadgeText,
                    order.status === 'Cancelled' ? styles.statusBadgeTextCancelled : null
                  ]}>
                    {order.status}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.orderItems}>{order.items}</Text>
              
              <View style={styles.divider} />
              
              <View style={styles.cardFooter}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{order.total}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F8F9FD',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E9',
  },
  headerTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 24,
    color: '#111114',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E4E9',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderDate: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: '#111114',
  },
  statusBadge: {
    backgroundColor: '#C8F322',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  statusBadgeCancelled: {
    backgroundColor: '#FFE4E4',
  },
  statusBadgeText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
    color: '#3D4D00',
  },
  statusBadgeTextCancelled: {
    color: '#D00000',
  },
  orderItems: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#71717A',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E4E4E9',
    marginVertical: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: '#71717A',
  },
  totalValue: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 18,
    color: '#111114',
  },
});
