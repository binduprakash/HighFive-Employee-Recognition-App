require 'net/http'
require 'uri'

class ApproverUserSlack
    
    def clicky_clicky(user, points, reasonMsg, from, channelID)
      params = {
          
          channel: channelID,
          attachments: [
              {
                  title: ':100: Approval Required: Employee Recognition! :100:',
                  fallback: 'New Recognition!',
                  fields: [
                      {
                          title: 'Employee Recognized',
                          value: user,
                          short: true
                      },
                      {
                          title: 'Points',
                          value: points + " :tada:",
                          short: true
                      },
                      {
                          title: 'Reason:',
                          value: reasonMsg,
                          short: true
                      },
                      {
                          title: 'From:',
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