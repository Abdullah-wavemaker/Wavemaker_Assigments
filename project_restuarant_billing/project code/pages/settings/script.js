// Dynamic styling for elements

const style = document.createElement('style');
style.textContent=`
/* The switch - the box around the slider */
.switch {
  font-size: 13px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border: 1px solid #adb5bd;
  transition: .4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.4em;
  width: 1.4em;
  border-radius: 20px;
  left: 0.27em;
  bottom: 0.25em;
  background-color: #adb5bd;
  transition: .4s;
}

input:checked + .slider {
  background-color: #007bff;
  border: 1px solid #007bff;
}

input:focus + .slider {
  box-shadow: 0 0 1px #007bff;
}

input:checked + .slider:before {
  transform: translateX(1.4em);
  background-color: #fff;
}
tr{
  border-bottom: 1px solid #dddddd;
}
tr:nth-of-type(even){
  background-color: #f3f3f3;
}
tr:last-of-type{
  border-bottom: 2px solid #ffffff;
}`
document.head.appendChild(style);

// Main table
function loadTable() {
  fetch("http://localhost:8080/RestuarantBilling/menu")
  .then((response) => response.json())
  .then((json) => {
          let li1="";
          json.forEach((dish) => {
            var dish_type_name = dish_type(dish.food_type_id);
            var veg="";
            if(dish.is_veg==true){
              veg = "Veg";
            }
            else{
              veg = "Non Veg"
            }
            
              li1 += `<tr >
                  <td >${dish.id} </td>
                  <td >${dish_type_name}</td>
                  <td >${dish.dish_name}</td>
                  <td >${dish.price}</td>
                  <td >${veg}</td>`
                  if(dish.is_available == true){
                    li1 += `<td ><label class="switch">
                    <input type="checkbox" id="available" checked>
                    <span class="slider"></span>
                  </label></td>`
                  }
                  if(dish.is_available == false){
                    li1 += `<td ><label class="switch">
                    <input type="checkbox" id="available">
                    <span class="slider"></span>
                  </label></td>`
                  }
                  li1 +=  `<td><button type="button" class="btn btn-outline-secondary edit" id="edit">Edit <i class="fa fa-edit mx-2"></i></button>
                  <button type="button" class="btn btn-outline-danger del" id="del">Delete <i class="fa fa-trash mx-2"></i></button></td>
                  </tr>`;
                })                  
            document.getElementById("mytable").innerHTML = li1;
          })   
}  
loadTable();


function dish_type(n1){
  if(n1 == 1){
    return "Soups and Salad"
  }
  if(n1 == 2){
    return "Starter"
  }
  if(n1 == 3){
    return "Maincourse"
  }
  if(n1 == 4){
    return "Rice and Noodles"
  }
  if(n1 == 5){
    return "Biryani"
  }
  if(n1 == 6){
    return "Roti"
  }
  if(n1 == 7){
    return "Special"
  }
  if(n1 == 8){
    return "Dessert"
  }
  if(n1 == 9){
    return "Mocktail"
  }
  if(n1 == 10){
    return "Fresh Juice"
  }
}


function showDishCreateBox() {
  Swal.fire({
    title: "Add New Dish",
    html:
      '<input id="id" type="hidden">' +
      '<select name="Category" id="category" class="swal2-input" style="width:55%">' +
      '<option value="soup">Soups and Salads</option>' +
      '<option value="starter">Starters</option>' +
      '<option value="maincourse">Main Course</option>' +
      '<option value="rice">Rice and Noodles</option>' +
      '<option value="biryani">Biryanis</option>' +
      '<option value="roti">Rotis</option>' +
      '<option value="special">Specials</option>' +
      '<option value="dessert">Desserts</option>' +
      '<option value="mocktail">Mocktails</option>' +
      '<option value="freshjuice">Fresh Juices</option>' +
      '</select>' +
      '<select name="Veg" id="veg" class="swal2-input" style="width:55%">' +
      '<option value="veg">Veg</option>' +
      '<option value="nonveg">Non Veg</option>' +
      '</select>' +
      '<input id="dishname" class="swal2-input" placeholder="Dish Name" style="width:55%">' +
      '<input id="price" class="swal2-input" placeholder="price" style="width:55%">',
    focusConfirm: false,
    preConfirm: () => {
      DishCreate();
    },
  });
}


function DishCreate() {
  const dishname = document.getElementById("dishname").value;
  const price = document.getElementById("price").value;
  var dish_id;
  if(document.getElementById('category').value=="soup"){
    dish_id = 1
  }
  if(document.getElementById('category').value=="starter"){
    dish_id = 2
  }
  if(document.getElementById('category').value=="maincourse"){
    dish_id = 3
  }
  if(document.getElementById('category').value=="rice"){
    dish_id = 4
  }
  if(document.getElementById('category').value=="biryani"){
    dish_id = 5
  }
  if(document.getElementById('category').value=="roti"){
    dish_id = 6
  }
  if(document.getElementById('category').value=="special"){
    dish_id = 7
  }
  if(document.getElementById('category').value=="dessert"){
    dish_id = 8
  }
  if(document.getElementById('category').value=="mocktail"){
    dish_id = 9
  }
  if(document.getElementById('category').value=="freshjuice"){
    dish_id = 10
  }
  var isveg;
  if(document.getElementById("veg").value=="veg"){
    isveg = true;
  }
  if(document.getElementById("veg").value=="nonveg"){
    isveg = false;
  }
  const menuObject = {
    food_type_id : dish_id,
    dish_name : dishname,
    is_veg : isveg,
    is_available: true,
    price : price
  };
  fetch('http://localhost:8080/RestuarantBilling/menu/create', {
          method: 'POST',
          body: JSON.stringify(menuObject),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })
    Swal.fire({
      html:
      '<h1>Dish Added Successfully <i class="fa fa-check mx-2" style="color:green"></i></h1>'
    })
}


