import { Alert } from 'react-native'

export async function showAlert(title, message, onPress = null) {
  await Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: onPress == null ? null : () => { onPress(); },
      },
    ],
    { cancelable: false },
  );
}
