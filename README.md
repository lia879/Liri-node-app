# Liri-node-app

**overview** 

In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.


**Instructions**


1. Navigate to the root of your project and *run npm init -y — this will initialize a package.json file for your project.* The package.json file is required for installing third party npm packages and saving their version numbers. If you fail to initialize a package.json file, it will be troublesome, and at times almost impossible for anyone else to run your code after cloning your project.


2. Make a .gitignore file and add the following lines to it. This will tell git not to track these files, and thus they won't be committed to Github.


node_modules
.DS_Store
.env

3. Make a JavaScript file named keys.js.


Inside keys.js your file will look like this:

console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

4. Next, create a file named .env, add the following to it, replacing the values with your API keys (no quotes) once you have them:

# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret


This file will be used by the dotenv package to set what are known as environment variables to the global process.env object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github — keeping our API key information private.


**Make it so liri.js can take in one of the following commands:**

* concert-this - billie eilish 

![image](https://user-images.githubusercontent.com/54521457/73389976-db4ee900-429a-11ea-9b5e-16d8f5def7de.png)

* spotify-this-song - taylor swift 

![image](https://user-images.githubusercontent.com/54521457/73389824-96c34d80-429a-11ea-99de-dc0b2cf8a514.png)

* movie-this - john wick 

![image](https://user-images.githubusercontent.com/54521457/73389661-464bf000-429a-11ea-8dc8-93a7332e59a1.png)

* do-what-it-says

![image](https://user-images.githubusercontent.com/54521457/73390568-f837ec00-429b-11ea-9864-43ed6db4e30d.png)

**What Each Command Should Do** 


# How to run the program:

    1. node liri.js concert-this <artist/band name here>

        ex: node liri.js concert-this "taylor swift" 

    2. node liri.js spotify-this-song '<song name here>'

        ex: node liri.js spotify-this-song "Kid Cudi" 

    3.node liri.js movie-this '<movie name here>'

        ex: node liri.js movie-this "guardian of the galaxy"
