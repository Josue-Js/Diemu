import { StyleSheet } from "react-native";
import { theme } from "../../global/theme";
import {padding, screenWidth, statusBarHeight} from '../../global/constants';


const sizeImage = screenWidth - (padding * 2);


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: padding,
    paddingBottom: padding,
    paddingTop: statusBarHeight,
    justifyContent: 'space-between',
  },
  header: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: 190,
    fontSize: 18,
    fontFamily: theme.fonts.Urbanist600,
    color: theme.colors.white,
  },
  back: {
    position: 'absolute',
    left: 0,
  },
  wrapperImage: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    width: sizeImage,
    height: sizeImage,
    borderRadius: 32,
  },
  nameSong: {
    width: '90%',
    fontSize: 20,
    fontFamily: theme.fonts.Urbanist700,
    color: theme.colors.white,
    textTransform: 'capitalize',
  },
  waveForm: {},
  times: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  elapsedtime: {
    fontSize: 14,
    fontFamily: theme.fonts.Urbanist400,
    color: theme.colors.purple_480,
  },
  duration: {
    fontSize: 14,
    fontFamily: theme.fonts.Urbanist400,
    color: theme.colors.white,
  },
  wrapperControls: {
    width: sizeImage,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linearGradientPlay: {
    borderRadius: 45,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
  }
});