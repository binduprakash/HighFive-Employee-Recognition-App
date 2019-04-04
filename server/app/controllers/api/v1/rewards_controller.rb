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
        if @reward.update(reward_params)
            render json: @reward
        else
            render json: @reward.errors, status: :unprocessable_entity
        end
    end

    # POST /rewards
    def create
        @reward = Reward.new(reward_params)
        
        
        to_employee = reward_params[:to_employee_id]
        rewards_msg = reward_params[:reward_message]
        points_msg = reward_params[:level_id]
        from_employee = reward_params[:from_employee_id]
        channel_ID = 'UHNTVJL4C'



# add the :tada: 

        if @reward.save
            BespokeSlackbotService.new.clicky_clicky(to_employee,points_msg,rewards_msg,from_employee, channel_ID).deliver
            
            render json: @reward, status: :created, location: api_v1_reward_url(@reward)

        else
            render json: @reward.errors, status: :unprocessable_entity
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

end
