import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, ImageBackground, ModalProps } from "react-native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { usePlayer } from "../../hooks/usePlayer";

import { WaveForm } from "../WaveForm";

import { theme } from "../../global/theme";
import { convertMillisecondToMinutes } from "../../utils/convertMillisecondToMinutes";
import Background from '../../assets/background.png';
import { styles } from "./styles";


type Props = ModalProps & {
  closePlayer: () => void;
};

export function Player({ closePlayer, ...rest }: Props) {

  const { colors } = theme;
  const {
    status,
    isLooping,
    isShuffling,
    currentSong,
    playPause,
    next,
    prev,
    setPosition,
    toggleLooping,
    toggleShuffling,
    image
  } = usePlayer();

  const [progress, setProgress] = useState(0);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [timePositionOnSlider, setTimePositionOnSlider] = useState('00:00');

  const positionMillis = status?.positionMillis || 0;
  const durationMillis = status?.durationMillis || 0;

  const durationMinutes = convertMillisecondToMinutes(durationMillis);
  const positionMinutes = isDraggingSlider
    ? timePositionOnSlider
    : convertMillisecondToMinutes(positionMillis);



  useEffect(() => {
    const percent = positionMillis * 100 / durationMillis;
    setProgress(percent);
  }, [status]);



  function onStartSlider() {
    setIsDraggingSlider(true);
  }

  function onValueChange(value: number) {
    const positionSlider = (value * durationMillis) / 100;
    const time = convertMillisecondToMinutes(positionSlider)
    setTimePositionOnSlider(time);
  }

  async function onCompleteSlider(value: number) {
    const newPosition = value * durationMillis / 100;
    await setPosition(newPosition);
    setIsDraggingSlider(false);
  }



  return (
    <Modal
      {...rest}
    >
      <ImageBackground source={Background} style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.back} onPress={closePlayer}>
              <Ionicons name="chevron-down" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.title} numberOfLines={1}>
              {currentSong?.filename}
            </Text>
          </View>

          <View style={styles.wrapperImage}>
            <Image source={image} style={styles.image} />
          </View>

          <Text style={styles.nameSong} numberOfLines={1}>
            {currentSong?.filename}
          </Text>

          <View style={styles.waveForm}>
            <WaveForm
              progress={progress || 0}
              color={colors.purple_480}
              onStartSlider={onStartSlider}
              onValueChange={onValueChange}
              onCompleteSlider={onCompleteSlider}
            />
            <View style={styles.times}>
              <Text style={styles.elapsedtime}>{positionMinutes}</Text>
              <Text style={styles.duration}>{durationMinutes}</Text>
            </View>
          </View>

          <View style={styles.wrapperControls}>
            <View style={styles.controls}>
              <TouchableOpacity onPress={toggleShuffling}>
                <Entypo
                  name="shuffle"
                  size={28}
                  color={isShuffling ? colors.purple_480 : colors.purple_200}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={prev}>
                <Ionicons
                  name="ios-play-skip-back"
                  size={28}
                  color={colors.purple_200}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={playPause}>
                <LinearGradient
                  colors={['#AE92FF', '#7150D0']}
                  style={styles.linearGradientPlay}
                >
                  {status?.isPlaying
                    ? <Ionicons name="pause" size={50} color={colors.white} />
                    : <Ionicons name="play" size={50} color={colors.white} />
                  }
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPressIn={next}
              >
                <Ionicons
                  name="ios-play-skip-forward"
                  size={28}
                  color={colors.purple_200}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleLooping}>
                <FontAwesome
                  name="repeat"
                  size={28}
                  color={isLooping ? colors.purple_480 : colors.purple_200}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
}