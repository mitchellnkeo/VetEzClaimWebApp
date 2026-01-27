const SUGGESTED_PROMPTS = [
    "Summarize this VA Rating Decision.",
    "Summarize this Board of Veterans’ Appeals decision.",
    "Explain which conditions were granted, denied, or remanded.",
    "Explain why each condition was denied.",
    "Identify the evidence the VA relied on most in this decision.",
    "Identify missing or unfavorable evidence noted by the VA or Board.",
    "Explain the legal standards the VA or Board applied in this decision.",
    "Explain this decision as if I have no legal background.",
    "Tell me any favorable findings the VA made.",
    "Identify any contradictions or inconsistencies in this decision.",
  
    "What are my appeal or filing options after this decision?",
    "What deadlines apply to this decision?",
    "Explain whether I can file a Supplemental Claim, HLR, or Board Appeal.",
    "Tell me which option is usually recommended based on this decision.",
    "Explain what happens if I do nothing.",
    "Explain the risks and benefits of each filing option.",
    "Tell me which issues are strongest to pursue next.",
    "Identify which denied issues are weakest and why.",
  
    "Identify any possible legal or factual errors in this decision.",
    "Did the VA fail to satisfy the duty to assist?",
    "Did the examiner provide an inadequate medical opinion?",
    "Did the VA apply the wrong legal standard?",
    "Did the Board fail to address any favorable evidence?",
    "Did the VA improperly rely on a negative C&P exam?",
    "Identify appealable errors for each denied issue.",
    "Explain how the benefit of the doubt rule applies here.",
  
    "What new evidence would strengthen my claim?",
    "Do I need lay statements, and what should they say?",
    "Do I need buddy statements, and what should they address?",
    "What service records or personnel records could help?",
    "What medical records should I obtain before filing again?",
    "Explain what ‘new and relevant evidence’ means for my case.",
  
    "Tell me which VA forms I can file next.",
    "What happens after I file this form?",
    "How long does this type of appeal usually take?",
    "Will I get another C&P exam?",
    "Can I submit evidence later, and if so, when?",
    "Explain the difference between remand and denial.",
    "Explain what a ‘final decision’ means.",
  
    "Are there any secondary conditions I should consider filing?",
    "Should I file for an increased rating on any granted condition?",
    "Should I file for TDIU based on this decision?",
    "Are there inferred or unadjudicated claims in this decision?",
  
    "Help me plan a step-by-step claim strategy for the next 12 months.",
    "Explain how this decision affects my overall combined rating.",
    "Explain my options briefly—no legal jargon.",
    "Focus only on deadlines and required actions.",
    "Create a checklist of what I need to do next.",
    "Summarize everything into a simple action plan."
];



export function getRandomSuggestedPrompts() {
    const shuffled = [...SUGGESTED_PROMPTS]; 
  
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  
    return shuffled;
}
  