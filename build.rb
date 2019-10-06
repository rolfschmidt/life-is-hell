require 'fileutils'
require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'mini_magick'
  gem 'json'
end

input_map = {

  # player
  'color/Proto-fronjumpcolor' => {
    id:         'power_jump',
    width:      32,
    directions: true,
  },
  'color/Proto-front2color' => {
    id:         'turn',
    width:      32,
    directions: true,
  },
  'color/Proto-front2go1color' => {
    id:         'walk_outer',
    width:      32,
    directions: true,
  },
  'color/Proto-front2go2color' => {
    id:         'walk_inner',
    width:      32,
    directions: true,
  },
  'color/Proto-front2motion2color' => {
    id:         'idle_exhale',
    width:      32,
    directions: true,
  },
  'color/Proto-front2motion22color' => {
    id:         'idle_inhale',
    width:      32,
    directions: true,
  },
  'color/Proto-front2punchcolor' => {
    id:         'punch',
    width:      32,
    directions: true,
  },
  'color/Proto-front2jump1color' => {
    id:         'ground_jump',
    width:      32,
    directions: true,
  },
  'color/Proto-front2jump2color' => {
    id:         'jump_air',
    width:      32,
    directions: true,
  },
  'color/Proto-frontDEATHcolor' => {
    id:         'dead',
    width:      32,
    directions: true,
  },


  # build elements
  'block_right_160' => {
    id:         'corner',
    width:      32,
    directions: true,
    images:     true,
  },

  # enemy
  'color/gegnerfront2color' => {
    id:         'enemy_idle_inhale',
    width:      32,
    directions: true,
  },
  'color/gegnerfrontcolor' => {
    id:         'enemy_idle_exhale',
    width:      32,
    directions: true,
  },
  'color/gegnerfrontgo1color' => {
    id:         'enemy_attack_low',
    width:      32,
    directions: true,
  },
  'color/gegnerfrontgo2color' => {
    id:         'enemy_attack_high',
    width:      32,
    directions: true,
  },

  # boss
  'color/level1_boss_1280_640 0color' => {
    id:         'boss_idle',
    width:      96,
    directions: true,
  },
  'color/level1_boss_1280_640 1color' => {
    id:         'boss_alter',
    width:      96,
    directions: true,
  },
  'color/level1_boss_1280_640 2color' => {
    id:         'boss_attack_low',
    width:      96,
    directions: true,
  },
  'color/level1_boss_1280_640 3color' => {
    id:         'boss_attack_intense',
    width:      96,
    directions: true,
  },
  'color/level1_boss_1280_640 4color' => {
    id:         'boss_attack_power',
    width:      96,
    directions: true,
  },

  # level 1
  'block_lava_32_32' => {
    id:    'level1_block_lava',
    width: 32,
  },
  'block_kill_32_32' => {
    id:    'level1_block_kill',
    width: 32,
  },
  'block_middle_32_32' => {
    id:    'level1_block_middle',
    width: 32,
  },
  'block_left_32_32' => {
    id:    'level1_block_left',
    width: 32,
  },
  'block_right_32_32' => {
    id:    'level1_block_right',
    width: 32,
  },
  'boss_door_96_96' => {
    id: 'level1_boss_door',
  },
  'background_scene_level1_1024_768' => {
    id: 'level1_sky',
  },
  'bomb' => {
    id: 'level1_bomb',
  },
  'star' => {
    id: 'level1_star',
  },
  'background_scene_level1_boss_1024_768' => {
    id: 'level1_boss_sky',
  },

  'background_scene_intro_1024_768' => {
    id: 'intro_sky',
  },
  'scene_intro_play_360_80' => {
    id: 'intro_play',
  },
}


dir    = 'build/'
assets = 'assets/'
FileUtils.rm_r Dir.glob("#{assets}/images/*")

