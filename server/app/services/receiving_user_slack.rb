require 'net/http'
require 'uri'

# this service constructs message to sent to a recognition receiver in Slack [formatted to match Slack API structure]

class ReceivingUserSlack
    
    def clicky_clicky(user, points, reasonMsg, from, channelID)
      params = {
          
          channel: channelID,
          attachments: [
              {
                  title: ':100: Employee Recognition Alert! :100:',
                  fallback: 'New Recognition!',
                  color: 'good',
                  image_url: "https://media.giphy.com/media/fxsqOYnIMEefC/giphy.gif",
                  fields: [
                      {
                          title: 'Employee Recognized:',
                          value: user,
                          short: true
                      },
                      {
                          title: 'Points:',
                          value: points + " :tada:",
                          short: true
                      },
                      {
                          title: 'Message to Employee:',
                          value: reasonMsg,
                          short: true
                      },
                      {
                          title: 'Submitted By:',
                          value: from,
                          short: true
                      }
                  ]
              }
          ]
      }
      @params = params.to_json

      self
    end
    
    # construct http into format for Slack to accept
    def deliver
      begin
        http = Net::HTTP.new('slack.com', 443)
        http.use_ssl = true
        path = '/api/chat.postMessage'

        data = @params
        
        # define token and content type as per CURL example https://api.slack.com/web

        headers = {
          'Authorization' => 'Bearer '+ ENV['SLACK_API_TOKEN'],
          'Content-type' => 'application/json'
        }

        resp, data = http.post(path, data, headers)

        # to delete
        puts resp.body
        puts data

      rescue => e
        Rails.logger.error("ReceivingUserSlack: Error when sending: #{e.message}")
      end
    end
  end