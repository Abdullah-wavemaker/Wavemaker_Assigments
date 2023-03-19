const menuid = []
const frequency =[]
const TotalAmount = []
const data = new Map();
fetch("http://localhost:8080/RestuarantBilling/invoiceItem")
        .then((response) => response.json())
        .then((json) => {
            {
                json.forEach((invoiceItem) => {
                    if(menuid.length == 0){
                        menuid.push(invoiceItem.menu_id)
                        frequency.push(invoiceItem.quantity)
                    }
                    else if(menuid.includes(invoiceItem.menu_id)){
                        var freq = menuid.indexOf(invoiceItem.menu_id)
                        frequency[freq] = frequency[freq]+invoiceItem.quantity;
                    }
                    else{
                        menuid.push(invoiceItem.menu_id)
                        frequency.push(invoiceItem.quantity);
                    }
                })
                getdishname();
                const ctx = document.getElementById('canvas');
                new Chart(ctx, {
                  type: 'bar',
                  data: {
                    labels: menuid,
                    datasets: [{
                      label: 'Total units sold',
                      data: frequency,
                      borderWidth: 1,  
                      backgroundColor: "#FFB84C"
                    }]
                  },
                  options: {
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }
                })
            }
        })
   
async function getdishname(){
    for(var i=0;i<menuid.length;i++){
        const menuidcol = i;
        var menu_id = menuid[i];
        url = "http://localhost:8080/RestuarantBilling/menu/"+menu_id
        await fetch(url)
        .then((response) => response.json())
        .then((json) => {
            var dishname = json["dish_name"]   
            menuid[menuidcol] = dishname;
            TotalAmount.push(json["price"])
        })
    }
}
