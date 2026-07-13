import React, { useState, useEffect, useRef } from 'react';
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
  Animated,
  PanResponder,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function NewRequestScreen() {
  const { handleAddItem: addCartItem } = useCart();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [selectedShop, setSelectedShop] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemCost, setItemCost] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [category, setCategory] = useState('Grocery & Essentials');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categories = ['Grocery & Essentials', 'Food', 'Fragile Item', 'Stationary', 'Medicines'];

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const pulseAnim = useRef(new Animated.Value(0.3)).current;
  const [itemImage, setItemImage] = useState(null);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;

  useEffect(() => {
    if (!isMapLoaded) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.7,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isMapLoaded]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setItemImage(result.assets[0].uri);
    }
  };

  const simulateVoiceToText = () => {
    setIsListening(true);
    setTimeout(() => {
      setItemName("1 packet of Maggi");
      setIsListening(false);
    }, 2000);
  };

  const handleAddItem = () => {
    const parsedCost = parseFloat(itemCost);

    if (!itemName.trim() || !itemCost.trim() || itemQuantity <= 0 || !selectedShop.trim()) {
      alert('Please fill out all required fields, including the Preferred Shop.');
      return;
    }

    if (isNaN(parsedCost) || parsedCost <= 0) {
      alert('Cost must be a positive value greater than 0.');
      return;
    }

    addCartItem({ 
      name: itemName.trim(), 
      cost: parsedCost, 
      quantity: itemQuantity, 
      shop: selectedShop.trim(),
      image: itemImage 
    });
    setItemName('');
    setItemCost('');
    setItemQuantity(1);
    setSelectedShop('');
    setItemImage(null);
    
    setShowSuccessAnim(true);
    setTimeout(() => setShowSuccessAnim(false), 2500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="menu" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Spacron</Text>
          <View style={styles.avatar}>
            <MaterialIcons name="person" size={24} color={colors.textSecondary} />
          </View>
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
              <View style={styles.textInputWithIcon}>
                <TextInput
                  style={[styles.textInput, { flex: 1, borderWidth: 0 }]}
                  placeholder={isListening ? "Listening..." : "e.g. 1 packet of Maggi"}
                  placeholderTextColor={isListening ? colors.primary : colors.textSecondary}
                  value={itemName}
                  onChangeText={setItemName}
                />
                <TouchableOpacity onPress={simulateVoiceToText} style={styles.micButton}>
                  <MaterialIcons 
                    name="mic" 
                    size={24} 
                    color={isListening ? colors.danger : colors.textSecondary} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Estimated Cost (₹)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 50"
                placeholderTextColor={colors.textSecondary}
                value={itemCost}
                onChangeText={(text) => {
                  const formattedText = text.replace(/[^0-9.]/g, '');
                  setItemCost(formattedText);
                }}
                keyboardType="numeric"
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'flex-start', zIndex: 10 }}>
              <View style={[styles.inputGroup, { marginRight: 16 }]}>
                <Text style={styles.label}>Quantity</Text>
                <View style={styles.stepperContainer}>
                  <TouchableOpacity
                    style={styles.stepperButton}
                    onPress={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                  >
                    <MaterialIcons name="remove" size={20} color={colors.textPrimary} />
                  </TouchableOpacity>
                  <Text style={[styles.stepperValue, { paddingHorizontal: 12, minWidth: 32 }]}>{itemQuantity}</Text>
                  <TouchableOpacity
                    style={styles.stepperButton}
                    onPress={() => setItemQuantity(itemQuantity + 1)}
                  >
                    <MaterialIcons name="add" size={20} color={colors.textPrimary} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.inputGroup, { flex: 1, zIndex: 10 }]}>
                <Text style={styles.label}>Category</Text>
                <View style={{ zIndex: 10 }}>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setIsCategoryOpen(!isCategoryOpen)}
                  >
                    <Text style={[styles.dropdownText, { flex: 1 }]} numberOfLines={1}>{category}</Text>
                    <MaterialIcons name={isCategoryOpen ? "expand-less" : "expand-more"} size={24} color={colors.iconInactive} />
                  </TouchableOpacity>

                  {isCategoryOpen && (
                    <View style={[styles.dropdownMenu, { position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100 }]}>
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
              </View>
            </View>

            <View style={styles.divider} />

            {category === 'Medicines' && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Prescription / Medicine Photo</Text>
                <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                  {itemImage ? (
                    <Image source={{ uri: itemImage }} style={styles.previewImage} />
                  ) : (
                    <>
                      <MaterialIcons name="camera-alt" size={28} color={colors.primary} />
                      <Text style={styles.imagePickerText}>Tap to attach a photo</Text>
                    </>
                  )}
                </TouchableOpacity>
                {itemImage && (
                  <TouchableOpacity style={styles.removeImageButton} onPress={() => setItemImage(null)}>
                    <Text style={styles.removeImageText}>Remove Photo</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred Shop</Text>
              <Text style={styles.inputNote}>If there is no specific store then mention "Any Store".</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Gaytri Stores"
                placeholderTextColor={colors.textSecondary}
                value={selectedShop}
                onChangeText={setSelectedShop}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Shop Location</Text>
              <View style={styles.mapContainer}>
                {!isMapLoaded && Platform.OS === 'web' && (
                  <Animated.View style={[styles.skeletonLoader, { opacity: pulseAnim }]} />
                )}
                {Platform.OS === 'web' ? (
                  <iframe
                    src="https://maps.google.com/maps?q=supermarket&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, opacity: isMapLoaded ? 1 : 0, position: isMapLoaded ? 'relative' : 'absolute' }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Maps"
                    onLoad={() => setIsMapLoaded(true)}
                  />
                ) : (
                  <View style={styles.mapPlaceholder}>
                    <MaterialIcons name="location-on" size={48} color={colors.border} />
                    <Text style={styles.mapPlaceholderText}>Map view</Text>
                  </View>
                )}
                {/* Center Pin Overlay (Draggable) */}
                <Animated.View 
                  style={[
                    styles.mapOverlay, 
                    { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
                    { opacity: isMapLoaded || Platform.OS !== 'web' ? 1 : 0 }
                  ]} 
                  {...panResponder.panHandlers}
                >
                  <MaterialIcons name="location-pin" size={40} color={colors.danger} style={styles.mapPin} />
                </Animated.View>
              </View>
              <TouchableOpacity style={styles.mapSelectButton}>
                <MaterialIcons name="my-location" size={20} color={colors.primary} />
                <Text style={styles.mapSelectButtonText}>Set Exact Location</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Lottie Success Animation Overlay */}
        {showSuccessAnim && (
          <View style={styles.lottieOverlay}>
            <LottieView
              source={require('../assets/success.json')}
              autoPlay
              loop={false}
              style={styles.lottieAnimation}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    zIndex: 10,
  },
  iconButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 28,
    color: colors.primary,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120, // Increased padding for floating button
  },
  titleSection: {
    marginBottom: 24,
    marginTop: 8,
  },
  pageTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 24,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
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
    color: colors.textPrimary,
    marginBottom: 8,
  },
  inputNote: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
    marginTop: -4,
  },
  textInput: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: colors.textPrimary,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textInputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
  },
  micButton: {
    padding: 12,
  },
  quickAddChipText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: colors.textSecondary,
  },
  floatingGlassContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 16,
    right: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  addButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  addButtonText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: colors.primary,
  },
  lottieOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.stepperBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  stepperButton: {
    padding: 12,
  },
  stepperValue: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
    paddingHorizontal: 16,
    minWidth: 40,
    textAlign: 'center',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: colors.textPrimary,
  },
  dropdownMenu: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    marginTop: 8,
    paddingVertical: 8,
    shadowColor: colors.textPrimary,
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
    color: colors.textSecondary,
  },
  dropdownMenuItemTextActive: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  imagePickerButton: {
    height: 120,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePickerText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: colors.primary,
    marginTop: 8,
  },
  removeImageButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  removeImageText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: colors.danger,
  },
  mapContainer: {
    height: 200,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    position: 'relative',
    marginBottom: 12,
  },
  skeletonLoader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.border,
    zIndex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
  mapSelectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    backgroundColor: colors.primarySuperLight,
    borderRadius: 12,
    gap: 8,
  },
  mapSelectButtonText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: colors.primary,
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
