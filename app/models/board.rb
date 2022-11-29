class Board < ApplicationRecord
  belongs_to :user
  has_many :cards

  validates :name, :shortcode, :user, presence: true
  validates :shortcode, length: { minimum: 2}
  validates :shortcode, length: { maximum: 4}
  validates :description, length: { maximum: 240 }, allow_nil: true

  def columns 
    column_obj = {
      backlog: [],
      to_do: [],
      doing: [],
      done: []
    }

    cards.each do |card| 
      column_obj[card.status.to_sym] << card
    end
    
    return column_obj
  end

  def verify_access(current_user)
    user == current_user
  end

end