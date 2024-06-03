var ipcontainer = document.getElementById("IpageContainer");
var Ipath = "component/import.json";
var itemsPerRow = 4;
var totalItems = 100; //일단 100개만 여기에 밑에 스크롤 하면 추가되는 방식으로 해야함
var currentIPage = 1;

function showPImport(data) {
  var startIIndex = (currentIPage - 1) * totalItems;
  var endIIndex = Math.min(startIIndex + totalItems, data.length);
  ipcontainer.innerHTML = "";

  var divRow;
  
  for (var i = startIIndex; i < endIIndex; i++) {
    var itemIndexInRow = (i - startIIndex) % itemsPerRow;

    if (itemIndexInRow === 0) {
      // 새로운 줄을 시작할 때마다 div 요소를 생성하여 아이템을 묶어줍니다.
      divRow = document.createElement("div");
      divRow.className = "row"; // 각 줄을 나타내는 CSS 클래스 추가
      ipcontainer.appendChild(divRow);
    }

    var divItem = document.createElement("div");
    divItem.className = "item";

    var contentDiv = document.createElement("div");
    contentDiv.className = "item-content";
    contentDiv.innerHTML = `
      <img src="${data[i].img}" class="img">
      <h3>${data[i].name}</h3>
      <a><del>${data[i].preprice}</del></a>
      <p style="color:orange; display:inline">${data[i].discount}</p> 
      <p class="price">${data[i].price}</p>
      <a>(${data[i].perprice}/100g)</a>
    `;

    var linkDiv = document.createElement("div");
    linkDiv.className = "link-div";

    var linkButton = document.createElement("button");
    linkButton.className = "link-button";

    var linkImg = document.createElement("img");
    linkImg.src = "./css/link.png";
    linkImg.alt = "link";
    linkImg.className = "link-img";

    linkButton.appendChild(linkImg);
    linkButton.onclick = (function(url) {
      return function() {
        window.open(url, '_blank'); // 링크를 새 탭에서 열기
      };
    })(data[i].url);

    linkDiv.appendChild(linkButton);
    divItem.appendChild(contentDiv);
    divItem.appendChild(linkDiv);
    divRow.appendChild(divItem);
  }
}


function loadIpJSON(callback) {
  $.getJSON(Ipath, function (data) {
    callback(data);
  });
}


loadIpJSON(function (data) {
  showPImport(data);
});
