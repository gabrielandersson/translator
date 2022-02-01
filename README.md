# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Name of application
Translator

## Installation
npm install
## Collaborator

Gabriel Andersson
Kitt Cheung

## Usage

Run npm install on the terminal / command prompt before starting the app.
To start the application, then run npm start. 

Make sure that no user is saved in the localstorage or that might take you to the wrong startup page when launching the app.
If you find yourself logged in automatically when starting the app, please log out first in order to clear the local storage.
That will help it running correctly.
## Description

This app translates the users typed words to hand-signs with each letter corresponding to a sign. (Only english alphabet compatible)
Create a user and click Continue to reach the translation page.
At translation page, the user enters words that needs to be translated. All words will be saved and stored to the profile page. 
At the profile page, the user can see the 10 most recent translations they have written.
To clear history of the translations, simply click on the Clear history button.
Logout button will take user back to the Login page.

Regarding the project specifications we have made the following assumptions: 

    a)  We do not delete the translations on the api, we set a isDeleted property to true instead and filter on those
    b)  Clearing the history clears ALL of the users translations, but we make sure to inform the user of the 
        implications of clicking that button before proceeding. 
## Acknowledgment

A big thank you to Dewald Els whose example videos were of big help in the making of this project.