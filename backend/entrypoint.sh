#!/bin/sh

# Start server (seed runs via lifespan in main.py)
exec uvicorn main:app --host 0.0.0.0 --port 8000
