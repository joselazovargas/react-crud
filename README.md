


# 3. Creating Firebase project and get firebase config info

```sh
npm install firebase
```

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuhLzsTu6AKxi4zTW5J4OW_dmJoCKRdkM",
  authDomain: "react-crud-244c7.firebaseapp.com",
  projectId: "react-crud-244c7",
  storageBucket: "react-crud-244c7.appspot.com",
  messagingSenderId: "18553385284",
  appId: "1:18553385284:web:43b446c7f11c740225e711"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

# 2. Create new branch firebaseDev
```
git checkout -b firebaseDev
```


# First time installation

```sh
npm create vite@latest

# tailwind
npm install -D tailwindcss
```



