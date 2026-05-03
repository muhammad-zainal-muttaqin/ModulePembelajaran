# Week 11 · Research Framing

> *A research question is not what you find in a dataset. It is what you bring to it.*

**Week:** 11
**Format:** In-class session (120 min) + between-session independent work
**In charge:** Supervisor + RA

---

## How this week fits

Week 11 is the transition from bootcamp to capstone. The technical skills are in place. This week is about learning to use them in service of a genuine research question. One that you formulated, one that you can defend, and one with a real gap, even a small one, that has not been filled.

**The weekly plan:**

| Phase            | When            | What                                                                      |
| ---------------- | --------------- | ------------------------------------------------------------------------- |
| In-class         | Week 11 session | Live decomposition example + template walkthrough + dataset assignment    |
| Between sessions | Week 11 → 12    | Decomposition brainstorm (3–5 framings) + literature check + shortlist    |
| In-class         | Week 12 session | Present framings + literature evidence + defend primary choice + approval |

This week's work feeds directly into Week 12. You arrive at Week 12 with a menu of 3–5 candidate framings, a literature check on each, and a proposed primary framing to defend.

---

## The front half of research

Weeks 1–10 taught the **back half** of research: given a defined problem, a defined dataset, and a defined task, how do you build a model, train it correctly, evaluate it honestly, and report the results with reproducibility? These are real and necessary skills. Without them, you cannot do research at all.

But they are not the whole of research. They are the execution half.

Week 11 begins the **front half**: given an open-ended situation. This could be a domain you care about, or a dataset you have access to. How do you arrive at a research question worth asking in the first place? How do you define the output, choose the input, sketch the pipeline, identify where the gap is, and verify that the gap is real and worth filling?

Most courses stop at the back half and assume the front half will be picked up by osmosis: by watching your supervisor, by reading enough papers until the instinct develops. Sometimes it does. Often it doesn't, and students spend years executing competently on questions that were poorly framed from the start.

This week makes the front half explicit. The decomposition framework, the framing menu, and the literature triage are not academic exercises. They are the actual process by which a research project begins.

---

## Our context

It is worth being direct about the constraints we work under, because the methodology this week is designed specifically for this kind of context.

We are a small lab in a regional university in Kalimantan. Funding is limited. The research team is small. Access to large compute clusters, to large annotated datasets, and to deep domain collaborators is constrained. We are not a fifty-person lab at a Tier 1 institution with a dedicated GPU cluster and a team of postdocs.

This is not an apology. It is the design brief.

The decomposition methodology, which involves generating multiple framings, checking them against literature, identifying genuine gaps, and scoping to what is executable, was developed precisely for this context. When resources are constrained, the highest-leverage activity is choosing the right question before spending any time on execution. A well-framed question on a small dataset produces publishable research. A poorly-framed question on a large dataset produces nothing worth publishing, regardless of how carefully the training loop is written.

The specific advantages of our context are real: local language data (Banjarese, Indonesian dialects), locally-relevant agricultural and health problems, underexplored domains where the literature gap is genuine rather than manufactured. These are not consolation prizes. They are research opportunities that well-funded labs in Jakarta or Singapore are not pursuing, because the problems are not visible from there.

The methodology this week is how you find and claim those opportunities.

---

## On expertise and the literature check

You will notice, as you gain experience over the coming years, that senior researchers move through the decomposition process faster than you do now. An experienced researcher looks at a dataset and quickly sees several promising framings. They also quickly dismiss others as obviously saturated or obviously trivial, without checking the literature for each one. The literature check, for them, is faster and more targeted because their prior reading has already built a map of what is known.

You do not yet have that map. That is not a criticism. It is simply where you are at this stage of your career, and it is the normal starting point.

The literature check is most important precisely because you are early in your research career. When you read the literature on your candidate framings, you will sometimes discover that what seemed like a novel idea is actually a well-studied problem with twenty recent papers. You will sometimes discover that a framing you were skeptical about has a genuine and unaddressed gap. Both of these discoveries would not have happened without the check. At this stage, the literature check is the mechanism that compensates for the intuition you have not yet built.

That intuition develops through practice: reading many papers, running many experiments, seeing which framings led somewhere and which didn't, building domain knowledge over time. The trainees who do the literature check diligently on every framing, rather than only on the ones they've already decided to pursue. These are the ones who develop the intuition faster. Skipping the check does not accelerate your development; it delays it.

Run it on every framing, even the ones that feel obviously promising. Especially those.

---

## The two phases: keep them separate

This week has two phases that must not be conflated:

**Phase 1: Decomposition (brainstorming).** Generate multiple candidate framings. Be creative. Produce 3–5 distinct candidates. Do not filter yet. Brainstorming while simultaneously checking the literature produces safe, obvious framings: the first thing that comes to mind, barely examined. Generate first, filter second.

**Phase 2: Literature check (filtering).** Take the candidates to the literature. Find out which are saturated, which need pivoting, and which have genuine gaps. 2–4 hours of literature triage can save weeks of wasted execution.

---

## Before we start: Do you have a research question?

Many students begin a project without a research question. They have a dataset and want to "do machine learning on it." This is not a research question. It is the precondition for one.

