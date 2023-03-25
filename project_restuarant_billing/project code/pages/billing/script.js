let hamMenuIcon = document.getElementById("ham-menu");
let navBar = document.getElementById("nav-bar");
let navLinks = navBar.querySelectorAll("li");

hamMenuIcon.addEventListener("click", () => {
  navBar.classList.toggle("active");
  hamMenuIcon.classList.toggle("fa-times");
});
navLinks.forEach((navLinks) => {
  navLinks.addEventListener("click", () => {
    navBar.classList.remove("active");
    hamMenuIcon.classList.toggle("fa-times");
  });
});
function searchdish(){
  var input,filter,table,tr,td,i,txtvalue;
  input = document.getElementById("searchbox");
  filter = input.value.toUpperCase();
  table = document.getElementById("dishes");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtvalue = td.textContent || td.innerText;
      if (txtvalue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
};
$('#invoicediv').hide();
$('#totalDisplay').hide();
var orders = document.getElementById('orders')
var totaldisplay = document.getElementById('totalDisplay');
const style = document.createElement('style');
    style.textContent = `
      th{
      background-color: #f446da;
      color: #ffffff;
      text-align: left;
      z-index:100;
      }
      th,td{
      width:100%;
      padding: 12px 15px;
      }
      tr{
          border-bottom: 1px solid #dddddd;
      }
      tr:nth-of-type(even){
          background-color: #f3f3f3;
      }
      tr:last-of-type{
          border-bottom: 2px solid #f6f8fa;
      }
      .btnSelect {
        background-color: #0095ff;
        border: 1px solid transparent;
        border-radius: 3px;
        box-shadow: rgba(255, 255, 255, .4) 0 1px 0 0 inset;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        font-size: 13px;
        font-weight: 400;
        line-height: 1.15385;
        outline: none;
        padding: 8px .8em;
        position: relative;
        text-align: center;
        text-decoration: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        vertical-align: baseline;
        white-space: nowrap;
      }
      .btnSelect:hover,
      .btnSelect:focus {
        background-color: #07c;
      }

      .btnSelect:focus {
        box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
      }

      .btnSelect:active {
        background-color: #0064bd;
        box-shadow: none;
      }
      h4{
        float:right;
      }
      input[type='number']{
        width: 80px;
      }
      .delete:hover{
        cursor:pointer;
      }
      #foodid{
        display:none;
      }
    }
    `;
    document.head.appendChild(style);
      fetch("http://localhost:8080/apis/RestuarantBilling/menu")
        .then((response) => response.json())
        .then((json) => {
            {
                let li1="";
                json.forEach((dish) => {
                  if(dish.is_available){
                    li1 += `<tr >
                        <td style="display:none">${dish.id}</td>
                        <td>${dish.dish_name}</td>
                        <td>${dish.price}</td>
                        <td><button class="btnSelect"><i class="fa fa-plus"></i></button></td>
                      </tr>`;
                      }  
                  else{
                    return
                    }
                  })  
            document.getElementById("dishes").innerHTML = li1;
            }    
        })
        $(document).ready(function(){
            $(".menu-dishes").on('click','.btnSelect',function(){
              var invoicebtn = document.querySelector('.invoiceBtn');
              invoicebtn.style.display = "inline-block";
              var currentRow=$(this).closest("tr");
              var col0=currentRow.find("td:eq(0)").text();
              var col1=currentRow.find("td:eq(1)").text();
              var col2=currentRow.find("td:eq(2)").text();
              var table = document.getElementById("orders");
              var tableLength = table.rows.length;
              var counter = 0;
              for (let i = 0; i < tableLength; i++) {
                var x = table.rows[i].cells;
                if(x[1].textContent == col1){
                  var y=x;
                  counter++;
                }
              }
              if(counter == 0){
              var row = orders.insertRow(0);
              var cell0 = row.insertCell(0);
              var cell1 = row.insertCell(1);
              var cell2 = row.insertCell(2);
              var cell3 = row.insertCell(3);
              var cell4 = row.insertCell(4);
              var cell5 = row.insertCell(5);
              cell0.style.display="none";
              cell0.innerHTML = col0;
              cell1.innerHTML = col1;
              cell2.innerHTML = col2;
              cell3.innerHTML = '<td ><input type="number" min=1 id="myInput" value=1 name="quantity"></td>'
              cell4.innerHTML = col2;
              cell5.innerHTML ='<i class="fa fa-trash-o delete"></i>'
              getTotal();
              }
              else{
              // var newQuantity = 
              // var newTotal = newQuantity*col2;
              // y[3].innerHTML = newQuantity;
              // y[4].innerHTML = newTotal;
              }
              
            });
        });


        $(document).ready(function(){
          $(".orders").on('change','#myInput',function(){
              var updatequant=$(this).closest("tr");
              var newtotal = Number(updatequant.find("td:eq(2)").text())*Number(updatequant.find("td:eq(3)").find("input").val());
              var rowIndex = updatequant.index()
              orders.rows[rowIndex].cells[4].innerHTML=newtotal;
              getTotal();
          })
      })
        $(document).ready(function(){
            $(".orders").on('click','.delete',function(){
                var deleteRow=$(this).closest("tr");
                deleteRow.remove();
                getTotal();
            })
        })
        function getTotal(){
          var total =0;
          if(orders.rows.length == 0){
            totaldisplay.rows[0].cells[1].innerHTML=0;
            $('#invoicediv').hide();
            $("#totalDisplay").hide();
          }
          else{
          for(var i=0;i<orders.rows.length;i++){
          total += Number(orders.rows[i].cells[4].innerHTML)
          totaldisplay.rows[0].cells[1].innerHTML=total;
          $("#invoicediv").show();
          $("#totalDisplay").show();
          }
        }
        }
        var submibtn = document.getElementById('invoicebtn');
        submibtn.addEventListener("click",function(){
        if((document.getElementById('cname').value == "")||(document.getElementById('phno').value==""))
        {
          Swal.fire({
            html:
            '<h1>Customer Details are mandatory <i class="fa fa-exclamation-triangle mx-2" aria-hidden="true"></i></h1>'
          })
        }

        
        else{
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charLength = chars.length;
        var orderId = '';
        for ( var i = 0; i < 10; i++ ) {
          orderId += chars.charAt(Math.floor(Math.random() * charLength));
        }
        var cartTable = document.getElementById("cartitems");
        sumVal = 0;
        for (var i = 1; i < cartTable.rows.length; i++) {
        sumVal = sumVal + parseFloat(cartTable.rows[i].cells[4].innerHTML);
        }
        const totaldisplay = document.createElement("h4");
        totaldisplay.innerText = "Total: "+sumVal+" Rs";
        var element = document.getElementById('cartitems');
        element.after(totaldisplay);
        var customername = document.getElementById('cname').value;
        var customerphno = document.getElementById('phno').value;
        const customerObject = {
          customer_name: customername,
          phone_no: customerphno,
        }
        fetch('http://localhost:8080/apis/RestuarantBilling/customer/create', {
          method: 'POST',
          body: JSON.stringify(customerObject),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        fetch("http://localhost:8080/apis/RestuarantBilling/customer")
        .then((response) => response.json())
        .then((data) => {
          var custid;
          if(data.length == 0){
            custid = 0;
          }
          else{
          data.forEach((customer)=>{
            custid = customer.id;
          })
        }
        var customerid = Number(custid)+1;
        const invoiceObject = {
          order_id: orderId,
          customer_id: customerid,
          charges_id: 1
        }
        fetch('http://localhost:8080/apis/RestuarantBilling/invoice/create', {
          method: 'POST',
          body: JSON.stringify(invoiceObject),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        var orders = document.getElementById("orders");
        fetch("http://localhost:8080/apis/RestuarantBilling/invoice")
        .then((response) => response.json())
        .then((data) => {
          var invid;
          if(data.length == 0){
            invid = 0;
          }
          else{
          data.forEach((invoice)=>{
            invid = invoice.id;
          })
        }
        var invoiceid = Number(invid)+1;
        for(var i=0;i<orders.rows.length;i++){
          var menu_id = Number(orders.rows[i].cells[0].innerHTML)
          var quantity = Number(orders.rows[i].cells[3].innerHTML)
          const invoiceItemObject = {
            invoice_id: invoiceid,
            menu_id: menu_id,
            quantity:quantity
          }
          addinvoiceitem(invoiceItemObject)
        }
      function addinvoiceitem(invoiceItemObject){
          fetch('http://localhost:8080/apis/RestuarantBilling/invoiceItem/create', {
          method: 'POST',
          body: JSON.stringify(invoiceItemObject),
          headers: {
          "Content-type": "application/json; charset=UTF-8"
          }    
        })
      }
    })
  })
  Swal.fire({
    html:
    '<h1>Invoice Generated Successful <i class="fa fa-check mx-2" style="color:green"></i></h1><a href="invoice.html">Click to view</a>'
  })
}
})


const batchTrack = document.getElementById("batchSelect");
fetch("http://localhost:8080/apis/RestuarantBilling/foodType")
    .then((response) => response.json())
    .then((json) => {
       {
          json.forEach((dish) => {
          const newOption = document.createElement("option");
          newOption.value = dish.id;
          newOption.text = dish.food_type_name;
          batchTrack.appendChild(newOption);
        })
    }
  })

function filter()
{
 var selecttag = document.getElementById("batchSelect");
 var selectedValue = selecttag.options[selecttag.selectedIndex].value;
 document.getElementById("dishes").innerHTML = "";
 fetch("http://localhost:8080/apis/RestuarantBilling/menu")
        .then((response) => response.json())
        .then((json) => {
            {
                let li1="";
                json.forEach((dish) => {
                  if(selectedValue == 0){
                    li1 += `<tr >
                        <td style="display:none">${dish.id}</td>
                        <td>${dish.dish_name}</td>
                        <td>${dish.price}</td>
                        <td><button class="btnSelect"><i class="fa fa-plus"></i></button></td>
                      </tr>`;
                  }
                  if(dish.food_type_id == selectedValue){
                    li1 += `<tr >
                        <td style="display:none">${dish.id}</td>
                        <td>${dish.dish_name}</td>
                        <td>${dish.price}</td>
                        <td><button class="btnSelect"><i class="fa fa-plus"></i></button></td>
                      </tr>`;
                      }  
                    })    
            document.getElementById("dishes").innerHTML = li1;
            }    
        })
}
