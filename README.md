# HIGH FIVE - Employee Recognition Web Application

## Project Description 

Project High Five is a multilayered web application that helps employees within an organization streamline peer recognition, feedback and Slack integration. Businesses that use Slack will love the integration. It’s easy for users to adopt and for the businesses to begin seeing employee engagement increase.

Employees can send and receive points, feedback based on their performance, engagement and management around their day-to-day activities, projects, team intiatives involved within the organization. Based on the available points employees can also redeem them to purchase gift cards, invest in professional development courses and contribute to local charities. 


## Setup
1. Create seperate folders for React - web and Ruby on Rails - server environments.
2. Run `npx create-react-app my-app` to install the boiler plate code and dependencies in React - web folder.
3. Run `rails new api_app_name --api` to install the dependencies in Ruby on Rials - server folder. 
4. Run `bin/rake db:reset` to create, load and seed db in rails server.
5. Run `bundle install` to install dependencies in rails server folder.
6. Run `bin/rails s -b 0.0.0.0` to start the rails server.
7. Run `npm install` to install dependencies in React web folder.
8. Run `npm start` to start the React server.


## Functional Requirements (High Level)

### Recognition Flow 
User/Employee sending the rewards should be able to recognize a peer based on their contributions to team projects and intiatives.
* On the Overview page, user should be able to select the appropriate peer to recognize and alot a specific point level (between Level 1 - 5) and submit the recognition for manager's approval.
* User should be able to review points sent history to peers under the 'Sent' points tab on the Rewards History Page.

### Approval Flow 
Manager/Approver should be able to receive slack notifications related to recognitions and be able approve/reject the recognitions based on reward authenticity.
* Under the approvals tab on the overview page, manager should be able to view recognition requests and approve/reject them. 
* Once approved, manager should be able to view approved/rejected history under 'Approvals & Rejections' tab on Rewards History page.

### Redemption Flow 
User/Employee receiving the rewards should be able to receive a slack notifications when they are rewarded, be able to view the points available on slack and be able to redeem the points on the redemption page.
* Under the 'Recent Rewards' tab on the Overview page, user should be able to view the rewards received from a peer. 
* User should be able to review points recived history from peers under the 'Received' points tab on the Rewards History Page.
* While redeeming the points, user should be able to able to view and add the gift cards to the cart, proceed to check out and review/submit the order.



## Final Product 



## Dependencies 

### Web

* axios 0.18.0
* bootstrap ^4.3.1
* prop-types ^15.7.2
* react ^16.8.6
* react-avatar ^3.6.0
* react-bootstrap ^1.0.0-beta.6
* react-confetti ^2.7.3
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

Slash Command to request points available:

![Slash Command to request points total:](https://github.com/binduprakash/HighFive-Employee-Recognition-App/blob/master/web/public/slash_command_gif.gif)





