class Api::V1::PointsLevelsController < ApplicationController
    # GET /points_levels
    def index
        @pointsLevels = PointsLevel.all
        render json: @pointsLevels
    end

    # GET /points_levels/1
    def show
        @pointsLevel = PointsLevel.find(params[:id])
        render json: @pointsLevel
    end
end
