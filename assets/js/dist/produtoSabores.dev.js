"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  template: '#produtoSabores',
  components: {},
  props: [],
  data: function data() {
    return {
      displayCategory: false,
      displayNavSabores: false,
      displayNavBordas: false,
      tempo_entrega: 0,
      tamanhos: [],
      currentCodTamanho: "",
      divisoes: [{
        title: '1 Sabor',
        numDivisao: 1
      }],
      extras: [],
      adicionais: [],
      currentExtra: "Escolha a Borda",
      produtos: [],
      labelIngredientes: "Selecione um sabor para editar os Ingredientes",
      ingredientes: [],
      ingredientesExtra: [],
      tituloIngrediente: "Ingredientes",
      tamanhoItem: '',
      sabores: [],
      ingredienteRender: false,
      qtdDivisoes: 1,
      numDivisao: 1,
      currentSlice: "slice-1-de-1",
      currentProdutoID: undefined,
      idSite: 0,
      valorTotal: 0.0,
      maiorValor: 0.0,
      currentArrSliceKey: 0,
      produtoRecheios: [],
      desc_extra: false,
      total_extra: 0.00,
      order: {
        qtdDivisoes: "",
        ingredientesExtra: [],
        valorTotal: 0.00,
        tamanhoItem: this.tamanhoItem,
        produtoRecheios: this.produtoRecheios
      }
    };
  },
  methods: _defineProperty({
    mudaTamanho: function mudaTamanho(tamanho, codTamanho) {
      this.tamanhoItem = tamanho;
      this.currentCodTamanho = codTamanho;
      this.produtoRecheios = [];
      this.resetPrato();
      this.resetIngredientes();
      this.updateOrder();
    },
    mudaDivisao: function mudaDivisao(numDivisao, title) {
      this.resetPrato();
      var elems = document.querySelectorAll("#formapizza");
      [].forEach.call(elems, function (el) {
        el.classList.remove("active");
      });
      var element = document.querySelectorAll("div#formapizza.divisao-" + numDivisao)[0];
      element.classList.add("active");
      this.qtdDivisoes = title;
      this.produtoRecheios = Array(numDivisao);
      this.numDivisao = numDivisao;
      this.resetPrato();
      this.resetIngredientes();
      this.updateOrder();
    },
    valoresPadroes: function valoresPadroes() {
      this.tamanhoItem = this.tamanhos[0].nome;
      this.currentCodTamanho = this.tamanhos[0].codigo;
      this.qtdDivisoes = this.divisoes[0].title;
      this.currentSlice = 'slice-1-de-1';
      this.resetPrato();
      this.resetIngredientes();
      this.currentArrSliceKey = 0;
      this.currentProdutoID = undefined;
      this.produtoRecheios = [];
      var elems = document.querySelectorAll("#formapizza");
      [].forEach.call(elems, function (el) {
        el.classList.remove("active");
      });
      var element = document.querySelectorAll("div#formapizza.divisao-1")[0];
      element.classList.add("active");
      this.updateOrder();
    },
    addProduto: function addProduto(currentSlice, arrSlice) {
      $('#myModal').modal('show');
      this.currentSlice = currentSlice;
      this.currentArrSliceKey = arrSlice;
    },
    addRecheio: function addRecheio(produto, currentSlice, currentArrSliceKey, produtoKey) {
      $('#myModal').modal('hide');
      var slice = document.querySelectorAll(".pztop-abs." + currentSlice)[0];
      slice.classList.add("recheioPizza");
      this.currentProdutoID = produtoKey;
      var tituloproduto = produto.nome_produto;
      tituloproduto = tituloproduto.replace("Pizza de ", "");
      tituloproduto = tituloproduto.replace("Pizza ", "");
      slice.title = tituloproduto;
      this.produtoRecheios[currentArrSliceKey] = {
        slice: currentSlice,
        produtoID: produtoKey,
        produtoNome: produto.nome_produto,
        preco: this.definePreco(produto.precos[this.currentCodTamanho]),
        opcoes: []
      };
      var removeSabor = document.querySelectorAll(".icones.removesabor." + currentSlice)[0];
      removeSabor.classList.add("show");
      this.sabores.push({
        produto: produto,
        'slice': currentSlice
      });
      this.showIngredientes(produto);
      this.updateOrder();
    },
    editarRecheio: function editarRecheio(currentSlice, arrSlice) {
      this.currentArrSliceKey = arrSlice;
      this.showIngredientes(this.produtos[this.produtoRecheios[arrSlice].produtoID]);
    },
    removeRecheio: function removeRecheio(recheio) {
      var slice = document.querySelectorAll(".pztop-abs." + recheio)[0];
      slice.classList.remove("recheioPizza");
      slice.title = "";
      var btn = document.querySelectorAll(".icones.removesabor." + recheio)[0];
      btn.classList.remove("show");

      for (var i = 0; i < this.sabores.length; i++) {
        if (this.sabores[i]["slice"] === recheio) this.sabores.splice(i, 1);
      }

      for (var i = 0; i < this.produtoRecheios.length; i++) {
        if (typeof this.produtoRecheios[i] != "undefined") {
          if (this.produtoRecheios[i]["slice"] === recheio) {
            this.produtoRecheios[i] = undefined;
          }
        }
      }

      this.resetIngredientes();
      this.updateOrder();
    },
    showIngredientes: function showIngredientes(produto) {
      this.resetIngredientes(); // Detalhes do Produto

      this.labelIngredientes = "Carregando ingredientes...";
      var tituloproduto = produto.nome_produto;
      tituloproduto = tituloproduto.replace("Pizza de ", "");
      tituloproduto = tituloproduto.replace("Pizza ", "");
      this.tituloIngrediente = tituloproduto;
      var self = this;
      self.ingredientes = [];

      if ("ingredientes" in produto && produto.ingredientes.length > 0) {
        produto.ingredientes.forEach(function (itemOpcao) {
          var itemIngrediente = {
            nome: itemOpcao,
            isSelected: false
          };
          self.produtoRecheios[self.currentArrSliceKey].opcoes.forEach(function (recheioOption) {
            if (itemIngrediente.nome == recheioOption.descricao) {
              itemIngrediente.isSelected = true;
            }
          });
          self.ingredientes.push(itemIngrediente);
        });
      } else {
        this.labelIngredientes = "Nenhum Ingrediente.";
      }
    },
    selecionaOpcao: function selecionaOpcao(opcao, currentArrSliceKey, index) {
      this.ingredienteRender = false;
      this.produtoRecheios[currentArrSliceKey]['opcoes'].push({
        descricao: opcao.nome
      });
      this.ingredientes[index].isSelected = true;
      this.ingredienteRender = true;
      this.updateOrder();
    },
    removeOpcao: function removeOpcao(opcao, currentArrSliceKey, index) {
      var _this = this;

      this.ingredienteRender = false;
      var opcoes = this.produtoRecheios[currentArrSliceKey]['opcoes'];
      opcoes.forEach(function (opcao_item, index_opcao) {
        if (opcao.id_receita_opcao_item == opcao_item.id_receita_opcao_item) {
          _this.produtoRecheios[currentArrSliceKey]['opcoes'].splice(index_opcao, 1);
        }
      });
      this.ingredientes[index].isSelected = false;
      this.ingredienteRender = true;
      this.updateOrder();
    },
    resetIngredientes: function resetIngredientes() {
      this.ingredientes = [];
      this.tituloIngrediente = "Ingredientes";
      this.labelIngredientes = "Selecione um Sabor para Editar os Ingredientes";
    },
    resetBtnRemoveSabor: function resetBtnRemoveSabor() {
      var elems = document.querySelectorAll(".icones.removesabor");
      [].forEach.call(elems, function (el) {
        el.classList.remove("show");
      });
    },
    resetPrato: function resetPrato() {
      var elems = document.querySelectorAll(".pztop-abs");
      [].forEach.call(elems, function (el) {
        el.classList.remove("recheioPizza");
      });
      this.sabores = [];
      this.ingredientesExtra = [];
      this.currentExtra = "Escolha a Borda";
      this.resetBtnRemoveSabor();
    },
    addExtra: function addExtra(extra) {
      if (extra == -"1") {
        this.ingredientesExtra = []; //this.currentExtra="Sem borda!";

        this.updateOrder();
        return false;
      }

      this.ingredientesExtra = [];
      this.ingredientesExtra.push(extra);
      this.currentExtra = extra.nome;
      this.updateOrder();
    },
    updateOrder: function updateOrder() {
      this.maiorValor = 0.00;
      this.order.qtdDivisoes = this.qtdDivisoes;
      this.order.ingredientesExtra = this.ingredientesExtra;
      this.order.tamanhoItem = this.tamanhoItem;
      this.order.produtoRecheios = this.produtoRecheios;
      this.order.valorTotal = this.calculaValores().toFixed(2);
    },
    calculaValores: function calculaValores() {
      var _this2 = this;

      var valor = 0;
      valor - valor;

      if (this.produtoRecheios.length > 0) {
        this.produtoRecheios.forEach(function (recheio) {
          if (typeof recheio != "undefined") {
            if (_this2.regraCalculo == "maiorValor") {
              if (recheio.preco > _this2.maiorValor) _this2.maiorValor = recheio.preco;
            } else if (_this2.regraCalculo == "divisao") {
              valor = valor + recheio.preco;
            }
          }
        });

        if (this.regraCalculo == "maiorValor") {
          valor = valor + this.maiorValor;
        }
      } //adicionais


      if (this.ingredientesExtra.length > 0) {
        this.ingredientesExtra.forEach(function (extra) {
          valor = valor + parseFloat(extra.precos[_this2.currentCodTamanho]);
        });
      }

      return valor;
    },
    definePreco: function definePreco(preco) {
      var newValor = "";

      if (this.regraCalculo == "divisao") {
        newValor = preco / parseFloat(this.qtdDivisoes);
      } else if (this.regraCalculo == "maiorValor") {
        newValor = parseFloat(preco);
      }

      return parseFloat(newValor.toFixed(2));
    },
    formataDivisoes: function formataDivisoes(qtddivisoes) {
      this.divisoes = [];

      for (var index = 0; index < qtddivisoes; index++) {
        if (index == 0) this.divisoes[index] = {
          title: index + 1 + ' Sabor',
          numDivisao: index + 1
        };else this.divisoes[index] = {
          title: index + 1 + ' Sabores',
          numDivisao: index + 1
        };
      }
    },
    addProdutoCarrinho: function addProdutoCarrinho() {
      if (!this.isFinished()) return alert("Você não terminou sua pizza!");
      alert("Pizza comprada! bom apetite!");
      this.valoresPadroes();
    },
    getDescProduto: function getDescProduto() {
      var _this3 = this;

      var desc = '';
      this.order.produtoRecheios.forEach(function (x, i) {
        desc += x.produtoNome + ' ';
        desc += x.opcoes.map(function (y) {
          return 'S/ ' + y.descricao;
        }).join(", ");
        desc += "\n";
        if (_this3.order.produtoRecheios.length > 1 && i < _this3.order.produtoRecheios.length - 1) desc += " / ";
      });
      if (this.order.ingredientesExtra.length > 0) desc += this.order.ingredientesExtra.map(function (x) {
        return x.nome;
      }).join(", ");
      return desc;
    },
    sanitizeTitle: function sanitizeTitle(title) {
      return this.$options.filters['slug'](title);
    },
    sanitizeProdutosNome: function sanitizeProdutosNome(produtos) {
      for (var i = 0; i < produtos.length; i++) {
        var tituloproduto = produtos[i].nome_produto;
        tituloproduto = tituloproduto.replace("Pizza de ", "");
        tituloproduto = tituloproduto.replace("Pizza ", "");
        this.produtos[i].nome_produto = tituloproduto;
      }
    },
    inicializarSabores: function inicializarSabores() {
      var _this4 = this;

      fetch("db/sabores.json").then(function (r) {
        return r.json();
      }).then(function (json) {
        _this4.regraCalculo = json.dados.config.metodo_preco;
        _this4.tempo_entrega = json.dados.config.tempo_entrega[0].tempo_entrega;
        _this4.extras = json.dados.extras;
        _this4.adicionais = json.dados.adicionais;
        _this4.tamanhos = json.dados.tamanhos;
        _this4.produtos = json.dados.sabores;

        _this4.sanitizeProdutosNome(_this4.produtos);

        _this4.formataDivisoes(json.dados.config.divisoes);

        _this4.valoresPadroes();
      }, function (response) {
        console.log('Error loading json:', response);
      });
    },
    isFinished: function isFinished() {
      var finished = true;
      if (this.produtoRecheios.length == 0) finished = false;else {
        for (var index = 0; index < this.numDivisao; index++) {
          if (typeof this.produtoRecheios[index] == "undefined" || this.produtoRecheios[index].length == 0) {
            finished = false;
          }
        }
      }
      return finished;
    },
    abrirCarrinho: function abrirCarrinho() {
      alert("Pizza comprada! bom apetite!");
      this.valoresPadroes();
    }
  }, "resetPrato", function resetPrato() {
    var elems = document.querySelectorAll(".pztop-abs");
    [].forEach.call(elems, function (el) {
      el.classList.remove("recheioPizza");
    });
    this.sabores = [];
    this.ingredientesExtra = [];
    this.currentExtra = "Escolha a Borda";
    this.resetBtnRemoveSabor();
  }),
  mounted: function mounted() {
    this.inicializarSabores();
  }
};
exports["default"] = _default;