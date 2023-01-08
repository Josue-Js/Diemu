import { StyleSheet } from "react-native";
import { padding } from "../../global/constants";
import { theme } from "../../global/theme";



export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: padding,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  index: {
    fontSize: 16,
    fontFamily: theme.fonts.Urbanist400,
    color: theme.colors.white,
    marginRight: 16,
  },
  name: {
    width: '70%',
    fontSize: 18,
    fontFamily: theme.fonts.Urbanist400,
    color: theme.colors.white,
  },
  iconPlaying: {
    marginLeft: 32
  }
});