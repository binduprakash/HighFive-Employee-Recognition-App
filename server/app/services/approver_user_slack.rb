require 'net/http'
require 'uri'

# this service constructs message to sent to an approver in Slack [formatted to match Slack API structure]

class ApproverUserSlack
    
    def clicky_clicky(user, points, reasonMsg, from, channelID, mgrMsg)
      params = {
          
          channel: channelID,
          attachments: [
              {
                  title: 'Approval Required: Employee Recognition! :heavy_check_mark: | :heavy_multiplication_x:',
                  fallback: 'New Recognition!',
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
                          title: 'Submitted by:',
                          value: from,
                          short: true
                      },
                      {
                          title: 'Message to Manager:',
                          value: mgrMsg,
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
        Rails.logger.error("ApproverUserSlack: Error when sending: #{e.message}")
      end
    end
  end