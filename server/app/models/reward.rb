class Reward < ApplicationRecord
    belongs_to :points_level, foreign_key: "level_id"
end
