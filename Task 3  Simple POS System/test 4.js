$(document).ready(function(){
    $("#pd-d").hide()
    $("#cu-d").hide()

    //Add Product and price
    var products=[];// array for products
    $("#pd-add-btn").click(function(){
        if($("#pd-name").val()!='' && $("#pd-price").val()){
            $("#show-pd").show();
            $("#pd-d").show()
            var pdname=$("#pd-name").val()
            var pdprice=$("#pd-price").val()
            if (pdname && pdprice) {
                var item = {
                  product: pdname,
                  price: pdprice
                };
          
                products.push(item);
                // console.log(products)
                displayPdTable();
                selectPd();
                $("#pd-name").val('')
                $("#pd-price").val('')
              } 
          
        }
        else {
            alert('Please enter a product and price.');
          }
    });

    //Delete Product
    $("#pd-d").on('click', 'button.pdDeleteBtn', function(){

        // console.log('Product Deleted')
        var row = $(this).closest('tr');
        var product = row.find('td:first-child').text();

        products = products.filter(function(item){
            return item.product !== product;
        });
        row.remove();
        selectPd();
    })


    //Display product table
    function displayPdTable(){
        var tableBody = $("#pd-d tbody");
         tableBody.empty();

        for(var i=0; i<products.length; i++){
            var product = products[i].product;
            var price = products[i].price;

            var tr=$("<tr>");
            var productTd = $("<td>").text(product);
            var priceTd = $("<td>").text(price);
            var pdDeleteBt = $("<button>").text('X').addClass('pdDeleteBtn');
            productTd.append(pdDeleteBt);
            tr.append(productTd, priceTd, pdDeleteBt)
            tableBody.append(tr);
        }
    }
    //Add product to select option
    function selectPd(){
        var pdselectopt = $("#pd-select")
        pdselectopt.empty();
        for(var i=0; i<products.length; i++){
            var product = products[i].product;
            var option = $('<option>').text(product);

            pdselectopt.append(option);
        }

    }


    //Add Customer
    var customers = [];//Array for customers
    $("#cu-add-btn").click(function(){

       
        if($("#cu-name").val()!=''){
            $("#show-cu").show();
            $("#cu-d").show()
            var cuname = $("#cu-name").val()
            customers.push(cuname);
            // console.log(customers)
            displayCuTable();
            selectCu();
            $("#cu-name").val('')

        }
        else{
            alert("please enter Customer name")
        }
 
    })

    //Delete Customer
    $("#cu-d").on('click','button.cuDeleteBtn',function(){
        // console.log("customer deleted")
        var row = $(this).closest('tr');
        var customer = row.find('td:first-child').text();

        for(var k=0; k<customers.length; k++){
            if(customers[k]===customer){
                // customers = customers.splice(k,0)
                // console.log(customers.splice(k,1))
            }
        }
        
        
        row.remove();
        selectCu();
    })

    //Dispaly Customer name

    function displayCuTable(){
        var cutableBody = $("#cu-d tbody");
        cutableBody.empty();

        for(var j=0; j<customers.length; j++){
            var customer = customers[j];

            var tr=$("<tr>");
            var customerTd = $("<td>").text(customer)
            var cuDeleteBt = $("<button>").text('X').addClass('cuDeleteBtn');
            customerTd.append(cuDeleteBt);
            tr.append(customerTd, cuDeleteBt)
            cutableBody.append(tr);

        }
    }
    //Add customer to select option
    function selectCu(){
        var cuselectopt = $("#c-select")
        cuselectopt.empty();
        for(var i=0; i<customers.length; i++){
            var customer = customers[i];
            var option = $('<option>').text(customer);
            cuselectopt.append(option);
        }

    }
    //Add product to Cart
//     var cart = [];// array for cart
//     $("#add-to-cart").click(function(){
//         if($("#pd-select").children("option:selected").length>0 && $("#c-select").children("option:selected").length>0 ){

//           console.log($("#pd-select").val())
//           console.log($("#c-select").val())

//           var pdcart=$("#pd-select").val()
//           var pdqty=1
//           for(i=0;i<products.length;i++)
//           {
//             if(products[i].product==pdcart){

//                 var pricecart=products[i].price;
//                 break;
//             }
//           }
//           console.log(pricecart)

//           var cartItem = {
//             cartproduct:pdcart,
//             cartqty : pdqty,
//             cartprice : pricecart
//           };

//         }
//         else{
//              alert("please select product and customer name")
//         }
//     })

// })

 var cart = [];// array for cart
    $("#add-to-cart").click(function(){
        var flaag=0
        if($("#pd-select").children("option:selected").length>0 && $("#c-select").children("option:selected").length>0 ){

        //   console.log($("#pd-select").val())
        //   console.log($("#c-select").val())

          var pdcart=$("#pd-select").val()
          var pdqty=1
          for(i=0;i<cart.length;i++)
          {
            if(pdcart[i]==pdcart){

                flaag=1;
                break;
            }
          }
          if(flaag==1){
            alert('Product already selected')
          }
          else{
            cart.push(pdcart);
            for(i=0;i<products.length;i++)
            {
              if(products[i].product==pdcart){
  
                  var pricecart=products[i].price;
                  break;
              }
            }
            // console.log(pricecart)
            cartBody=$("#cart tbody");
            var tr=$("<tr>");
            var pdcarttd=$("<td>").text(pdcart);
            var pricecarttd=$("<td>").text(pricecart);
            var cartqty=$("<input type='number' />").addClass('inputQty').val(pdqty);
            var cartqtytd=$("<td>").append(cartqty)
            var cartDeleteBt = $("<button>").text('X').addClass('cartDeleteBtn');
            var cartDeleteBttd = $("<td>").append(cartDeleteBt)
            //pricecarttd.append(cartDeleteBt)
            tr.append(pdcarttd,cartqtytd,pricecarttd,cartDeleteBttd);
            cartBody.append(tr)
            pricetotal()



          }
        //   var cartItem = {
        //     cartproduct:pdcart,
        //     cartqty : pdqty,
        //     cartprice : pricecart
        //   };

        }
        else{
             alert("please select product and customer name")
        }
    })
    // Change Qty
    $("#cart").on('change','input.inputQty', function(){
        var cartrow=$(this).closest('tr');
        var qty=$(this).closest('input').val();
       // var prc=cartrow.find('td:nth-child(3)').text();
        var cartproduct=cartrow.find('td:first-child').text();
        console.log(cartproduct)
        for(var i=0; i<products.length; i++){
            var product = products[i].product;
            if(product==cartproduct){
                var dicprice = products[i].price;
                break;

            }
            
        }
        dicprice=parseInt(dicprice)//dictionary price
        qty=parseInt(qty)
        qtycprice=parseInt(qty*dicprice)//qty chcange price
        cartrow.find('td:nth-child(3)').text(qtycprice);
        console.log(qty)
        pricetotal()
        //console.log(prc)

    });
    //Remove item from cart
    $("#cart").on('click','button.cartDeleteBtn', function(){
        var cartD=$(this).closest('tr');
        cartD.remove();
        pricetotal()
    })
    //Total price
    function pricetotal(){
        console.log('total price')
        var totalPrice=0;
        $("#cart tbody tr td:nth-child(3)").each(function(){
            var subTotal=$(this).text();
            console.log(subTotal)
            var subTotalPrice=parseInt(subTotal);
            console.log(subTotalPrice)
             if(!isNaN(subTotalPrice)){
                totalPrice+=subTotalPrice;
            }
        })
        console.log(totalPrice)
        $("#total").val(totalPrice);


    }

    //Invoice
    
    $("#invoice").click(function(){
        var purchase=[]
        console.log('purchase')
        var total=$("#total").val()
        if(total==''){
            alert("please add product to cart to purchase")
        }
        else{

            $("#cart tbody tr").each(function(){
                var productName = $(this).find('td:first-child').text();
                var productQuantity=$(this).find('.inputQty').val();
                var productPrice=$(this).find('td:nth-child(3)').text();

                var cartItem={
                    cproductName:productName,
                    cproductQuantity:productQuantity,
                    cproductPrice:productPrice

                }
                purchase.push(cartItem)
            })
            console.log(purchase)
            var popuphead='<h1>INVOICE<h1>';
            var customer_name=$("#c-select").val()
            var cnpopup='<h3>Customer Name:' + customer_name + '</h3>';
            var totalvpopup=$("#total").val();
            var totalpopup='<h3>Total:' + totalvpopup + '</h3>';


            
            var popup = $("<div id='popup'></div>");

            
            $("body").append(popup)
            $("#popup").append(popuphead)
            $("#popup").append(cnpopup)
            // purchase.each(function()
            for(i=0;i<purchase.length;i++){
                
                $("#popup").append(JSON.stringify(purchase[i]));
                


            }
            //)

            $("#popup").append(totalpopup)
            var xpop=$("<button>").text('X').addClass('popx');
            $("#popup").append(xpop)          
            $("#popup").show()

            $(".popx").click(function(){
                $("#popup").hide()
                $("#popup").remove()
            })









        }


    })

    // $("body").click(function(){
    //     popup.hide()
    // })


})


