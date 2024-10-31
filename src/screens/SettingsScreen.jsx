import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Switch, Divider, Icon } from '@rneui/themed';
import Header from '../components/Header';
import { colors, spacing, commonStyles } from '../theme';
import { settingsStyles } from '../styles/settings.styles';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const settings = [
    {
      title: 'Préférences',
      items: [
        {
          icon: 'notifications',
          label: 'Notifications',
          value: notifications,
          onValueChange: setNotifications,
        },
        {
          icon: 'dark-mode',
          label: 'Mode sombre',
          value: darkMode,
          onValueChange: setDarkMode,
        },
        {
          icon: 'volume-up',
          label: 'Sons',
          value: soundEnabled,
          onValueChange: setSoundEnabled,
        },
      ],
    },
    {
      title: 'Application',
      items: [
        {
          icon: 'info',
          label: 'Version',
          value: '1.0.0',
          type: 'text',
        },
        {
          icon: 'policy',
          label: 'Politique de confidentialité',
          type: 'link',
        },
        {
          icon: 'description',
          label: 'Conditions d\'utilisation',
          type: 'link',
        },
      ],
    },
  ];

  return (
    <View style={commonStyles.container}>
      <Header title="Paramètres" />
      <ScrollView style={settingsStyles.content}>
        {settings.map((section, sectionIndex) => (
          <View
            key={section.title}
            style={[
              commonStyles.card,
              settingsStyles.section,
              sectionIndex > 0 && { marginTop: spacing.lg }
            ]}
          >
            <Text style={settingsStyles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, index) => (
              <View key={item.label}>
                {index > 0 && <Divider style={settingsStyles.divider} />}
                <View style={settingsStyles.settingItem}>
                  <View style={settingsStyles.settingLeft}>
                    <Icon
                      name={item.icon}
                      type="material"
                      color={colors.primary}
                      size={24}
                      style={settingsStyles.icon}
                    />
                    <Text style={settingsStyles.settingLabel}>{item.label}</Text>
                  </View>
                  {item.type === 'text' ? (
                    <Text style={settingsStyles.valueText}>{item.value}</Text>
                  ) : item.type === 'link' ? (
                    <Icon
                      name="chevron-right"
                      type="material"
                      color={colors.text.secondary}
                      size={24}
                    />
                  ) : (
                    <Switch
                      value={item.value}
                      onValueChange={item.onValueChange}
                      color={colors.primary}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
        ))}
        <Text style={settingsStyles.developmentText}>Fonctionnalités en développement (ou pas hahaha).</Text>
      </ScrollView>
    </View>
  );
}
