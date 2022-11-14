class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :boards
  has_many :boards
end