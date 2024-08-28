// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyAykWcyui5hHVvDB7kEfKv0S4SlPg85KrM",
authDomain: "axes-a799e.firebaseapp.com",
projectId: "axes-a799e",
storageBucket: "axes-a799e.appspot.com",
messagingSenderId: "435792973815",
appId: "1:435792973815:web:27b5e689a5d8eb198628f2",
measurementId: "G-LK9BRCPHMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const dots = document.querySelectorAll('.draggable-dot');

dots.forEach(dot => {
    // Listen for changes in Firebase
    const dotId = dot.id;
    const dotRef = firebase.database().ref('dots/' + dotId);

    dotRef.on('value', (snapshot) => {
        const pos = snapshot.val();
        if (pos) {
            dot.style.left = pos.left;
            dot.style.top = pos.top;
        }
    });

    let isDragging = false;

    dot.addEventListener('mousedown', function (e) {
        isDragging = true;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;

        const rect = dot.parentElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const dotSize = 20;
        const xPos = Math.max(dotSize / 2, Math.min(x, rect.width - dotSize / 2));
        const yPos = Math.max(dotSize / 2, Math.min(y, rect.height - dotSize / 2));

        dot.style.left = `${xPos}px`;
        dot.style.top = `${yPos}px`;

        // Update Firebase with the new position
        dotRef.set({
            left: dot.style.left,
            top: dot.style.top
        });
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
});
