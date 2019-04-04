require 'net/http'
require 'uri'

class BespokeSlackbotService

    GOOD = 'good'
    
    def initialize(channel = ENV['SLACK_WEBHOOK_CHANNEL'])
    
      @uri = URI(ENV['SLACK_WEBHOOK_URL'])
      @channel = channel
    end
  
    def clicky_clicky(user, points, reasonMsg, from)
      params = {
          
          channel:"UHCNPP9FY",
          attachments: [
              {
                  title: ':100: Employee Recognition Alert! :100:',
                  fallback: 'New Recognition!',
                  color: 'good',
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
      #params.to_JSON and remove generate payload
      self
    end
  
    def deliver
      begin
        http = Net::HTTP.new('slack.com', 443)
        http.use_ssl = true
        path = '/api/chat.postMessage'

        data = @params
        headers = {
          'Authorization' => 'Bearer '+ ENV['SLACK_API_TOKEN'],
          'Content-type' => 'application/json'
        }

        resp, data = http.post(path, data, headers)

        puts resp.body
        puts data

      rescue => e
        Rails.logger.error("BespokeSlackbotService: Error when sending: #{e.message}")
      end
    end
  end