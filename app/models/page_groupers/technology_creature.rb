class TechnologyCreature < ApplicationRecord
  belongs_to :user
  belongs_to :technology
  belongs_to :creature
end
