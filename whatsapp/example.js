const fs = require("fs");

// line 3 to 20 is for import numbers from csv file
const csvFilePath = "./Sheet1.csv"; // this is for import only
const csv = require("csvtojson");
let numbers = [];
let setNumbers = []; //user can set numbers
csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    for (let i = 0; i < jsonObj.length; i++) {
      let number = jsonObj[i]["Name"];
      //   remove + sumbole if exists in string
      if (number.includes("+")) {
        number = number.replace("+", "");
      }
      // if not contains 91 in strating then add 91
      if (!number.startsWith("91")) {
        number = "91" + number;
      }
      numbers.push(number);
    }
  });
const { Client, Location, List, Buttons } = require("whatsapp-web.js");
const { set } = require("express/lib/response");

const SESSION_FILE_PATH = "./session.json";
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({
  puppeteer: { headless: false },
  session: sessionCfg,
});
// You can use an existing session and avoid scanning a QR code by adding a "session" object to the client options.
// This object must include WABrowserId, WASecretBundle, WAToken1 and WAToken2.

// You also could connect to an existing instance of a browser
// {
//    puppeteer: {
//        browserWSEndpoint: `ws://localhost:3000`
//    }
// }

client.initialize();

client.on("qr", (qr) => {
  // NOTE: This event will not be fired if a session is specified.
  console.log("QR RECEIVED", qr);
});

client.on("authenticated", (session) => {
  console.log("AUTHENTICATED", session);
  sessionCfg = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
    if (err) {
      console.error(err);
    }
  });
});

client.on("auth_failure", (msg) => {
  // Fired if session restore was unsuccessfull
  console.error("AUTHENTICATION FAILURE", msg);
});

client.on("ready", () => {
  console.log("READY");
});

