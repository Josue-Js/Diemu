import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useEffect, useState } from "react";
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess, AVPlaybackStatusToSet, InterruptionModeAndroid } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import { useNotification } from '../hooks/useNotification';
import { ImageSourcePropType } from 'react-native';

import { getAllAudioFiles } from '../utils/getAudioFile';

import Eye from '../assets/eye.png';
import Eclipse from '../assets/eclipse.png';
import Women from '../assets/women.png';
import Moon from '../assets/moon.png';
import Parental from '../assets/parental.png';


const KEY = '@DEMIU';

type Asset = MediaLibrary.Asset
type PlayerContextData = {
  status: AVPlaybackStatusSuccess | undefined;
  playlist: MediaLibrary.Asset[];
  setPlaylist: React.Dispatch<React.SetStateAction<MediaLibrary.Asset[]>>;
  currentSong: Asset;
  isLooping: boolean;
  isShuffling: boolean;
  playSound: (index: number) => void;
  playPause: () => Promise<void>;
  next: () => void;
  prev: () => void;
  setPosition: (millis: number) => Promise<void>;
  toggleLooping: () => Promise<void>;
  toggleShuffling: () => void;
  image: ImageSourcePropType;
}

export const PlayerContext = createContext({} as PlayerContextData);

const Sound = new Audio.Sound();


Audio.setAudioModeAsync({
  shouldDuckAndroid: true,
  playThroughEarpieceAndroid: false,
  staysActiveInBackground: true,
  interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
});


type Props = {
  children: ReactNode;
}

type storeData = {
  playlist: Asset[];
  index: number;
  playbackStatus: AVPlaybackStatusSuccess;
}



var initialStatus: AVPlaybackStatusToSet = {
  progressUpdateIntervalMillis: 1000,
  positionMillis: 0,
  shouldPlay: true,
  rate: 1.0,
  shouldCorrectPitch: false,
  volume: 1.0,
  isMuted: false,
  isLooping: false,
}



const images = [Eye, Eclipse, Moon, Women, Parental];


export function PlayerProvider({ children }: Props) {

  const [status, setStatus] = useState<AVPlaybackStatusSuccess>(null);
  const [playlist, setPlaylist] = useState<Asset[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [isShuffling, setIsShuffling] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [image, setImage] = useState<ImageSourcePropType>(images[0]);

  const currentSong = playlist[currentIndex] || undefined;
  const playlistLen = playlist.length;

  const {
    displayNotification,
    listenerEvent,
  } = useNotification();


  useEffect(() => {
    (async () => {
      const retrieveData = await AsyncStorage.getItem(KEY);
      const songs = await getAllAudioFiles();
      setPlaylist(songs);

      if (retrieveData != null) {
        const data = JSON.parse(retrieveData) as storeData;

        initialStatus.shouldPlay = false;
        initialStatus.positionMillis = data.playbackStatus.positionMillis;

        setStatus(data.playbackStatus);
        setCurrentIndex(data.index);
      }
    })();
  }, []);

  useEffect(() => {
    if(currentSong) {
      displayNotification({
        body: currentSong.filename,
        largeIcon: image,
        isPlaying: status.isPlaying
      });
    }
  }, [status?.isPlaying])

  useEffect(() => {
    switch (listenerEvent?.event) {
      case 'next':
        next();
        break
      case 'pause':
        playPause();
        break
      case 'play':
        playPause();
        break
      case 'prev':
        prev();
        break
    }
  }, [listenerEvent])

  useEffect(() => {
    (() => {
      if (!currentSong) {
        return
      }
      const source = { uri: currentSong.uri }

      Sound.loadAsync(
        source,
        initialStatus
      )

      const random = Math.floor(Math.random() * images.length);
      const randomImage = images[random];
      setImage(randomImage);

      
      displayNotification({
        body: currentSong.filename,
        largeIcon: randomImage,
        isPlaying: true
      })

      initialStatus.shouldPlay = true;
      initialStatus.positionMillis = 0;
    })()

    return () => {
      Sound.unloadAsync();
    }
  }, [currentIndex]);



  
  Sound._onPlaybackStatusUpdate = function (status: AVPlaybackStatus) {

    if (status.isLoaded) {
      setStatus(status);
      AsyncStorage.setItem(KEY, JSON.stringify({
        index: currentIndex,
        playbackStatus: status
      }));
      if (status.didJustFinish && !isLooping) {
        next();
      }
    }
  }

  function playSound(index: number) {
    initialStatus.shouldPlay = true;
    setCurrentIndex(index);
  }

  async function playPause() {

    const { isPlaying } = status;

    if (isPlaying) {
      await Sound.pauseAsync()
    } else if (!isPlaying) {
      await Sound.playAsync()
    }
  }

  function next() {
    const nextIndex = currentIndex + 1;
    const hasNext = nextIndex < playlistLen;

    if (isShuffling) {
      const randomIndex = Math.floor(Math.random() * playlistLen);
      setCurrentIndex(randomIndex);

    } else {
      if (hasNext) {
        setCurrentIndex(nextIndex);
      } else {
        setCurrentIndex(0);
      }
    }
  }

  function prev() {
    const prevIndex = currentIndex - 1;
    const hasPrev = prevIndex >= 0;

    if (hasPrev) {
      setCurrentIndex(prevIndex);
    } else {
      setCurrentIndex(playlistLen - 1)
    }
  }

  async function setPosition(millis: number) {
    await Sound.setPositionAsync(millis);
  }

  async function toggleLooping() {
    await Sound.setIsLoopingAsync(!isLooping);
    setIsLooping(!isLooping);
    initialStatus.isLooping = !isLooping;
  }

  function toggleShuffling() {
    setIsShuffling(!isShuffling);
  }



  return (
    <PlayerContext.Provider value={{
      status,
      playlist,
      setPlaylist,
      isLooping,
      isShuffling,
      currentSong,
      playSound,
      playPause,
      next,
      prev,
      setPosition,
      toggleLooping,
      toggleShuffling,
      image
    }}>
      {children}
    </PlayerContext.Provider>
  );
}