require 'net/http'
require 'uri'

class Api::V1::RewardsController < ApplicationController
    before_action :set_reward, only: [:show, :update]

    # GET /rewards
    def index
        @rewards = Reward.all
        render json: @rewards
    end

    # GET /rewards/1
    def show
        render json: @reward
    end

    # PATCH/PUT /rewards/1
    def update
        oldStatus = @reward.status
        if @reward.update(reward_params)
            newStatus = @reward.status
            if oldStatus == 'pending' && newStatus == 'approved'
                employee = Employee.find(@reward.to_employee_id)
                level = PointsLevel.find(@reward.level_id)
                employee.available_points += level.points
                employee.save
            end
            render json: @reward
        else
            render json: @reward.errors, status: :unprocessable_entity
        end
    end

    # POST /rewards
    def create
        @reward = Reward.new(reward_params)
        
        #defining parameters for Slack message
        to_employee = reward_params[:to_employee_id]
        full_name_to_employee = full_name(to_employee)
        
        from_employee = reward_params[:from_employee_id]
        full_name_from_employee = full_name(from_employee)

        manager_employee = reward_params[:approver_employee_id]

        points_msg = reward_params[:level_id]
        points_text = points_name(reward_params[:level_id])

        rewards_msg = reward_params[:reward_message]
        
        channel_ID = slack_id(to_employee)
        channel_ID_Approver = slack_id(manager_employee)

        # need to move Receiving User Slack to after approval route

        if @reward.save
            ReceivingUserSlack.new.clicky_clicky(full_name_to_employee,points_text,rewards_msg,full_name_from_employee, channel_ID).deliver
            ApproverUserSlack.new.clicky_clicky(full_name_to_employee,points_text,rewards_msg,full_name_from_employee, channel_ID_Approver, reward_params[:approver_message]).deliver
            
            client = Employee.select("first_name", "last_name").find_by(:id => reward_params[:to_employee_id])
            toEmployee = client.first_name + " " + client.last_name
            
            render json: {'status': 'success'}            
        else
            render json: {'status': 'error'}
        end
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_reward
    @reward = Reward.find(params[:id])
    end

    # Only allow a trusted parameter “white list” through.
    def reward_params
        params.permit(
            :reward_message,
            :approver_message,
            :to_employee_id, 
            :level_id,
            :from_employee_id,
            :approver_employee_id,
            :status,
            :approved_at
        )
    end

    def full_name (employeeId)
        emp = Employee.select("first_name", "last_name").find_by(:id => employeeId)
        toEmployee = emp.first_name + " " + emp.last_name
    end

    def slack_id (employeeId)
        emp = Employee.select("slack_id").find_by(:id => employeeId)
        slackID = emp.slack_id
    end

    def points_name (pointsId)
        level = PointsLevel.select("level_name", "points").find_by(:id => pointsId)
        toLevel = level.level_name + ": " + level.points.to_s + " points"
    end
end
