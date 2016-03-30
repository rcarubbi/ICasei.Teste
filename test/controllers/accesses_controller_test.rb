require 'test_helper'

class AccessesControllerTest < ActionController::TestCase
  setup do
    @access = accesses(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:accesses)
  end

  test "should create access" do
    assert_difference('Access.count') do
      post :create, access: { accessDateTime: @access.accessDateTime, guid: @access.guid, url: @access.url }
    end

    assert_redirected_to access_path(assigns(:access))
  end

end
