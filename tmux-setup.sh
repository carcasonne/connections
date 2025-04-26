#!/bin/bash

# Create session name
SESSION_NAME="connectionsDevelopment"

# Check if the session already exists
tmux has-session -t $SESSION_NAME 2>/dev/null

# If the session doesn't exist, create it
if [ $? != 0 ]; then
    # Create a new session with the first window running Navidrome
    tmux new-session -d -s $SESSION_NAME -n "git"

    # Create a new window for Zola
    tmux new-window -t $SESSION_NAME:1 -n "zola"

    # Send the Shiori command to the second window
    tmux send-keys -t $SESSION_NAME:1 "cd ./Kode/Prokekter/connections" C-m
    tmux send-keys -t $SESSION_NAME:1 "zola serve" C-m
    
    # Return to the first window
    tmux select-window -t $SESSION_NAME:0

    echo "Created new tmux session '$SESSION_NAME' for serving zola and allowing development"
else
    echo "Session '$SESSION_NAME' already exists"
fi

# Attach to the session
tmux attach-session -t $SESSION_NAME
