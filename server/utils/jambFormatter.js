exports.formatJamb = (aiInput) => {
    if (typeof aiInput === "string") {
        return {
            answer: aiInput.match(/Answer:(.*)/)?.[1]?.trim() || "No answer",
            explanation: aiInput.match(/Explanation:(.*)/)?.[1]?.trim() || "No explanation",
            tip: aiInput.match(/Tip:(.*)/)?.[1]?.trim() || "No tip",
        };
    } else if (typeof aiInput === "object") {
        return {
            answer: aiInput.answer || "No answer",
            explanation: aiInput.explanation || "No explanation",
            tip: aiInput.tip || "No tip",
        };
    } else {
        return {
            answer: "No answer",
            explanation: "No explanation",
            tip: "No tip",
        };
    }
};