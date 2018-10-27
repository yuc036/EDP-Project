$(function() {

    var LicensePlate = Backbone.Model.extend({});

    // var CartItem = Backbone.Model.extend({
    //     url: '/cart'
    // });

    var myBrands = [];
    var existNum = [];

    var LicensePlateView = Backbone.View.extend({
        tagName:  "div",
        attributes: {class: 'col-md-4', style: 'margin-top: 20px'},
        events: {
            "click .addToFav": "addToFav",
            "click .reFromFav": "reFromFav"
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            var source = $('#brand-template').html();
            var template = Handlebars.compile(source);
            var html = template(this.model.toJSON());

            var num = parseInt(this.model.attributes.id);
            // console.log(num);

            if (num < 7) {
                existNum.push(num);
            }

            // console.log(existNum);

            if (existNum.includes(num)) {
                this.$el.html(html);
            } else if (existNum.length <= 10) {
                this.$el.html(html);
            }


            // console.log(this);

            // if (num < 7) {
            //     this.$el.html(html);
            // }

            // this.$el.html(html);
            return this;
        },
        addToFav: function() {
            // var cartItem = new CartItem(this.model.attributes);
            // cartItem.save();

            if (!myBrands.includes(this.model.attributes)) {
                myBrands.push(this.model.attributes);
                var title = this.model.attributes.title.slice(0, -2);
                var split = title.split(" ")[0];
                $('#chooseBrands').css("padding-top", "20px");
                $('#chooseBrands').append(`<span class='addedBrands' id='${split}'>${title} <a><i class='fa fa-times removeIcon' aria-hidden='true'></i></a></span>`);
            }

            // console.log(myBrands);

            for(var i = existNum.length-1; i>=0; i--) {
                if ( existNum[i] === parseInt(this.model.attributes.id)) existNum.splice(i, 1);
            }
            // console.log(existNum);

            // console.log(this.model);
            var model = plateList.at(parseInt(this.model.attributes.id)+5);
            this.model = model;
            // console.log(this.model);

            // this.replace();
            this.render();
        },
        reFromFav: function() {
            for(var i = existNum.length-1; i>=0; i--) {
                if ( existNum[i] === parseInt(this.model.attributes.id)) existNum.splice(i, 1);
            }
            // console.log(existNum);

            // console.log(this.model);
            var model = plateList.at(parseInt(this.model.attributes.id)+5);
            this.model = model;
            // console.log(this.model);
            this.render();
        }
    });

    var FavBrandView = Backbone.View.extend({
        tagName:  "div",
        initialize: function () {
            this.render();
        },
        render: function () {
            var source = $('#fav-brand-template').html();
            var template = Handlebars.compile(source);
            var html = template(this.model.toJSON());
            this.$el.html(html);
            return this;
        }
    });

    var LicensePlateList = Backbone.Collection.extend({
        model: LicensePlate,
        url: '/data'
    });

    var plateList = new LicensePlateList();

    var CartPlateList = Backbone.Collection.extend({});

    var cartPlateList = new CartPlateList();


    var searchResults = [];

    var SearchView = Backbone.View.extend({
        el: '.mysearch',
        events:{
            // 'keyup': 'search'
            'keyup':  _.debounce(function() {
                this.search();
            }, 500)
        },
        search: function() {
            $('#autosuggest').show();
            $('.brandContainer').hide();

            var searchItem = $('.mysearch').val();

            // console.log(plateList.models);
            searchResults = [];
            $(".mySearchResult").empty();

            plateList.models.forEach(function(e) {
                var title = e.attributes.title;
                if (title.toLowerCase().includes(searchItem.toLowerCase())) {
                    searchResults.push(e);
                }
            });

            var path = "<path class='nui-icon-large-heart-empty-32 pathFav' d='M17.75 2.185a5.73 5.73 0 0 0-4.044 1.666l-.003.003-.007.008L12 5.556l-1.694-1.694-.009-.009-.004-.003a5.75 5.75 0 0 0-8.125 8.132L12 21.815l9.831-9.834a5.748 5.748 0 0 0-4.081-9.796z'></path>";
            var svg = "<svg focusable='false' height='24' width='24' class='nui-icon nui-icon-large-heart-empty addToFavFS'>" + path + "</svg>"
            var likeBtn = "<div class='button_23TkJX' role='button' style='float: right; margin-right: 0; padding: 5px 0;' tabindex='0' data-element='touch-target npr-style-profile-brand-option-like-button'>"
                            + svg + "<span class='buttonLabel_ZaUmbJ visuallyHidden_ZYsR1a'>Like Brand</span></div>";

            searchResults.forEach(function(e) {
                $("#autosuggest").append(
                    "<li role='option' class='mySearchResult'><div class='suggestion' style='margin-left: 10px'><text class='brandTitleName'>" + e.attributes.title + "</text>" + likeBtn + "</div></li>");
            });

            // console.log(searchResults);
        }
    });

    var CloseView = Backbone.View.extend({
        // tagName: "div",
        el: "body",
        events: {
            "click": "closeSearch",
            "click .pathFav": "addToFav"
        },
        closeSearch: function(e) {
            if (e.target == $(".mysearch")[0]) {
                new SearchView();
            } else {
                $('#autosuggest').hide();
                $('.brandContainer').show();
                $('.mysearch').val("");
                new RemoveFavView();
            }
        },
        addToFav: function(e) {
            // console.log(e.target);
            // console.log("added");
            var each = $(e.target).parent().parent().prev()[0].childNodes[0].nodeValue.slice(0,-1);

            plateList.models.forEach(function(e) {
                var title = e.get('title').slice(0,-2);
                if (title == each) {
                    if (!myBrands.includes(e.attributes)) {
                        myBrands.push(e.attributes);
                        var split = each.split(" ")[0];
                        $('#chooseBrands').css("padding-top", "20px");
                        $('#chooseBrands').append(`<span class='addedBrands' id='${split}'>${each} <a><i class='fa fa-times removeIcon' aria-hidden='true'></i></a></span>`);
                        // var removeBrand = "#"+split;
                        // console.log(removeBrand);
                    }
                }
                // var cartItem = new CartItem(e.attributes);
                // cartItem.save();
            });
            // console.log(myBrands);
        }
    });

    new CloseView({});

    var RemoveFavView = Backbone.View.extend({
        // tagName: "div",
        el: ".removeIcon",
        events: {
            "click": "removeFav"
        },
        removeFav: function(e) {
            var each = $(e.target).parent().parent()[0].childNodes[0].nodeValue.slice(0,-1);
            for (var i = 0; i < myBrands.length; i++) {
                if (myBrands[i].title.includes(each)) {
                    var brandName = myBrands[i].title.slice(0, -2);
                    var split = brandName.split(" ")[0];
                    var removeBrand = "#"+split;
                    console.log($(removeBrand)[0]);
                    // console.log(removeBrand.slice(0, -2));
                    // console.log(removeBrand);
                    myBrands.splice(i, 1);
                    console.log(myBrands);
                    $(removeBrand).remove();
                }
            }
        }
    });

    // new RemoveFavView();


    var StoreView = Backbone.View.extend({

        el: ".brandContainer",

        initialize: function () {
            window.scroll(0, 0);
            this.listenTo(plateList, "add", this.addPlate);
            plateList.fetch();
        },
        addPlate: function(plate) {
            let model = new LicensePlateView({model: plate});

            if (parseInt(model.cid.slice(4,6)) < 32) {
                // console.log(model);
                this.$el.append(model.render().el);
            }
            // this.$el.append(model.render().el);
        }
    });

    var CartView = Backbone.View.extend({

        el: "#myFavBrands",

        initialize: function () {
            fetch('http://localhost:8080/profileBuilding/createAccount/' + $('#ca-profile-email').val(),
            {
                headers: { 'Content-Type': 'application/json'},
                method: 'GET'
            })
            .then((resp) => resp.json())
            .then((data) => {
                // console.log(data.preferredBrands);
                $('#welcomeName').html('<span>Hi, ' + data.firstName + '</span>');
                $('#brandCount').html("<h4 class='title' id='brandCount'>Brands (" + myBrands.length + ") </h4>");
                data.preferredBrands.forEach(function(e) {
                    cartPlateList.add(e);
                })
                // console.log(cartPlateList);
            })
            .catch((e) => {
                console.log("ERROR", e);
            });

            this.listenTo(cartPlateList, "add", this.addPlate);
            // cartPlateList.fetch();
        },
        addPlate: function(plate) {
            let model = new FavBrandView({model: plate});
            this.$el.append(model.render().el);
        }

    });

    var CreateView = Backbone.View.extend({
        el: '#ca-profile-submit',
        // initialize: function(){
        // },
        events: {
            "click": "submit"
        },
        submit: function() {
            // var myBrands = [];
            // for (var i=0; i<cartPlateList.models.length; i++) {
            //     myBrands[i] = cartPlateList.models[i].attributes;
            // }
            // console.log(myBrands);

            const payload = {
                firstName: $('#ca-profile-firstname').val(),
                lastName: $('#ca-profile-lastname').val(),
                email: $('#ca-profile-email').val(),
                password: $('#ca-profile-password').val(),
                dobMonth: $('#ca-profile-birth-month').val(),
                dobDay: $('#ca-profile-birth-day').val(),
                preferredBrands: myBrands
            }

            // console.log(payload);
            fetch('http://localhost:8080/profileBuilding/createAccount',
            {
                headers: { 'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify(payload)
            })
            // .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
            })
            .catch((e) => {
                console.log("ERROR", e);
            });
        }
    });

    new CreateView();

    var view = new StoreView();

    var Router = Backbone.Router.extend({

      routes: {
          "createAccount": "createAccount",
          "myBrands": "myBrands"
      },

      createAccount: function() {
          view.stopListening();
          window.scroll(0, 0);
          $('.brandContainer').html('');
          $('.createAccount').show();
          $('.myBrandsPage').hide();
          view = new StoreView();
      },

      myBrands: function(query, page) {
          view.stopListening();
          window.scroll(0, 0);
          $('#myFavBrands').html('');
          $('.myBrandsPage').show();
          $('.createAccount').hide();
          view = new CartView();
      }

    });

    var router = new Router();

    Backbone.history.start();

});
