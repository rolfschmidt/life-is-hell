require 'fileutils'
require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'mini_magick'
  gem 'json'
end

input_map = {
  'color/Proto-fronjumpcolor'             => {
                                    id: 'power_jump',
                                    width: 48,
                                  },
  'color/Proto-front2color'               => {
                                    id: 'turn',
                                    width: 48,
                                  },
  'color/Proto-front2go1color'            => {
                                    id: 'walk_outer',
                                    width: 48,
                                  },
  'color/Proto-front2go2color'            => {
                                    id: 'walk_inner',
                                    width: 48,
                                  },
  'color/Proto-front2motion2color'        => {
                                    id: 'idle_exhale',
                                    width: 48,
                                  },
  'color/Proto-front2motion22color' => {
                                    id: 'idle_inhale',
                                    width: 48,
                                  },
  'color/Proto-front2punchcolor'          => {
                                    id: 'punch',
                                    width: 48,
                                  },

  'color/Proto-front2jump1color' => {
    id:    'ground_jump',
    width: 48,
  },
  'color/Proto-front2jump2color' => {
    id:    'jump_air',
    width: 48,
  },
}


dir    = 'build/'
assets = 'assets/'

animations = {
  'walk' => {
    'frame_rate' => 10,
    'sequence'   => ['turn', 'walk_inner', 'turn', 'walk_outer'],
  },
  'power_jump' => {
    'frame_rate' => 10,
    'sequence'   => ['power_jump'],
  },
  'punch' => {
    'frame_rate' => 10,
    'sequence'   => ['punch'],
  },
  'idle' => {
    'frame_rate' => 10,
    'sequence'   => ['idle_inhale', 'idle_exhale'],
  },
  'jump' => {
    'frame_rate' => 1,
    'sequence'   => ['ground_jump', 'jump_air'],
  },
  'fall' => {
    'frame_rate' => 1,
    'sequence'   => ['jump_air', 'ground_jump'],
  },
}

images = {
  'stand'  => 'turn',
}

manifest = {
  'animations' => {},
  'images'     => [],
}
input_map.each do |source, sprite|

  source_file_path = "#{assets}#{source}.png"
  dest_file_path   = "#{dir}#{sprite[:id]}.png"

  direction_path_prefix = "#{dir}#{sprite[:id]}_"
  file_path_left  = "#{direction_path_prefix}left.png"
  file_path_right = "#{direction_path_prefix}right.png"

  image = MiniMagick::Image.open(source_file_path)
  image.colorspace('RGB')
  image.format('png')
  image.fuzz("80%")
  image.transparent('white')
  image.resize(48)
  image.write(file_path_right)
  image.flop
  image.write(file_path_left)
end


%w[left right].each do |direction|
  animations.each do |frame_name, animation|
    animation['sequence'].each_with_index do |sprite_id, i|
      index = (i+1).to_s.rjust(2, '0')

      frame_name_source_path = "#{dir}#{sprite_id}_#{direction}.png"
      frame_name_dest_path   = "#{dir}#{frame_name}_#{direction}_#{index}.png"

      FileUtils.cp(frame_name_source_path, frame_name_dest_path)
    end

    manifest['animations']["#{frame_name}_#{direction}"] = {
      size:       animation['sequence'].size,
      frame_rate: animation['frame_rate'],
    }
  end

  images.each do |image_name, sprite_id|
    raise "Same name not supported yet #{image_name}" if sprite_id == image_name

    image_name_source_path = "#{dir}#{sprite_id}_#{direction}.png"
    image_name_dest_path   = "#{dir}#{image_name}_#{direction}.png"

    FileUtils.cp(image_name_source_path, image_name_dest_path)

    manifest['images'].push("#{image_name}_#{direction}")
  end
end

input_map.values.map { |sprite| sprite[:id] }.each do |sprite_id|

  %w[left right].each do |direction|
    FileUtils.remove_file("#{dir}#{sprite_id}_#{direction}.png")
  end
end

File.write("#{assets}manifest.json", JSON.pretty_generate(manifest))

artifacts = Dir.glob("#{dir}/*")
puts artifacts.join("\n")
