#!/bin/sh
set -e

# Wait 10 seconds on exit: twice the `buffer_duration` default of 5 seconds
trap 'echo "Waiting for logs to flush to CloudWatch Logs..."; sleep 10' EXIT

# Run the given command
"$@"