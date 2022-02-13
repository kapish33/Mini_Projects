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
      key: key.trim(),
      value: reply.trim(),
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
        // copy key to clipboard
        copyToClipboard(key);
      })
      .catch((error) => console.log("error", error));
  }
};
function copyToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}
