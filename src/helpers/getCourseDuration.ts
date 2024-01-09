export const getCourseDuration = (duration: number) => {
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
};
