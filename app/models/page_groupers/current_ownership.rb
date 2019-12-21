# Defines a relation from an Item to the Character that currently owns it
# and an inverse relationship from a Character to all items it currently owns
class CurrentOwnership < ApplicationRecord
  include HasContentLinking

  belongs_to :user, optional: true

  belongs_to :item
  belongs_to :current_owner, class_name: 'Character'
end
