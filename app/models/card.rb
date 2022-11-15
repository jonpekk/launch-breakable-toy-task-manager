class Card < ApplicationRecord
  belongs_to :board
  validates :name, :board, presence: true
  validates :name, length: {within: 5..50}
  enum status: { backlog: 0, to_do: 1, doing: 2, done: 3}
end