client.on("message", async (msg) => {
  console.log("MESSAGE RECEIVED", msg);
  if (msg.body === "Learn Meditation") {
    await client.sendMessage(msg.from, "Hello!");
  } else if (msg.body === "Yes") {
    await client.sendMessage(msg.from, "Yes!");
  } else if (msg.body === "No") {
    await client.sendMessage(msg.from, "No!");
  } else if (msg.body.trim().toLowerCase() === "JaIGurudev".toLowerCase()) {
    // Send a new message as a reply to the current one
    msg.reply("JaiGurudev");
  } else if (
    msg.body.trim().toLowerCase() === "Sudarshan kriya".toLowerCase()
  ) {
    msg.reply("bit.ly/lavkesh");
  } else if (
    msg.body.trim().toLowerCase() === "Sahaj Samadhi Meditation".toLowerCase()
  ) {
    msg.reply("bit.ly/lavkesh");
  } else if (
    msg.body.trim().toLowerCase() === "Free Meditation Session".toLowerCase()
  ) {
    msg.reply("bit.ly/lavkesh");
  } else if (
    msg.body.trim().toLowerCase() === "Call assistance".toLowerCase()
  ) {
    msg.reply("bit.ly/lavkesh");
  } else if (
    msg.body.trim().toLowerCase() ===
    "Advanced Meditation Program".toLowerCase()
  ) {
    msg.reply("bit.ly/lavkesh");
  } else if (
    msg.body.trim().toLowerCase() === "Wisdom by Gurudev".toLowerCase()
  ) {
    msg.reply("bit.ly/lavkesh");
  } else if (
    msg.body.trim().toLowerCase() === "Want to Volunteer".toLowerCase()
  ) {
    msg.reply("bit.ly/lavkesh");
  } else if (msg.body === "!ping") {
    // Send a new message to the same chat
    client.sendMessage(msg.from, "pong");
  } else if (msg.body.startsWith("!sendto ")) {
    // Direct send a new message to specific id
    let number = msg.body.split(" ")[1];
    let messageIndex = msg.body.indexOf(number) + number.length;
    let message = msg.body.slice(messageIndex, msg.body.length);
    number = number.includes("@c.us") ? number : `${number}@c.us`;
    let chat = await msg.getChat();
    chat.sendSeen();
    client.sendMessage(number, message);
    // exmple message - !sendto 987654321 Hello World
  } else if (msg.body.startsWith("!subject ")) {
    // Change the group subject
    let chat = await msg.getChat();
    if (chat.isGroup) {
      let newSubject = msg.body.slice(9);
      chat.setSubject(newSubject);
    } else {
      msg.reply("This command can only be used in a group!");
    }
  } else if (msg.body.startsWith("!echo ")) {
    // Replies with the same message on group as well as personal
    msg.reply(msg.body.slice(6));
  } else if (msg.body.startsWith("!desc ")) {
    // Change the group description
    let chat = await msg.getChat();
    if (chat.isGroup) {
      let newDescription = msg.body.slice(6);
      chat.setDescription(newDescription);
    } else {
      msg.reply("This command can only be used in a group!");
    }
  } else if (msg.body === "!leave") {
    // Leave the group
    let chat = await msg.getChat();
    if (chat.isGroup) {
      chat.leave();
    } else {
      msg.reply("This command can only be used in a group!");
    }
  } else if (msg.body.startsWith("!join ")) {
    const inviteCode = msg.body.split(" ")[1];
    try {
      await client.acceptInvite(inviteCode);
      msg.reply("Joined the group!");
    } catch (e) {
      msg.reply("That invite code seems to be invalid.");
    }
  } else if (msg.body === "!groupinfo") {
    let chat = await msg.getChat();
    if (chat.isGroup) {
      msg.reply(`
                *Group Details*
                Name: ${chat.name}
                Description: ${chat.description}
                Created At: ${chat.createdAt.toString()}
                Created By: ${chat.owner.user}
                Participant count: ${chat.participants.length}
            `);
    } else {
      msg.reply("This command can only be used in a group!");
    }
  } else if (msg.body === "!chats") {
    const chats = await client.getChats();
    client.sendMessage(msg.from, `The bot has ${chats.length} chats open.`);
  } else if (msg.body === "!info") {
    let info = client.info;
    client.sendMessage(
      msg.from,
      `
            *Connection info*
            User name: ${info.pushname}
            My number: ${info.me.user}
            Platform: ${info.platform}
            WhatsApp version: ${info.phone.wa_version}
        `
    );
  } else if (msg.body === "!mediainfo" && msg.hasMedia) {
    const attachmentData = await msg.downloadMedia();
    msg.reply(`
            *Media info*
            MimeType: ${attachmentData.mimetype}
            Filename: ${attachmentData.filename}
            Data (length): ${attachmentData.data.length}
        `);
  } else if (msg.body === "!quoteinfo" && msg.hasQuotedMsg) {
    const quotedMsg = await msg.getQuotedMessage();

    quotedMsg.reply(`
            ID: ${quotedMsg.id._serialized}
            Type: ${quotedMsg.type}
            Author: ${quotedMsg.author || quotedMsg.from}
            Timestamp: ${quotedMsg.timestamp}
            Has Media? ${quotedMsg.hasMedia}
        `);
  } else if (msg.body === "!resendmedia" && msg.hasQuotedMsg) {
    const quotedMsg = await msg.getQuotedMessage();
    if (quotedMsg.hasMedia) {
      const attachmentData = await quotedMsg.downloadMedia();
      client.sendMessage(msg.from, attachmentData, {
        caption: "Here's your requested media.",
      });
    }
  } else if (msg.body === "!location") {
    msg.reply(
      new Location(37.422, -122.084, "Googleplex\nGoogle Headquarters")
    );
  } else if (msg.location) {
    msg.reply(msg.location);
  } else if (msg.body.startsWith("!status ")) {
    const newStatus = msg.body.split(" ")[1];
    await client.setStatus(newStatus);
    msg.reply(`Status was updated to *${newStatus}*`);
  } else if (msg.body === "!mention") {
    const contact = await msg.getContact();
    const chat = await msg.getChat();
    chat.sendMessage(`Hi @${contact.number}!`, {
      mentions: [contact],
    });
  } else if (msg.body === "!delete") {
    if (msg.hasQuotedMsg) {
      const quotedMsg = await msg.getQuotedMessage();
      if (quotedMsg.fromMe) {
        quotedMsg.delete(true);
      } else {
        msg.reply("I can only delete my own messages");
      }
    }
  } else if (msg.body === "!pin") {
    const chat = await msg.getChat();
    await chat.pin();
  } else if (msg.body === "!archive") {
    const chat = await msg.getChat();
    await chat.archive();
  } else if (msg.body === "!mute") {
    const chat = await msg.getChat();
    // mute the chat for 20 seconds
    const unmuteDate = new Date();
    unmuteDate.setSeconds(unmuteDate.getSeconds() + 20);
    await chat.mute(unmuteDate);
  } else if (msg.body === "!typing") {
    const chat = await msg.getChat();
    // simulates typing in the chat
    chat.sendStateTyping();
  } else if (msg.body === "!recording") {
    const chat = await msg.getChat();
    // simulates recording audio in the chat
    chat.sendStateRecording();
  } else if (msg.body === "!clearstate") {
    const chat = await msg.getChat();
    // stops typing or recording in the chat
    chat.clearState();
  } else if (msg.body === "!jumpto") {
    if (msg.hasQuotedMsg) {
      const quotedMsg = await msg.getQuotedMessage();
      client.interface.openChatWindowAt(quotedMsg.id._serialized);
    }
  } else if (msg.body.trim().toLowerCase() === "AOLhelpline".toLowerCase()) {
    let button = new Buttons(
      `ABOUT US 
      
We serve society by strengthening the individual Operating in 156 countries,The Art of Living is a non-profit, educational and humanitarian organization founded in 1981 by the world-renowned humanitarian and spiritual teacher - Gurudev Sri Sri Ravi Shankar. 

All our programs are guided by Gurudev’s philosophy: “Unless we have a stress-free mind and a violence-free society, we cannot achieve world peace."
      
The Art of Living community is diverse and attracts people from all walks of life. 

To connect with us visit www.artoflivingmeditation.org/lavkesh  
      `, //main content of the button
      [
        { body: "Learn Meditation" }, //
        { body: "Call assistance" }, //
        { body: "Beginners Guide" },
      ],
      "Helpline", // headder
      "Select an option" // fotter
    );
    client.sendMessage(msg.from, button);
  } else if (msg.body === "!list") {
    let sections = [
      {
        title: "sectionTitle",
        rows: [
          { title: "ListItem1", description: "Desription of ListItem1" },
          { title: "ListItem2", description: "List @ 2" },
        ],
      },
    ];
    let list = new List("List body", "btnText", sections, "Title", "footer");
    client.sendMessage(msg.from, list);
  } else if (msg.body.startsWith("!sendMsg ")) {
    // take everythign after the first space
    const indexofmessage = msg.body.indexOf(" ");
    const message = msg.body.substring(indexofmessage + 1);
    // let number = msg.body.split(" ")[1];
    for (let i = 0; i < numbers.length; i++) {
      let number = numbers[i];
      number = number.includes("@c.us") ? number : `${number}@c.us`;
      let chat = await msg.getChat();
      // attach a media to the message
      let attachmentData = await msg.downloadMedia();

      chat.sendSeen();
      client.sendMessage(number, attachmentData, {
        caption: `${message}`,
      });
    }
  } else if (msg.body.startsWith("!setNumbers")) {
    // if setNumber is empty then empty that
    if (setNumbers.length > 0) {
      setNumbers = []; // if numbers aready exist then empty that
    }

    // remove !setNumbers
    value = msg.body;
    value = value.replace("!setNumbers", "");
    // seplit by new line
    let lines = value.trim().split("\n");
    lines.forEach((number) => {
      if (number.startsWith("+")) {
        number = number.replace("+", "");
      }
      if (!number.startsWith("91")) {
        number = "91" + number;
      }
      setNumbers.push(number);
    });
    setNumbers.push("919825022540");
    setNumbers.push("917984399290");
    //set numberts to a string for sending only
    // add senders number to the list
    // if msg.from contains "@c.us"  or -1622737164@g.us then reomove this -1622737164@g.us or @c.us
    // if message is in group then add sender number to the list

    // let author = msg.author.replace("@c.us", "");
    let author = msg.from
      ? msg.from.replace("@c.us", "")
      : msg.author.replace("@c.us", "");

    // let pusher = msg.from.endsWith("@c.us")
    //   ? msg.from.replace("@c.us", "")
    //   : msg.from.replace("-1622737164@g.us", "");
    // if author contains -1622737164@g.us then remove this
    if (author.endsWith("-1622737164@g.us")) {
      author = author.replace("-1622737164@g.us", "");
    }
    setNumbers.push(author);
    // mention sender in the message
    let numbersString = "" + author;
    numbersString = numbersString.replace("-1622737164@g.us", "");
    numbersString += `😍  \n Welldone next Step is \n
*Now Follow Any One*\n
👇👇👇👇👇👇👇👇👇
"!sendMyAttachText "\n
"!sendTextOnly "\n
"!sendMsg "\n
"!sendTextUnAttachedPhoto " 

👆👆👆👆👆👆👆👆👆
\n`;
    for (let i = 0; i < setNumbers.length; i++) {
      numbersString += setNumbers[i] + "\n";
    }
    msg.reply(numbersString);
  }
  // send message of the setNumbers
  else if (msg.body.startsWith("!sendMyAttachText ")) {
    // take everythign after the first space
    const indexofmessage = msg.body.indexOf(" ");
    const message = msg.body.substring(indexofmessage + 1);
    // let number = msg.body.split(" ")[1];
    let attachmentData = await msg.downloadMedia();
    for (let i = 0; i < setNumbers.length; i++) {
      let number = setNumbers[i];
      number = number.includes("@c.us") ? number : `${number}@c.us`;
      let chat = await msg.getChat();
      // attach a media to the message
      chat.sendSeen();
      // random number between 500 to 1500
      let randomNumber = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
      // send message with settimeout
      setTimeout(() => {
        client.sendMessage(number, attachmentData, {
          caption: `${message}`,
        });
      }, randomNumber);
      // client.sendMessage(number, attachmentData, {
      //   caption: `${message}`,
      // });
      // client.sendMessage(number, attachmentData,{}, "message");
    }
  } else if (msg.body.toLocaleLowerCase() === "AmIOnline".toLocaleLowerCase()) {
    msg.reply("Yes");
  }
  // if user want to send text message to multiple numbers
  else if (msg.body.startsWith("!sendTextUnAttachedPhoto ")) {
    // take everythign after the first space
    const indexofmessage = msg.body.indexOf(" ");
    const message = msg.body.substring(indexofmessage + 1);
    // send Messages to set numbers
    for (let i = 0; i < setNumbers.length; i++) {
      let number = setNumbers[i];
      number = number.includes("@c.us") ? number : `${number}@c.us`;
      let chat = await msg.getChat();
      // attach a media to the message
      let attachmentData = await msg.downloadMedia();
      chat.sendSeen();
      // random number between 500 to 1500
      let randomNumber = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
      // send message with settimeout
      setTimeout(() => {
        // send photo
        client.sendMessage(number, attachmentData, {
          caption: `${""}`,
        });
        // set timeout for sending message
        setTimeout(() => {
          // send message
          client.sendMessage(number, message);
          // client.sendMessage(number, message);
        }, randomNumber);
      }, randomNumber);
    }
  } else if (msg.body.startsWith("!sendTextOnly ")) {
    // take everythign after the first space
    const indexofmessage = msg.body.indexOf(" ");
    const message = msg.body.substring(indexofmessage + 1);
    // send Messages to set numbers
    for (let i = 0; i < setNumbers.length; i++) {
      let number = setNumbers[i];
      number = number.includes("@c.us") ? number : `${number}@c.us`;
      let chat = await msg.getChat();
      // sendmessages to set numbers
      client.sendMessage(number, message);
    }
  } else if (msg.body.toLocaleLowerCase() === "!help".toLocaleLowerCase()) {
    let message = `
*for sending messages to multiple numbers*
*Command* "!setNumbers" No Space
example:
!setNumbers
+919012345678
+919012345679
+919012345680
---------------
(set Numbers) 
*Command* "!sendMyAttachText " (attched Mesages for images) 

*send Message Without Attachemnts*
*Command* 
"!sendTextUnAttachedPhoto " 
with spaces between the text and the photo shoudl be attchment
----------------
*Send Text Only*
*Command* "!sendTextOnly "
setps:
1. set numbers "!setNumbers"
2. send message 
"!sendTextOnly message"

----------------
*Sending From Spreadsheet*
*Command* "!sendMsg " 
with spaces and photo attached followed by Text 
Applicable for CSV (Beta Mode Available)
(Stable Mode For Me Only : ))



wa.me/+917984399290
    `;
    client.sendMessage(msg.from, message);
  }
  // sending button message to new users
  else if (msg.body.startsWith("!sendBtn ")) {
    // slice everything after the first space
    const indexofmessage = msg.body.indexOf(" ");
    const message = msg.body.substring(indexofmessage + 1);
    // send buttons to users
    for (let i = 0; i < setNumbers.length; i++) {
      let number = setNumbers[i];
      number = number.includes("@c.us") ? number : `${number}@c.us`;
      let chat = await msg.getChat();
      // send buttons to users
      let button = new Buttons(
        `
A rare opportunity for learning the world's most effortless meditation

Sahaj Samadhi Dhyana Yoga
        
PAN India ONLINE Sahaj Samadhi Festival with Bhanumati Narasimhan, sister of Gurudev Sri Sri Ravi Shankar.
                
🗓️ 28th - 30th Jan 22
                
Timing / Reg link
                
🕔 5 -7 AM
http://aolt.in/610755
                
🕔 7 -9 AM
http://aolt.in/610756
                
🕔 3 -5 PM
http://aolt.in/610748
                
🕔 5 -7 PM
http://aolt.in/610757
                
🕔 8 -10 PM
http://aolt.in/610759
                
Learn to meditate by yourself without guidance
         
Get a personal Mantra                
        
Benefits 
➡️Physical health
➡️Mental fitness
➡️Deep relaxation
➡️Spiritual Elevation 
                          
Click *Yes* below  to get a call back from our experts to know more`, //main content of the button
        [
          { body: "No" }, //
          { body: "Yes" }, //
        ],
        "Dear one,", // headder
        "Select an option" // fotter
      );
      client.sendMessage(number, button);
    }
  } else if (msg.body === "gettallGroups") {
    // get names of all groupss
    let groups = await client.getGroups();
    msg.reply("waiting");
  } else if (msg.body === "!everyone") {
    const chat = await msg.getChat();

    let text = "!setNumbers\n";
    let mentions = [];

    for (let participant of chat.participants) {
      const contact = await client.getContactById(participant.id._serialized);

      mentions.push(contact);
      text += `${participant.id.user} \n`;
    }

    // let parts = await chat.sendMessage(text, { mentions });
    // remove @ from mentions
    // let mentions = parts.mentions;

    // send to a number
    const number = `919825022540@c.us`;
    // const number2 = `918707559369@c.us`;
    // send messag to sender
    await client.sendMessage(number, text);
  } else if (msg.body === "me") {
  }
});
// get all groups

