# Ravi Kumar · Virtual Boardroom

The visitor takes a seat in a boardroom while Ravi presents on the wall screen: profile, career, transformation, deals, global and Q&A. 'Present all' runs the full talk.

One of six portfolio templates for Ravi Kumar (Group Vice President – Finance, Miles Education), made so Ravi can choose a direction. The main portfolio lives separately in `ravi-kumar-portfolio`.

## Content and media
- All text comes from Ravi's resume via `data.js` (exported from the main portfolio's `content.ts`). No invented metrics.
- Narration: `voice/<hash>.mp3`, an AI clone of Ravi's own voice (used with his permission) at 1.10x. File name = FNV-1a hash of the line, see `voice.js`.
- Images and video are AI-generated from Ravi's photo. The site says so in its footer note.

## Run locally
Static site, no build step:

    python3 -m http.server 8080

## Deploy on Render
New → Static Site → connect this repo. Build command: empty. Publish directory: `.` (or use `render.yaml`).
