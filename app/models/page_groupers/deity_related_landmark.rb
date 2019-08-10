class DeityRelatedLandmark < ApplicationRecord
  belongs_to :user
  belongs_to :deity
  belongs_to :related_landmark, class_name: Landmark.name
end
