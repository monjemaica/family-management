export const countAge = (birthday: string) => {
  const bod = new Date(birthday);

  const month_diff = Date.now() - bod.getTime();

  const age_dt = new Date(month_diff);

  const year = age_dt.getUTCFullYear();

  const age = Math.abs(year - 1970);

  return age;
};
