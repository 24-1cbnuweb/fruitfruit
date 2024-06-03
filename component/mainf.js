var fcontainer = document.getElementById("frozenContainer");
var Fpath = "component/frozen.json";
var itemsPerPage = 4;
var currentFPage = 1;

function showFrozen(data) {
  var startFIndex = (currentFPage - 1) * itemsPerPage;
  var endFIndex = Math.min(startFIndex + itemsPerPage, data.length);
  fcontainer.innerHTML = "";

  for (var i = startFIndex; i < endFIndex; i++) {
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
    linkButton.onclick = (function (url) {
      return function () {
        window.open(url, '_blank'); // 링크를 새 탭에서 열기
      };
    })(data[i].url);

    linkDiv.appendChild(linkButton);
    div.appendChild(contentDiv);
    div.appendChild(linkDiv);
    fcontainer.appendChild(div);
  }
}

function loadFJSON(callback) {
  // jQuery를 사용하여 JSON 파일을 로드합니다.
  $.getJSON(Fpath, function (data) {
    callback(data);
  });
}

// 이전 페이지 버튼 생성
var prevFButton = document.createElement("button");
var prevFimg = document.createElement("img");
prevFButton.className = "btn";
prevFimg.src = "css/left.png";
prevFimg.className = "prevbtn";
prevFimg.style.width = "60px";
prevFButton.appendChild(prevFimg);
prevFButton.onclick = prevFPage; // prevPage 함수를 클릭 이벤트 핸들러로 등록

// 다음 페이지 버튼 생성
var nextFButton = document.createElement("button");
var nextFimg = document.createElement("img");
nextFButton.className = "btn";
nextFimg.src = "css/right.png";
nextFimg.className = "nextbtn";
nextFimg.style.width = "60px";
nextFButton.appendChild(nextFimg);
nextFButton.onclick = nextFPage; // nextPage 함수를 클릭 이벤트 핸들러로 등록

// 버튼을 컨테이너 앞뒤에 추가
fcontainer.parentNode.insertBefore(prevFButton, fcontainer);
fcontainer.parentNode.insertBefore(nextFButton, fcontainer.nextSibling);

function prevFPage() {
  if (currentFPage > 1) {
    currentFPage--;
    loadFJSON(function (data) {
      showFrozen(data);
    });
  }
}

function nextFPage() {
  currentFPage++;
  loadFJSON(function (data) {
    showFrozen(data);
  });
}

loadFJSON(function (data) {
  showFrozen(data);
});

loadFJSON(showFrozen);
