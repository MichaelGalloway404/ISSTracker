# The International Space Station (ISS) Tracker:  
  
This is a fun little REST API project for tracking and plotting out the path of the ISS.  
This project makes use of axios, body-parser, and express for a Node based server, with the use of EJS in the front end.  
  
There is a demo timelapsed video(timeLapsISS.mp4) and image(ISSFinderDemo.png) of the project to view the product.  
  
To get the project running locally, you can:
>>git clone https://github.com/your-username/ISSTracker.git 
cd ISSTracker
npm install
node index.js
Once the server is running, open your browser and go to:
http://localhost:3000
  
If you're making changes and want the server to auto-restart on file changes, install and use nodemon:
>>npm install --save-dev nodemon
npx nodemon index.js
