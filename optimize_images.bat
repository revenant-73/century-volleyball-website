@echo off
cd /d "%~dp0"
ffmpeg -i "images\century-boys-team-1.jpg" -vf scale=1600:-1 -q:v 4 "images\optimized\century-boys-team-1600.jpg"
ffmpeg -i "images\century-boys-team-1.jpg" -vf scale=800:-1 -q:v 4 "images\optimized\century-boys-team-800.jpg"
ffmpeg -i "images\century-girls-team-1.jpg" -vf scale=1600:-1 -q:v 4 "images\optimized\century-girls-team-1600.jpg"
ffmpeg -i "images\century-girls-team-1.jpg" -vf scale=800:-1 -q:v 4 "images\optimized\century-girls-team-800.jpg"
