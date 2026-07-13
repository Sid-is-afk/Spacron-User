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
import * as DocumentPicker from 'expo-document-picker';
import LottieView from 'lottie-react-native';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function PrintsScreen() {
  const { handleAddItem: addCartItem } = useCart();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [selectedShop, setSelectedShop] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [printType, setPrintType] = useState('Black & White');
  const [isPrintTypeOpen, setIsPrintTypeOpen] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0]);
      }
    } catch (err) {
      console.log('Error picking document', err);
    }
  };

  const handleAddItem = () => {
    const costPerCopy = printType === 'Color' ? 5 : 2;
    if (selectedFile && itemQuantity > 0 && selectedShop.trim()) {
      addCartItem({
        name: selectedFile.name,
        cost: costPerCopy,
        quantity: itemQuantity,
        shop: selectedShop.trim(),
        category: 'Printout',
        instructions: instructions.trim()
      });
      setSelectedFile(null);
      setItemQuantity(1);
      setSelectedShop('');
      setPrintType('Black & White');
      setInstructions('');
      
      setShowSuccessAnim(true);
      setTimeout(() => setShowSuccessAnim(false), 2500);
    } else {
      alert('Please fill out all required fields, including uploading a document and Preferred Shop.');
    }
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
            <Text style={styles.pageTitle}>Print Request</Text>
            <Text style={styles.pageSubtitle}>Upload a document and request a printout.</Text>
          </View>

          {/* Input Card */}
          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Document</Text>
              <Text style={styles.pageSubtitle}>Do not upload more than 5 documents at a time.</Text>
              <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
                <MaterialIcons name="upload-file" size={24} color={colors.primary} />
                <Text style={styles.uploadButtonText}>
                  {selectedFile ? selectedFile.name : 'Select a document to print'}
                </Text>
              </TouchableOpacity>
            </View>



            <View style={{ flexDirection: 'row', alignItems: 'flex-start', zIndex: 10 }}>
              <View style={[styles.inputGroup, { marginRight: 16 }]}>
                <Text style={styles.label}>Number of Copies</Text>
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
                <Text style={styles.label}>Print Type</Text>
                <View style={{ zIndex: 10 }}>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setIsPrintTypeOpen(!isPrintTypeOpen)}
                  >
                    <Text style={[styles.dropdownText, { flex: 1 }]} numberOfLines={1}>{printType}</Text>
                    <MaterialIcons name={isPrintTypeOpen ? "expand-less" : "expand-more"} size={24} color={colors.iconInactive} />
                  </TouchableOpacity>

                  {isPrintTypeOpen && (
                    <View style={[styles.dropdownMenu, { position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100 }]}>
                      {['Black & White', 'Color'].map((item) => (
                        <TouchableOpacity
                          key={item}
                          style={styles.dropdownMenuItem}
                          onPress={() => {
                            setPrintType(item);
                            setIsPrintTypeOpen(false);
                          }}
                        >
                          <Text style={[
                            styles.dropdownMenuItemText,
                            printType === item && styles.dropdownMenuItemTextActive
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

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Specific Instructions</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Print on both sides"
                placeholderTextColor={colors.textSecondary}
                value={instructions}
                onChangeText={setInstructions}
              />
            </View>

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
                    <MaterialIcons name="location-on" size={48} color={colors.border} />
                    <Text style={styles.mapPlaceholderText}>Map view</Text>
                  </View>
                )}
                {/* Center Pin Overlay */}
                <View style={styles.mapOverlay} pointerEvents="none">
                  <MaterialIcons name="location-pin" size={40} color={colors.danger} style={styles.mapPin} />
                </View>
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
    paddingBottom: 100,
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
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  uploadButtonText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
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
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
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
});
