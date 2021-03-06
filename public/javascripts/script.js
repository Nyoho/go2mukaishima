var app;

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
            <div class="col-3 icon">
              <i v-if="item.url.match(/twitter.com/)" class="fab fa-twitter"></i>
              <i v-else class="fas fa-info-circle"></i>
            </div>
            <div class="col-8 ml-auto">
              <p>
                <strong><a v-bind:href="item.url">{{ item.title }}</a></strong>
              </p>
              <p class="item-url">
                <a v-bind:href="item.url">{{ item.url }}</a>
              </p>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <p class="text-h3" v-html="item.description">
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

  app = new Vue({
    el: '#app',
    data: {
      venues: []
    }
  });

  loadData();
  setInterval(loadData, 10*60*1000); // 10 min
}

function loadData() {
  const xhr = new XMLHttpRequest();
  const url = 'https://script.google.com/macros/s/AKfycbwUVB2P22NgTMJmoMFTK4c66rX53UWLahm-q-uwK4v1AtX76nFx/exec';
  xhr.open("GET", url);
  xhr.responseType = 'json';
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
      data = xhr.response;
      app.venues = data;
      twttr.widgets.load();
    }
  }
  xhr.send();
}

