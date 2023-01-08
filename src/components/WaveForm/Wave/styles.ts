import { StyleSheet } from 'react-native';
import { padding, screenWidth } from '../../../global/constants';


export const styles = StyleSheet.create({
  container: {
    width: screenWidth - (padding * 2),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});