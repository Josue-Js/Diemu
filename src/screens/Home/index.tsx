import { useState, useEffect, useCallback, } from 'react';
import { ImageBackground, View, Text, SafeAreaView, TextInput, ListRenderItemInfo } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Feather } from '@expo/vector-icons';

import { usePlayer } from '../../hooks/usePlayer';

import { Song } from '../../components/Song';
import { MiniPlayer } from '../../components/MiniPlayer';
import { Player } from '../../components/Player';

import { getAllAudioFiles } from '../../utils/getAudioFile';
import Glow from '../../assets/glow.png'
import { styles } from './styles';
import { ListItem } from '../../components/ListItem';



export function Home() {

  const [query, setQuery] = useState('');
  const [isOpenPlayer, setIsOpenPlayer] = useState(false);

  const {
    status,
    playlist,
    setPlaylist,
    playSound,
    currentSong
  } = usePlayer();



  useEffect(() => {
    getAllAudioFiles()
      .then(data => setPlaylist(data))
  }, []);



  const filteredSongs = query.length > 0
    ? playlist.filter(song => song?.filename.toLowerCase()
      .includes(query.toLowerCase()))
    : playlist


  async function toggleOpenPlayer() {
    setIsOpenPlayer(!isOpenPlayer);
  }



  const renderItem = useCallback((
    { item }: ListRenderItemInfo<MediaLibrary.Asset>
  ) => {
    const index = playlist.findIndex(song => song.id === item.id);
    return (
      <Song
        data={item}
        index={index + 1}
        active={item.id === currentSong?.id ? true : false}
        onPress={() => {
          toggleOpenPlayer();
          playSound(index)
        }}
      />
    )
  }, [playlist, currentSong])



  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={Glow} style={styles.glow}>

        <View style={styles.containerInput}>
          <View style={styles.wrapperInput}>
            <Feather name="search" size={24} color="white" />
            <TextInput
              style={styles.textInput}
              placeholder='search song'
              placeholderTextColor='rgba(255, 255, 255, 0.4)'
              onChangeText={(text) => {
                setQuery(text.replace(/^\s+/g, ''))
              }}
              value={query}
            />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            Musics
          </Text>

          <ListItem
            showsVerticalScrollIndicator={false}
            data={filteredSongs}
            initialNumToRender={20}
            renderItem={renderItem}
          />
        </View>
      </ImageBackground>

      <Player
        visible={isOpenPlayer}
        closePlayer={toggleOpenPlayer}
        animationType='slide'
      />
      {status && (
        <MiniPlayer onPress={toggleOpenPlayer} />
      )}
    </SafeAreaView>
  );
}