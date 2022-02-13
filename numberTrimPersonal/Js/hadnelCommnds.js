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
      key: key,
      value: reply,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://whatsappmeserver.herokuapp.com/commands", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (res.message) alert("Command Already Exists");
        else alert("Command Added");
      })
      .catch((error) => console.log("error", error));
  }
};
