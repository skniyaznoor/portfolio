#!/usr/bin/env bash
# Renders resume.html to the PDF served by the portfolio. Requires Google Chrome.
set -euo pipefail
cd "$(dirname "$0")"
google-chrome --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=10000 \
  --print-to-pdf="../public/pdf/Sk-Niyaz-Noor-Resume.pdf" "file://$PWD/resume.html"
echo "Wrote public/pdf/Sk-Niyaz-Noor-Resume.pdf"
