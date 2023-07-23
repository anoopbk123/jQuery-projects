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
                console.log(products)
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

        console.log('Product Deleted')
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
            console.log(customers)
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
        console.log("customer deleted")
        var row = $(this).closest('tr');
        var customer = row.find('td:first-child').text();

        for(var k=0; k<customers.length; k++){
            if(customers[k]===customer){
                // customers = customers.splice(k,0)
                console.log(customers.splice(k,1))
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
    var cart = [];// array for cart
    $("#add-to-cart").click(function(){
        if($("#pd-select").children("option:selected").length>0 && $("#c-select").children("option:selected").length>0 ){

          console.log($("#pd-select").val())
          console.log($("#c-select").val())

          var pdcart=$("#pd-select").val()
          var pdqty=1
          for(i=0;i<products.length;i++)
          {
            if(products[i].product==pdcart){

                var pricecart=products[i].price;
                break;
                


            }
          }
          
          console.log(pricecart)



        }
        else{
             alert("please select product and customer name")
        }
    })

})

