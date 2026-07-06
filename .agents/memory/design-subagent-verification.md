---
name: DESIGN subagent verification
description: Why to always verify DESIGN subagent claims about page/feature completion before trusting them.
---

When a DESIGN subagent reports it built or "converted" a set of pages/components, it may be wrong — it can report success while some files remain bare placeholder stubs (e.g. just a heading, subtext, and a "back" button).

**Why:** Observed in a react-vite build where a subagent claimed it had fully built out three pages (explore/camera/assistant equivalents), but two rounds of verification (reading the files directly, and screenshotting the live routes) showed they were still stub placeholders, while other pages from the same pass were genuinely complete.

**How to apply:** After any subagent pass that claims to have built or modified multiple pages, verify each one independently — read the file contents and/or screenshot the live route — before reporting completion or moving on. Don't rely solely on the subagent's summary of what it did. If stubs are found, it's often faster for the main agent to build the remaining pages directly rather than risk another unreliable subagent pass.
