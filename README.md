# HIGH FIVE - Employee Recognition Web Application

## Project Description 

Project High Five is a multilayered web application that helps employees within an organization streamline peer to peer recognition. The company brings together specific team operations so you can track employee engagement and build reward systems to improve that engagement over time. 

Employees can send and receive points and feedback based on their performance, engagement and management around their day-to-day activities and/or projects involved within the organization. 


## Setup
1. Create seperate folder for React - web and Ruby on Rails - server.
2. Run `npx create-react-app my-app` to install the boiler plate code and dependencies in React - web folder.
3. Run `rails new api_app_name --api` to install the dependencies in Ruby on Rials - server folder. 
4. Run `bin/rake db:reset` to create, load and seed db.
5. Run `bin/rails s -b 0.0.0.0` to start the rails server.
6. Run `npm start` to start the React server.


## Functional Requirements (High Level)



## Final Product 



## Dependencies 

### Web

* axios 0.18.0
* bootstrap ^4.3.1
* react ^16.8.6
* react-bootstrap ^1.0.0-beta.6
* react-cookie ^3.1.2
* react-dom ^16.8.6"
* react-router-dom ^5.0.0
* react-scripts 2.1.8
* recompose ^0.30.0

### Server

* rails ~> 5.2.3
* postgresql >= '0.18', '< 2.0'
* puma ~> 3.11
* rack-cors ~> 0.3.1
* bootsnap >= 1.1.0


## Slack Integration Setup

Please refer to Slack API documentation for additional information: https://api.slack.com/

* a Slack team would need to be created as well as a Slack App to handle functionality
* employee table in database must have valid slack ID for function to work

### Slash Command

* Need to create a slash command in Slack API while logged in with App admin credentials

* Reqeust URL needs to be defined with route to handle, including /slack 'route' for the web app to handle the request from Slack user
* App 'Verification Token' needs to be stored in .env file to authenticate requests sent to the route
* Current configuration accepts one slash command /points -> to received a mesage back of how many points a user has.


### Sending Notifications to Users on web app events | uses api/chat.postMessage

* Slack 'oAuth Token' needs to be stored in .env file for Slack to handle http request



## Slack Experience

![Slash Command to request points total:](https://github.com/binduprakash/HighFive-Employee-Recognition-App/blob/master/web/public/slash_command_gif.gif)




