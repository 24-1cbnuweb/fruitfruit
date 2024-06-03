var dcontainer = document.getElementById("domesticContainer");
var Dpath = "component/domestic.json";
var itemsPerPage = 4;
var currentDPage = 1;


  function showDomestic(data) {
    var startDIndex = (currentDPage - 1) * itemsPerPage;
    var endDIndex = Math.min(startDIndex + itemsPerPage, data.length);
    dcontainer.innerHTML = "";
  
    for (var i = startDIndex; i < endDIndex; i++) {
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
      linkButton.onclick = (function(url) {
        return function() {
          window.open(url, '_blank'); // 링크를 새 탭에서 열기
        };
      })(data[i].url);
      
      linkDiv.appendChild(linkButton);
      div.appendChild(contentDiv);
      div.appendChild(linkDiv);
      dcontainer.appendChild(div); 
    }
  }


function loadDJSON(callback) {
  // jQuery를 사용하여 JSON 파일을 로드합니다.
  $.getJSON(Dpath, function(data) {
    callback(data);
  });
}

// 이전 페이지 버튼 생성
var prevDButton = document.createElement("button");
var prevDimg = document.createElement("img");
prevDButton.className = "btn";
prevDimg.src = "css/left.png";
prevDimg.className = "prevbtn";
prevDimg.style.width="60px";
prevDButton.appendChild(prevDimg);
prevDButton.onclick = prevDPage;

// 다음 페이지 버튼 생성
var nextDButton = document.createElement("button");
var nextDimg = document.createElement("img");
nextDButton.className = "btn";
nextDimg.src = "css/right.png";
nextDimg.className = "nextbtn";
nextDimg.style.width="60px"
nextDButton.appendChild(nextDimg);
nextDButton.onclick = nextDPage;

// 버튼을 컨테이너 앞뒤에 추가
dcontainer.parentNode.insertBefore(prevDButton, dcontainer);
dcontainer.parentNode.insertBefore(nextDButton, dcontainer.nextSibling);

function prevDPage() {
  if (currentDPage > 1) {
    currentDPage--;
    loadDJSON(showDomestic);
  }
}

function nextDPage() {
  currentDPage++;
  loadDJSON(showDomestic);
}

// 초기 로드
loadDJSON(showDomestic);
