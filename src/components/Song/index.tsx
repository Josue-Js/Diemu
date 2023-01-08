import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import WaveSvg from '../../assets/wave.svg';
import { styles } from './styles';



type Props = TouchableOpacityProps & {
  data: MediaLibrary.Asset
  index: number;
  active?: boolean;
}

export function Song({ data, index, active = false, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <View style={styles.wrapper}>
        <Text style={styles.index}>{index}</Text>
        <Text style={styles.name} numberOfLines={1}>{data.filename}</Text>
        {active && (
          <View style={styles.iconPlaying}>
            <WaveSvg />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

