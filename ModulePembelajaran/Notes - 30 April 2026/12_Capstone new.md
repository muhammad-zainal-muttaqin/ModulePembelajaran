# Capstone · Research Project

> *The capstone is not the last exam. It is the first time you own a research question from framing to communication, and are accountable for every decision in between.*

**Weeks:** 12–15
**In charge:** Supervisor + RA
**Format:** Weekly in-class presentations + between-session independent work

---

## 0. What the capstone is

The capstone is a bounded, hypothesis-driven research project. You enter with an approved framing. You exit with a research report, a reproducible repository, a working demo, and a final presentation.

The ten bootcamp weeks taught you how to execute: given a defined problem and a defined dataset, build a model, train it correctly, and evaluate it honestly. The capstone asks you to do something harder: own a research question from beginning to end: formulate it, test it, revise it when the evidence pushes back, and communicate what you actually found.

It will not go exactly as planned. That is not a sign that something went wrong. A research project that goes exactly as planned probably did not ask a real question. The rethink, the moment when Experiment 1 results force you to revise your hypothesis and design, is the center of the capstone, not a detour from it.

A good capstone project has:
- A genuine gap in the Middle. Something that cannot be solved by a standard pipeline applied unchanged
- A scope that is closable in 3 weeks of focused work
- Public artifacts: a repository others can clone and run, a report others can read independently, a demo others can try

The scope can be modest. A well-executed small project is more valuable than an ambitious half-finished one.

---

## 1. The four-week arc

The capstone runs four weeks. Week 11 is framing (covered in the Research Framing document). Weeks 12–15 are the capstone proper.

| Week | Theme | What you are doing |
|---|---|---|
| 12 | Filter and commit | Present framings, get approval, run Experiment 1 |
| 13 | Rethink and iterate | Present results, rethink, design and run Experiment 2 |
| 14 | Communicate | Present Experiment 2, finish writing, finalize demo, final presentations |
| 15 | Submit | Polish deliverables based on Week 14 feedback; submit report, repo, demo |

Each week has an in-class meeting and a between-session work period. The in-class meetings are presentation-based: you show what you have, the group questions it, the supervisor gives direction. There are no lectures. The supervisor and RA are present to supervise, not to teach.

---

## 2. Week 12: Filter and commit

### In-class meeting (90 minutes)

**Format:** Individual presentations, 15 minutes each. The center of this meeting is framing defense, not experiment design.

Each trainee presents:
- Their candidate framings from Week 11 (briefly, 2 min each): entity, output, input, gap
- Their literature findings: which framings survived, which were dropped, and why
- Their proposed primary framing and backup, with Middle sketched on the board (boxes, arrows, gap marked)

The group and supervisor push back on the framing:
- "The literature check found paper X. Does that paper fill the gap you identified?"
- "Your Middle has no gap. The entire pipeline is standard. What would you change?"
- "This framing passes the temporal check, but does the input actually exist at prediction time in a realistic deployment?"
- "Why this framing over your backup? What makes this gap more interesting?"

**The supervisor approves or bounces each framing.** A bounced framing returns to revision. The trainee does not begin experiment design until the framing is approved. Expect 1–2 trainees to need a same-day conversation with the supervisor or RA before their framing is cleared.

Once framing is approved, the trainee can sketch a rough experiment direction (what baseline, what intervention, what metric). But this is a brief verbal sketch at the end of their slot, not a formal pre-registration. The full pre-registration comes between this meeting and Week 13, after the trainee has had time to think through the design properly.

### Between Week 12 and Week 13

**Experiment 1 pre-registration:** written and committed to the repository before any code runs. Take the approved framing and think carefully about the experimental design. The pre-registration specifies:

