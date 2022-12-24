let Helpers = {};

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

Helpers.getImageUrl = function (image) {
  return process.env.PUBLIC_URL + "/images/" + image;
};

Helpers.formatMoney = function(value) {
  return moneyFormatter.format(value);
};

export default Helpers;
