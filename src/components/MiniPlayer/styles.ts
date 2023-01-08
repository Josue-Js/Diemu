import { StyleSheet } from "react-native";
import { theme } from "../../global/theme";
import { padding, screenWidth } from "../../global/constants";



export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: (screenWidth - (padding * 2)),
    height: 60,
    bottom: 30,
    alignSelf: 'center',
    zIndex: 100,
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 8,
  },
  wrapper: {
    flex: 1,
    height: 60,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  name: {
    width: 120,
    fontSize: 16,
    fontFamily: theme.fonts.Urbanist600,
    color: theme.colors.white,
    textTransform: 'capitalize',
  },
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
  },
  play: {
    marginHorizontal: 12,
  },
});