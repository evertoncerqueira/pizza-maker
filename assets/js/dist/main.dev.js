"use strict";

var _produtoSabores = _interopRequireDefault(require("./produtoSabores.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Vue.filter('money', function (value) {
  //if (isNaN(value)) return value;    
  return 'R$ ' + parseFloat(value).toFixed(4).slice(0, -2).replace('.', ',');
});
Vue.filter('slug', function (title) {
  if (!title || typeof title != 'string') return "";
  var slug = "";
  var titleLower = title.toLowerCase();
  slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
  slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
  slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
  slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
  slug = slug.replace(/i|í|ì/gi, 'i');
  slug = slug.replace(/c|ç/gi, 'c');
  slug = slug.replace(/đ/gi, 'd');
  slug = slug.replace(/\s*$/g, '');
  slug = slug.replace(/,/, '');
  slug = slug.replace(/\s+/g, '-');
  slug = slug.replace(/\s/g, '-');
  slug = slug.replace('', '-');
  slug = slug.replace(/\(|\)|\//gi, '-');
  slug = slug.replace(/\&/g, 'e');
  slug = slug.replace(/\./g, '-');
  return slug;
});
new Vue({
  el: '#app',
  data: {},
  components: {
    produtosabores: _produtoSabores["default"]
  },
  methods: {},
  mounted: function mounted() {}
});