const sendData = () => {
  console.log("sendData");
  const name = document.getElementById("name").value;
  const number = document.getElementById("number").value;
  const city = document.getElementById("city").value;
  if (name === "" || number === "" || city === "") {
    alert("Please fill all the fields");
  } else if (number.length < 10) {
    alert("Please enter a valid number");
  } else {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      phoneNumber: number,
      city: city,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://whatsappmeserver.herokuapp.com/users", requestOptions)
      .then((response) => response.text())
      .then((result) => alert("Successfully registered"))
      .then(() => {
        window.location.href =
          "https://wa.me/+917722007808?text=Am%20I%20Regestred";
      })
      .catch((error) => alert("Something went wrong"));
  }
};
const number = document.getElementById("number");
number.addEventListener("keyup", () => {
  if (number.value.length > 10) {
    number.value = number.value.slice(0, 10);
    alert("Enter Your 10 digit number");
  }
  if (isNaN(number.value)) {
    number.value = number.value.slice(0, number.value.length - 1);
  }
});
