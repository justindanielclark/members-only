export const invalidCharsString = "[({</.,;:'\"`|-_+=*^%$#@&!\\>})] ";
export const invalidChars = new Map<string, true>(invalidCharsString.split("").map((char) => [char, true]));
export const hasValidChars = (term: string): boolean => {
  let result = false;
  for (let i = 0; i < term.length; i++) {
    if (invalidChars.get(term.substring(i, i + 1)) == undefined) {
      result = true;
      break;
    }
  }
  return result;
};
export const countValidChars = (term: string): number => {
  let count = 0;
  for (let i = 0; i < term.length; i++) {
    if (invalidChars.get(term.substring(i, i + 1)) == undefined) {
      count++;
    }
  }
  return count;
};
export default invalidChars;
