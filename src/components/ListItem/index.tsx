import { memo } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import * as MediaLibrary from 'expo-media-library';


type Props = FlatListProps<MediaLibrary.Asset>


export const ListItem = memo(function ListItem({ ...rest }: Props) {
  return (
    <FlatList
      {...rest}
      contentContainerStyle={{ paddingBottom: 100 }}
      keyExtractor={({ id }) => id}
    />
  )
});