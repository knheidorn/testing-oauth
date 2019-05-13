class PostsController < ApplicationController
  before_action :find_post, only: [:show, :edit, :udpate, :destroy]

  def index
    @posts = Post.all
    render json: @posts
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post, status: :accepted
    else
      render json: { errors: 'Failed to create Post' }, status: :unprocessible_entity
    end
  end

  def update
    @post.update(post_params)
    if @post.save
      render json: @post, status: :accepted
    else
      render json: { errors: 'Failed to update Post' }, status: :unprocessible_entity
    end
  end

  def destroy
    if @post.destroy
      render json: @posts
    else
      render json: { errors: 'Failed to delete Post' }, status: :unprocessible_entity
    end
  end

  private

  def post_params
    params.require(:post).permit!
  end

  def find_post
    @post = Post.find_by(params[:id])
  end

end
