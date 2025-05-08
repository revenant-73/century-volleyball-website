@echo off
REM Batch file to run the PowerShell script
powershell -ExecutionPolicy Bypass -File "%~dp0push-to-github.ps1" %*
pause