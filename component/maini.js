var icontainer = document.getElementById("importedContainer");
var Ipath = "component/import.json";
var itemsPerPage = 4;
var currentIPage = 1;

function showImport(data) {
  var startIIndex = (currentIPage - 1) * itemsPerPage;
  var endIIndex = Math.min(startIIndex + itemsPerPage, data.length);
  icontainer.innerHTML = "";

  for (var i = startIIndex; i < endIIndex; i++) {
    var div = document.createElement("div");
    div.className = "item";

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

    linkButton.onclick =(function (url) {
      return function () {
        window.open(url, '_blank'); // 링크를 새 탭에서 열기
      };})(data[i].url);

    linkDiv.appendChild(linkButton);
    div.appendChild(contentDiv);
    div.appendChild(linkDiv);
    icontainer.appendChild(div);
  }
}

function loadIJSON(callback) {
  $.getJSON(Ipath, function (data) {
    callback(data);
  });
}

// 이전 페이지 버튼 생성
var prevIButton = document.createElement("button");
var prevIimg = document.createElement("img");
prevIButton.className = "btn";
prevIimg.src = "css/left.png";
prevIimg.className = "prevbtn";
prevIimg.style.width = "60px";
prevIButton.appendChild(prevIimg);
prevIButton.onclick = prevIPage; // prevPage 함수를 클릭 이벤트 핸들러로 등록

// 다음 페이지 버튼 생성
var nextIButton = document.createElement("button");
var nextIimg = document.createElement("img");
nextIButton.className = "btn";
nextIimg.src = "css/right.png";
nextIimg.className = "nextbtn";
nextIimg.style.width = "60px";
nextIButton.appendChild(nextIimg);
nextIButton.onclick = nextIPage; // nextPage 함수를 클릭 이벤트 핸들러로 등록

// 버튼을 컨테이너 앞뒤에 추가
icontainer.parentNode.insertBefore(prevIButton, icontainer);
icontainer.parentNode.insertBefore(nextIButton, icontainer.nextSibling);

function prevIPage() {
  if (currentIPage > 1) {
    currentIPage--;
    loadIJSON(function (data) {
      showImport(data);
    });
  }
}

function nextIPage() {
  currentIPage++;
  loadIJSON(function (data) {
    showImport(data);
  });
}

loadIJSON(function (data) {
  showImport(data);
});

loadIJSON(showImport);
