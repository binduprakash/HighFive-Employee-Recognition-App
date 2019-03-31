class Api::V1::OrdersController < ApplicationController
    # GET /orders
    def index
        @orders = Order.all
        render json: @orders
    end

    # GET /orders/1
    def show
        @order = Order.find(params[:id])
        render json: @order
    end

    # POST /orders
    def create
        @order = Order.new(order_params)
        if @order.save
            render json: @order, status: :created, location: api_v1_order_url(@order)
        else
            render json: @order.errors, status: :unprocessable_entity
        end
    end

    private
    def order_params
        params.require(
            :order
        ).permit(
            :ordered_by_id,
            :total_points,
            :email
        )
    end
end
