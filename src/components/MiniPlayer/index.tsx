import { Text, View, Image, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { BoxShadow } from 'react-native-shadow';

import { usePlayer } from "../../hooks/usePlayer";

import { padding, screenWidth } from "../../global/constants";
import { styles } from "./styles";


type Props = {
  onPress?: () => void;
}

export function MiniPlayer({ onPress }: Props) {

  const {
    status,
    currentSong,
    playPause,
    next,
    prev,
    image
  } = usePlayer();

  return (
    <View style={styles.container}>
      <BoxShadow setting={{
        width: (screenWidth - (padding * 2)),
        height: 60,
        color: "#AE92FF",
        border: 18,
        radius: 4,
        opacity: 0.2,
        x: 0,
        y: 0,
      }}>
        <LinearGradient
          colors={['#7150D0', '#AE92FF']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.linearGradient}
        >
          <TouchableOpacity
            style={styles.wrapper}
            activeOpacity={1}
            onPress={onPress}
          >
            <Image source={image} style={styles.image} />
            <Text style={styles.name} numberOfLines={1}>
              {currentSong?.filename}
            </Text>
          </TouchableOpacity>

          <View style={styles.controls}>
            <TouchableOpacity onPress={prev}>
              <Entypo name="controller-jump-to-start" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.play} onPress={playPause}>
              {status.isPlaying
                ? <Entypo name="controller-paus" size={32} color="white" />
                : <Entypo name="controller-play" size={32} color="white" />
              }
            </TouchableOpacity>
            <TouchableOpacity onPress={next}>
              <Entypo name="controller-next" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </BoxShadow>
    </View>
  );
}