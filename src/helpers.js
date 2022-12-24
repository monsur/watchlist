let Helpers = {};

Helpers.getImageUrl = function (image) {
  return process.env.PUBLIC_URL + "/images/" + image;
};

export default Helpers;
