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
        
        if @reward.save
            render json: @reward, status: :created, location: api_v1_reward_url(@reward)
        else
            render json: @reward.errors, status: :unprocessable_entity
        end
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_reward
    #    @reward = Reward.find(params[:id])
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