A research question has three parts:

| Part            | What it specifies                            |
| --------------- | -------------------------------------------- |
| **Subject**     | What entity or phenomenon are we studying?   |
| **Predicate**   | What do we want to know or predict about it? |
| **Answer type** | What would a satisfying answer look like?    |

What many students have at the start is something like this:

> "I have rice disease images and I want to classify them."

This names a dataset and a generic task. It does **not** yet specify what exact question is being asked, what comparison matters, or where the contribution could live.

Now consider the same broad topic, sharpened in three different ways:

**Framing A: output design**

> "On paddy leaf images captured in real field conditions, is coarse disease-family prediction `(fungal / bacterial / viral / pest / healthy)` more reliable than 13-class disease classification for early field triage?"

This changes the **Output**. The question is no longer just "can we classify?" but "which output framing is more useful and reliable for the intended decision?"

**Framing B: input design**

> "On paddy leaf images captured in real field conditions, does adding infrared input reduce confusion between visually similar disease classes compared with RGB-only classification?"

This changes the **Input**. The question is now whether an additional modality contributes meaningful information.

**Framing C: deployment-constrained design**

> "Can knowledge from a larger disease-recognition model be transferred into a lightweight field-deployable model without losing too much performance under lighting and background variation?"

This changes the **Middle**. The question is about prediction under a constraint that actually shapes the method.

The difference is not cosmetic. These are not three ways of saying the same thing. They are three different research questions with different outputs, different Middles, different baselines, different controls, and potentially different papers.

### Follow-up: one dataset does not imply one paper

This is one of the main lessons of this week: a dataset does not come with a single built-in research question.

The same topic or dataset can be framed through multiple legitimate angles:

- change the **Output** and you may get a different decision problem
- change the **Input** and you may get a different representation question
- change the **Middle** and you may get a different methodological gap
- keep the task but change the **constraint** and you may get a different contribution

Later in the workshop we will make this explicit: one dataset can support a menu of candidate framings, and a good researcher learns to compare them before writing code.

**Check:** before beginning any project, write one sentence that includes:

1. the entity being predicted about
2. what exactly is being predicted
3. what comparison, constraint, or decision makes the question interesting

If you cannot write that sentence clearly, you do not yet have a research question.

---

## The central idea: Input → Middle → Output

Every supervised ML problem can be described as a transformation:

```
INPUT  ──────────────────────────────────────▶  OUTPUT
       │                                    │
       │              MIDDLE                │
       │   (the component that does the     │
       │    mapping; may have multiple       │
       │    steps; may have gaps)            │
       └────────────────────────────────────┘
```

**The Input** is what the model receives at prediction time. It is a tensor, or several tensors, with a specific shape.

**The Output** is what the model produces. It is also a tensor, with a shape and semantics that correspond to the research question.

**The Middle** is what maps Input to Output. Some parts of the Middle are well-understood and have standard implementations. These correspond to rows on the Big Map. Other parts have no standard answer. These are the **gaps**, and the gaps are where research contributions live.

---

## Three questions, not steps

The framework has three questions, not a sequence of steps. Answer them iteratively; you will loop back.

---

### Question 1: What are you predicting, about what, from what?

This question asks you to define the **entity**, the **Output**, and the **Input**.

#### Entity: the unit of prediction

The entity is what one sample represents. You produce one prediction per entity.

Getting the entity wrong is one of the most common framing errors. It does not fail noisily; it fails silently, producing results that look reasonable but are measuring the wrong thing.

| Domain               | Possible entities                                          |
| -------------------- | ---------------------------------------------------------- |
| Disease detection    | One leaf image, one plant, one field visit                 |
| Activity recognition | One time window, one activity bout, one full day           |
| Wildlife monitoring  | One video frame, one animal tracklet, one camera-trap clip |
| Sentiment analysis   | One sentence, one review, one user session                 |
| Food recognition     | One dish image, one meal, one day of eating                |

Choosing the entity determines what "one sample" means, what the evaluation unit is, and who benefits from the result.

#### Output: what property of the entity are you predicting?

The Output is a tensor. Its shape encodes the research question.

| Output shape | Meaning                     | Example                           |
| ------------ | --------------------------- | --------------------------------- |
| `(1,)`       | One continuous value        | Nutrient content, severity score  |
| `(K,)`       | K continuous values         | Multiple nutrients simultaneously |
| `(N,)`       | Class scores over N classes | Disease type, species identity    |
| `(H, W)`     | Pixel-level map             | Segmentation mask                 |
| `(T, N)`     | Per-timestep class scores   | Token-level labeling              |
| `(T', 1)`    | Future sequence             | Glucose forecast curve            |

**Critical point:** the Output choice is a research design decision. The same entity and the same Input often support multiple Output choices, each leading to a different research problem.

#### Input: what information is available, and in what representation?

The Input is also a design decision. Multiple representations of the same real-world data are usually available.

| Entity                  | Possible input representations                                            |
| ----------------------- | ------------------------------------------------------------------------- |
| One rice leaf           | RGB image (smartphone), infrared image, hyperspectral image               |
| One day of wrist motion | Raw accelerometer `(T, 3)`, derived features `(K,)`, spectrogram `(F, T)` |
| One social media post   | Raw text `(T,)` tokens, character-level encoding, text + metadata         |
| One food dish           | RGB image, image + portion size estimate, image + textual description     |

