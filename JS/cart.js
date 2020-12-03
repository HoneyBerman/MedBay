var shoppingCart = (function() {
    var cart = [];
    
    function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }
    
    function saveCart() {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      function loadCart() {
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (cart === null) {
            cart = []
        }
    }

    loadCart();
    
  
  
    var obj = {};
    
    obj.addItemToCart = function(name, price, count) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }

    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };

    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
 
    return obj;
  })();
  
  
 

$('.cart-hidden').click(function(event) {
    var name = $(this).attr('data-name');
    var price = Number($(this).attr('data-price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });
  
  $('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });
  
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output =   "<tr>"+"<th>Description</th>"+"<th>Price</th> "+"<th>Quantity</th>"+"<th> </th>"+"<th align = 'right'> Amount</th>"+"</tr>";
    for(var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>" 
        + "<td>(₹" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name='" + cartArray[i].name + "'>-</button>"
        + "<input type='number' class='item-count form-control' min='1' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name='" + cartArray[i].name + "'>+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name='" + cartArray[i].name + "'>X</button></td>"
        + " = " 
        + "<td>₹" + cartArray[i].total + "</td>" 
        +  "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }
  
  
  $('.show-cart').on("click", ".delete-item", function(event) {
    event.preventDefault();
    var name = $(this).attr('data-name')
    shoppingCart.removeItemFromCartAll(name);

    displayCart();
  })
  
  
  $('.show-cart').on("click", ".minus-item", function(event) {
    event.preventDefault();
    var name = $(this).attr('data-name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })

  $('.show-cart').on("click", ".plus-item", function(event) {
    event.preventDefault();
    var name = $(this).attr('data-name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  $('.show-cart').on("change", ".item-count", function(event) {
    event.preventDefault();
     var name = $(this).attr('data-name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  displayCart();