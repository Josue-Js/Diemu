import { StyleSheet } from 'react-native';
import { padding } from '../../global/constants';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.purple_900,
  },
  glow: {
    flex: 1,
    paddingTop: 70,
  },
  containerInput: {
    paddingHorizontal: padding,
  },
  wrapperInput: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, .06)',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textInput: {
    marginLeft: 16,
    flex: 1,
    fontFamily: theme.fonts.Urbanist600,
    fontSize: 18,
    color: theme.colors.white,
  },
  content: {
    flex: 1,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.Urbanist700,
    color: theme.colors.white,
    marginBottom: 24,
    paddingHorizontal: padding,
  },
})
