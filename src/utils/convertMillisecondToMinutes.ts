

export function convertMillisecondToMinutes(timeMillis: number) {

  const minutes = Math.floor(timeMillis / 1000 / 60);
  const seconds = Math.floor(timeMillis / 1000 % 60);

  const formatMinutes = String(minutes).padStart(2,'0');
  const formatSeconds = String(seconds).padStart(2,'0');


  return `${formatMinutes}:${formatSeconds}`;
}