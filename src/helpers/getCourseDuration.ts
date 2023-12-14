export const getCourseDuration = (duration: number | string) => {
  if (typeof duration === 'number') {
    let min: number = duration;
    let m = min % 60;
    let h = (min - m) / 60;
    const HHMM =
      (h < 10 ? '0' : '') +
      h.toString() +
      ':' +
      (m < 10 ? '0' : '') +
      m.toString();
    return HHMM;
  } else if (typeof duration === 'string') {
    let min = duration;
    let minNumber = Number(min);
    let m = minNumber % 60;
    let h = (minNumber - m) / 60;
    const HHMM =
      (h < 10 ? '0' : '') +
      h.toString() +
      ':' +
      (m < 10 ? '0' : '') +
      m.toString();
    return HHMM;
  }
};
