class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :picture
      t.string :given_name
      t.string :family_name
      t.string :locale

      t.timestamps
    end
  end
end
