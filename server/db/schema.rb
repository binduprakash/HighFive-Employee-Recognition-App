# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_04_05_191220) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "employees", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "title"
    t.string "img_url"
    t.string "department"
    t.bigint "manager_id"
    t.integer "available_points", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slack_id"
    t.index ["manager_id"], name: "index_employees_on_manager_id"
  end

  create_table "order_items", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.bigint "redeem_item_id", null: false
    t.integer "quantity", default: 0
    t.integer "sub_total_points", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_order_items_on_order_id"
    t.index ["redeem_item_id"], name: "index_order_items_on_redeem_item_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "ordered_by_id", null: false
    t.integer "total_points"
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ordered_by_id"], name: "index_orders_on_ordered_by_id"
  end

  create_table "points_levels", force: :cascade do |t|
    t.string "level_name", null: false
    t.integer "points", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "redeem_items", force: :cascade do |t|
    t.string "name", null: false
    t.integer "points", default: 0
    t.float "amount"
    t.string "description", null: false
    t.string "image_url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rewards", force: :cascade do |t|
    t.bigint "from_employee_id", null: false
    t.bigint "to_employee_id", null: false
    t.bigint "approver_employee_id"
    t.text "reward_message", null: false
    t.text "approver_message"
    t.bigint "level_id"
    t.boolean "is_viewed", default: false
    t.string "status", default: "pending"
    t.datetime "approved_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["approver_employee_id"], name: "index_rewards_on_approver_employee_id"
    t.index ["from_employee_id"], name: "index_rewards_on_from_employee_id"
    t.index ["level_id"], name: "index_rewards_on_level_id"
    t.index ["to_employee_id"], name: "index_rewards_on_to_employee_id"
  end

  add_foreign_key "employees", "employees", column: "manager_id"
  add_foreign_key "order_items", "orders"
  add_foreign_key "order_items", "redeem_items"
  add_foreign_key "orders", "employees", column: "ordered_by_id"
  add_foreign_key "rewards", "employees", column: "approver_employee_id"
  add_foreign_key "rewards", "employees", column: "from_employee_id"
  add_foreign_key "rewards", "employees", column: "to_employee_id"
  add_foreign_key "rewards", "points_levels", column: "level_id"
end
