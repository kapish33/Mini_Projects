const handelfunction = () => {
  //   console.log("handel function");
  const key = document.getElementById("key").value;
  const reply = document.getElementById("reply").value;

  if (key === "") {
    alert("Enter a key");
  } else if (reply === "") {
    alert("Enter a reply");
  } else {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      key: newKey,
      value: newReply,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://whatsappmeserver.herokuapp.com/commands/This%20is%20test",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
};