Each representation has different acquisition cost, different information content, and different compatibility with Middle architectures.

#### The temporal and causal coherence check

Before proceeding: **would a deployed version of this model have access to the input at the moment it needs to make the prediction?**

This is the single most important validity check. If the answer is no, the framing is broken. This is not a tuning problem or an evaluation problem. It is a framing problem, and it cannot be fixed without reframing.

**Examples of failure:**

| Framing                                                                                 | Why it fails                                 |
| --------------------------------------------------------------------------------------- | -------------------------------------------- |
| Predict match outcome from full-match statistics                                        | Statistics computed from the completed match |
| Predict patient readmission from discharge notes that include "high readmission risk"   | The label is embedded in the input           |
| Predict employee promotion from tenure records when the promotion policy rewards tenure | Definitional leakage                         |
| Predict crop yield from end-of-season measurements                                      | The season is over before prediction is made |

**The fix is usually reframing, not more data.** The football problem is rescued by using only first-half statistics. The readmission problem is rescued by using only information available at the moment of the discharge decision. The entity and output stay the same; the input window changes.

---

### Question 2: What does the Middle look like, and where is the gap?

Once Input and Output are defined, sketch the pipeline that connects them.

#### Decomposing the Middle

Every step in the Middle transforms one tensor into another. Map each step onto the Big Map. Four cases arise:

**Case A: Single row fits cleanly.**
The entire Middle is one standard component. For example: paddy leaf RGB image → CNN → disease class. The research question is valid; the contribution is modest (if the task and dataset are already standard). May still be publishable if the question itself is novel (new domain, new language, new context).

**Case B: Chain of known rows.**
The Middle has multiple known steps in sequence. Each step is standard; the pipeline as a whole may not have been applied to this specific Input/Output combination. The contribution is the combination and its empirical validation.

**Case C: Known steps plus a gap.**
Some Middle steps are standard; one or more have no single fitting row. The gap is where novel research lives.

**Case D: No rows fit.**
The Input/Output pair has no existing ML solution at any level. This is rare. More often, case D means the Input/Output pair is poorly defined and needs revision.

#### Concrete examples by case

| Case                          | Example                                                                                                      | Why it fits                                                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| **A: Single row**            | One Banjarese sentence → fine-tuned IndoBERT → sentiment label                                               | Standard text classification. The method itself is not the contribution.                                        |
| **B: Chain of known rows**   | Restaurant menu photo + dietary profile → OCR → machine translation → text ranker → recommended dishes       | Each step is standard; the contribution is the assembled pipeline and its validation.                           |
| **C: Known rows plus a gap** | Four images of one palm tree → YOLO per image → cross-view matching / deduplication → per-class bunch counts | Detection is standard, but cross-view aggregation has no single standard answer.                                |
| **D: No rows fit**           | Camera-trap video → "forest ecosystem health"                                                                | Scientifically meaningful, but not yet a well-defined ML task with clear entity, output tensor, and evaluation. |

Notice that the boundary between B and C is often the most important one in research design. Many student projects look like Case C at first, but after careful inspection they are really Case B: a valid pipeline assembled from standard components, with little true methodological gap. That is not bad research, but it is different from claiming a novel method.

#### Locating the gap precisely

The gap is not just "we used a different method." The gap is a specific design choice with no settled answer in the literature. It could be:

- How to aggregate information across multiple views of the same entity
- How to align two modalities with different temporal resolutions
- How to inject knowledge from an expensive model into a cheap one without incurring the expense at inference
- How to construct a representation that is robust to a specific domain shift
- How to adapt a model to a new language with very few labeled examples

**Naming the gap precisely is the most important skill in research design.** A vaguely named gap ("we propose a better method") is not a research contribution. A precisely named gap ("we propose a method for aggregating per-image YOLO detections across multi-view captures without requiring camera calibration") is.

---

### Question 3: Is the gap real and worth filling?

#### Is the gap real? Literature as a filter, not a starting point

The literature check should happen **after** you have generated several plausible framings from decomposition, not before.

If you search too early, you search vague keywords and anchor on whatever papers you happen to find. If you search too late, you get attached to a framing that may be saturated or incoherent. The right sequence is:

1. Decompose the dataset into multiple plausible framings
2. Write each framing in one sentence
3. Run a fast literature triage on each framing
4. Delete saturated framings, pivot partially-done ones, keep the strongest candidate

A good decomposition stage does **not** output one final project immediately. It outputs a **framing menu**.

#### The framing menu

For one dataset, aim to produce **3–5 candidate framings**. Three is a useful minimum; more is encouraged if they are genuinely distinct.

For each candidate framing, write only enough detail to make it searchable and comparable:

- Entity
- Input
- Output
- Temporal/causal check: PASS / FAIL
- Rough Middle
- Likely gap

At this stage, the framing only needs to be clear enough to search.

#### The literature triage loop

Once you have the menu, run the following loop:

