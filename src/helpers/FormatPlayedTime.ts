export default function FormatPlayedTime(timeInMinutes: number) {
  const days = Math.floor(timeInMinutes / (24 * 60));
  const hours = Math.floor((timeInMinutes % (24 * 60)) / 60);
  const minutes = Math.floor(
    timeInMinutes - Math.floor(timeInMinutes / 60) * 60
  );

  let timePlayed = '';

  if (days > 0) {
    timePlayed += `${days} Day(s) `;
  }

  if (hours > 0) {
    timePlayed += `${hours} Hour(s) `;
  }

  if (minutes > 0) {
    timePlayed += `${minutes} Minutes`;
  }

  return timePlayed.trim();
}
