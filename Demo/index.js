import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  push,
  set,
  onValue,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const messages = ref(database, "/Messages");
onValue(
  messages,
  (snapshot) => {
    const ul = document.getElementById("Messages");
    ul.replaceChildren();
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      console.log(childKey);
      console.log(childData);
      const text = document.createTextNode(
        childData.message + " : " + childData.name
      );
      const li = document.createElement("li");
      li.appendChild(text);
      ul.appendChild(li);
    });
  },
  { onlyOnce: false }
);
const addMessage = document.getElementById("addMessage");
addMessage.addEventListener("click", function (event) {
  const name = document.getElementById("name");
  const message = document.getElementById("Message");
  const newMessage = push(messages);
  set(newMessage, {
    name: name.value,
    message: message.value,
    createdAt: serverTimestamp(),
  });
  console.log(newMessage);
  event.preventDefault();
});
