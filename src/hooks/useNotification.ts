import { useEffect, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';



type EventTypes = 'prev' | 'pause' | 'play' | 'next';
type onEvent = { event?: EventTypes };

export function useNotification() {

  const [channelId, setChannelId] = useState<string>();
  const [listenerEvent, setListenerEvent] = useState<onEvent>();


  useEffect(() => {
    (async () => {
      if (!channelId) {
        const id = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          badge: false,
          vibration: false,
          
        });
        setChannelId(id)
      }
    })()
  }, []);
  useEffect(() => {
    notifee.registerForegroundService((notification) => {
      return new Promise(() => {
      });
    });
    
    return () => {
      notifee.stopForegroundService()
    }
  }, []);
  useEffect(() => {
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.ACTION_PRESS) {
        setListenerEvent({ event: detail.pressAction.id as EventTypes })
      }
    });

    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.ACTION_PRESS:
          setListenerEvent({ event: detail.pressAction.id as EventTypes })
          break
      }
    });
  }, []);
  // useEffect(() => {
    
  // }, []);


  async function displayNotification(
      {body, largeIcon, isPlaying = false}: 
      {body: string, largeIcon: ImageSourcePropType, isPlaying?: boolean}
  ) {
    await notifee.displayNotification({
      id: 'Notification Player',
      title: 'Playing',
      body: body,
      android: {
        channelId,
        largeIcon: largeIcon,
        autoCancel: false,
        colorized: true,
        pressAction: {
          id: 'default',
        },
        smallIcon: 'ic_launcher',
        color: '#7B57E4',
        asForegroundService: true,
        actions: [
          {
            title: '<b>Prev</b>',
            pressAction: { id: 'prev' },
          },
          {
            title: `<b style="text-decoration: underline">${isPlaying ? 'Pause' : 'Play'}</b>`,
            pressAction: { id: isPlaying ? 'pause' : 'play' },
          },
          {
            title: '<b>Next</b> ',
            pressAction: { id: 'next' }
          },
        ],
      },
    })
  }

  
  return {
    displayNotification,
    listenerEvent
  }
}



