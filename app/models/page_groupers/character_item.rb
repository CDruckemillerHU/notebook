class CharacterItem < ApplicationRecord
  belongs_to :user
  belongs_to :character
  belongs_to :item
end
