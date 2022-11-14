class BoardSerializer < ActiveModel::Serializer
  belongs_to :user
  attributes :id, :name, :shortcode, :description, :user, :created_at
end
