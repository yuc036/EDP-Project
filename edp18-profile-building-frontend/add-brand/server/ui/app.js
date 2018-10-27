$(function() {

    var vince = {
      "id": "20",
      "onSale": true,
      "picture": "https://dynamicassets.azureedge.net/uploads/store/logo/57b2a2da12bc4.png",
      "title": "Vince Camuto\r\n"
    }

    var AddView = Backbone.View.extend({
        el: '#messageAdd',
        events:{
          "click": "addToFav"
        },
        initialize: function () {
          fetch('http://localhost:8080/profileBuilding/brandPage/edpProf',
          {
              headers: { 'Content-Type': 'application/json'},
              method: 'GET'
          })
          .then((resp) => resp.json())
          .then((data) => {
              console.log(data);
          })
          .catch((e) => {
              console.log("ERROR", e);
          });
        },
        addToFav: function() {
            // $('#autosuggest').show();
            // $('.brandContainer').hide();

            // console.log($('#changeP'));
            $('#changeP').html(`<p style="padding: 0 2px"> <img style='padding-right: 3px' src='validationIcon.png'/>This brand has been saved. <span id='profView' style='text-decoration: underline' onclick="window.location.href='/#myBrands'"> Manage preferences </span> <img id="x" style='margin-left: 280px' onclick="$('#hi').hide()"src="closeIcon.png" /></p>`);
            $('#hi').css('background-color', '#D3F9D8');
            $('#hi').css('border-color', '#B2F2BB');


            fetch('http://localhost:8080/profileBuilding/brandPage',
            {
                headers: { 'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify(vince)
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
            })
            .catch((e) => {
                console.log("ERROR", e);
            });
        }
    });

    new AddView();

    var StoreView = Backbone.View.extend({

        el: "#changeP",

        initialize: function () {

        }
    });

    var CartView = Backbone.View.extend({


        el: "#myFavBrands",

        initialize: function () {
            fetch('http://localhost:8080/profileBuilding/createAccount/edp@macys.com',
            {
                headers: { 'Content-Type': 'application/json'},
                method: 'GET'
            })
            .then((resp) => resp.json())
            .then((data) => {
              console.log(data);
              var title = data.preferredBrands[0].title;
              $('#myFavBrands').html(`<div class="brands"><span class="brand-Name">${title}</span></div>`);
              $('#welcomeName').html('<span>Hi, ' + data.firstName + '</span>');
              $('#brandCount').html("<h4 class='title' id='brandCount'>Brands (" + myBrands.length + ") </h4>");
            })
            .catch((e) => {
                console.log("ERROR", e);
            });

        }

    });

    var view = new StoreView();

    var Router = Backbone.Router.extend({

      routes: {
          "brandPage": "brandPage",
          "myBrands": "myBrands"
      },

      brandPage: function() {
          view.stopListening();
          $('.hi').html('');
          $('.brandPage').show();
          $('.myBrandsPage').hide();
          view = new StoreView();
      },

      myBrands: function(query, page) {
          view.stopListening();
          window.scroll(0, 0);
          $('#myFavBrands').html('');
          $('.myBrandsPage').show();
          $('.brandPage').hide();
          view = new CartView();
      }

    });

    var router = new Router();
    Backbone.history.start();

});
