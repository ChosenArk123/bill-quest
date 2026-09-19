#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR/dist"

echo "=========================================="
echo "          Starting Bill Quest...          "
echo "=========================================="

# Find python3 executable
if command -v python3 >/dev/null 2>&1; then
    PY="python3"
elif [ -f "/opt/anaconda3/bin/python3" ]; then
    PY="/opt/anaconda3/bin/python3"
else
    echo "Python 3 not found. Opening play_offline.html directly in your browser..."
    open "play_offline.html"
    exit 0
fi

PORT=4173

$PY -m http.server $PORT &
SERVER_PID=$!

sleep 1
open "http://localhost:$PORT"

echo ""
echo "Bill Quest is running at http://localhost:$PORT"
echo "Close this terminal window or press Ctrl+C when you are done."
echo "=========================================="

trap "kill $SERVER_PID 2>/dev/null; exit" SIGINT SIGTERM EXIT
wait $SERVER_PID
