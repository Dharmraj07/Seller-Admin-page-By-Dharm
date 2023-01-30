////--url
const url = "https://crudcrud.com/api/0c8ee476dce24f2d8df89b731df74e59/list";

const form = document.getElementById("form");
const product = document.getElementById("product");
const price = document.getElementById("price");
const cat = document.getElementById("cat");
const skin = document.getElementById("skin");
const ele = document.getElementById("ele");
const food = document.getElementById("food");

function addList(a, b, c, d) {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${a}</td>
                          <td>${b}</td>
                          <td>${c}</td>
          
                          <td><button value='${d}'>Delete order</button></td>`;
  return tr;
}

axios.get(url).then((res) => {
  const datas = res.data;
  for (let i = 0; i < datas.length; i++) {
    const data = datas[i];
    const a = data.product;
    const b = data.price;
    const c = data.categories;
    const d = data._id;
    const row = addList(a, b, c, d);
    if (c === "food") {
      food.appendChild(row);
    } else if (c === "skincare") {
      skin.appendChild(row);
    } else if (c === "electronics") {
      ele.appendChild(row);
    }
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const a = product.value;
  const b = price.value;
  const c = cat.value;
  const data = { product: a, price: b, categories: c };
  axios
    .post(url, data)
    .then((res) => console.log("Product Details is Added!!"));

  location.reload();

  //   const row = addList(a, b, c);
  //   if (c === "food") {
  //     food.appendChild(row);
  //   } else if (c === "skincare") {
  //     skin.appendChild(row);
  //   } else if (c === "electronics") {
  //     ele.appendChild(row);
  //   }

  form.reset();
});
///-------------Button in Action--------------
const btnAction = document.getElementById("action");
btnAction.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const btn = e.target;
    console.log(btn.value);
    const tr = btn.parentNode.parentNode;
    const list = tr.parentNode;
    list.removeChild(tr);
    axios.delete(`${url}/${btn.value}`).then(console.log("Order deleted!!!"));
  }
});
