class Api::V1::RedeemItemsController < ApplicationController
    
    # GET /redeem_items
    def index
        @redeemItems = RedeemItem.all
        render json: @redeemItems
    end

    # GET /redeem_items/1
    def show
        @redeemItem = RedeemItem.find(params[:id])
        render json: @redeemItem
    end
end
