import * as MediaLibrary from 'expo-media-library';



export async function getAllAudioFiles() {

  const uriNotAllowed = ['Samsung', 'WhatsApp']

  const files = await MediaLibrary.getAssetsAsync({
    mediaType: MediaLibrary.MediaType.audio,
    first: Infinity,
  });

  return files.assets.filter((item) => {
    const wordIsUri = item.uri.split("/").some(word => uriNotAllowed.includes(word))

    return !wordIsUri
  })
}