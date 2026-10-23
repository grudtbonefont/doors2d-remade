DOORS 2D — replaceable audio
Put files into the audio/ folder next to index.html using EXACTLY these names.
Each name is tried as .ogg, .mp3, .wav (mp3 first on browsers without Ogg Vorbis, e.g. older iOS Safari). Any file that is missing or fails to
load falls back to the built-in WebAudio synth sound, so you can delete/replace freely.
Loops (music, rain, hums) should loop cleanly. Keep files short/small for web.

Doors/objects:  door_open  door_creak  door_slam  door_locked  door_unlock  drawer_open
                wardrobe_in  wardrobe_out  pickup  gold
Player:         step_walk  step_run  step_crouch  heartbeat (Figure minigame beat)
Lights:         light_flicker  light_buzz
Entities:       rush  rush_rumble  ambush  screech_psst  screech_bite  eyes_hum (loop)
                halt_static (loop)  seek_eyes  figure_step  figure_growl
Ambience/music (loops, crossfaded by situation):
                rain  music_hotel  music_library  music_shop  music_door100  seek_chase
                elevator (music in the party elevator)  lobby (music on the lobby screen)
Stings:         death  win

Controls: M — mute, - / + (or [ ]) — volume, K on title/death screen — credits.
Please respect licenses: do not publish ripped DOORS/Roblox audio.
