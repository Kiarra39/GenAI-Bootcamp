const documentation = [
    {
        text: "The primary button uses the 'blue-500' token for its background color. For accessibility, always include an 'aria-label'. This is critical for all interactive elements.",
        vector: [0.85, 0.10, 0.40] 
    },
    {
        text: "To implement dark mode, check the user's system preference using 'window.matchMedia'. Toggle the 'data-theme=dark' attribute on the body tag.",
        vector: [-0.90, 0.05, -0.30] 
    },
    {
        text: "All new components must be written using functional React hooks. Class components are deprecated and should not be used in the new codebase.",
        vector: [0.70, -0.80, -0.15] 
    },
    {
        text: "The component library utilizes a 4-point scale for all internal padding and margin spacing. The largest padding available is 'p-10'.",
        vector: [0.10, 0.95, 0.60] 
    },
    {
        text: "For fetching asynchronous data, always use the 'useSWR' or 'useQuery' library with built-in caching mechanisms to prevent re-renders.",
        vector: [0.65, -0.75, 0.20] 
    },
    {
        text: "Project deadlines are set for the end of the third quarter. Contact the project manager for a detailed Gantt chart.",
        vector: [-0.15, -0.10, 0.90] 
    }
];

function calculateDotProduct(vecA, vecB) {
    return vecA.reduce((sum, val, index) => sum + val * vecB[index], 0);
}

function findMostRelevantDocument(queryVector) {
    let bestMatch = null;
    let highestScore = -Infinity;

    for (const doc of documentation) {
        const score = calculateDotProduct(queryVector, doc.vector);
        if (score > highestScore) {
            highestScore = score;
            bestMatch = doc;
        }
    }

    return { bestMatch, highestScore };
}

const queries = [
    {
        text: "How do I make the UI dark?",
        vector: [-1.0, 0.0, -0.2]     
	},
    {
        text: "What is the standard for code structure?",
        vector: [0.75, -0.75, 0.0]     
	}
];

for (const query of queries) {
    const { bestMatch, highestScore } = findMostRelevantDocument(query.vector);
    console.log("----------------------------------------------------");
    console.log(`Query: "${query.text}"`);
    console.log(`Best Match: "${bestMatch.text}"`);
    console.log(`Similarity Score (Dot Product): ${highestScore.toFixed(3)}\n`);
}

