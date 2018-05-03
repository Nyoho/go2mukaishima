window.onload = function () {
  init();
}

function init() {
  Vue.component('venue-item', {
    props: ['item'],
    template: `
      <div class="col-md-8 col-lg-4 mt-4 mt-lg-0">
        <div class="fdb-box">
          <div class="row no-gutters align-items-center">
            <div class="col-3">
              <img alt="image" class="img-fluid" src="images/white.png">
            </div>
            <div class="col-8 ml-auto">
              <p>
                <strong><a v-bind:href="item.url">{{ item.title }}</a></strong>
                <br>
              </p>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <p class="text-h3">
                {{ item.description }}
              </p>
              <p v-if="item.name !== ''" class="text-h3">
                by {{ item.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  })

  const xhr = new XMLHttpRequest();
  const url = 'https://script.google.com/macros/s/AKfycbwUVB2P22NgTMJmoMFTK4c66rX53UWLahm-q-uwK4v1AtX76nFx/exec';
  xhr.open("GET", url, true);
  xhr.responseType = 'json';
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
      data = xhr.response;
      console.log(data);
      var app = new Vue({
        el: '#app',
        data: {
          venues: data
        }
      })
    }
  }
  xhr.send();
}

