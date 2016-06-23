class MainController < ApplicationController

  def index

  end

  def save

    price = interior_params['bedrooms'].to_i * 150
    price += interior_params['livingrooms'].to_i * 200
    price += interior_params['bathrooms'].to_i * 100

    object = {'price' => price}

    respond_to do |format|
      format.html
      format.json { render :json => object}
    end
  end

  def interior
    render :layout => false
  end

  def buildingType
    render :layout => false
  end

  private
  # Using a private method to encapsulate the permissible parameters is just a good pattern
  # since you'll be able to reuse the same permit list between create and update. Also, you
  # can specialize this method with per-user checking of permissible attributes.
  def interior_params
    params.require(:interior).permit(:bedrooms, :livingrooms, :bathrooms)
  end


end
