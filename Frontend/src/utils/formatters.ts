// TODO: Create formatting functions (dates, currency, card types)
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString();
};

export const formatCardType = (type: string): string => {
  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
};