function searchdish(){
  var input,filter,table,tr,td,i,txtvalue;
  input = document.getElementById("searchbox");
  filter = input.value.toUpperCase();
  table = document.getElementById("mytable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
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


$(document).ready(function(){
  $("#mytable").on('click','#available',function(){
    var currentRowToToggle =$(this).closest("tr");
    var idToToggle =currentRowToToggle.find("td:eq(0)").text();
    var url = "http://localhost:8080/RestuarantBilling/menu/"+idToToggle
    fetch(url)
    .then((response) => response.json())
    .then((json) =>{
    var updateObject = {
      id:idToToggle,
      food_type_id:json["food_type_id"],
      is_available:!json["is_available"],
      dish_name : json["dish_name"],
      price : json["price"]
    };
    dishEdit(updateObject);
    })
  }
)
  $("#mytable").on('click','#del',function(){
    var currentRowToDelete =$(this).closest("tr");
    var idToDelete =currentRowToDelete.find("td:eq(0)").text();
    var url = "http://localhost:8080/RestuarantBilling/menu/"
    var urlToDelete = url+idToDelete
    fetch(urlToDelete, {
          method: 'DELETE',
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })
    Swal.fire({
      html:
      '<h1>Deletion Successful <i class="fa fa-check mx-2" style="color:green"></i></h1>'
    })
  })
  $("#mytable").on('click','#edit',function(){
    var currentRowToEdit =$(this).closest("tr");
    var idToUpdate =currentRowToEdit.find("td:eq(0)").text();
    var url = "http://localhost:8080/RestuarantBilling/menu/"+idToUpdate
    fetch(url)
    .then((response) => response.json())
    .then((json) =>{
      Swal.fire({
      title: "Edit Dish Name or Price",
      html:
        '<input id="id" type="hidden" value=' +
        json["id"] +
        '<input id="id" type="hidden" value=' +
        json["food_type_id"] +
        ">" +
        '<input id="dishname2" class="swal2-input" placeholder="Username" value="' +
        json["dish_name"] +
        '">' +
        '<input id="price2" class="swal2-input" placeholder="Email" value="' +
        json["price"] +
        '">',
      focusConfirm: false,
      preConfirm: () => {  
      var dishname2 = document.getElementById('dishname2').value;
      var price2 = document.getElementById('price2').value;
      var updateObject = {
        id:json["id"],
        food_type_id:json["food_type_id"],
        is_veg:json["is_veg"],
        is_available:json["is_available"],
        dish_name : dishname2,
        price : price2
      };
        dishEdit(updateObject);
      },
    })
  })
})
})


function dishEdit(updateObject){
  var updateUrl = "http://localhost:8080/RestuarantBilling/menu/update/"
  fetch(updateUrl, {
          method: 'PUT',
          body: JSON.stringify(updateObject),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })
    Swal.fire({
      html:
      '<h1>Dish Edited Successfully <i class="fa fa-check mx-2" style="color:green"></i></h1>'
    })
}


function showEditTaxesBox(){
  var url = "http://localhost:8080/RestuarantBilling/taxes/1"
    fetch(url)
    .then((response) => response.json())
    .then((json) =>{
      Swal.fire({
      title: "Edit Taxes and Charges",
      html:
        '<input id="cgst" class="swal2-input" placeholder="CGST" value="' +
        json["cgst"]+
        '">' +
        '<input id="sgst" class="swal2-input" placeholder="SGST" value="' +
        json["sgst"] +
        '">' +
        '<input id="convfee" class="swal2-input" placeholder="Convinience Fee" value="' +
        json["convinience_fee"] +
        '">',
      focusConfirm: false,
      preConfirm: () => {  
      var newcgst = document.getElementById('cgst').value;
      var newsgst = document.getElementById('sgst').value;
      var newconvfee = document.getElementById('convfee').value;
      var updatetaxObject = {
        id:json[1],
        cgst:newcgst,
        sgst:newsgst,
        convinience_fee:newconvfee
      };
        taxEdit(updatetaxObject);
        }
    })
  })
}
function taxEdit(updatetaxObject){
  fetch("http://localhost:8080/RestuarantBilling/taxes/update", {
          method: 'PUT',
          body: JSON.stringify(updatetaxObject),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })
    Swal.fire({
      html:
      '<h1>Taxes Edited Successfully <i class="fa fa-check mx-2" style="color:green"></i></h1>'
    })
}