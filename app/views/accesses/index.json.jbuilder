json.array!(@accesses) do |access|
  json.extract! access, :id, :guid, :url, :accessDateTime
  json.url access_url(access, format: :json)
end
