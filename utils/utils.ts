export const extractCode = (str: string) => {
  const startIndex = str.indexOf("(") + 1;
  const endIndex = str.indexOf(")");
  const code = str.substring(startIndex, endIndex);
  return code;
};
