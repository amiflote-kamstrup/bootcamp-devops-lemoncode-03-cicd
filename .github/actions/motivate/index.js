// A simple JS Action that fetches a quote of the day and prints it.
// Node 20 provides a global fetch API; no extra deps required.

async function run() {
  try {
    const res = await fetch("https://favqs.com/api/qotd");
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    const quote = data?.quote?.body ?? "Keep going!";
    const author = data?.quote?.author ?? "Unknown";
    const message = `💡 Motivation: "${quote}" — ${author}`;
    console.log(message);

    // Optionally, also write to the job summary (GitHub UI)
    const fs = await import("node:fs/promises");
    const summaryPath = process.env.GITHUB_STEP_SUMMARY;
    if (summaryPath) {
      await fs.appendFile(summaryPath, `${message}\n`);
    }
  } catch (err) {
    console.error(`Failed to fetch motivational quote: ${err.message}`);
    // Do not fail the job for a transient API error
  }
}

run();