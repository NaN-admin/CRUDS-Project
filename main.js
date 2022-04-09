let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;

// get Total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = `: ${result}`;
    total.style.background = "#040";
  } else {
    total.style.background = "#310044";
    total.innerHTML = null;
  }
}
// create product
let productData;
if (localStorage.product != null) {
  productData = JSON.parse(localStorage.product);
} else {
  productData = [];
}
submit.onclick = () => {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML.replace(":", ""),
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newPro.count < 100
  ) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          productData.push(newPro);
        }
      } else {
        productData.push(newPro);
      }
    } else {
      productData[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(productData));

  showData();
};

// clear data from inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
// read
function showData() {
  let table = "";
  for (let i = 0; i < productData.length; i++) {
    table += `<tr>
    <td>${i+1}</td>
    <td>${productData[i].title}</td>
    <td>${productData[i].price}</td>
    <td>${productData[i].taxes}</td>
    <td>${productData[i].ads}</td>
    <td>${productData[i].discount}</td>
    <td>${productData[i].total}</td>
    <td>${productData[i].category}</td>
    <td><button onclick="update(${i})" id="update">update</button></td>
    <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
  </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteBtn = document.getElementById("deleteAll");
  if (productData.length > 0) {
    deleteBtn.innerHTML = `<button onclick="deleteAll()" >Delete All (${productData.length})</button>`;
  } else {
    deleteBtn.innerHTML = ``;
  }
  getTotal();
}
showData();
//delete
function deleteItem(i) {
  productData.splice(i, 1);
  localStorage.product = JSON.stringify(productData);
  showData();
}
function deleteAll() {
  localStorage.clear();
  productData.splice(0);
  showData();
}
//update
function update(i) {
  title.value = productData[i].title;
  price.value = productData[i].price;
  taxes.value = productData[i].taxes;
  ads.value = productData[i].ads;
  discount.value = productData[i].discount;
  category.value = productData[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search
let searchMood = "title";
function getSearchMood(i) {
  let search = document.getElementById("search");
  if (i == "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "Category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = null;
  showData();
}
function search(value) {
  let table = "";
  for (let i = 0; i < productData.length; i++) {
    if (searchMood == "title") {
      if (productData[i].title.includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i}</td>
        <td>${productData[i].title}</td>
        <td>${productData[i].price}</td>
        <td>${productData[i].taxes}</td>
        <td>${productData[i].ads}</td>
        <td>${productData[i].discount}</td>
        <td>${productData[i].total}</td>
        <td>${productData[i].category}</td>
        <td><button onclick="update(${i})" id="update">update</button></td>
        <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
      </tr>`;
      }
    } else {
      if (productData[i].category.includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i}</td>
        <td>${productData[i].title}</td>
        <td>${productData[i].price}</td>
        <td>${productData[i].taxes}</td>
        <td>${productData[i].ads}</td>
        <td>${productData[i].discount}</td>
        <td>${productData[i].total}</td>
        <td>${productData[i].category}</td>
        <td><button onclick="update(${i})" id="update">update</button></td>
        <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
      </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
