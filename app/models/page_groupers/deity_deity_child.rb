class DeityDeityChild < ApplicationRecord
  belongs_to :user
  belongs_to :deity
  belongs_to :deity_child, class_name: Deity.name
end
