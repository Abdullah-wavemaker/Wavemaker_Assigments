const mobileScreen = window.matchMedia("(max-width: 990px )");
$(document).ready(function () {
    $(".dashboard-nav-dropdown-toggle").click(function () {
        $(this).closest(".dashboard-nav-dropdown")
            .toggleClass("show")
            .find(".dashboard-nav-dropdown")
            .removeClass("show");
        $(this).parent()
            .siblings()
            .removeClass("show");
    });
    $(".menu-toggle").click(function () {
        if (mobileScreen.matches) {
            $(".dashboard-nav").toggleClass("mobile-show");
        } else {
            $(".dashboard").toggleClass("dashboard-compact");
        }
    });
});
var orders = document.getElementById('orders')
const style = document.createElement('style');
    style.textContent = `
      th{
      background-color: #f446da;
      color: #ffffff;
      text-align: left;
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
          border-bottom: 2px solid #009879;
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
    }
    `;
    document.head.appendChild(style);
      fetch("http://localhost:8080/RestuarantBilling/menu")
        .then((response) => response.json())
        .then((json) => {
            $('a.mycategories').click(function(){
                let li1;
                json.forEach((dish) => {
                    if(dish.food_type_id ==Number(($(this).attr('id')) )){
                    li1 += `<tr >
                        <td >${dish.dish_name} </td>
                        <td >${dish.price}</td>
                        <td ><input type="number" min=0 id="myInput" placeholder="0"></td>
                        <td><button class="btnSelect">Add</button></td>
                      </tr>`;
                      }  
                })    
            document.getElementById("dishes").innerHTML = li1;
            })     
        })
        $(document).ready(function(){
            $(".menu-dishes").on('click','.btnSelect',function(){
              var invoicebtn = document.querySelector('.invoiceBtn');
              invoicebtn.style.display = "inline-block";
              var currentRow=$(this).closest("tr");
              var col1=currentRow.find("td:eq(0)").text();
              var col2=currentRow.find("td:eq(1)").text();
              var col3=currentRow.find("td:eq(2)").find("input").val();
              var table = document.getElementById("orders");
              if(col3 === ""){
                return;
              }
              var tableLength = table.rows.length;
              var counter = 0;
              for (let i = 0; i < tableLength; i++) {
                var x = table.rows[i].cells;
                if(x[0].textContent == col1){
                  var y=x;
                  counter++;
                }
              }
              if(counter==0){
              var row = orders.insertRow(0);
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              var cell4 = row.insertCell(3);
              var cell5 = row.insertCell(4);
              cell1.innerHTML = col1;
              cell2.innerHTML = col2;
              cell3.innerHTML = col3;
              cell4.innerHTML = Number(col2)*col3;
              cell5.innerHTML ='<i class="fa fa-trash-o delete"></i>'
              }
              else{
              var newQuantity = Number(y[2].textContent)+Number(col3);
              var newTotal = newQuantity*col2;
              y[2].innerHTML = newQuantity;
              y[3].innerHTML = newTotal;
              }
            });
        });
        $(document).ready(function(){
            $(".orders").on('click','.delete',function(){
                var deleteRow=$(this).closest("tr");
                deleteRow.remove();
            })
        })
        var submibtn = document.getElementById('invoicebtn');
        submibtn.addEventListener("click",function(){
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charLength = chars.length;
        var orderId = '';
        for ( var i = 0; i < 7; i++ ) {
          orderId += chars.charAt(Math.floor(Math.random() * charLength));
        }
        var cartTable = document.getElementById("cartitems");
        sumVal = 0;
        for (var i = 1; i < cartTable.rows.length; i++) {
        sumVal = sumVal + parseFloat(cartTable.rows[i].cells[3].innerHTML);
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
        console.log(JSON.stringify(customerObject))
        fetch('http://localhost:8080/RestuarantBilling/customer/create', {
          method: 'POST',
          body: JSON.stringify(customerObject),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        fetch("http://localhost:8080/RestuarantBilling/customer")
        .then((response) => response.json())
        .then((data) => {
          var custid;
          data.forEach((customer)=>{
            custid = customer.id;
          })
        var customerid = Number(custid)+1;
        const invoiceObject = {
          order_id: orderId,
          customer_id: customerid,
          charges_id: 1
        }
        fetch('http://localhost:8080/RestuarantBilling/invoice/create', {
          method: 'POST',
          body: JSON.stringify(invoiceObject),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        // fetch("http://localhost:8080/RestuarantBilling/invoice")
        // .then((response) => response.json())
        // .then((data) => {
        //   var invoid;
        //   data.forEach((invoice)=>{
        //     invoid = invoice.id;
        //   })
        //   var invoiceid = Number(invoid)+1;
          
        // const invoiceItemObject = {
        //   invoice_id: invoiceid,
        //   customer_id: customerid,
        //   charges_id: 1
        // }
        // fetch('http://localhost:8080/RestuarantBilling/invoiceItem/create', {
        //   method: 'POST',
        //   body: JSON.stringify(invoiceItemObject),
        //   headers: {
        //     "Content-type": "application/json; charset=UTF-8"
        //   }
        // })

        })  
})



