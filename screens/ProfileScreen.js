import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* User Info Card */}
          <View style={styles.profileCard}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.avatarLarge}
            />
            <Text style={styles.userName}>Alex Doe</Text>
            <Text style={styles.userEmail}>alex.doe@campus.edu</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Gigs Done</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statValue}>4.9</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
            </View>
          </View>

          {/* Settings Options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingRowLeft}>
                <MaterialIcons name="person-outline" size={24} color="#5D3EFF" />
                <Text style={styles.settingText}>Edit Profile</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#71717A" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingRowLeft}>
                <MaterialIcons name="payment" size={24} color="#5D3EFF" />
                <Text style={styles.settingText}>Payment Methods</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#71717A" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingRowLeft}>
                <MaterialIcons name="notifications-none" size={24} color="#5D3EFF" />
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#71717A" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
          
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E4E9',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#E4E4E9',
    marginBottom: 16,
  },
  userName: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    color: '#111114',
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: '#71717A',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F8F9FD',
    borderRadius: 12,
    paddingVertical: 16,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E4E4E9',
  },
  statValue: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 18,
    color: '#111114',
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: '#71717A',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E4E9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    color: '#111114',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 15,
    color: '#111114',
  },
  divider: {
    height: 1,
    backgroundColor: '#E4E4E9',
  },
  logoutButton: {
    backgroundColor: '#FFE4E4',
    borderWidth: 1,
    borderColor: '#FFCACA',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    color: '#D00000',
  },
});
