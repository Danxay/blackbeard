#!/bin/sh

# Start server (seed runs via lifespan in main.py)
exec uvicorn main:app --host "${API_HOST:-0.0.0.0}" --port "${API_PORT:-8000}"
