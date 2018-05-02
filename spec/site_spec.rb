require File.expand_path("../../config/boot.rb", __FILE__)
require 'sitespec/rspec'
require './app/app'
require 'pry'
require 'pry-byebug'

Sitespec.configuration.build_path = 'docs' # for GitHub Pages

describe 'Sitespec' do
  let(:app) do
    Site::App
  end

  %w[
    /
    /stylesheets/main.css
    /javascripts/script.js
    /images/background.jpg
    /images/go2mukaishima.jpg
    /images/go2mukaishima.png
    /images/logo.svg
    /images/white.png
  ].each do |path|
    describe "GET #{path}", :sitespec do
      it "returns 200" do
        expect(get(path).status).to eq 200
      end
    end
  end

end