```
For each candidate framing:
  Generate 2-4 search queries
  Skim 5-10 abstracts maximum
  Classify:
    NOVEL          → keep
    PARTIALLY DONE → pivot
    SATURATED      → delete
```

This is not a full literature review. It is a **filter**.

**Search tools:** Google Scholar, Semantic Scholar, Connected Papers, Papers with Code.

**Saturation signals:**

| Signal                                                     | Interpretation                   |
| ---------------------------------------------------------- | -------------------------------- |
| 5+ recent papers on the exact same (Input, Output, domain) | Likely saturated → delete        |
| 1–2 foundational papers, limited recent follow-up          | Room exists                      |
| No direct hits, several adjacent areas                     | Likely a gap; verify carefully  |
| Same method but different population/language/constraint   | Your angle may still be distinct |

**Pivot moves when partially done:** if the literature has done something close, steer toward what it has not done.

| If the literature shows                | Pivot toward                              |
| -------------------------------------- | ----------------------------------------- |
| Method works on English                | Low-resource language version             |
| Method validated on standard benchmark | Deployment-constrained setting            |
| Method assumes plentiful labels        | Low-label or self-supervised version      |
| Two methods exist separately           | Systematic comparison or combination      |
| General-population study               | Specific subgroup (regional, demographic) |
| Method published 2020                  | Modern foundation-model version           |

**Deletion is healthy.** If a framing is clearly saturated, delete it and move to the next candidate. Sunk cost is the enemy.

#### What the literature stage should produce

The output of the literature stage should be:

- **1 primary framing:** the best current candidate
- **1 backup framing:** viable if the primary weakens after deeper reading
- **Deleted framings:** removed explicitly, with a reason (saturated / incoherent / infeasible)

Deletion means the filter worked.

#### Is the gap worth filling? Novelty types

Not all gaps are equally interesting.

**Stronger novelty:**

- New task: predicting something not predicted before on this kind of data
- New domain: applying an established method to a domain where it has not been applied
- Novel assembly: combining components in a well-motivated way that hasn't been tried

**Acceptable novelty, handle carefully:**

- Deployment constraint: existing method redesigned to work under a real-world constraint. Only valid if the constraint genuinely shapes the architecture.
- Local relevance: applying a method to an underrepresented context. Acceptable if the context has genuine gaps, not if the method is simply applied to a local dataset.

**Weak novelty: avoid:**

| Claimed novelty                                          | Why it fails                                                    |
| -------------------------------------------------------- | --------------------------------------------------------------- |
| Hyperparameter tuning                                    | Expected; not a contribution                                    |
| Applying an obscure method without motivation            | The field knows it; your discovering it does not change that    |
| "First study in Indonesia" for a globally solved problem | Local context alone is not sufficient                           |
| Better accuracy via standard method                      | Better accuracy is the aim; the method must be the contribution |
| Random method combination                                | Combination must be motivated: why this, what does it enable?   |
| Reproduction with minor variation                        | Only valid if framed explicitly as a reproduction study         |

**The "novel to me" trap.** Standard methods look new to students who have just learned them. They are not new to the field. Fine-tuning a CNN instead of training from scratch may be sensible as a baseline, but by itself it is not a research contribution. After completing the bootcamp, you should be able to distinguish "this is new to me" from "this is new to the field." The literature check enforces this distinction.

**The novelty check sentence.** For any proposed research, complete this sentence before proceeding:

> *"The existing literature has done X. Our work does Y, which differs because Z, and this matters because W."*

If you cannot complete all four slots clearly, you do not yet have a valid novelty claim.

#### Controls: how will you prove you filled the gap?

A working pipeline proves that a method works. It does not prove *why* it works. Controls make the why visible.

Every proposed contribution needs at least one control that could falsify it.

| Contribution claim                                           | Required control                                 |
| ------------------------------------------------------------ | ------------------------------------------------ |
| "Our new fusion method helps"                                | Late-fusion baseline without the method          |
| "The auxiliary supervision signal carries semantic content"  | Random signal of same dimensionality             |
| "Handcrafted features are competitive with learned encoders" | Both on same task, same data, matched evaluation |
| "Foundation model improves over non-pretrained baseline"     | Random-init baseline at matched parameter count  |
| "Our method works in low-label settings"                     | Same method at full labels                       |
| "Cross-lingual transfer outperforms local model"             | Local model trained on all available data        |

**Design controls before running experiments.** If you design controls only after seeing results, you are constructing a story around your results rather than testing a hypothesis.

*Note: the specific baseline selection and experiment matrix design happen in Week 12, after your framing is approved and you are committing to a specific experiment. Controls are identified here at the framing stage so you know your claim is testable. The exact experimental design comes later.*

---

## Live session: dataset decomposition

**[Placeholder: live session conducted by supervisor in class]**

The in-class session works through a real 2025 dataset together. The supervisor facilitates. Trainees generate framings, the supervisor probes and corrects. No pre-filled answers; the session is generative.

A separate facilitator guide exists for this session. Datasets used in previous sessions include the Wearable HRV + Sleep + Mental Health dataset (Scientific Data, 2025) and CAPTURE-24 (Scientific Data, 2024).

**Live board template (filled in during session):**

