const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

let getTextDiv = function(text, className) {
  var div = document.createElement("div");
  div.innerHTML = text;
  if (className) {
    div.className = className;
  }
  return div;
};

let getWatchElement = function(watchData) {
  let container = document.createElement("div");
  container.className = "watch";

  let img = document.createElement("img");
  img.src = "images/" + watchData.image;
  let watchLink = document.createElement("a");
  watchLink.href = watchData.link;
  watchLink.append(img);
  container.append(watchLink);

  let data = document.createElement("div");
  data.className = "description";

  data.append(getTextDiv(watchData.brand + " " + watchData.collection));
  data.append(getTextDiv(moneyFormatter.format(watchData.price)));
  container.append(data);

  return container;
};

let createPage = function(data) {
  var page = document.getElementById("page");
  for (var i = 0; i < data.length; i++) {
    var elem = getWatchElement(data[i]);
    page.append(elem);
  }
};

let loadWindow =  function() {
  fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {

    // Sort by price
    data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))

    createPage(data);
  });
};

window.onload = (event) => {
  loadWindow();
};