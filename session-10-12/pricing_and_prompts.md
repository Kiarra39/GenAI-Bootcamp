# Pricing and Prompts (Sessions 10–12)

## A. Pricing Research
**Date of research:** 2025-10-13  

**Sources checked:**
- [Gemini API Billing](https://ai.google.dev/gemini-api/docs/billing)  
- [TechCrunch – Gemini 2.5 Pro Pricing](https://techcrunch.com/2025/04/04/gemini-2-5-pro-is-googles-most-expensive-ai-model-yet/)  
- [LaoZhang AI Blog](https://blog.laozhang.ai/ai-models-2/gemini-25-pro-api-pricing-cost-analysis-alternatives/)  
- [DeepMind Gemini Models](https://deepmind.google/models/gemini/pro/)  
- [Google Product Blog](https://blog.google/products/gemini/gemini-preview-model-billing-update/)  

**Assumed exchange rate:** ₹85 = USD 1  

### Summary Table

| Model | Billing unit | Cost (per unit) | Notes |
|--------|---------------|----------------|-------|
| Gemini 2.5 Pro (≤ 200k tokens) | per 1k tokens | ₹0.106 (input), ₹0.850 (output) | Standard tier |
| Gemini 2.5 Pro (> 200k tokens) | per 1k tokens | ₹0.213 (input), ₹1.275 (output) | Large context tier |
| Gemini 2.5 Flash / Flash‑Lite | per 1k tokens | ₹0.0085 (input), ₹0.034 (output) | Lower-cost mode |
| Free / Preview Tier | — | Free | Limited usage for testing |

---

## B. Cost Estimation Examples

### Example 1 — Small Request  
**Task:** Summarize a 500-word article (≈ 400 input + 200 output)  
**Cost:** (400 × ₹0.106) + (200 × ₹0.850) ≈ **₹0.21 per request**

### Example 2 — Longer Code / Reasoning Task  
**Task:** Generate 100 lines of code (≈ 800 input + 1,200 output)  
**Cost:** (800 × ₹0.106) + (1,200 × ₹0.850) ≈ **₹1.10 per request**

### Example 3 — Hackathon Estimate  
**Assume:** 200 calls/day × 1k tokens each → ₹0.956 per call  
**Total:** Daily ≈ ₹191 | 3-Day ≈ ₹574  

**Team Recommendation:** Use Gemini 2.5 Flash for frequent testing; Gemini 2.5 Pro for reasoning-heavy tasks.

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

- **Cost Awareness:** Per-1k-token pricing makes budgeting easier. Structured prompts save both cost and time.  
- **Prompt Engineering Impact:** RTFC leads to more focused and efficient responses.  
- **Model Choice:** Gemini Flash is cheaper for prototyping; Pro is ideal for logic-heavy prompts.  
- **Team Takeaway:** Clarity = Efficiency. Smart prompts reduce cost and improve response quality.

---
**✅ Ready for submission**  
Save as: `session-10-12/pricing_and_prompts.md` and push to GitHub.