|                                        |     |
| -------------------------------------- | --- |
| Dataset chosen today                   |     |
| Initial instinctive task from the room |     |
| Candidate entities                     |     |
| Candidate outputs                      |     |
| Candidate inputs / representations     |     |
| Temporal or causal trap discovered     |     |
| Framing 1                              |     |
| Framing 2                              |     |
| Framing 3                              |     |
| Primary framing (after fast triage)    |     |
| Backup framing                         |     |
| Deleted framing + reason               |     |

---

## Workshop 1: Generate a framing menu

**Format:** Two groups: Group A (2 people), Group B (3 people). 20 minutes discussion.

Each group works on a different dataset. These datasets were chosen because they require almost no domain background. You can understand the data and start generating framings immediately.

- **Group A → Paddy Doctor** (see Problem A below)
- **Group B → NusaX** (see Problem B below)

Your goal is **not** to commit to one final project immediately. Your goal is to generate a **menu of 3 candidate framings** from your group's dataset.

For each candidate framing, write only enough detail to make it searchable and comparable:

```
Framing #N
- Research question (1 sentence)
- Entity
- Input
- Output
- Temporal/causal check: PASS / FAIL
- Rough Middle
- Likely gap
```

A good framing menu contains candidates that differ in a meaningful way. Change at least one of the following across your framings:

- entity
- output
- input representation
- deployment constraint
- gap in the Middle

Do **not** start coding. Do **not** lock yourself into one framing yet.

After Workshop 1, each group briefly presents their three framings to the room (5 min each). This is not a defense, just a quick share so both groups see each other's framing styles and the range of possibilities a single dataset can support.

---

## In-class datasets (Workshop 1 only)

Two datasets, one per group. Chosen for immediate accessibility; no specialist domain knowledge needed. Workshops 2 and 3 operate on the framings your group generates from these datasets.

### Problem A: Paddy Doctor (ACM 2023) [Group A]

**The dataset:** 16,225 annotated paddy leaf images across 13 classes (12 diseases and healthy leaf), collected from real paddy fields using a smartphone camera. Images captured under natural field lighting and backgrounds, not lab conditions. Includes a supplementary set of infrared images (under ongoing release). Southeast Asian crop; comparable conditions to Indonesian rice farming.

**The situation:** A student proposes: "I will use this dataset to classify paddy diseases using a CNN."

**Questions to answer in your group:**

1. What is the entity? (Leaf? Plant? Field? Farmer visit?) What changes depending on your choice?

2. The student's proposed output is "disease class." But look at the 12 disease classes: they include fungal diseases (Blast, Brown spot, Downy Mildew), bacterial diseases (Bacterial Leaf Blight, Bacterial Leaf Streak), pest-related (Hispa, Leaf Roller, various borers), and virus-related (Tungro). What other Output choices are possible on this same dataset? List at least three alternatives. Does any of them create a more interesting or more useful research question?

3. The student proposes CNN classification. Is there a gap in the Middle, or is the Middle entirely standard? If standard, is there still a valid research question? What would you change to introduce a genuine gap?

4. Does the proposed framing pass the temporal/causal check? When would this model be deployed, and what would the user need to do to use it?

5. Before searching, do you suspect that "paddy disease classification with CNN" is already saturated? If the literature later confirms that it is, what pivot would create a more interesting framing?

---

### Problem B: NusaX (EACL 2023, Outstanding Paper) [Group B]

**The dataset:** A high-quality parallel corpus covering sentiment analysis and machine translation across 12 languages: Indonesian, English, and 10 local Indonesian languages: Acehnese, Balinese, **Banjarese**, Buginese, Madurese, Minangkabau, Javanese, Ngaju, Sundanese, and Toba Batak. Human-translated and human-verified by native speakers. Two tasks: (1) sentiment analysis (positive / negative / neutral) per text, (2) machine translation between language pairs. Available on GitHub under CC-BY-SA.

**The situation:** A student says "I want to do sentiment analysis on Banjarese text using IndoBERT."

**Questions to answer in your group:**

1. Define the entity carefully. Is it one sentence? One review? One paragraph? Does the original dataset constrain your choice?

2. The student proposes sentiment classification (3 classes). What other Output choices are possible on this same dataset? Consider: translation quality estimation, cross-lingual transfer comparison, lexicon-based vs. model-based comparison, few-shot generalization to unseen languages.

3. The student's proposed Middle is: "fine-tune IndoBERT on Banjarese training examples." Is there a gap? Is this framing novel? Propose an alternative Middle where a genuine gap exists.

4. The dataset was built by translating from Indonesian. What does this imply about the relationship between Banjarese examples in the dataset and naturally occurring Banjarese text? Is there a potential validity issue? How might you address or study it?

5. NusaX covers 10 local languages. Most papers on this dataset study Indonesian or the highest-resource local languages. What framing angles does the **Banjarese-specific** data open that would be locally relevant and less saturated? (Note: Banjarese is spoken primarily in Kalimantan.)

---

## Workshop 2: Literature triage

**Format:** Individual or pairs, 15 minutes.

Take the **3 candidate framings** you produced in Workshop 1. Run a fast literature triage on each.

For each framing:

