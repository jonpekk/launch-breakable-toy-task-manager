class BoardSerializer < ActiveModel::Serializer
  belongs_to :user
  attributes :id, :name, :shortcode, :description, :user, :columns, :created_at
end