export const formatNameCategory = (name: string): string => {
  if (!name) return "";
  const cleanedStr = name.replace(/_/g, " ").toLowerCase();
  return cleanedStr.charAt(0).toUpperCase() + cleanedStr.slice(1);
};

export const formatCentsToUSD = (cents?: number): string => {
  const amount = cents ? cents / 100 : 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(amount));
};