animations = {
  # player
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
  'dead' => {
    'frame_rate' => 10,
    'sequence'   => ['dead'],
  },

  # enemy
  'enemy_idle' => {
    'frame_rate' => 10,
    'sequence'   => ['enemy_idle_inhale', 'enemy_idle_exhale'],
  },
  'enemy_attack' => {
    'frame_rate' => 10,
    'sequence'   => ['enemy_attack_low', 'enemy_attack_high'],
  },

  # boss
  'boss_attack' => {
    'frame_rate' => 10,
    'sequence'   => ['boss_idle', 'boss_alter', 'boss_attack_low', 'boss_attack_intense', 'boss_attack_power',],
  },
}

sprites = {
  'stand'       => 'turn',
  'enemy_stand' => 'enemy_idle_inhale',
  'boss_stand'  => 'boss_idle',
}

images = {
  'star' => {
    id: 'star',
  },
  'Plattform' => {
    id: 'platform',
    width: 32,
  },
  'boss_door_160_160 yo' => {
    id:    'boss_door',
    width: 96,
  },
  'KILLPlattform' => {
    id: 'spikes',
    width: 32,
  },
}



manifest = {
  'animations' => {},
  'sprites'    => [],
  'images'     => [],
}
input_map.each do |source, sprite|

  source_file_path = "#{assets}#{source}.png"

  image = MiniMagick::Image.open(source_file_path)
  image.colorspace('RGB')
  image.format('png')
  image.fuzz("80%")
  image.transparent('white')
  image.resize(sprite[:width]) if sprite[:width]

  if sprite[:directions]
    direction_path_prefix = "#{dir}#{sprite[:id]}_"
    file_path_left  = "#{direction_path_prefix}left.png"
    file_path_right = "#{direction_path_prefix}right.png"

    image.write(file_path_right)
    image.flop
    image.write(file_path_left)

    if sprite[:images]
      direction_path_prefix      = "#{assets}/images/#{sprite[:id]}_"
      image_name_dest_path_left  = "#{direction_path_prefix}left.png"
      image_name_dest_path_right = "#{direction_path_prefix}right.png"

      FileUtils.cp(file_path_left, image_name_dest_path_left)
      FileUtils.cp(file_path_right, image_name_dest_path_right)

      manifest['images'].push("#{sprite[:id]}_left")
      manifest['images'].push("#{sprite[:id]}_right")
    end
  else # sprite[:images]
    dest_file_path = "#{assets}/images/#{sprite[:id]}.png"
    image.write(dest_file_path)
    manifest['images'].push(sprite[:id])
  end
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

  sprites.each do |sprite_name, sprite_id|
    raise "Same name not supported yet #{sprite_name}" if sprite_id == sprite_name

    sprite_name_source_path = "#{dir}#{sprite_id}_#{direction}.png"
    sprite_name_dest_path   = "#{dir}#{sprite_name}_#{direction}.png"

    FileUtils.cp(sprite_name_source_path, sprite_name_dest_path)

    manifest['sprites'].push("#{sprite_name}_#{direction}")
  end
end

images.each do |source, sprite|

  source_file_path = "#{assets}#{source}.png"
  dest_file_path   = "#{assets}/images/#{sprite[:id]}.png"

  image = MiniMagick::Image.open(source_file_path)
  image.colorspace('RGB')
  image.format('png')
  image.fuzz("80%")
  image.transparent('white')
  image.resize(sprite[:width]) if sprite[:width]
  image.write(dest_file_path)

  manifest['images'].push(sprite[:id])
end

input_map.values.each do |sprite|

  next if !sprite[:directions]
  %w[left right].each do |direction|
    FileUtils.remove_file("#{dir}#{sprite[:id]}_#{direction}.png")
  end
end

# File.write("#{assets}manifest.json", JSON.pretty_generate(manifest))
File.write('assets.js', "var spriteManifest = #{JSON.pretty_generate(manifest)};")

artifacts = Dir.glob("#{dir}/*")
puts artifacts.join("\n")
