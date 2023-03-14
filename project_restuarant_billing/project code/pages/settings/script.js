function loadTable() {
  fetch("http://localhost:8080/RestuarantBilling/menu")
  .then((response) => response.json())
  .then((json) => {
          let li1;
          json.forEach((dish) => {
            var dish_type_name = dish_type(dish.food_type_id);
            var veg="";
            if(dish.is_veg==true){
              veg = "Veg";
            }
            else{
              veg = "Non Veg"
            }
            var available="";
            if(dish.is_available==true){
              available = "Available";
            }
            else{
              available = "Not Available"
            }
              li1 += `<tr >
                  <td >${dish.id} </td>
                  <td >${dish_type_name}</td>
                  <td >${dish.dish_name}</td>
                  <td >${dish.price}</td>
                  <td >${veg}</td>
                  <td >${available}</td>
                  <td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
          object["id"] +
          ')>Edit</button>
          <button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
          object["id"] +
          ')>Del</button></td>
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

function showUserCreateBox() {
  Swal.fire({
    title: "Create user",
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
      userCreate();
    },
  });
}

function userCreate() {
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
}