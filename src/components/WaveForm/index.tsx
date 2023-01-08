import { useEffect, useState } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';

import { Wave } from './Wave';

import { interpolate } from '../../utils/interpolate';
import { padding, screenWidth } from '../../global/constants';
import { styles } from './styles';


const startX = padding;
const endX = screenWidth - padding;
const waveWidth = screenWidth - (padding * 2)


type Props = {
  progress: number;
  color: string;
  onStartSlider?: (value: number) => void;
  onValueChange?: (value: number) => void;
  onCompleteSlider?: (value: number) => Promise<void>;

}

export function WaveForm({ progress, color, onValueChange, onCompleteSlider, onStartSlider }: Props) {

  const width = new Animated.Value(1);
  const [isDragging, setIsDragging] = useState(false);


  useEffect(() => {
    if (!isDragging) {
      const value = interpolate({
        value: progress,
        input_range: [0, 100],
        output_range: [0, waveWidth]
      });
      width.setValue(value)
    }
  }, [progress, isDragging])

  const panResponder =
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderStart(event, gestureState) {
        setIsDragging(true)
        const x = event.nativeEvent.pageX;
        const value = interpolate({
          value: x,
          input_range: [startX, endX],
          output_range: [0, waveWidth]
        });
        width.setValue(value);
        const valueInPercent = Math.round((value * 100) / waveWidth);
        if (onStartSlider) {
          onStartSlider(valueInPercent);
        }
      },
      onPanResponderMove(event) {
        const x = event.nativeEvent.pageX;
        const value = interpolate({
          value: x,
          input_range: [startX, endX],
          output_range: [0, waveWidth]
        });
        width.setValue(value);
       
        const valueInPercent = Math.round((value * 100) / waveWidth);

        if (onValueChange) {
          onValueChange(valueInPercent);
        }

      },
      onPanResponderRelease: (event) => {
        const x = event.nativeEvent.pageX;
        const value = interpolate({
          value: x,
          input_range: [startX, endX],
          output_range: [0, waveWidth]
        });
        width.setValue(value)

        const valueInPercent = Math.round((value * 100) / waveWidth);
        onCompleteSlider(valueInPercent)
          .then(() => setIsDragging(false))
      },
    });



  return (
    <View style={styles.container}>
      <Animated.View {...panResponder.panHandlers} style={styles.gesture} />

      <Wave color='rgba(255, 255, 255, 0.75)' />
      <Animated.View style={[
        StyleSheet.absoluteFill,
        {
          width: width,
          overflow: 'hidden',
        }
      ]}>
        <Wave color={color} />
      </Animated.View>
    </View>
  );
}

