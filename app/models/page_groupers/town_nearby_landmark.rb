class TownNearbyLandmark < ApplicationRecord
  belongs_to :user
  belongs_to :town
  belongs_to :nearby_landmark, class_name: 'Landmark'
end
