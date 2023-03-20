const style = document.createElement('style');
    style.textContent = `
      th{
      background-color: #f446da;
      color: #ffffff;
      z-index:100;
      }
      th,td{
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
    `;
document.head.appendChild(style);
var prevOrders = document.getElementById("prevorders") 
fetch("http://localhost:8080/RestuarantBilling/invoice")
    .then((response) => response.json())
    .then((json) => {
        {
            let li1="";
            json.forEach((invoice) => {
                custid = invoice.customer_id;
                li1 += `<tr>
                    <td>${invoice.id}</td>
                    <td>${invoice.order_id}</td>
                    <td style="display:none">${invoice.customer_id}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>${invoice.order_time}</td>
                    </tr>`;
                })        
            document.getElementById("prevorders").innerHTML = li1;
            filltable();
        }
    })
function filltable(){
    for(var i=0;i<prevOrders.rows.length;i++){
        const custnamecell = prevOrders.rows[i].cells[3];
        var custid = Number(prevOrders.rows[i].cells[2].innerHTML)
        url = "http://localhost:8080/RestuarantBilling/customer/"+custid
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
            var custname = json["customer_name"]   
            custnamecell.innerHTML = custname;
        })


        const foodcell = prevOrders.rows[i].cells[4];
        const invid = Number(prevOrders.rows[i].cells[0].innerHTML)
        const totalcell = prevOrders.rows[i].cells[5];
        fetch("http://localhost:8080/RestuarantBilling/invoiceItem")
        .then((response) => response.json())
        .then((json) => {
            {
                let li=""
                var total = 0;
                json.forEach((invoiceItem) => {
                    if(invoiceItem.invoice_id == invid){
                       var quantity = invoiceItem.quantity;
                       var menuid = invoiceItem.menu_id;
                       fetch("http://localhost:8080/RestuarantBilling/menu")
                        .then((response) => response.json())
                        .then((json) => {
                        {
                        json.forEach((dish) => { 
                            if(dish.id == menuid){
                                li+= dish.dish_name+" X "+quantity+ `<br><br>`
                                total += dish.price*quantity;
                            }
                        })
                        }
                        foodcell.innerHTML=li;
                        totalcell.innerHTML=total;
                    })
                }
            })
        }
    })
}
}
$('table tbody').on('click', 'tr', function(){
    alert('clicked');
});
$(':button').on('click',function(){
    var tbody = $('table tbody');
    tbody.html($('tr',tbody).get().reverse());
});

function searchOrder(){
    var input,filter,table,tr,td,i,txtvalue;
    input = document.getElementById("searchbox");
    filter = input.value;
    table = document.getElementById("prevorders");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtvalue = td.textContent || td.innerText;
        if (txtvalue.indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };
  