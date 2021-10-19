import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const hash = async (password: string) => {
  const res = await bcrypt.hash(password, saltRounds);

  return res;
};

export const compare = async (password: string, hash: string) => {
  const res = await bcrypt.compare(password, hash);

  return res;
};
