# Pricing and Prompts (Sessions 10–12)

## A. Pricing Research
**Date of research:** 2025-10-13

**Sources checked:**
- https://ai.google.dev/gemini-api/docs/billing
- https://techcrunch.com/2025/04/04/gemini-2-5-pro-is-googles-most-expensive-ai-model-yet/
- https://blog.laozhang.ai/ai-models-2/gemini-25-pro-api-pricing-cost-analysis-alternatives/
- https://deepmind.google/models/gemini/pro/
- https://blog.google/products/gemini/gemini-preview-model-billing-update/

**Assumed exchange rate:** ₹85 = USD 1

| Model / Tier | Input Cost (USD per 1M tokens) | Output Cost (USD per 1M tokens) | Approx INR Equivalent | Notes |
|---------------|--------------------------------|---------------------------------|------------------------|--------|
| Gemini 2.5 Pro (≤ 200k tokens) | $1.25 | $10.00 | ₹106.25 | Standard rate |
| Gemini 2.5 Pro (> 200k tokens) | $2.50 | $15.00 | ₹212.50 | Large context tier |
| Gemini 2.5 Flash / Flash‑Lite | ~$0.10 | ~$0.40 | ₹8.50 / ₹34 | Lower cost mode |
| Free / Preview Tier | Free | Free | Free | Trial usage limits |

---

## B. Cost Estimation Examples

### Example 1 — Small Request
**Task:** Summarize a 500‑word article (Input ≈ 400 tokens, Output ≈ 200 tokens)  
**Cost:** ≈ ₹0.21 per request

### Example 2 — Longer Code / Reasoning Task
**Task:** Generate 100 lines of code + reasoning (Input ≈ 800 tokens, Output ≈ 1,200 tokens)  
**Cost:** ≈ ₹1.10 per request

### Example 3 — Hackathon Estimate
**Task:** 200 API calls/day × 1,000 tokens per call → ₹0.9563 per call  
**Cost:** Daily: ₹191 | 3‑Day Total: ₹574

**Team Recommendation:** Use Gemini 2.5 Flash for rapid testing and Gemini 2.5 Pro for reasoning-heavy tasks.

---

## C. Prompt Refinement — Before / After (RTFC)

### Student A
**Bad prompt (before):**
> Summarize the project report.

**Refined prompt (after) [RTFC applied]:**
```
Role: Technical analyst reviewing a hackathon project report.
Task: Summarize objectives, approach, and final results.
Format: 3 bullet points — Objective, Method, Result.
Constraint: Under 100 words, formal academic tone.
```

---

### Student B
**Bad prompt (before):**
> Write code for chatbot.

**Refined prompt (after) [RTFC applied]:**
```
Role: Java developer designing a chatbot.
Task: Write Java code that accepts user input and replies with a predefined message.
Format: Full Java class in code block.
Constraint: Use only standard Java, max 50 lines.
```

---

### Student C
**Bad prompt (before):**
> Explain AI.

**Refined prompt (after) [RTFC applied]:**
```
Role: AI educator for beginners.
Task: Explain what Artificial Intelligence is and how it is used in daily life.
Format: Short paragraph + 3 bullet examples.
Constraint: Use simple English (grade 8 level).
```

---

### Student D
**Bad prompt (before):**
> Help me improve my project idea.

**Refined prompt (after) [RTFC applied]:**
```
Role: Hackathon mentor.
Task: Evaluate this project idea and suggest 3 innovations to make it more novel.
Format: Numbered list with brief reasoning.
Constraint: Each suggestion under 30 words.
```

---

## D. Reflection — What We Learned

- **Cost Awareness:** Token-based billing varies with prompt and output length. Structured prompts reduce unnecessary tokens.  
- **Prompt Engineering Impact:** RTFC improves clarity and focus, saving tokens and time.  
- **Model Choice:** Use Gemini 2.5 Flash for rapid tests and Gemini 2.5 Pro for reasoning-heavy tasks.  
- **Team Takeaway:** Clarity = Efficiency. Better prompts mean cheaper, faster, and more reliable results.

---
**✅ Ready for submission**
Save this file as: `session-10-12/pricing_and_prompts.md` and push it to your GitHub repository.
