import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function OrderHistoryScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const mockOrders = [];

  const timelineSteps = ['Placed', 'Accepted', 'Shopping', 'On the Way', 'Delivered'];

  const handleReorder = (items) => {
    if (Platform.OS === 'web') {
      window.alert(`Simulating reorder: Added ${items} to cart!`);
    } else {
      Alert.alert("Reorder", `Added ${items} to cart!`);
    }
  };

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
          {mockOrders.length > 0 ? (
            mockOrders.map((order) => (
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
                
                {/* Visual Status Timeline */}
                <View style={styles.timelineContainer}>
                  {timelineSteps.map((step, index) => (
                    <View key={step} style={styles.timelineStep}>
                      <View style={[
                        styles.timelineDot,
                        index <= order.timelineIndex ? { backgroundColor: colors.primary } : { backgroundColor: colors.border }
                      ]} />
                      {index < timelineSteps.length - 1 && (
                        <View style={[
                          styles.timelineLine,
                          index < order.timelineIndex ? { backgroundColor: colors.primary } : { backgroundColor: colors.border }
                        ]} />
                      )}
                      <Text style={[
                        styles.timelineText,
                        index <= order.timelineIndex ? { color: colors.textPrimary } : { color: colors.textSecondary }
                      ]}>{step}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.divider} />
                
                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>{order.total}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.reorderButton}
                    onPress={() => handleReorder(order.items)}
                  >
                    <MaterialIcons name="refresh" size={16} color={colors.primary} />
                    <Text style={styles.reorderButtonText}>Reorder</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="history" size={64} color={colors.border} />
              <Text style={styles.emptyTitle}>No order history</Text>
              <Text style={styles.emptySubtitle}>You haven't placed any orders yet.</Text>
            </View>
          )}
        </ScrollView>
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
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 24,
    color: colors.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
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
    color: colors.textPrimary,
  },
  statusBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  statusBadgeCancelled: {
    backgroundColor: colors.dangerLight,
  },
  statusBadgeText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
    color: colors.successText,
  },
  statusBadgeTextCancelled: {
    color: colors.dangerText,
  },
  orderItems: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
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
    color: colors.textSecondary,
  },
  totalValue: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 18,
    color: colors.textPrimary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8,
  },
  timelineStep: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    zIndex: 2,
  },
  timelineLine: {
    position: 'absolute',
    top: 5,
    left: '50%',
    right: '-50%',
    height: 2,
    zIndex: 1,
  },
  timelineText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.primarySuperLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  reorderButtonText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: colors.primary,
    marginLeft: 4,
  },
});
