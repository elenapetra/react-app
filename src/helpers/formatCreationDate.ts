export const formatCreationDate = (date: string) => {
  let newDate = date.split('/');
  return (
    ('0' + newDate[0]).slice(-2) +
    '/' +
    ('0' + newDate[1]).slice(-2) +
    '/' +
    newDate[2]
  );
};
