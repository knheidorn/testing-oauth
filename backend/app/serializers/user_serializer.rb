class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email, :picture, :first_name, :token
end
