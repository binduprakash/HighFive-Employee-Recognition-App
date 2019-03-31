class Api::V1::OrderItemsController < ApplicationController

    # GET /order_items
    def index
        @orderItems = OrderItem.all
        render json: @orderItems
    end

    # GET /order_items/1
    def show
        @orderItem = OrderItem.find(params[:id])
        render json: @orderItem
    end

    # POST /order_items
    def create
        @orderItem = OrderItem.new(order_items_params)
        if @orderItem.save
            render json: @orderItem, status: :created, location: api_v1_order_item_url(@orderItem)
        else
            render json: @orderItem.errors, status: :unprocessable_entity
        end
    end

    private
    def order_item_params
        params.require(
            :order_item
        ).permit(
            :order_id,
            :redeem_item_id,
            :quantity,
            :sub_total_points
        )
    end

end
