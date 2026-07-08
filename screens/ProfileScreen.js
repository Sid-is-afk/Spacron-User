import React, { useState } from 'react';
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
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen() {
  const { theme, toggleTheme, colors } = useTheme();
  const styles = createStyles(colors);
  
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

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
                <MaterialIcons name="person-outline" size={24} color={colors.primary} />
                <Text style={styles.settingText}>Edit Profile</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.iconInactive} />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingRowLeft}>
                <MaterialIcons name="payment" size={24} color={colors.primary} />
                <Text style={styles.settingText}>Payment Methods</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.iconInactive} />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingRowLeft}>
                <MaterialIcons name="notifications-none" size={24} color={colors.primary} />
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.iconInactive} />
            </TouchableOpacity>
            
            <View style={styles.divider} />

            <TouchableOpacity 
              style={styles.settingRow}
              onPress={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            >
              <View style={styles.settingRowLeft}>
                <MaterialIcons name="palette" size={24} color={colors.primary} />
                <Text style={styles.settingText}>Theme</Text>
              </View>
              <View style={styles.settingRowRight}>
                <Text style={styles.themeSelectedText}>
                  {theme === 'dark' ? 'Dark' : 'Light'}
                </Text>
                <MaterialIcons name={isThemeMenuOpen ? "expand-less" : "expand-more"} size={24} color={colors.iconInactive} />
              </View>
            </TouchableOpacity>

            {isThemeMenuOpen && (
              <View style={styles.themeMenu}>
                <TouchableOpacity 
                  style={styles.themeMenuItem}
                  onPress={() => { toggleTheme('light'); setIsThemeMenuOpen(false); }}
                >
                  <Text style={[styles.themeMenuItemText, theme === 'light' && styles.themeMenuItemTextActive]}>Light</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.themeMenuItem}
                  onPress={() => { toggleTheme('dark'); setIsThemeMenuOpen(false); }}
                >
                  <Text style={[styles.themeMenuItemText, theme === 'dark' && styles.themeMenuItemTextActive]}>Dark</Text>
                </TouchableOpacity>
              </View>
            )}

          </View>
          
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
          
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
  profileCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
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
    borderColor: colors.border,
    marginBottom: 16,
  },
  userName: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.background,
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
    backgroundColor: colors.border,
  },
  statValue: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 18,
    color: colors.textPrimary,
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  section: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    color: colors.textPrimary,
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
  settingRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 15,
    color: colors.textPrimary,
  },
  themeSelectedText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
  themeMenu: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    marginTop: 8,
    paddingVertical: 8,
  },
  themeMenuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  themeMenuItemText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
  themeMenuItemTextActive: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  logoutButton: {
    backgroundColor: colors.dangerLight,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    color: colors.dangerText,
  },
});
