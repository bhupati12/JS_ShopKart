//get the all input field
let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let email = document.getElementById("email-1");
let number = document.getElementById("number-1");
let plusOne = document.getElementById("plus-1");
let plusTwo = document.getElementById("plus-2");
let submit = document.getElementById("submit");
let product = document.querySelectorAll(`input[name = "product"]`);
let payment = document.querySelectorAll(`input[name = "payment"]`);
let gift = document.querySelectorAll(`input[name="gift"]`);
let shipping = document.querySelectorAll(`input[name="ship-address"]`);
let quantity = document.querySelectorAll(`select[name = "quantity"]`);
let sizeProduct = document.querySelectorAll(`select[name = "size"]`);
let productColor = document.querySelectorAll(`select[name = "color"]`);
let country = document.getElementById("country");
let city = document.getElementById("city");
let state = document.getElementById("state");
let zipCode = document.getElementById("zip-code");
let instruction = document.getElementById("instruction");
let reset = document.getElementById("reset");
let purchasePrice = document.getElementById("total-price");
let addressOne = document.getElementById("address-1");
let addressTwo = document.getElementById("address-2");
let updateOrder = document.getElementById("update-order");
let storage = window.localStorage;
/***************************************************************************************************************************/
// regex
let regex = {
  regexFirstName: /^[a-zA-Z]+$/,
  regexLastName: /^[a-zA-Z]+$/,
  regexDate: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
  regexEmail: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  regexNumber: /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/,
  regexAddress: /^[#.0-9a-zA-Z\s,-]+$/,
  regexCity: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
  regexState: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
  regexZipCode: /^\d{6}(?:[-\s]\d{4})?$/,
};

/***************************************************************************************************************************/
// Show Error
function setError(elementId, errorMsg) {
  let element = document.getElementById(elementId);
  let err = elementId + "-error";
  let errElement = document.getElementById(err);

  // if (element.classList.contains("is-valid")) {
  //   element.classList.remove("is-valid");
  // }

  // if (errElement.classList.contains("valid-feedback")) {
  //   errElement.classList.remove("valid-feedback");
  // }

  if (!element.classList.contains("is-invalid")) {
    element.classList.remove("is-valid");
    errElement.classList.remove("valid-feedback");
    errElement.classList.add("invalid-feedback");
    element.classList.add("is-invalid");
  }

  // if (!errElement.classList.contains("invalid-feedback")) {
  //   errElement.classList.add("invalid-feedback");
  // }

  errElement.innerHTML = errorMsg;
}

// Show Success
function setSuccess(elementId, errorMsg) {
  let element = document.getElementById(elementId);
  let err = elementId + "-error";
  let errElement = document.getElementById(err);

  // if (element.classList.contains("is-invalid")) {
  //   element.classList.remove("is-invalid");
  // }

  // if (errElement.classList.contains("invalid-feedback")) {
  //   errElement.classList.remove("invalid-feedback");
  // }

  if (!element.classList.contains("is-valid")) {
    element.classList.remove("is-invalid");
    errElement.classList.remove("invalid-feedback");
    errElement.classList.add("valid-feedback");

    element.classList.add("is-valid");
  }

  // if (!errElement.classList.contains("valid-feedback")) {
  //   errElement.classList.add("valid-feedback");
  // }

  errElement.innerHTML = errorMsg;
}

/***************************************************************************************************************************/

// Validate Input
function validateInput(elementId) {
  let element = document.getElementById(elementId);
  let regexStr = "regex";
  elementId.split("-").forEach(function (value, index) {
    if (Number(value) != value) {
      regexStr += value[0].toUpperCase() + value.slice(1);
    }
  });
  return regex[regexStr].test(element.value);
}

/***************************************************************************************************************************/

// Blur Event on input Field
function onBlur(elementId) {
  document.getElementById(elementId).addEventListener("blur", function (event) {
    let element = event.target;
    // if (element.value === "") {
    //   setError(
    //     element.id,
    //     "*field can't be empty, please enter valid input!!!"
    //   );
    // } else
    if (!validateInput(element.id)) {
      setError(element.id, "*please enter valid input");
    } else {
      setSuccess(element.id, "");
    }
  });
}

// Focus event on input Field
function onFocus(elementId) {
  // document
  //   .getElementById(elementId)
  //   .addEventListener("focus", function (event) {
  //     let element = event.target;
  //     let err = element.id + "-error";
  //     let errElement = document.getElementById(err);
  //     if (element.classList.contains("is-valid")) {
  //       element.classList.remove("is-valid");
  //     }
  //     if (element.classList.contains("is-invalid")) {
  //       element.classList.remove("is-invalid");
  //     }
  //     if (errElement.classList.contains("valid-feedback")) {
  //       errElement.classList.remove("valid-feedback");
  //     }
  //     if (errElement.classList.contains("invalid-feedback")) {
  //       errElement.classList.remove("invalid-feedback");
  //     }
  //     errElement.innerHTML = "";
  //   });
}

// merge both focus and blur
function mergeBlurFocus(elementId) {
  onFocus(elementId), onBlur(elementId);
}

// call merge function to apply blur and focus
mergeBlurFocus("first-name");
mergeBlurFocus("last-name");
mergeBlurFocus("email-1");
mergeBlurFocus("number-1");
mergeBlurFocus("city");
mergeBlurFocus("state");
mergeBlurFocus("zip-code");

/**************************************************************************************************************************/
// validate email and number input field
function validateAddMinus(elementArray) {
  let andOperations = true;
  let max = 0;
  elementArray.forEach(function (element, index) {
    andOperations &= validateInput(element.id);
    let num = Number(element.id.split("-")[1]);
    if (num > max) {
      max = num;
    }
  });

  return [andOperations, max];
}

// remove email and number input field
function removeInput(event) {
  let eleId = event.target.parentNode.parentNode.parentNode.id;

  let ele = document.getElementById(eleId);
  let parent = document.getElementById(eleId.split("-")[0]);
  parent.removeChild(ele);
}

// add email and number input field
function addInputField(eleName, type, idNum) {
  let parent = document.getElementById(eleName);
  //d
  let d = document.createElement("div");
  d.setAttribute("class", "row mb-3");
  d.setAttribute("id", `${eleName}-p-${idNum}`);

  //d1
  let d1 = document.createElement("div");
  d1.setAttribute("class", "col-6");

  let input = document.createElement("input");
  input.setAttribute("type", type);
  input.setAttribute("class", `form-control common-${eleName}`);
  input.setAttribute("id", `${eleName}-${idNum}`);
  input.setAttribute("name", `${eleName}-${idNum}`);
  // input.setAttribute("placeholder", "ex: myname@example.com");

  let d2 = document.createElement("div");
  d2.setAttribute("class", "form-text");
  d2.setAttribute("id", `${eleName}-${idNum}-error`);

  d1.appendChild(input);
  d1.appendChild(d2);

  let d3 = document.createElement("div");
  d3.setAttribute("class", "col-6 px-0");

  let btn1 = document.createElement("button");
  btn1.setAttribute("class", "btn bg-transparent border-0 px-0 pe-1");
  btn1.setAttribute("type", "button");
  btn1.innerHTML = `<i class="fa-solid fa-circle-plus fa-2x text-success"></i>`;
  btn1.addEventListener("click", addInput);

  let btn2 = document.createElement("button");
  btn2.setAttribute("class", "btn bg-transparent border-0 px-0");
  btn2.setAttribute("type", "button");
  btn2.innerHTML = `<i class="fa-solid fa-circle-minus fa-2x text-danger"></i>`;
  btn2.addEventListener("click", removeInput);

  d3.appendChild(btn1);
  d3.appendChild(btn2);

  //d
  d.appendChild(d1);
  d.appendChild(d3);

  //email
  parent.appendChild(d);

  mergeBlurFocus(`${eleName}-${idNum}`);
}

// event handler function for adding email and number
function addInput(event) {
  let eleName = event.target.parentNode.parentNode.parentNode.id.split("-")[0];
  let type = "";

  if (eleName === "email") {
    type = "email";
  } else {
    type = "tel";
  }

  let EmailArray = document.querySelectorAll(`#${eleName} .common-${eleName}`);
  let res = validateAddMinus(EmailArray);
  if (res[0]) {
    // wrong idNum
    let idNum = res[1] + 1;
    addInputField(eleName, type, idNum);
  } else {
    // show error fill all email
  }
}

// add event listener on plus button
plusOne.addEventListener("click", addInput);
plusTwo.addEventListener("click", addInput);

/*******************************************************************************************************************/
// validate radio and checkbox buttons
function validateRadioCheck(elementArray) {
  let count = 0;
  for (let i = 0; i < elementArray.length; i++) {
    if (elementArray[i].checked) {
      count++;
    }
  }
  return count;
}

// get value from radio and checkbox buttons
function getRadioCheck(elementArray) {
  let cardDetails = [];
  for (let i = 0; i < elementArray.length; i++) {
    if (elementArray[i].checked) {
      cardDetails.push(elementArray[i].value);
    }
  }
  return cardDetails;
}

// getting the product details like qty, price, color, size and product number
function getProductDetails() {
  let productValue = [];
  for (let i = 0; i < product.length; i++) {
    if (product[i].checked) {
      let cardNumber = product[i].id.split("-")[1];

      //quantity
      let selectElementQuantity = document.getElementById(
        `quantity-${cardNumber}`
      );
      let qty = Number(
        selectElementQuantity.options[selectElementQuantity.selectedIndex]
          .innerHTML
      );

      //price
      let price = Number(
        document.getElementById(`price-${cardNumber}`).innerHTML.slice(1)
      );

      //color
      let color = "";
      if (cardNumber != 3) {
        let selectElementColor = document.getElementById(`color-${cardNumber}`);
        color =
          selectElementColor.options[selectElementColor.selectedIndex]
            .innerHTML;
      }

      // size
      let selectElementSize = document.getElementById(`size-${cardNumber}`);
      let size =
        selectElementSize.options[selectElementSize.selectedIndex].innerHTML;

      productValue.push({
        productNumber: cardNumber,
        qty: qty,
        price: price,
        color: color,
        size: size,
      });
    }
  }
  return productValue;
}

// update the price if users change the qty or add new items
function updatePrice() {
  let totalPrice = 0;
  for (let i = 0; i < product.length; i++) {
    if (product[i].checked) {
      let cardNumber = Number(product[i].id.split("-")[1]);
      let qtyId = `quantity-${cardNumber}`;
      let selectElement = document.getElementById(qtyId);
      let qty = Number(
        selectElement.options[selectElement.selectedIndex].innerHTML
      );
      let price = Number(
        document.getElementById(`price-${cardNumber}`).innerHTML.slice(1)
      );

      totalPrice += qty * price;
    }
  }
  purchasePrice.innerHTML = "$" + totalPrice + ".00";
}

//change event listener on product checkbox
product.forEach(function (element) {
  element.addEventListener("change", updatePrice);
});

// change event listener on qty dropdown
quantity.forEach(function (element) {
  element.addEventListener("change", updatePrice);
});

// getting the value of all email and number from input field
function getValueEmailNumber(getName) {
  let array = document.querySelectorAll(`#${getName} .common-${getName}`);
  let elementValue = [];
  array.forEach(function (val) {
    elementValue.push(val.value);
  });
  return elementValue;
}

/********************************************************************************************************************/
// check if field are fields are validated or not
function validateAllInputField() {
  let emailArray = document.querySelectorAll(`#email .common-email`);
  let numberArray = document.querySelectorAll(`#number .common-number`);
  let andOperations = true;
  andOperations &= validateInput("first-name");
  andOperations &= validateInput("last-name");
  andOperations &= validateAddMinus(emailArray)[0];
  andOperations &= validateAddMinus(numberArray)[0];
  andOperations &= validateInput("city");
  andOperations &= validateInput("state");
  andOperations &= validateInput("zip-code");
  andOperations &= validateCountry();
  andOperations &= validateRadioCheck(product) > 1;
  andOperations &= validateRadioCheck(payment) > 0;

  return andOperations;
}

// function showFieldError

/********************************************************************************************************************/

// adding data in table on submit button
function addData(event) {
  if (validateAllInputField()) {
    let users;
    if (storage.getItem("users") === null) {
      users = [];
    } else {
      users = JSON.parse(storage.getItem("users"));
    }

    users.push({
      firstName: firstName.value,
      lastName: lastName.value,
      email: getValueEmailNumber("email"),
      number: getValueEmailNumber("number"),
      product: getProductDetails(),
      gift: getRadioCheck(gift),
      shipping: getRadioCheck(shipping),
      paymentMethod: getRadioCheck(payment),
      specialMessage: instruction.value,
      address: [
        addressOne.value,
        addressTwo.value,
        city.value,
        state.value,
        zipCode.value,
        getCountry(),
      ],
    });

    storage.setItem("users", JSON.stringify(users));
    showData();
    resetData();
  } else {
    alert("check all field then submit the order");
  }
}
submit.addEventListener("click", addData);

/********************************************************************************************************************/
// showing data in table

function showData() {
  let users;
  if (storage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(storage.getItem("users"));
  }

  let html = "";

  users.forEach(function (object, index) {
    html += `<tr>
    <td>${object.firstName + " " + object.lastName}</td>
    <td>${object.email[0]}</td>
    <td>${object.number[0]}</td>
    <td>
    <button class = "btn btn-warning bg-transparent border-0 p-0 m-0 px-2" type = "button" onclick = "updateData(${index})"><i
    class="fa-solid fa-pen text-warning"></i></button>
    <button class = "btn btn-danger bg-transparent border-0 p-0 m-0" type = "button" onclick = "deleteData(${index})"><i
    class="fa-solid fa-trash text-danger"></i></button>
    </td>
    </tr>`;
  });

  document.querySelector("table tbody").innerHTML = html;
}
document.onload = showData();

/********************************************************************************************************************/
// delete data from table
function deleteData(index) {
  if (confirm("Are you sure, to delete this data?")) {
    let users;
    if (storage.getItem("users") === null) {
      users = [];
    } else {
      users = JSON.parse(storage.getItem("users"));
    }

    users.splice(index, 1);
    storage.setItem("users", JSON.stringify(users));
    showData();
    resetData();
  }
}

/********************************************************************************************************************/
// edit and update function if users click edit button

function updateData(selectedRow) {
  let users;
  if (storage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(storage.getItem("users"));
  }

  resetData();
  if (!submit.classList.contains("d-none")) {
    submit.classList.add("d-none");
  }

  if (updateOrder.classList.contains("d-none")) {
    updateOrder.classList.remove("d-none");
  }

  firstName.value = users[selectedRow].firstName;
  lastName.value = users[selectedRow].lastName;
  updateEmailNumber(users[selectedRow].email, "email", "email");
  updateEmailNumber(users[selectedRow].number, "number", "tel");
  updateProductDetails(users[selectedRow].product);
  updateRadioCheck(users[selectedRow].gift, gift);
  updateRadioCheck(users[selectedRow].shipping, shipping);
  updateRadioCheck(users[selectedRow].paymentMethod, payment);
  instruction.value = users[selectedRow].specialMessage;
  addressOne.value = users[selectedRow].address[0];
  addressTwo.value = users[selectedRow].address[1];
  city.value = users[selectedRow].address[2];
  state.value = users[selectedRow].address[3];
  zipCode.value = users[selectedRow].address[4];
  country.value = users[selectedRow].address[5];

  updateOrder.onclick = function () {
    if (validateAllInputField()) {
      users[selectedRow].firstName = firstName.value;
      users[selectedRow].lastName = lastName.value;
      users[selectedRow].email = getValueEmailNumber("email");
      users[selectedRow].number = getValueEmailNumber("number");
      users[selectedRow].product = getProductDetails();
      users[selectedRow].gift = getRadioCheck(gift);
      users[selectedRow].shipping = getRadioCheck(shipping);
      users[selectedRow].paymentMethod = getRadioCheck(payment);
      users[selectedRow].specialMessage = instruction.value;
      users[selectedRow].address = [
        addressOne.value,
        addressTwo.value,
        city.value,
        state.value,
        zipCode.value,
        getCountry(),
      ];

      window.localStorage.setItem("users", JSON.stringify(users));
      showData();

      if (submit.classList.contains("d-none")) {
        submit.classList.remove("d-none");
      }

      if (!updateOrder.classList.contains("d-none")) {
        updateOrder.classList.add("d-none");
      }
      resetData();
    } else {
      // show error
    }
  };
}

// function for update the value of radio and checkbox button
function updateRadioCheck(array, elementArray) {
  elementArray.forEach(function (ele, index) {
    if (array.includes(ele.value)) {
      ele.checked = true;
    }
  });
}

//function for update product details like qty, price, color, size and product number
function updateProductDetails(productArray) {
  // {productNumber: "2", qty: 2, price: 5, color: "Green", size: "XS"}
  let totalPrice = 0;
  productArray.forEach(function (productElement) {
    let productNumber = productElement.productNumber;
    let qty = productElement.qty;
    let price = productElement.price;
    let color = productElement.color;
    let size = productElement.size;

    totalPrice += qty * price;

    let productId = document.getElementById(`product-${productNumber}`);
    let quantityId = document.getElementById(`quantity-${productNumber}`);
    let sizeId = document.getElementById(`size-${productNumber}`);
    if (color != "") {
      let colorId = document.getElementById(`color-${productNumber}`);
      colorId.value = color;
    }

    productId.checked = true;
    quantityId.value = qty;
    sizeId.value = size;
  });
  purchasePrice.innerHTML = "$" + totalPrice + ".00";
}

// update the email and number in input field
function updateEmailNumber(array, eleName, type) {
  array.forEach(function (value, index) {
    if (index == 0) {
      document.getElementById(`${eleName}-${index + 1}`).value = value;
    } else {
      addInputField(eleName, type, index + 1);
      document.getElementById(`${eleName}-${index + 1}`).value = value;
    }
  });
}

/********************************************************************************************************************/
// reset data when user click on add data
reset.addEventListener("click", resetData);

// reset event handler function if user click on add-new button
function resetData() {
  firstName.value = "";
  lastName.value = "";
  resetEmailNumber("email");
  resetEmailNumber("number");
  resetRadioCheck(gift);
  resetRadioCheck(shipping);
  resetRadioCheck(payment);
  resetRadioCheck(product);
  purchasePrice.innerHTML = "$0.00";

  resetSelectElement(quantity);
  resetSelectElement(sizeProduct);
  resetSelectElement(productColor);
  instruction.value = "";
  addressOne.value = "";
  addressTwo.value = "";
  city.value = "";
  state.value = "";
  zipCode.value = "";
  country.value = 0;

  let input = document.querySelectorAll("input");
  input.forEach(function (ele) {
    if (ele.classList.contains("is-valid")) {
      ele.classList.remove("is-valid");
    }

    if (ele.classList.contains("is-invalid")) {
      ele.classList.remove("is-invalid");
    }
  });

  if (country.classList.contains("is-valid")) {
    country.classList.remove("is-valid");
  }

  if (country.classList.contains("is-invalid")) {
    country.classList.remove("is-invalid");
  }

  if (submit.classList.contains("d-none")) {
    submit.classList.remove("d-none");
  }

  if (!updateOrder.classList.contains("d-none")) {
    updateOrder.classList.add("d-none");
  }
}

//function for reset all dropdown element
function resetSelectElement(selectElement) {
  selectElement.forEach(function (ele) {
    ele.options[0].selected = true;
  });
}

// function for reset all email and numbers
function resetEmailNumber(eleName) {
  let emailArray = document.querySelectorAll(`#${eleName} .common-${eleName}`);
  emailArray.forEach(function (ele, index) {
    if (index === 0) {
      ele.value = "";
    } else {
      let parent = document.getElementById(eleName);
      let child = document.getElementById(
        `${eleName}-p-${ele.id.split("-")[1]}`
      );
      parent.removeChild(child);
    }
  });
}

// functions for reset all radio and checkbox button
function resetRadioCheck(elementArray) {
  elementArray.forEach(function (ele, index) {
    if ((ele.name === "ship-address" || ele.name === "gift") && index === 0) {
      ele.checked = true;
    } else {
      ele.checked = false;
    }
  });
}

/********************************************************************************************************************/
// fetch all countries from this api and add all countries in dropdown
fetch("https://restcountries.com/v3.1/all")
  .then(function (response) {
    return response.json();
  })
  .then(function (countries) {
    let countryList = [];
    countries.forEach(function (country, index) {
      countryList.push(country.name.common);
    });
    countryList.sort();

    let countriesHtml = `<option value="0">Please Select</option>`;
    countryList.forEach(function (country) {
      countriesHtml += `<option value = "${country}">${country}</option>`;
    });

    country.innerHTML = countriesHtml;
  })
  .catch(function (err) {
    console.log(err);
  });

//getting the value of country from dropdown
function getCountry() {
  return country.options[country.selectedIndex].innerHTML;
}

//set success if users select the value from dropdown
function countryGreen(event) {
  let countryValue = country.options[country.selectedIndex].innerHTML;
  if (countryValue === "Please Select") {
    if (country.classList.contains("is-valid")) {
      country.classList.remove("is-valid");
    }
    if (!country.classList.contains("is-invalid")) {
      country.classList.add("is-invalid");
    }
  } else {
    if (country.classList.contains("is-invalid")) {
      country.classList.remove("is-invalid");
    }
    if (!country.classList.contains("is-valid")) {
      country.classList.add("is-valid");
    }
  }
}

// set error if users doesn't select the value from dropdown
function countryRed(event) {
  if (country.classList.contains("is-valid")) {
    country.classList.remove("is-valid");
  }
  if (country.classList.contains("is-invalid")) {
    country.classList.remove("is-invalid");
  }
}

//check validation, user select any value from dropdown
function validateCountry() {
  let countryValue = country.options[country.selectedIndex].innerHTML;
  if (countryValue === "Please Select") return false;
  return true;
}

// add event listener on country dropdown
country.addEventListener("blur", countryGreen);
country.addEventListener("focus", countryRed);

/********************************************************************************************************************/

/*

update.addEventListener("click", function () {
    console.log(selectedRow);
    debugger;
    if (validateAllInputField()) {
      let idx = selectedRow;
      console.log(idx, selectedRow);

      users[idx].firstName = firstName.value;
      users[idx].lastName = lastName.value;
      users[idx].email = getValueEmailNumber("email");
      users[idx].number = getValueEmailNumber("number");
      users[idx].product = getProductDetails();
      users[idx].gift = getRadioCheck(gift);
      users[idx].shipping = getRadioCheck(shipping);
      users[idx].paymentMethod = getRadioCheck(payment);
      users[idx].specialMessage = instruction.value;
      users[idx].address = [
        addressOne.value,
        addressTwo.value,
        city.value,
        state.value,
        zipCode.value,
        getCountry(),
      ];

      storage.setItem("users", JSON.stringify(users));
      showData();

      if (submit.classList.contains("d-none")) {
        submit.classList.remove("d-none");
      }

      if (!update.classList.contains("d-none")) {
        update.classList.add("d-none");
      }
      resetData();
    }
  });

*/
