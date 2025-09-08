function dataSum(arr) {
  let map = {};

  for (let item of arr) {
    let key = (item.name || " ").trim();
    if (!map[key]) {
      map[key] = { name: key, quantity: 0, price: 0 };
    }

    map[key].quantity += Number(item.quantity) || 0;
    map[key].price += Number(item.price) || 0;
  }

  var result = [];
  for (var k in map) {
    if (Object.prototype.hasOwnProperty.call(map, k)) {
      if (map[k].quantity > 0) {
        result.push(map[k]);
      }
    }
  }
  return result;
}

arr = [
  { name: "nafi", quantity: 1, price: 100 },

  {
    name: "rafi",
    quantity: 1,
    price: 200,
  },

  { name: "nafi", quantity: 1, price: 100 },
];
arr1 = dataSum(arr);
console.log(arr1);

let sum = 0;
arr1.forEach((element) => {
  sum += element.price;
});

console.log(sum);