```
Hypothesis: [what you predict, in one sentence]
Conditions:
  - Baseline: [exact specification: architecture, training setup, evaluation]
  - Method: [exact specification: what is different from baseline]
  - Controls: [any additional conditions that isolate specific claims]
Metric: [primary metric + secondary metrics]
Falsification criterion: [the hypothesis is falsified if ...]
Seeds: [which seeds, how many]
Expected result: [what you expect to observe if the hypothesis is true]
```

Commit this file before running any experiments. If you need to deviate from the pre-registration during execution, document the deviation and the reason. The deviation itself is not a problem, but undocumented deviation is.

**Experiment 1: begin running.** At minimum: baseline and main condition, both with 3 seeds, all runs logged, results saved. It is fine if experiments are still running when Week 13 arrives. Bring whatever you have.

**Rethink document:** begin drafting as soon as you have any results, even partial ones. You do not need to wait for everything to complete. Format:

```
Observations (not conclusions):
  - What I measured so far
  - What the numbers show
  - Where results differed from expectations

Updated beliefs:
  - What I now suspect, given what I observed
  - Why the result was different from expected (if it was)

Two new papers:
  - Paper 1: [citation + one sentence on what it contributes]
  - Paper 2: [citation + one sentence]
  (Found after seeing results, not from your Week 12 literature review)

Experiment 2 direction:
  - What I want to test next, and why
  - How it connects to what Experiment 1 showed
```

Bring your rethink document to Week 13. It does not need to be complete. It needs to be honest about what you have seen so far.

---

## 3. Week 13: Rethink and iterate

### In-class meeting (90 minutes)

**Format:** Individual presentations, 15 minutes each. The focus is the rethink, not the results. Bring what you have.

Experiment 1 results may be partial or preliminary. That is fine. Research rarely arrives on a clean schedule. What matters is that you have looked at whatever results exist and have genuinely thought about what they mean.

Each trainee presents:
- Experiment 1 results (5 min): what you ran, what you see so far, even if incomplete: one plot or table
- Rethink (5 min): what this has taught you, what you now suspect, what you want to test next
- Experiment 2 direction (3 min): rough hypothesis, rough conditions, why this follows from what you saw
- Group + supervisor response (2 min)

Questions the group and supervisor might ask:
- "What alternative explanation could produce this same result without your method contributing anything?"
- "What about the result actually forced the change in your rethink? Can you point to a specific number?"
- "Your two new papers. Did you find them before or after you decided on Experiment 2's direction?"
- "If Experiment 1 had gone the opposite direction, what would your Experiment 2 look like?"
- "If Experiment 2 also produces an inconclusive result, what is your contingency?"

The last two questions are the most diagnostic. A trainee who cannot answer "what if Experiment 1 had gone the other way" has not genuinely engaged with the result. They have written a rethink that was planned in advance.

The rethink is the most important deliverable of the capstone. A rethink that says "results went as expected, I will now run what I planned to run all along" is not a rethink. A genuine rethink changes something: the hypothesis, the conditions, the metric, or the output framing. That change is traceable to something specific you observed.

**Experiment 2 pre-registration:** by the end of the meeting or shortly after, each trainee commits a pre-registration for Experiment 2. The supervisor confirms the direction makes sense before major compute is spent.

### Between Week 13 and Week 14

**Experiment 2: run it.** Same discipline as Experiment 1: pre-registered conditions, 3 seeds, logged, results saved.

**Begin writing.** Start drafting during this week. Do not wait until Week 15. Even rough drafts of the method section and results section make the final writing much easier. The introduction and related work can come later, when the contribution is clear.

**Draft demo.** A working Streamlit or Gradio demo. Does not have to be polished. Has to run. Make it easy to find cases where the model fails, not just cases where it succeeds.

---

## 4. Week 14: Final presentations

### In-class meeting (120 minutes, extended)

**Format:** Final research talks, 20 minutes each (15 min talk + 5 min Q&A).

This is the final in-class meeting. Everything wraps here.