1. Generate 2–4 search queries from the framing
2. Skim 5–10 abstracts maximum
3. Classify the framing as **NOVEL / PARTIALLY DONE / SATURATED**
4. If partially done, write one pivot
5. If saturated, delete it explicitly

Use this table:

| Framing | 2–4 search queries | Classification | 1–2 papers or evidence | Pivot / delete reason |
| ------- | ------------------ | -------------- | ---------------------- | --------------------- |
| 1       |                    |                |                        |                       |
| 2       |                    |                |                        |                       |
| 3       |                    |                |                        |                       |

The point is not exhaustive review. The point is to practice filtering.

---

## Workshop 3: Selection and commitment

**Format:** Individual, 10 minutes.

Convert your framing menu plus literature triage into a decision.

Your output should be:

- **1 primary framing**
- **1 backup framing**
- **Deleted framings**, with reason for each

Then write one short paragraph for your primary framing:

```
For [entity], we predict [output] from [input].
This passes the temporal check because [...].
The likely gap is [...].
Closest related work has done [...].
Our framing differs by [...].
```

If you cannot write that paragraph clearly, the framing is not ready yet.

---

## Additional dataset bank for independent practice

The datasets below are for the home assignment, or for a second round of practice after the session. Each is described concisely. For each, you should be able to produce a full decomposition on your own.

---

### Dataset 1: CAPTURE-24 (Scientific Data, 2024)

**Description:** 3,883 hours of wrist-worn accelerometer data from 151 participants wearing devices continuously for at least 24 hours each in free-living conditions. Over 200 activity annotations per participant, covering leisure activities, sports, and occupational activities. Released 2024; the largest wrist-worn free-living activity dataset currently available.

**Decomposition prompts:**

- The entity is not obvious. The accelerometer records a continuous signal across a full day. Propose at least four different entity choices and explain what changes with each.
- List at least five different Output choices on this dataset. For each, sketch the output tensor shape. Which are regression? Classification? Sequence output?
- A common approach: extract hand-crafted features from each 30-second window, classify with a random forest. Sketch this Middle. Is there a gap? Propose an alternative Middle that includes a genuine gap.
- A student proposes: "Predict whether a participant will develop a health condition from their activity patterns." Does it pass the temporal/causal check? What specific information would you need to make it valid or invalid?
- The dataset has labels for 200+ activity categories. A clinician might only care about 4 coarse classes. A rehabilitation therapist cares about whether specific prescribed exercises were done. Each is a different framing. Pick one and fully specify: entity, input representation, output shape, and where the gap lies.

---

### Dataset 2: CDDM: Crop Disease Domain Multimodal (ECCV 2024)

**Description:** 137,000 images of crop diseases paired with 1 million question-answer pairs covering disease identification, symptom description, severity assessment, and management recommendations. Designed for visual question answering (VQA) and multimodal learning in agricultural settings. Fine-tuned VLMs (using LoRA) are the baseline approach. Available on GitHub.

**Decomposition prompts:**

- The original paper frames this as a VQA problem (image + question → free-text answer). Is that the only framing? What other (Input, Output) pairs exist on this data?
- A student says "I want to classify disease type from the images, ignoring the text." What has this student given up? What has this student gained?
- The image + QA pair creates a multimodal input. Sketch a Middle for predicting disease severity as a 4-level ordinal output from (image + structured question). Where is the gap?
- The temporal/causal check: if you were a farmer in the field, what information would you actually have, and what would you want to know?
- LoRA fine-tuning of a VLM is used as the baseline. What alternative Middle would be cheaper to deploy and still useful?

---

### Dataset 3: FastMRI Prostate (Scientific Data, 2024)

**Description:** 312 prostate cancer patients, biparametric MRI (T2-weighted + diffusion-weighted), with annotations for likelihood of prostate cancer at slice, volume, and exam level. Includes raw k-space data (uncommon; most medical datasets only release DICOM). 47,468 annotated slices from 1,560 volumes.

**Decomposition prompts:**

- Three annotation levels exist: slice-level, volume-level, exam-level. Each defines a different entity. What changes with each choice? Which entity makes the most clinical sense for screening, and why?
- The output "likelihood of prostate cancer" is stated. But is it a binary (cancer / no cancer), an ordinal (PI-RADS scale 1–5), or a continuous probability? Each is a different research question. What changes in the Middle for each Output choice?
- Most medical image datasets release only reconstructed images. This dataset includes raw k-space data. What new Input representations does raw k-space enable that DICOM images don't? What new Middle components does this require?
- A student proposes: "I will train a CNN on the MRI images to classify cancer." The temporal/causal check: at what point in the clinical workflow is a prediction needed, and what information is available? Does the framing pass?
- Biparametric means two MRI sequences (T2 + diffusion). What are the three possible Input choices regarding these two sequences? What Middle gap opens when you choose to use both?

---

### Dataset 4: SA-FARI (arXiv 2024)

**Description:** 11,609 camera trap videos from 741 locations across 4 continents, covering 99 species categories and approximately 10 years (2014–2024). Densely annotated with bounding boxes, segmentation masks, species labels, and animal identity tracklets (16,224 unique animal identities). Designed as a benchmark for multi-animal tracking (MAT). Long-tail species distribution: many species appear rarely. Released open-source by Conservation X Labs.

