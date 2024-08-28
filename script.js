// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
// apiKey: "AIzaSyAykWcyui5hHVvDB7kEfKv0S4SlPg85KrM",
// authDomain: "axes-a799e.firebaseapp.com",
// projectId: "axes-a799e",
// storageBucket: "axes-a799e.appspot.com",
// messagingSenderId: "435792973815",
// appId: "1:435792973815:web:27b5e689a5d8eb198628f2",
// measurementId: "G-LK9BRCPHMN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const dots = document.querySelectorAll('.draggable-dot');

// dots.forEach(dot => {
//     // Listen for changes in Firebase
//     const dotId = dot.id;
//     const dotRef = firebase.database().ref('dots/' + dotId);

//     dotRef.on('value', (snapshot) => {
//         const pos = snapshot.val();
//         if (pos) {
//             dot.style.left = pos.left;
//             dot.style.top = pos.top;
//         }
//     });

//     let isDragging = false;

//     dot.addEventListener('mousedown', function (e) {
//         isDragging = true;
//         document.addEventListener('mousemove', onMouseMove);
//         document.addEventListener('mouseup', onMouseUp);
//     });

//     function onMouseMove(e) {
//         if (!isDragging) return;

//         const rect = dot.parentElement.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;

//         const dotSize = 20;
//         const xPos = Math.max(dotSize / 2, Math.min(x, rect.width - dotSize / 2));
//         const yPos = Math.max(dotSize / 2, Math.min(y, rect.height - dotSize / 2));

//         dot.style.left = `${xPos}px`;
//         dot.style.top = `${yPos}px`;

//         // Update Firebase with the new position
//         dotRef.set({
//             left: dot.style.left,
//             top: dot.style.top
//         });
//     }

//     function onMouseUp() {
//         isDragging = false;
//         document.removeEventListener('mousemove', onMouseMove);
//         document.removeEventListener('mouseup', onMouseUp);
//     }
// });

// Make the DIV element draggable:

dragElement(document.getElementById("dot-1"));
dragElement(document.getElementById("dot-2"));
dragElement(document.getElementById("dot-3"));
dragElement(document.getElementById("dot-4"));
dragElement(document.getElementById("dot-5"));
dragElement(document.getElementById("dot-6"));




function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}