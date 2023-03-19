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

var orders = document.getElementById('orders')
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
      fetch("http://localhost:8080/RestuarantBilling/menu")
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
                        <td ><input type="number" min=0 id="myInput" placeholder="0"></td>
                        <td><button class="btnSelect">Add</button></td>
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
              var col3=currentRow.find("td:eq(3)").find("input").val();
              var table = document.getElementById("orders");
              if(col3 === ""){
                return;
              }
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
              cell3.innerHTML = col3;
              cell4.innerHTML = Number(col2)*col3;
              cell5.innerHTML ='<i class="fa fa-trash-o delete"></i>'
              }
              else{
              var newQuantity = Number(y[3].textContent)+Number(col3);
              var newTotal = newQuantity*col2;
              y[3].innerHTML = newQuantity;
              y[4].innerHTML = newTotal;
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
          if(data.length == 0){
            custid = 0;
          }
          else{
          data.forEach((customer)=>{
            custid = customer.id;
          })
        }
        var customerid = Number(custid)+1;
        alert(customerid);
        console.log(customerid);
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
        var orders = document.getElementById("orders");
        fetch("http://localhost:8080/RestuarantBilling/invoice")
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
          fetch('http://localhost:8080/RestuarantBilling/invoiceItem/create', {
          method: 'POST',
          body: JSON.stringify(invoiceItemObject),
          headers: {
          "Content-type": "application/json; charset=UTF-8"
          }    
        })
      }
    })
  })
  window.open("invoice.html");
})


const batchTrack = document.getElementById("batchSelect");
fetch("http://localhost:8080/RestuarantBilling/foodType")
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
 fetch("http://localhost:8080/RestuarantBilling/menu")
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
                        <td ><input type="number" min=0 id="myInput" placeholder="0"></td>
                        <td><button class="btnSelect">Add</button></td>
                      </tr>`;
                  }
                  if(dish.food_type_id == selectedValue){
                    li1 += `<tr >
                        <td style="display:none">${dish.id}</td>
                        <td>${dish.dish_name}</td>
                        <td>${dish.price}</td>
                        <td ><input type="number" min=0 id="myInput" placeholder="0"></td>
                        <td><button class="btnSelect">Add</button></td>
                      </tr>`;
                      }  
                    })    
            document.getElementById("dishes").innerHTML = li1;
            }    
        })
}
