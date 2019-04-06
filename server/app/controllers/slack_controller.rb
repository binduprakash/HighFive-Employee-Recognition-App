# this controller handles Slack Slash Commands

class SlackController < ApplicationController

  def post_slash
  
    #puts params.inspect
    
    # if add more slash commands, would have to verify in params which one sent and handle here
    
      # verify post coming in matches Slack token 
      if params[:token] === ENV['SLACK_VERIFICATION_TOKEN']
        slackUserID = params[:user_id]

        #construct message to send
        msg = {"text": full_name(slackUserID)}

        #send message back to Slack
        render :json => msg
        
      else
        render 'unable to authenicate'  
      end  
    end

  private

  #find employee in DB using slackID, and render a response message back to Slack user
  def full_name (slackID)
    emp = Employee.select("first_name", "available_points").find_by(:slack_id => slackID)
    toEmployee = "Hi " + emp.first_name + ", you have " + emp.available_points.to_s + " points available."
  end


end
