const formatTime = (time) => {
  const minutes = Math.floor(time / 60) || 0
  const seconds = Math.round(time - minutes * 60 || 0)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}` //display minutes first, after that verif the seconds is less than 10 or not, after done update using the last $seconds
}

export { formatTime }
