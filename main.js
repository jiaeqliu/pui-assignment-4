var itemDetails = [];
var cart; 
var cartArray = [];

var priceSandal = 39.99;
var cartSubtotal = 0;
var cartTotal = 0;
var taxRate = 0.08;
var shippingRate = 0.05;

// swaps out image based on color selection
function changeImage() {
    if (document.getElementById("color").value == "black") {
        document.getElementById("product-image").src = "img/good-sandal-s.png";
    } else {
        document.getElementById("product-image").src = "img/good-sandal-s-white.png";
    }
}

// constructor to create new cart items with each click
function CartItem() {
    this.name = $("#name").text();
    this.color = $("#color").val();
    this.size = $("#size").val();
    this.quantity = parseInt($("#quantity").val());
    this.price = 39.99;
    
}

$(document).ready(function() {
    
    $("#cart-button").click(function() {
        if($("#quantity").val() == 0) {
            alert("Please choose a quantity to add to your cart.");
        } else {
            var item = new CartItem();
            cartArray.push(item);
            localStorage.setItem("cart_data", JSON.stringify(cartArray));
            alert("Added " + $("#quantity").val() + " item(s) to your cart.");
        }
    //    addCart(new CartItem());
    });   
});



//retrieve and display cart data with total price at bottom
function getCart() {  
    cart = localStorage.getItem("cart_data");
    parsedCart = JSON.parse(cart);
    
    calcCart(parsedCart);
    
    for(i = 0; i < parsedCart.length; i++) {
        $("#cart-table")
            .append($("<tr class=cart-row>")
                .append("<td>" + parsedCart[i].name + "</td>")
                .append("<td>" + parsedCart[i].color + "</td>")
                .append("<td>" + parsedCart[i].size + "</td>")
                .append("<td>" + parsedCart[i].quantity + "</td>")
                .append("<td>" + parsedCart[i].price + "</td>")
                .append("<td class=cart-item> X </td>")
            )                        
    }
    
    $("#cart-table")
        .append($("<tr>")
            .append("<td colspan=4> Subtotal </td>")
            .append("<td colspan=2 id=subtotal> $" + cartSubtotal.toFixed(2) + "</td>")
        )
        .append($("<tr>")
            .append("<td colspan=4> Tax Rate </td>")
            .append("<td colspan=2>" + taxRate.toFixed(2) + "% </td>")
        )
        .append($("<tr>")
            .append("<td colspan=4> Shipping Cost </td>")
            .append("<td colspan=2> $" + (shippingRate * cartSubtotal).toFixed(2) + "</td>")
        )
        .append($("<tr>")
            .append("<td colspan=4> Total Cost </td>")    
            .append("<td colspan=2 id=total> $" + cartTotal.toFixed(2) + "</td>")
        )
    
    $(".cart-item").click(function() {
        var index;
        console.log("clicked");
        
        index = $(".cart-row").index($(this).parent());
        
        cart = localStorage.getItem("cart_data");
        cartArray = JSON.parse(cart);
//        cartSubtotal = cartSubtotal - (cartArray[index].price * cartArray[index].quantity);
//        cartTotal = cartSubtotal + (cartSubtotal * taxRate) + (cartSubtotal * shippingRate);
        
//        console.log("before: " + cartArray);
        cartArray.splice(index, 1);
        calcCart(cartArray);
//        console.log("after: " + cartArray);
        $(this).parent().remove();
        
//        console.log("subtotal: " + cartSubtotal);
//        console.log("total: " + cartTotal);
        $("#subtotal").text("$" + cartSubtotal);
        $("#total").text("$" + cartTotal);
    }); 
}

function calcCart(cart) {
    cartSubtotal = 0;
    for(i = 0; i < cart.length; i++) {   
        var itemCost;
        var price = 39.99;
//        switch(parsedCart[i].name) {
//            case "Good Sandals":
//                price = 39.99;
//                break;
//        }
        itemCost = cart[i].quantity * price;
        cartSubtotal += itemCost;
        console.log(itemCost);
    }
    cartTotal = cartSubtotal + (cartSubtotal * taxRate) + (cartSubtotal * shippingRate);
    console.log(cartSubtotal);
    console.log(cartTotal);
}