The talk structure:
1. What was the question and why it mattered (2 min)
2. What the Middle looked like and where the gap was (2 min)
3. Experiment 1: what you ran, what happened, what it taught you (3 min)
4. The rethink: why Experiment 2 differs from Experiment 1 (2 min)
5. Experiment 2: results, interpretation, what can be claimed (3 min)
6. Contribution: what is demonstrated by this work, and what is not (2 min)
7. Limitations and future work (1 min)

The Q&A should have at least one pointed question per presentation targeting the weakest part of the argument from the supervisor, RA, or other trainees.

**Supervisor's focus during Q&A:**
- "Your introduction claims X. Do your results actually support X, or only something weaker?"
- "Your related work does not mention paper Y. That is the closest related work. Why is it absent?"
- "You say your method is more robust. Robust under what conditions, compared to what? Rewrite to match the actual scope of your experiment."
- "The demo shows only successful predictions. Show me a failure case."

**Common problems to surface during Q&A rather than leaving to the report:**
- Overclaiming in the conclusion ("our method proves that...")
- Missing the most important baseline
- Related work that lists papers without engaging with what they found
- Results without error bars or seed variance

### Between Week 14 and Week 15

**No more experiments.** All experimental work is complete.

**Finish all writing** based on feedback from the Week 14 presentations:
- Abstract, introduction, related work, method, results, discussion, limitations, conclusion
- 6–8 pages, not counting figures and references
- Every number in the report must trace to a logged experiment with a seed and config

**Finalize the demo.** The demo runs cleanly from a fresh environment. The README explains what it does in 2–3 sentences.

**Reproducibility check.** Clone your repo into a fresh environment and follow the README from scratch. Can you reproduce your main result within 30 minutes? If not, fix it before submission.

---

## 5. Week 15: Final submission

No in-class meeting. Week 14 was the final presentation. Week 15 is the deadline for polished deliverables.

**Submit by end of Week 15:**

| Deliverable | Requirement |
|---|---|
| Final report | 6–8 pages, all sections complete and polished |
| Repository | Reproducible from clone to results; README covers setup in under 30 minutes |
| Demo | Streamlit or Gradio, runs from a fresh environment |
| Git tag | `v1.0` on final commit |

Use the week between Week 14 and the submission deadline to:
- Revise based on feedback received during Week 14 presentations
- Polish writing: tighten claims, fix limitations section, check that every number in the report traces to a logged experiment
- Verify reproducibility from scratch (clone the repo into a fresh environment and follow the README)
- Finalize the demo

**After Week 15:** any stretch goal work (manuscript formatting, publication prep) continues independently beyond the formal capstone period.

---

## 6. The meeting format across weeks 12–14

Every in-class meeting in the capstone follows the same structure: each trainee presents their current work to the group, and the group, including the supervisor and RA, responds.

This format serves several purposes that are harder to achieve in one-on-one supervision. When one trainee's rethink is identified as "this is just your next planned experiment, not a genuine response to the data," every trainee in the room recalibrates their own thinking. When the supervisor catches a framing problem at Week 12, the correction is visible to everyone, not just the one person whose framing was bounced.

The presentations also give the supervisor a clear picture of where each trainee is in relation to the others. Who is genuinely stuck? Who has momentum? Who is executing well but asking a question that turns out to be already answered in the literature? These patterns are easier to see when everyone's work is in the room at the same time.

The questions asked during presentations ("what would falsify this?", "what if Experiment 1 had gone the other way?", "does your introduction actually match what your results showed?") are questions you should eventually learn to ask yourself before the meeting. The goal is not to put anyone on the spot. It is to build the habit of anticipating criticism before it arrives, which is exactly what makes a researcher better over time.

---

## 7. What the supervisor and RA do

**Supervisor:**
- Week 12: leads framing approval, the highest-leverage activity of the capstone; catching a bad framing here saves weeks
- Week 13: leads discussion of rethink documents; helps trainees see what their results are actually showing
- Week 14: leads Q&A on final presentations; focuses on whether claims match evidence
- Between sessions: available for escalation when trainees are genuinely stuck; reviews pre-registrations before experiments run

