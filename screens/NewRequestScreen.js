import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function NewRequestScreen() {
  const [selectedShop, setSelectedShop] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemCost, setItemCost] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [category, setCategory] = useState('Grocery & Essentials');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categories = ['Grocery & Essentials', 'Food', 'Fragile Item', 'Print out', 'Stationary', 'Medicines'];

  const handleAddItem = () => {
    if (itemName.trim() && itemCost.trim()) {
      setCartItems([...cartItems, { id: Date.now().toString(), name: itemName.trim(), cost: parseFloat(itemCost) || 0 }]);
      setItemName('');
      setItemCost('');
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalItemCost = cartItems.reduce((sum, item) => sum + item.cost, 0);
  const gigReward = 0;
  const totalCost = totalItemCost + gigReward;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="menu" size={24} color="#111114" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Spacron</Text>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100?img=12' }}
            style={styles.avatar}
          />
        </View>

        {/* Scrollable Content Area */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Screen Title */}
          <View style={styles.titleSection}>
            <Text style={styles.pageTitle}>New Request</Text>
            <Text style={styles.pageSubtitle}>Fill out the details for your gig.</Text>
          </View>

          {/* Input Card */}
          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Item Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 1 packet of Maggi"
                placeholderTextColor="#71717A"
                value={itemName}
                onChangeText={setItemName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Estimated Cost (₹)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 50"
                placeholderTextColor="#71717A"
                value={itemCost}
                onChangeText={setItemCost}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <Text style={styles.dropdownText}>{category}</Text>
                <MaterialIcons name={isCategoryOpen ? "expand-less" : "expand-more"} size={24} color="#71717A" />
              </TouchableOpacity>

              {isCategoryOpen && (
                <View style={styles.dropdownMenu}>
                  {categories.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.dropdownMenuItem}
                      onPress={() => {
                        setCategory(item);
                        setIsCategoryOpen(false);
                      }}
                    >
                      <Text style={[
                        styles.dropdownMenuItemText,
                        category === item && styles.dropdownMenuItemTextActive
                      ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred Shop</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Gaytri Stores"
                placeholderTextColor="#71717A"
                value={selectedShop}
                onChangeText={setSelectedShop}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Shop Location</Text>
              <View style={styles.mapContainer}>
                {Platform.OS === 'web' ? (
                  <iframe 
                    src="https://maps.google.com/maps?q=supermarket&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy"
                    title="Google Maps"
                  />
                ) : (
                  <View style={styles.mapPlaceholder}>
                    <MaterialIcons name="location-on" size={48} color="#E4E4E9" />
                    <Text style={styles.mapPlaceholderText}>Map view</Text>
                  </View>
                )}
                {/* Center Pin Overlay */}
                <View style={styles.mapOverlay} pointerEvents="none">
                  <MaterialIcons name="location-pin" size={40} color="#EF4444" style={styles.mapPin} />
                </View>
              </View>
              <TouchableOpacity style={styles.mapSelectButton}>
                <MaterialIcons name="my-location" size={20} color="#5D3EFF" />
                <Text style={styles.mapSelectButtonText}>Set Exact Location</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Cart Card */}
          {cartItems.length > 0 && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Cart Items</Text>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItemRow}>
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <Text style={styles.cartItemCost}>₹{item.cost}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                    <MaterialIcons name="close" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

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
        </ScrollView>

        {/* Sticky Bottom Action Area */}
        <View style={styles.bottomArea}>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Request</Text>
            <MaterialIcons name="arrow-forward" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    // Bottom Tab navigator usually handles padding, but we'll leave this to prevent jumps
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F9FD',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E9',
    zIndex: 10,
  },
  iconButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 28,
    color: '#5D3EFF',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E4E4E9',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Space for sticky bottom action area
  },
  titleSection: {
    marginBottom: 24,
    marginTop: 8,
  },
  pageTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 24,
    color: '#111114',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#71717A',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E4E9',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: '#111114',
    marginBottom: 8,
  },
  textInput: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#111114',
    backgroundColor: '#F8F9FD',
    borderWidth: 1,
    borderColor: '#E4E4E9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  addButton: {
    backgroundColor: '#E4DFFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  addButtonText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: '#5D3EFF',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
  },
  cartItemName: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: '#111114',
  },
  cartItemCost: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: '#71717A',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FD',
    borderWidth: 1,
    borderColor: '#E4E4E9',
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  stepperButton: {
    padding: 12,
  },
  stepperValue: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    color: '#111114',
    paddingHorizontal: 16,
    minWidth: 40,
    textAlign: 'center',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FD',
    borderWidth: 1,
    borderColor: '#E4E4E9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#111114',
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E4E9',
    borderRadius: 12,
    marginTop: 8,
    paddingVertical: 8,
    shadowColor: '#111114',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  dropdownMenuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownMenuItemText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#71717A',
  },
  dropdownMenuItemTextActive: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#5D3EFF',
  },
  shopScrollContent: {
    gap: 8,
  },
  shopPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#E4E4E9',
    backgroundColor: '#FFFFFF',
  },
  shopPillActive: {
    backgroundColor: '#E4DFFF',
    borderColor: '#5D3EFF',
  },
  shopPillText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: '#71717A',
  },
  shopPillTextActive: {
    color: '#3D00DD',
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
  mapContainer: {
    height: 200,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E4E4E9',
    backgroundColor: '#F4F4F5',
    position: 'relative',
    marginBottom: 12,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: '#71717A',
    marginTop: 8,
  },
  mapSelectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E4DFFF',
    backgroundColor: '#F8F6FF',
    borderRadius: 12,
    gap: 8,
  },
  mapSelectButtonText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: '#5D3EFF',
  },
  mapOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -40,
  },
  mapPin: {
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
