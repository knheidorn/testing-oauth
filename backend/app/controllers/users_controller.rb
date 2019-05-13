class UsersController < ApplicationController
  before_action :find_user, only: [:show, :edit, :udpate, :destroy]

  def index
    @users = User.all
    render json: @users
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :accepted
    else
      render json: { errors: 'Failed to create User' }, status: :unprocessible_entity
    end
  end

  def update
    @user.update(user_params)
    if @user.save
      render json: @user, status: :accepted
    else
      render json: { errors: 'Failed to update User' }, status: :unprocessible_entity
    end
  end

  def destroy
    if @user.destroy
      render json: @users
    else
      render json: { errors: 'Failed to delete User' }, status: :unprocessible_entity
    end
  end

  private

  def user_params
    params.require(:user).permit!
  end

  def find_user
    @user = User.find_by(params[:id])
  end

end
