#!/bin/sh

# Run seed only if database doesn't exist
python seed.py

# Start server
exec uvicorn main:app --host 0.0.0.0 --port 8000
