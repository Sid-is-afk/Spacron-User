import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const { cartItems, handleRemoveItem, updateItemQuantity, totalItemCost } = useCart();
  
  const gigReward = 0;
  const totalCost = totalItemCost + gigReward;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cart</Text>
        </View>

        {/* Scrollable Content Area */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {cartItems.length > 0 ? (
            <>
              {/* Cart Items List */}
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Cart Items</Text>
                {cartItems.map((item) => (
                  <View key={item.id} style={styles.cartItemRow}>
                    <View style={styles.cartItemInfo}>
                      <Text style={styles.cartItemName}>{item.name}</Text>
                      <Text style={styles.cartItemShop}>Store: {item.shop || 'Any Store'}</Text>
                      <Text style={styles.cartItemCost}>₹{item.cost * (item.quantity || 1)}</Text>
                    </View>
                    
                    <View style={styles.actionContainer}>
                      {/* Quantity Stepper */}
                      <View style={styles.stepperContainer}>
                        <TouchableOpacity
                          style={styles.stepperButton}
                          onPress={() => updateItemQuantity(item.id, (item.quantity || 1) - 1)}
                        >
                          <MaterialIcons name="remove" size={16} color="#111114" />
                        </TouchableOpacity>
                        <Text style={styles.stepperValue}>{item.quantity || 1}</Text>
                        <TouchableOpacity
                          style={styles.stepperButton}
                          onPress={() => updateItemQuantity(item.id, (item.quantity || 1) + 1)}
                        >
                          <MaterialIcons name="add" size={16} color="#111114" />
                        </TouchableOpacity>
                      </View>

                      {/* Remove Button */}
                      <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
                        <MaterialIcons name="delete" size={20} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>

              {/* Cost Calculation Card */}
              <View style={styles.card}>
                <View style={styles.costRow}>
                  <Text style={styles.costLabel}>Estimated Item Cost</Text>
                  <Text style={styles.costValue}>₹{totalItemCost}</Text>
                </View>
                <View style={styles.costRow}>
                  <Text style={styles.costLabel}>Gig Reward</Text>
                  <View style={styles.rewardBadge}>
                    <Text style={styles.rewardBadgeText}>₹{gigReward}</Text>
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.costRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>₹{totalCost}</Text>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="shopping-cart" size={64} color="#E4E4E9" />
              <Text style={styles.emptyTitle}>Your cart is empty</Text>
              <Text style={styles.emptySubtitle}>Items you add will appear here.</Text>
            </View>
          )}
        </ScrollView>

        {/* Sticky Bottom Action Area */}
        {cartItems.length > 0 && (
          <View style={styles.bottomArea}>
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit Request</Text>
              <MaterialIcons name="arrow-forward" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
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
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F9FD',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E9',
    zIndex: 10,
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
    paddingBottom: 100, // Space for sticky bottom action area
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E4E9',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    color: '#111114',
    marginBottom: 12,
  },
  cartItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5',
  },
  cartItemInfo: {
    flex: 1,
    paddingRight: 12,
  },
  cartItemName: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: '#111114',
    marginBottom: 2,
  },
  cartItemShop: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: '#71717A',
    marginBottom: 4,
  },
  cartItemCost: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: '#71717A',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FD',
    borderWidth: 1,
    borderColor: '#E4E4E9',
    borderRadius: 9999,
  },
  stepperButton: {
    padding: 8,
  },
  stepperValue: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: '#111114',
    paddingHorizontal: 8,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    padding: 4,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  costLabel: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#71717A',
  },
  costValue: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: '#111114',
  },
  rewardBadge: {
    backgroundColor: '#C8F322',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  rewardBadgeText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
    color: '#3D4D00',
  },
  divider: {
    height: 1,
    backgroundColor: '#E4E4E9',
    marginVertical: 16,
  },
  totalLabel: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: '#111114',
  },
  totalValue: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 32,
    color: '#111114',
  },
  bottomArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: 'rgba(248, 249, 253, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(228, 228, 233, 0.5)',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5D3EFF',
    height: 56,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#5D3EFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  submitButtonText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    color: '#111114',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#71717A',
    textAlign: 'center',
  },
});