**RA:**
- Checks that between-session work is ready to discuss before the meeting starts
- Runs timing and logistics during in-class meetings
- Stays available after Week 12 for trainees whose framings were bounced and need to revise
- Flags stuck trainees to the supervisor early. A trainee still setting up data pipelines in Week 13 needs a conversation, not patience

---

## 8. Deliverable summary

| Deliverable | When | Notes |
|---|---|---|
| Decomposition document (3-5 framings) | Bring to Week 12 | Written, ready to present and discuss |
| Literature check document | Bring to Week 12 | One triage table per framing |
| Experiment 1 pre-registration | After framing approved (Week 12) | Committed before first experiment run |
| Rethink document + 2 new papers | Bring to Week 13 | Partial results are fine; honest reflection required |
| Experiment 2 pre-registration | Agreed at or after Week 13 | Committed before Experiment 2 runs |
| Final presentation | Week 14 in-class | Research talk (15 min + 5 min Q&A) |
| Final report | Week 15 deadline | 6–8 pages, all sections |
| Final repository | Week 15 deadline | Reproducible, tagged `v1.0` |
| Final demo | Week 15 deadline | Runs from fresh environment |

---

## 9. Things that tend to go wrong

These are the most common ways capstone projects run into trouble. Knowing them in advance makes them easier to catch early.

**The rethink that is not a rethink.** Experiment 1 results arrive, and the trainee writes a "rethink" that restates what they planned to do all along. Experiment 2 looks identical to what they would have run regardless of what Experiment 1 showed. The diagnostic question: if Experiment 1 had gone the opposite direction, would Experiment 2 be different? If not, the rethink was written before the results were read, not after.

**Scope expansion at the end.** "I want to add one more experiment." Every experiment not in the pre-registration is extra, not required. Write it in the limitations as future work. The report will not be better for a third rushed experiment. It will be better for a more carefully analyzed second one.

**Writing that begins in the final week.** If the report is written from scratch in Week 15, it will be shallow and rushed. Write the method section during Experiment 1. Write the results section as experiments complete. Write the introduction when the contribution is clear. Week 15 is for polishing, not starting.

**Results without variance.** A single-seed result reported as "89.2%" tells the reader nothing about reliability. Every main result needs a standard deviation from at least 3 seeds. If the difference between conditions is smaller than the standard deviation, the result is inconclusive. Say so.

**A demo that only shows successes.** A demo designed to show only correct predictions is a marketing artifact, not a research tool. Build it so it is easy to find cases where the model fails. This is a sign of honesty, and it often reveals more interesting things than the successes do.

**Overclaiming.** "Our method proves that X universally holds." One project with one dataset in specific conditions demonstrates something about those conditions, not about the world in general. Replace "proves" with "suggests" or "demonstrates, on this dataset and under these conditions." This is not excessive modesty; it is accuracy.

**Hiding problems.** A trainee who discovers a serious data issue in Week 12 and mentions it for the first time in Week 14 has lost two weeks of potential help. Bring problems to the meeting as soon as they appear. That is what the meetings are for.

---

## 10. The stretch goal

The minimum capstone deliverable is a 6–8 page report, a reproducible repo, and a working demo. This demonstrates competent research execution.

For trainees whose projects produce clean results and clear contributions, the stretch goal is a manuscript formatted for submission to a local Indonesian conference venue (ICITISEE, ICITACEE, ISRITI, or similar SINTA 3–5 indexed venue). The supervisor will co-author and perform substantial revision after Week 15.

The stretch goal is not a requirement. It is an opportunity for trainees whose capstone work is strong enough to merit it. The supervisor will identify which projects are on this trajectory during Week 14.

---

*The decomposition template, pre-registration template, and report format are in the workshop handout. The rubric is in the separate assessment document.*
