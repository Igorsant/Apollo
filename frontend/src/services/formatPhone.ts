export const formatPhone = (phone: string): string => {
  const firstPartSize = phone.length === 11 ? 5 : 4;

  return `(${phone.substring(0, 2)}) ${phone.substring(2, 2 + firstPartSize)}-${phone.substring(
    2 + firstPartSize,
    phone.length
  )}`;
};
