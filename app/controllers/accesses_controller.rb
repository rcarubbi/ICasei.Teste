class AccessesController < ApplicationController

  # GET /accesses
  # GET /accesses.json
  def index
    @accesses = Access.last(50)
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
end
