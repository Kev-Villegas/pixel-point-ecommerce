export const PRODUCT_COLORS: Record<string, string> = {
  iPhone: "#000000",
  Samsung: "#404040",
  Google: "#606060",
  OnePlus: "#808080",
  default: "#A0A0A0",
};

export const getProductColor = (productName: string): string => {
  const brand = Object.keys(PRODUCT_COLORS).find(
    (key) => key !== "default" && productName.includes(key),
  );
  return brand ? PRODUCT_COLORS[brand] : PRODUCT_COLORS.default;
};
