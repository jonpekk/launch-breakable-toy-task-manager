class Board < ApplicationRecord
  belongs_to :user
  has_many :cards

  validates :name, :shortcode, :user, presence: true
  validates :shortcode, length: { minimum: 2}
  validates :shortcode, length: { maximum: 4}
  validates :description, length: { maximum: 240 }, allow_nil: true
end