class SlackController < ApplicationController

  def post_example
    
    # need to be able to authenticate this POST coming in

    puts params.inspect
    slackUserID = params[:user_id]

    puts full_name(slackUserID)
    
    msg = {"text": full_name(slackUserID)}

    #send message back to Slack
    render :json => msg
  end

  private

  #find employee in DB using slackID, and render a response message back
  def full_name (slackID)
    emp = Employee.select("first_name", "available_points").find_by(:slack_id => slackID)
    toEmployee = "Hi " + emp.first_name + ", you have " + emp.available_points.to_s + " points available"
end


end
