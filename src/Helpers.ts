const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export default class Helpers {
  static getImageUrl = (image: string) =>
    process.env.PUBLIC_URL + "/images/" + image;

  static formatMoney = (value: any) => moneyFormatter.format(value);
}