client.on("message_create", (msg) => {
  // Fired on all message creations, including your own

  if (msg.fromMe) {
    // do stuff here
  }
});

client.on("message_revoke_everyone", async (after, before) => {
  // Fired whenever a message is deleted by anyone (including you)
  console.log(after); // message after it was deleted.
  if (before) {
    console.log(before); // message before it was deleted.
  }
});

client.on("message_revoke_me", async (msg) => {
  // Fired whenever a message is only deleted in your own view.
  console.log(msg.body); // message before it was deleted.
});

client.on("message_ack", (msg, ack) => {
  /*
        == ACK VALUES ==
        ACK_ERROR: -1
        ACK_PENDING: 0
        ACK_SERVER: 1
        ACK_DEVICE: 2
        ACK_READ: 3
        ACK_PLAYED: 4
    */

  if (ack == 3) {
    // The message was read
  }
});

client.on("group_join", (notification) => {
  // User has joined or been added to the group.
  console.log("join", notification);
  // notification.reply("User joined.");
});

client.on("group_leave", (notification) => {
  // User has left or been kicked from the group.
  console.log("leave", notification);
  // notification.reply("User left.");
});

client.on("group_update", (notification) => {
  // Group picture, subject or description has been updated.
  console.log("update", notification);
});

client.on("change_battery", (batteryInfo) => {
  // Battery percentage for attached device has changed
  const { battery, plugged } = batteryInfo;
  console.log(`Battery: ${battery}% - Charging? ${plugged}`);
});

client.on("change_state", (state) => {
  console.log("CHANGE STATE", state);
});

client.on("disconnected", (reason) => {
  console.log("Client was logged out", reason);
});
