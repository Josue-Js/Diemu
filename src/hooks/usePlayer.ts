import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';


export function usePlayer() {
  const context = useContext(PlayerContext);
  return context;
}