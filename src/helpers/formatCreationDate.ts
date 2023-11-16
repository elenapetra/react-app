export const formatCreationDate = (date: string) => {
  let oldDate = new Date(date);

  const newDate =
    ('0' + oldDate.getDate()).slice(-2) +
    '/' +
    ('0' + (oldDate.getMonth() + 1)).slice(-2) +
    '/' +
    oldDate.getFullYear();
  return newDate;
};
