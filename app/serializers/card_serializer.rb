class CardSerializer < ActiveModel::Serializer
  belongs_to :board
  attributes :id, :name, :status, :description, :created_at, :card_attachment
end