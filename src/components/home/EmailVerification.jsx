import React from 'react';
import { View, Animated } from 'react-native';
import { Card, Icon, Text, Button } from '@rneui/themed';
import { colors } from '../../theme';
import { homeStyles } from '../../styles/home.styles';

const EmailVerificationCard = ({ onResendEmail, canResend, countdown }) => (
  <Card containerStyle={homeStyles.verificationCard}>
    <Icon
      name="mail"
      type="material-community"
      size={50}
      color={colors.primary}
      containerStyle={homeStyles.iconContainer}
    />

    <Card.Title style={homeStyles.cardTitle}>
      Vérification de votre email
    </Card.Title>

    <Text style={homeStyles.cardDescription}>
      Pour accéder à toutes les fonctionnalités, veuillez vérifier votre adresse email.
      Un lien de confirmation vous a été envoyé.
    </Text>

    <View style={homeStyles.instructionsContainer}>
      <Text style={homeStyles.instructionText}>
        1. Vérifiez votre boîte de réception
      </Text>
      <Text style={homeStyles.instructionText}>
        2. Cliquez sur le lien dans l'email
      </Text>
      <Text style={homeStyles.instructionText}>
        3. Revenez sur l'application
      </Text>
    </View>

    <Button
      title={canResend ? "Renvoyer l'email" : `Patienter (${countdown}s)`}
      disabled={!canResend}
      onPress={onResendEmail}
      buttonStyle={homeStyles.resendButton}
      titleStyle={homeStyles.resendButtonText}
      icon={{
        name: 'refresh',
        type: 'material-community',
        size: 20,
        color: colors.surface,
      }}
      iconRight
    />

    <Text style={homeStyles.spamWarning}>
      Pensez à vérifier vos spams si vous ne trouvez pas l'email
    </Text>
  </Card>
);

const EmailVerification = ({ user, isEmailVerified, fadeAnim, onResendEmail, canResend, countdown }) => {
  if (!user || isEmailVerified) return null;

  return (
    <Animated.View style={[homeStyles.verificationContainer, { opacity: fadeAnim }]}>
      <EmailVerificationCard
        onResendEmail={onResendEmail}
        canResend={canResend}
        countdown={countdown}
      />
    </Animated.View>
  );
};

export default EmailVerification;
