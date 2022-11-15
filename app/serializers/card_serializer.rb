class CardSerializer < ActiveModel::Serializer
  belongs_to :board
  attributes :id, :name, :status, :created_at
end