import { View } from 'react-native';

import { samples, widthBar } from '../../../global/constants';
import { styles } from './styles';


type Props = {
  color: string;
}

export function Wave({ color }: Props) {
  return (
    <View style={styles.container}>
      {samples.map((sample, index) => (
        <View
          key={index}
          style={{
            width: widthBar,
            height: sample,
            backgroundColor: color,
            borderRadius: 4,
          }}
        />
      ))}
    </View>
  );
}