<h1 align="center" id="title">Music WebApp with Vuejs3, Pinia, and Firebase 9</h1>

<p align="center"><img src="https://socialify.git.ci/fridolinf/music-vpinia-app/image?description=1&amp;font=Rokkitt&amp;language=1&amp;name=1&amp;owner=1&amp;theme=Dark" alt="music-v-pinia"></p>

<p align="center">Feel free to clone this project especially for frontend programmers who like or want to learn and deepen about vuejs3 and pinia state management.</p>

<h2>✨Features</h2>

<ul>
<li>CRUD data with <b>Firebase 9</b> and <b>Pinia</b></li>
<li>Authenticate and Authorization</li>
<li>Infinity scroll</li>
<li>Example unit test with <b>Vitest</b></li>
<li>Example e2e with <b>Cypress</b></li>
<li>PWA with <b>Vite</b></li>
<li>Much inline comment for help who read this project</li>
<li>Internationalization translate words and format currency with <b>Vue-i18n</b></li>
<li>Form validation with <b>Vee-validate</b></li>
<li>State management with <b>Pinia</b></li>
and more...
</ul>

<h2>🚀 Demo</h2>

[https://music-vpinia-p7dkderyd-fridolinf.vercel.app/](https://music-vpinia-p7dkderyd-fridolinf.vercel.app/)

<h2>Project Screenshots:</h2>

<img src="https://drive.google.com/uc?id=1qdIyrEmGxn7MrYaTjQfFIbZXvzrjY3MV" alt="project-screenshot" width="1000" height="400/">

<img src="https://drive.google.com/uc?id=1aaQowOuqAXAwlTv_ibfBtOwmPFePJIs9" alt="project-screenshot" width="1000" height="400/">

<h2>🛠️ Installation Steps:</h2>


<p>1. clone project</p>

```
https://github.com/fridolinf/music-vpinia-app.git
```

<p>2. install package</p>

```
npm install
```

<p>3. environtment configuration</p>

```
remove .example from .env.example and insert your key
```

<p>4. setup firebase <b>firestore database</b></p>

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth.uid == resource.data.uid;
      allow create: if request.auth != null;
      allow delete: if request.auth.uid == resource.data.uid;
    }
  }
}
```

<p>5. setup firebase storage<p>

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
    	allow read: if true;
      allow write: if request.auth != null && 
      		     request.resource.contentType == "audio/mpeg" && 
                     request.resource.size < 10 * 1024 * 1024;
  		allow delete: if request.auth != null;
    }
  }
}
```

<p>6. run local</p>

```
npm run dev
```
  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   Vuejs3
*   Pinia
*   Firebase 9
*   Cypress
*   Vite
*   Vitest
*   Vue-i18n
*   Tailwindcss