**Decomposition prompts:**

- The dataset was designed for multi-animal tracking. But tracking is not the only possible task. List at least five other (Input, Output) pairs on this data. For each, specify the entity, output shape, and what the result would be useful for.
- Conservation researchers care about population estimates, species health, behavior patterns, and poaching indicators. Map each of these real-world needs to a specific (Output shape, entity choice). Are these all feasible from camera trap video?
- A student says: "I will count animals per species per video." This sounds simple. What are the sub-problems in the Middle? Sketch the pipeline step by step. Which steps are on the Big Map, and which represent gaps?
- The long-tail distribution means some species appear in hundreds of videos, others in only one or two. This is not just a class-imbalance problem. It is a fundamental challenge for generalization. How does this shape the research question? What kind of Output framing would directly address the long-tail challenge?
- Camera trap videos have a large proportion of empty frames (no animal present). "Is any animal present?" is a binary classification problem. "If present, which species?" is a multi-class problem. "If present, how many?" is a counting/regression problem. These three can be chained or solved jointly. Sketch at least two different Middle designs for the joint problem and identify where each design's gap lies.

---

### Dataset 5: Indonesian Stand-Up Comedy Transcripts with Laughter Annotations (Data in Brief, 2025)

**Description:** 3,934 Indonesian stand-up comedy video transcripts from Kompas TV's YouTube channel, containing 2.8 million words and 17,394 annotated audience laughter events. Each entry includes video metadata, original transcript, cleaned transcript, laughter instance count, and timestamps. Text-only (no audio). Indonesian language. Released on Mendeley Data under CC-BY. A separate multilingual dataset (StandUp4AI, EMNLP 2025) covers multiple languages including Indonesian with audio and multimodal annotations.

**Decomposition prompts:**

- The annotation provides laughter events per video. What are at least four different Output choices given these annotations? For each, specify the shape and the entity.
- A student proposes: "I will train a classifier to predict whether a sentence is funny." This sounds like humor detection. Does it pass the temporal/causal check? What would the deployed system actually do, and who would use it?
- This dataset contains only transcripts. The original videos are on YouTube and include audio, visual, and performer gesture information. What new (Input, Output) framings become possible if you incorporate audio or video? What new Middle components would be required?
- "Laughter prediction" is a sequence-to-token problem: predicting which moment in a comedy performance will elicit laughter. Define this task formally: entity, Input shape, Output shape. What is the Middle? Is there a gap?
- Humor is culturally specific. This dataset is Indonesian stand-up comedy from a national television channel. What limitations does this impose on the validity of any learned model? Does cultural specificity make this more or less novel as a research angle?

---

### Dataset 6: AI4Food-NutritionDB (Multimedia Tools and Applications, 2024)

**Description:** 500,000+ food images organized into a 4-level hierarchical taxonomy derived from national and international health authority recommendations: 6 nutritional levels → 19 main categories (e.g., "Meat") → 73 subcategories (e.g., "White Meat") → 893 specific food products (e.g., "Chicken"). Constructed by aggregating 7 existing food image datasets (UECFood-256, Food-101, Food-11, FruitVeg-81, MAFood-121, ISIA Food-500, VIPER-FoodNet) under the unified taxonomy. Three benchmarked classification tasks: category-level (19 classes), subcategory-level (73 classes), product-level (893 classes).

**Decomposition prompts:**

- The dataset supports three classification granularities (19 / 73 / 893 classes). These are not just three versions of the same problem. They represent different research questions about different aspects of food recognition. What is a realistic downstream use case for each granularity? Does the use case determine the entity?
- The taxonomy has 6 nutritional levels that encode health-relevance information (e.g., "eat daily" vs. "eat rarely"). This nutritional level is not a classification label in the original benchmark, but it exists in the data. What new Output framing does this enable? What is the entity, output shape, and Middle?
- The dataset was built by recomposing 7 existing datasets under a common taxonomy. What does this mean for the distribution of the data? Are all 893 classes equally represented? What research angles does the recomposition itself create (hint: domain shift between source datasets)?
- A student wants to predict whether a food item is "healthy" (binary). This sounds straightforward. Does it pass the temporal/causal check? What are the definitional problems with this Output? How would you reformulate it more precisely?
- The dataset images are of food products (isolated items), not of composed meals or dishes. A real dietary tracker needs to handle a photo of a plate of mixed foods. What does this gap between dataset and real-world use create as a research angle?

---

## What counts as novelty and what does not

**Novelty types worth pursuing:**

| Type                    | What it means                                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| New task                | Predicting something genuinely not predicted before on this type of data                                            |
| New domain              | Applying an established method to a domain where it hasn't been applied                                             |
| Novel assembly          | Combining components in a well-motivated way that hasn't been tried, with a clear argument for why this combination |
| Deployment constraint   | Existing method redesigned to work under a real-world constraint that genuinely shapes the Middle                   |
| Novel Output definition | Reframing an existing dataset with a new Output that creates a different and more useful problem                    |

**Not novelty:**

