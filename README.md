# Decor Board

Decor Board is an application for the decor-bored, designed to serve as a vision board, shopping list, and budget tracker for the DIY decorator. Watch a demo of this project here: https://www.youtube.com/watch?v=bse6Zi6Ba6g&t=2s

### Getting Started

1. Fork and clone this repository

2. Run the two scripts that are in the SQL folder. These will create the DecorBoard database and add some test data

3. Create your own Firebase project by following these steps in the firebase console:

      1. Go to Firebase and add a new project. 
      2. Go to the Authentication tab, click "Set up sign in method", and enable the Username and Password option.
      3. Add at least two new users in firebase. Use email addresses that you find in the UserProfile table of your SQL Server database.
      4. Once firebase creates a UID for these users, copy the UID from firebase and update the FirebaseUserId column for the same users in your SQL Server database.
      5. Click the Gear icon in the sidebar to go to Project Settings. You'll need the information on this page for the next few steps.
      6. Go to the appSettings.Local.json.example file. Replace the value for FirebaseProjectId with your own.

4. Rename the appSettings.Local.json.example file to remove the .example extension. This file should now just be called appSettings.Local.json

5. Open your client directory in VsCode. Open the .env.local.example file and replace __YOUR_API_KEY_HERE__ with your own firebase Web API Key

6. Rename the .env.local.example file to remove the .example extension. This file should now just be called .env.local

7. Install your dependencies by running `npm install` from the same directory as your package.json file

### Login

To quickly login and access the dummy data, login using 
- hello@crystalelsey.com
- pw: tanner

### Technologies/Languages
- HTML, CSS, JavaScript
- C# & .NET Entity Framework Core
- React
- Reactstrap
- dbdiagram
- Sketchboard
- Canva
- Firebase for authentication
