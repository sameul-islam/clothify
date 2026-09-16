const DHAKA_SHIPPING_FEE = 60;
const OUTSIDE_DHAKA_SHIPPING_FEE = 120;

const calculateShipping = (city) => {
  const normalizedCity = city?.trim().toLowerCase();

  if (!normalizedCity) {
    return OUTSIDE_DHAKA_SHIPPING_FEE;
  }

  if (normalizedCity === "dhaka") {
    return DHAKA_SHIPPING_FEE;
  }

  return OUTSIDE_DHAKA_SHIPPING_FEE;
};

module.exports = {
  calculateShipping,
  DHAKA_SHIPPING_FEE,
  OUTSIDE_DHAKA_SHIPPING_FEE,
};