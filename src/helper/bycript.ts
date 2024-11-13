import * as bcrypt from 'bcrypt';

export const encriptPassword = async (pass: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pass, salt);
  return hash;
};

export const decriptPassword = async (pass: string, hasPass:string) => {
    const isMatch = await bcrypt.compare(pass, hasPass);
  return isMatch;
};
