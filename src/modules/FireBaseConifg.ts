import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbxtMSvRqgSGvVtRQ8rkpddwqFWxFIHnU",
  authDomain: "fileupload-d27ca.firebaseapp.com",
  projectId: "fileupload-d27ca",
  storageBucket: "fileupload-d27ca.appspot.com",
  messagingSenderId: "1073570128376",
  appId: "1:1073570128376:web:f23a0b88e18b6ceb1bb60d",
};

const app = initializeApp(firebaseConfig);
const imageDB = getStorage(app);
export default imageDB;
