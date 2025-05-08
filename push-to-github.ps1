# PowerShell script to push changes to GitHub
# Usage: .\push-to-github.ps1 "Your commit message here"

# Get the config from the JSON file
$configFile = Join-Path $PSScriptRoot "github-config.json"
$config = Get-Content -Path $configFile | ConvertFrom-Json

# Set variables from config
$username = $config.username
$repository = $config.repository
$branch = $config.branch
$commitPrefix = $config.commit_message_prefix

# Get the commit message from arguments or prompt for one
$commitMessage = $args[0]
if (-not $commitMessage) {
    $commitMessage = Read-Host "Enter a commit message"
}

# Add the prefix to the commit message
$fullCommitMessage = "$commitPrefix$commitMessage"

# Check if git is installed
try {
    git --version | Out-Null
}
catch {
    Write-Host "Git is not installed or not in your PATH. Please install Git and try again." -ForegroundColor Red
    exit 1
}

# Check if the directory is a git repository
if (-not (Test-Path -Path (Join-Path $PSScriptRoot ".git"))) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
    git remote add origin "https://github.com/$username/$repository.git"
}

# Add all changes
Write-Host "Adding all changes..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "Committing changes with message: $fullCommitMessage" -ForegroundColor Yellow
git commit -m "$fullCommitMessage"

# Push to GitHub
Write-Host "Pushing to GitHub repository: $username/$repository on branch $branch..." -ForegroundColor Yellow
git push -u origin $branch

Write-Host "Done! Changes have been pushed to GitHub." -ForegroundColor Green