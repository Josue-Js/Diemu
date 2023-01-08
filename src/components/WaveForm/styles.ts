import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 60,
  },
  gesture: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  }
});