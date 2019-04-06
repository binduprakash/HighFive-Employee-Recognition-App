require 'test_helper'

class SlackControllerTest < ActionDispatch::IntegrationTest
  test "should get slack" do
    get slack_slack_url
    assert_response :success
  end

end
