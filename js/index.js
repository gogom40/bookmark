var webName = document.getElementById("webName");
var webUrl = document.getElementById("webUrl");
var btnsub = document.getElementById("btnsub");

var web = [];

if (localStorage.getItem("webData") != null) {
  web = JSON.parse(localStorage.getItem("webData"));
  showData();
}

function addWeb() {
  var site = {
    name: webName.value,
    url: webUrl.value,
  };
  for (var i = 0; i < web.length; i++) {
    if (
      site.name == validationName() ||
      site.url == validationUrl() ||
      site.name.length == 0 ||
      site.url.length == 0
    ) {
      document.getElementById("Data").innerHTML = `
        <div
          class="box-mass position-absolute start-0 top-0 w-100 h-100 d-flex justify-content-center align-items-center text-md-start"
          id="Data">
          <div class="box-inside bg-white p-4 rounded-2 shadow-lg">
            <header class="box-header w-100 d-flex justify-content-between align-items-center mb-4">
              <div class="fa-lg"><i class="fa-solid fa-circle" style="color: #f15f5d;"></i><i class="fa-solid fa-circle ms-2" style="color: #febe2e;"></i><i class="fa-solid fa-circle ms-2" style="color: #4db748;"></i></div>
              <div><button onclick="deletWeb(${i})" type="button" class="btn-close"  aria-label="Close"></button></div>
            </header>
            <p class="m-0 pb-4 w-75">Site Name or Url is not valid, Please
              follow the rules below :</p>
            <ol class="info list-unstyled">
              <li class=""><span><i class="fa-regular fa-circle-right fa-lg px-2" style="color: #bb4120;"></i></span>Site name must contain at least 3 characters</li>
              <li class=""><span><i class="fa-regular fa-circle-right fa-lg px-2" style="color: #bb4120;"></i></span>Site URL must be a valid one</li>
            </ol>
          </div>
        </div>`;
      return false;
    }
  }
  webName.classList.remove('is-invalid')
  webUrl.classList.remove('is-invalid')
  web.push(site);
  localStorage.setItem("webData", JSON.stringify(web));
  showData();
}

function showData() {
  var temp = "";
  for (var i = 0; i < web.length; i++) {
    temp += `<tr>
        <td class="fs-5">${i}</td>
        <td class="fs-5">${web[i].name}</td>
        <td>
        <a href="${web[i].url}" target="_blanck"> <button class="btn btn-success"><i class="fa-solid fa-eye fa-lg mx-2" style="color: #ffffff;"></i><span class="">Visit</span></button></a>
      </td>
        <td>
          <button class="btn btn-danger" onclick = "deletWeb(${i})"><i class="fa-solid fa-trash-can fa-lg mx-2" style="color: #ffffff;"></i><span class="">Delete</span></button>
        </td>
      </tr>`;
  }
  document.getElementById("Data").innerHTML = temp;
}

function deletWeb(index) {
  web.splice(index, 1);
  localStorage.setItem("webData", JSON.stringify(web));
  showData();
}
function validationName() {
  var text= webName;
  var regex=/^[a-z]{4,8}$/i;
  if (regex.test(text) ==true) {
    webName.classList.add('is-valid')
    webName.classList.remove('is-invalid')
    return true;
  }else{
    webName.classList.add('is-invalid')
    webName.classList.remove('is-valid')
  }
}
function validationUrl() {
  var text= webUrl;
  var regex=/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  if (regex.test(text) ==true) {
    webUrl.classList.add('is-valid')
    webUrl.classList.remove('is-invalid')
    return true;
  }else{
    webUrl.classList.add('is-invalid')
    webUrl.classList.remove('is-valid')
  }
}
