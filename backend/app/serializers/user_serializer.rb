class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :picture, :given_name, :family_name, :locale
end
