class AccessesController < ApplicationController
  protect_from_forgery :except => :create
  before_action :set_access, only: [:show]


  # GET /accesses
  # GET /accesses.json
  def index
    @accesses = Access.last(50).reverse
  end

  # GET /accesses/1
  # GET /accesses/1.json
  def show
  end


  # POST /accesses
  # POST /accesses.json
  def create
    @access = Access.new(access_params)

    respond_to do |format|
      if @access.save
        format.html { redirect_to @access, notice: 'Access was successfully created.' }
        format.json { render :show, status: :created, location: @access }
      else
        format.html { render :new }
        format.json { render json: @access.errors, status: :unprocessable_entity }
      end
    end
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def access_params
      params.require(:access).permit(:guid, :url, :accessDateTime)
    end

    def set_access
      @access = Access.find(params[:id])
    end
end
