export function cpfIsValid(cpf: string): boolean {
  if (cpf.length !== 11) return false;

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += (10 - i) * Number.parseInt(cpf.charAt(i));
  }

  let verifyingDigit = ((sum * 10) % 11) % 10;

  if (verifyingDigit !== Number.parseInt(cpf.charAt(9))) return false;

  const newString = cpf.substring(0, 9).concat(verifyingDigit.toString());
  sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += (11 - i) * Number.parseInt(newString.charAt(i));
  }

  verifyingDigit = ((sum * 10) % 11) % 10;

  if (verifyingDigit !== Number.parseInt(cpf.charAt(10))) return false;

  return true;
}
