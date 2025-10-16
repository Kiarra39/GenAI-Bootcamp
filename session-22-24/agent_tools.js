
async function fetchResearchSummary(topic) {
  console.log(`Fetching research summary for topic: ${topic}`);

  const mockResponse = {
    topic,
    papers_found: 3,
    summary: `The topic '${topic}' has been widely researched in recent years.
    Studies show significant advancements in related technologies and applications.`
  };

  return mockResponse;
}

module.exports = {
  fetchResearchSummary
};