| Claimed novelty                                                    | Why it fails                                                                                      |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Hyperparameter tuning                                              | Expected; not a contribution                                                                      |
| Applying an obscure method without motivation                      | The field knows it; your discovering it doesn't change that                                       |
| "First study in Indonesia" for a globally solved problem           | Local context alone is not sufficient                                                             |
| Better accuracy on an established benchmark, via a standard method | Better accuracy is the aim; the method must be the contribution                                   |
| Combining two methods at random                                    | Combination must be motivated: why this combination, what does it enable that neither alone does? |
| Reproducing a paper with minor variation                           | A reproduction study is valid only if framed explicitly as one                                    |

**The novelty check:** for any proposed research, complete this sentence before starting: *"The existing literature has done X. Our work does Y, which differs because Z, and this matters because W."* If you cannot complete all four slots, you do not yet have a valid novelty claim.

---

## Decomposition template (keep for reference)

```
RESEARCH QUESTION (one sentence: entity + predicate + answer type):

-- INPUT ----------------------------------------------------------
Entity:
Input representation (options considered):
Chosen input + justification:
Tensor shape:
Temporal/causal check: PASS / FAIL
  If fail: revised framing:

-- OUTPUT ---------------------------------------------------------
Output semantics:
Tensor shape:
Alternatives considered:

-- MIDDLE ---------------------------------------------------------
Step 1: [name]  →  Big Map row: YES / NO
Step 2: [name]  →  Big Map row: YES / NO
Step 3: [name]  →  Big Map row: YES / NO
Gap location: [which step has no standard answer?]
Gap description: [what exactly is unresolved?]

-- NOVELTY --------------------------------------------------------
Novelty type:
Closest related work:
What makes this framing distinct:
Novelty check: "The existing literature has done ___.
               Our work does ___, which differs because ___.
               This matters because ___."

-- LITERATURE -----------------------------------------------------
Classification: NOVEL / PARTIALLY DONE / SATURATED
Evidence (1–2 papers found, or lack thereof):
If partially done: pivot toward:
```

---

## Checklist: before presenting your framing at Week 12

**Problem definition:**

- [ ] Research question stated (entity + predicate + answer type)
- [ ] Entity explicitly chosen and justified
- [ ] Input representation explicitly chosen from multiple options
- [ ] Output shape and semantics specified
- [ ] Temporal/causal check passed

**Novelty:**

- [ ] Literature check run on all candidate framings
- [ ] Each framing classified (novel / partially done / saturated)
- [ ] Novelty type named for primary framing
- [ ] Novelty check sentence completed

**Middle:**

- [ ] Middle decomposed step by step
- [ ] Gap located precisely
- [ ] Case type identified (A / B / C / D)

**Framing menu:**

- [ ] 3–5 candidate framings produced (genuinely distinct)
- [ ] Primary framing identified with literature evidence
- [ ] Backup framing identified
- [ ] Deleted framings noted with reason

**If three or more boxes are unchecked, the framing is not ready to present.**

---

## Between Week 11 and Week 12

This is **individual work**. Each person works alone, even if they were in the same group during class.

### Choosing your dataset

You have three options. Choose one:

**Option 1: Continue from your in-class dataset.**
If your group's Workshop 1 framings looked promising, develop them further individually. You are not starting over. You are adding to what the group built. Generate at least 2 new framings of your own (beyond what the group produced), then do a thorough literature check on the full set. Your individual shortlist may overlap with your group's work, but it must be independently reasoned.

**Option 2: Choose a dataset from the additional bank.**
Pick any dataset from the additional bank above. Start fresh: generate your own 3–5 framings, run the full literature triage, produce your shortlist.

**Option 3: Bring your own dataset.**
If you already know which project you want to pursue (e.g., from the supervisor's funded project menu), you can work directly on that dataset. Same requirements: 3–5 framings, literature triage, shortlist.

Whichever option you choose, the output is the same: a set of candidate framings and a shortlist to present at Week 12.

---

### Phase 1: Decomposition brainstorm (3-4 hours)

Generate 3–5 candidate framings. Be creative. Produce genuinely distinct framings with different entity, different output, different Middle, different constraint. Do not consult the literature during this phase.

Use the decomposition template for each framing.

### Phase 2: Literature check (3-4 hours)

Run the triage loop on each framing. Classify, pivot, delete. Use the search tools and saturation signals from §3 above.

### Deliverable

Submit to the RA before Week 12:

1. Your decomposition document (all 3–5 framings using the template)
2. Your literature check table (one row per framing)
3. Your shortlist paragraph:
   - **Primary framing** (with novelty check sentence completed)
   - **Backup framing**
   - **Deleted framings** with reason for each

The RA reviews for completeness. The supervisor reviews for research quality at the Week 12 meeting. Come ready to present and defend your primary framing.

---

## Habit: reading papers with decomposition in mind

For every paper you read from now on, try to reconstruct the decomposition: what was the entity, Input, Output, Middle, and gap? Papers with clear decompositions are usually good papers. Papers where you cannot reconstruct the decomposition usually have weak framing.

When you eventually supervise others: require the decomposition template before any code is written. The discipline transmits by being enforced.

---

*Datasets referenced above are publicly available. Links and access details are in the session slide deck.*
