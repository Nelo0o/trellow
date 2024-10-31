import { useState, useEffect } from 'react';
import { Alert, Animated } from 'react-native';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const EMAIL_VERIFICATION_DELAY = 60; // secondes
const CHECK_INTERVAL = 1000; // millisecondes

export const useEmailVerification = (user) => {
  const [isEmailVerified, setIsEmailVerified] = useState(user?.emailVerified || false);
  const [canResendEmail, setCanResendEmail] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  // Vérification périodique de l'email
  useEffect(() => {
    const checkEmailVerification = setInterval(async () => {
      if (user && !isEmailVerified) {
        try {
          await user.reload();
          const updatedUser = auth.currentUser;
          if (updatedUser?.emailVerified) {
            setIsEmailVerified(true);
            clearInterval(checkEmailVerification);
          }
        } catch (error) {
          console.error('Erreur lors de la vérification:', error);
        }
      } else {
        clearInterval(checkEmailVerification);
      }
    }, CHECK_INTERVAL);

    return () => clearInterval(checkEmailVerification);
  }, [user, isEmailVerified]);

  // Animation de disparition
  useEffect(() => {
    if (isEmailVerified) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isEmailVerified, fadeAnim]);

  // Gestion du compte à rebours
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((current) => {
          if (current <= 1) {
            setCanResendEmail(true);
            return 0;
          }
          return current - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResendEmail = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('Utilisateur non connecté');
      }

      await sendEmailVerification(currentUser);
      setCanResendEmail(false);
      setCountdown(EMAIL_VERIFICATION_DELAY);
      Alert.alert('Succès', 'Un nouvel email de vérification a été envoyé.');
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      Alert.alert('Erreur', 'Impossible d\'envoyer l\'email de vérification. Veuillez réessayer plus tard.');
    }
  };

  const handleManualRefresh = async () => {
    try {
      await auth.currentUser?.reload();
      const updatedUser = auth.currentUser;
      if (updatedUser?.emailVerified) {
        setIsEmailVerified(true);
      }
    } catch (error) {
      console.error('Erreur lors du rafraîchissement:', error);
    }
  };

  return {
    isEmailVerified,
    canResendEmail,
    countdown,
    fadeAnim,
    handleResendEmail,
    handleManualRefresh
  };
};
