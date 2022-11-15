class BoardSerializer < ActiveModel::Serializer
  belongs_to :user
  has_many :cards
  attributes :id, :name, :shortcode, :description, :user, :cards, :created_at
end