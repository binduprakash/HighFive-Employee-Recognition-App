require 'net/http'
require 'uri'

class BespokeSlackbotService
    NAME_AND_ICON = {
        username: 'SpotlightBOT',
        icon_emoji: ':taco:'
    }
  
    GOOD = 'good'
    WARNING = 'warning'
    DANGER = 'danger'
    
    def initialize(channel = ENV['SLACK_WEBHOOK_CHANNEL'])
    
      @uri = URI(ENV['SLACK_WEBHOOK_URL'])
      @channel = channel
    end
  
    def clicky_clicky(user, points, reasonMsg, from)
      params = {
          attachments: [
              {
                  title: ':100: Employee Recognition Alert! :100:',
                  fallback: 'New Recognition!',
                  color: GOOD,
                  fields: [
                      {
                          title: 'Employee Recognized',
                          value: user,
                          short: true
                      },
                      {
                          title: 'Points',
                          value: points,
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
      @params = generate_payload(params)
      self
    end
  
    def deliver
      begin
        Net::HTTP.post_form(@uri, @params)
      rescue => e
        Rails.logger.error("BespokeSlackbotService: Error when sending: #{e.message}")
      end
    end
  
    private
  
    def generate_payload(params)
      {
          payload: NAME_AND_ICON
                       .merge(channel: @channel)
                       .merge(params).to_json
      }
    end
  end