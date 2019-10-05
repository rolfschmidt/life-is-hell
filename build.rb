require 'fileutils'
require 'json'

input_map = {
  'Proto-fronjump'             => {
                                    id: 'jump',
                                    width: 48,
                                  },
  'Proto-front2'               => {
                                    id: 'turn',
                                    width: 48,
                                  },
  'Proto-front2go1'            => {
                                    id: 'walk_outer',
                                    width: 48,
                                  },
  'Proto-front2go2'            => {
                                    id: 'walk_inner',
                                    width: 48,
                                  },
  'Proto-front2motion2'        => {
                                    id: 'idle_exhale',
                                    width: 48,
                                  },
  'Proto-front2motion22' => {
                                    id: 'idle_inhale',
                                    width: 48,
                                  },
  'Proto-front2punch'          => {
                                    id: 'punch',
                                    width: 48,
                                  },
}

debug = false

dir    = 'build/'
assets = 'assets/'



dir = ".#{dir}" if !debug
FileUtils.mkdir_p(dir) unless File.directory?(dir)


frames = {
  'walk'  => ['turn', 'walk_inner', 'turn', 'walk_outer'],
  'jump'  => ['jump'],
  'punch' => ['punch'],
  'idle'  => ['idle_inhale', 'idle_exhale'],
}

images = {
  'stand'  => 'turn',
}

manifest = {
  frames: {},
  images: [],
}
input_map.each do |source, sprite|

  source_file_path = "#{assets}#{source}.png"
  dest_file_path   = "#{dir}#{sprite[:id]}.png"

  FileUtils.cp(source_file_path, dest_file_path)

  direction_path_prefix = "#{dir}#{sprite[:id]}_"
  file_path_left  = "#{direction_path_prefix}left.png"
  file_path_right = "#{direction_path_prefix}right.png"

  `sips -Z #{sprite[:width]} #{dest_file_path}`

  `sips -f horizontal #{dest_file_path} --out #{file_path_left}`
  FileUtils.cp(dest_file_path, file_path_right)

  FileUtils.remove_file(dest_file_path)
end


%w[left right].each do |direction|
  frames.each do |frame_name, sprite_ids|
    sprite_ids.each_with_index do |sprite_id, i|
      index = (i+1).to_s.rjust(2, '0')

      frame_name_source_path = "#{dir}#{sprite_id}_#{direction}.png"
      frame_name_dest_path   = "#{dir}#{frame_name}_#{direction}_#{index}.png"

      FileUtils.cp(frame_name_source_path, frame_name_dest_path)
    end

    manifest[:frames][:"#{frame_name}_#{direction}"] = sprite_ids.size
  end

  images.each do |image_name, sprite_id|
    raise "Same name not supported yet #{image_name}" if sprite_id == image_name

    image_name_source_path = "#{dir}#{sprite_id}_#{direction}.png"
    image_name_dest_path   = "#{dir}#{image_name}_#{direction}.png"

    FileUtils.cp(image_name_source_path, image_name_dest_path)

    manifest[:images].push(:"#{image_name}_#{direction}")
  end
end

input_map.values.map { |sprite| sprite[:id] }.each do |sprite_id|

  %w[left right].each do |direction|
    FileUtils.remove_file("#{dir}#{sprite_id}_#{direction}.png")
  end
end

File.write("#{assets}manifest.json", JSON.pretty_generate(manifest))

artifacts = Dir.glob(dir)
p artifacts

FileUtils.rm_r artifacts if !debug
