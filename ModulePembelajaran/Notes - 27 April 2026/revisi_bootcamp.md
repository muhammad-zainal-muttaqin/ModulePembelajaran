# Revision Concept for DL Research Bootcamp Plan (11 Weeks + 3-Week Capstone)

**Duration:** 14 weeks total  
**Structure:** 11-week bootcamp + 3-week capstone  
**Audience:** Research assistant trainees with prior exposure to ML/CV/NLP coursework, but uneven practical DL and research experience  
**Design goal:** Keep the accessibility and momentum of a shape-first, application-first bootcamp while preserving the most important deep learning rigor from the RA's more theory-heavy module

---

## Why This Revision Exists

This revision suggestion is built around one core judgment:

- **The current module is excellent at building rigor**, especially around loss, backpropagation, optimization, evaluation, experiment design, and reproducibility.
- **But it is somewhat front-loaded**, and some trainees may experience the first 4-6 weeks as cognitively dense before they have enough successful runs and concrete examples to anchor the ideas.

The solution is **not** to remove rigor. The solution is to **change when and how rigor appears**:

- Introduce deep learning through **task shapes, concrete model runs, and comparisons**
- Teach concepts like loss curves, overfitting, optimizer choice, leakage, and representation design through **examples first**
- Preserve non-negotiable research habits such as controlled comparisons, reproducibility, and falsifiable hypotheses
- Defer the heaviest theory from "entry gate" status into guided labs, optional depth, and appendix material

In short:

- **Application and mental map first**
- **Rigor early, but grounded in experiments**
- **Theory deepens after students have something real to interpret**

---

## Core Principles

Four principles guide the structure.

### 1. Big Map First

Students should quickly learn to ask:

> What tensor shape goes in, what shape comes out, and what family of models naturally fits that mapping?

This creates a coherent mental map across tabular data, images, text, sequences, and multimodal tasks.

### 2. Examples Before Heavy Abstraction

Some topics are easier to internalize from runs than from prose alone:

- reading loss curves
- recognizing overfitting
- comparing AdamW vs SGD
- understanding confusion matrices
- spotting temporal leakage
- seeing the difference between frozen features and fine-tuning

For these topics, students should first inspect a concrete example, then extract the pattern, then read the explanation.

### 3. Rigor Is Mandatory, But Selective

Not every deep theory topic must be a week-2 bottleneck. The plan keeps the high-value rigor items mandatory:

- output head and loss matching
- overfit-one-batch debugging
- reading training and validation curves
- change-one-thing-at-a-time comparisons
- config, seed, logging, and checkpoint discipline
- data inspection and leakage checks
- observation before interpretation
- pre-registration before capstone experiments

---

## Target Outcome: 60-70% Ready for Real Lab Topics

This bootcamp is **not** intended to make students fully expert in every research direction the lab may pursue. The target is more realistic and more useful:

> By the end of the bootcamp, students should be roughly **60-70% of the way** toward independent work on a real lab topic.

That means they should be able to:

- identify the task type and tensor-shape framing
- choose a reasonable baseline model family
- fine-tune or adapt an existing pretrained model or research repo
- design a small controlled comparison
- recognize suspicious training behavior
- inspect data and watch for leakage
- read papers in a structured way
- write a pre-registration and defend a falsifiable hypothesis

It does **not** mean they should already:

- know the domain literature deeply
- know the strongest baseline papers in each specialty
- understand every model internals at research depth
- solve deployment, distillation, or multimodal fusion problems from scratch
- independently design a publication-ready research agenda with no supervision

The remaining 30-40% is expected to come from:

- paper reading
- advisor guidance
- targeted repo adoption
- domain-specific debugging
- capstone and later independent study

This is the intended transition:

- **Bootcamp:** build the map, workflow, and habits
- **Capstone:** apply them in one bounded problem
- **RA research:** continue learning independently on real lab problems

## What This Plan Keeps from the More Rigorous Module

The following elements remain non-negotiable:

- Loss functions must be taught together with output heads and task type.
- Students must learn to diagnose training behavior using concrete loss and metric curves.
- `Overfit one batch` should become a standard debugging ritual.
- Controlled comparisons must be explicit: what changed, what stayed fixed, what metric matters.
- Reproducibility should arrive by Week 4, not near the end.
- Data inspection and leakage checks must be taught as part of modeling, not as a separate afterthought.
- Capstone work must be hypothesis-driven and pre-registered.

---

## What This Plan Deliberately Lightens Early

These are still valuable, but they should not block early progress:

- full manual backprop derivation
- long theory-first optimizer exposition
- full from-scratch Transformer internals for all students
- dense prose-heavy explanations before any runnable examples
- too many mandatory breadth tasks in the first month

These can still appear as:

- short guided demos
- optional notebooks
- appendix readings
- enrichment for stronger trainees

---

## High-Level Structure

| Phase                  | Weeks | Goal                                                                                       |
| ---------------------- | ----- | ------------------------------------------------------------------------------------------ |
| Bootcamp Foundation    | 1-4   | Build the big map, training fluency, loss/evaluation intuition, and reproducibility habits |
| Bootcamp Expansion     | 5-9   | Extend to sequences, text, foundation models, multimodal reasoning, and repo adoption      |
| Bootcamp Consolidation | 10-11 | Paper implementation, research framing, and capstone proposal                              |
| Capstone               | 12-14 | Run a scoped, reproducible mini research project                                           |

---

## Cross-Week Threads

To avoid making the bootcamp feel like ten disconnected topics, three threads should run across the full 10 weeks.

### 1. Big Map

Every week returns to the same question:

> What shape goes in, what shape comes out, and what family of models naturally fits the mapping?

The map should grow across the weeks so that students gradually see deep learning as one landscape rather than many unrelated techniques.

### 2. Research Practice

Every week introduces one research habit that stays active afterward. The bootcamp should feel cumulative, not reset every Monday.

A healthy progression is:

- Week 1: observation before conclusion
- Week 2: three-level smoke test and basic debugging sanity checks
- Week 3: change one thing at a time
- Week 4: reproducibility, traceability, and experiment matrix design
- Week 5: long-sequence diagnosis and architecture justification
- Week 6: preprocessing validation and leakage awareness
- Week 7: AI-assisted planning, coding-tool verification, tokenization inspection, and repo primer
- Week 8: model-card literacy, foundation-model selection, and adaptation choice
- Week 9: multimodal reasoning and per-modality ablation
- Week 10: paper reading and paper-to-code translation
- Week 11: literature-to-experiment synthesis and proposal defense

### 3. Representation Choice

A quieter but important thread should recur across multiple weeks:

> What representation am I using, and why this one?

This should appear in different forms:

- engineered features
- extracted frozen features
- learned task-specific representations
- foundation-model hidden states
- teacher-model supervision or auxiliary representations

This thread matters because many later research problems are really representation-selection problems disguised as architecture questions.

## Weekly Session Rhythm

Each week can follow a stable format:

| Segment                 | Duration | Purpose                                                            |
| ----------------------- | -------- | ------------------------------------------------------------------ |
| Prior-week findings     | 30 min   | Students share their last week's work/finding                      |
| New technical material  | 40 min   | Concepts + short live demo                                         |
| Rigor habit of the week | 10 min   | Explicit research habit tied to the assignment                     |
| Assignment walkthrough  | 40 min   | First steps done together; students continue independently at home |

---

## Dataset and Tool Strategy

The original training design was right to make datasets and tools part of the pedagogy, not just implementation details.

### Dataset strategy

- **Weeks 1-4:** shared datasets are preferable, so students can compare results on the same problem and debug together
- **Weeks 5-8:** students can branch into modality-appropriate or topic-adjacent datasets while preserving the same weekly concept
- **Weeks 10-11:** students should increasingly reuse earlier datasets or candidate capstone data, so selection and adaptation decisions become realistic

A good rule is that the bootcamp should introduce new task families deliberately, but should not force dataset novelty every single week when the main lesson is about workflow, adaptation, or comparison.

### Tool strategy

- early weeks can begin in a simple environment such as Colab or a clean local setup
- by Week 4 or 5, students should have seen a basic remote or GPU-backed workflow using **RunPod** or an equivalent lab-standard setup
- by Week 5 onward, students should be comfortable with pretrained-model ecosystems such as HuggingFace when relevant to the modality
- by Week 7 onward, students should be able to read and adopt an external repo without treating it as magic
- across the second half of the bootcamp, students should learn to move between three modes of work:
  - local exploration
  - structured experiment runs on a remote GPU environment
  - repo adoption and modification work on unfamiliar codebases

### Core tool competencies

By the end of the bootcamp, students should have practical familiarity with:

- **Claude Code / Codex / similar coding copilots** as research assistants for reading, editing, and scaffolding code
- **external GitHub or research repos** as starting points rather than obstacles
- **RunPod** as a realistic lab workflow for training runs that outgrow local or free-tier environments
- **git/GitHub workflow** for experiment traceability, repo adoption, and collaboration hygiene

### AI coding tool policy

AI coding tools may be used, but only under a verification and synthesis rule:

- students must be able to explain at least one block of generated code
- students must know what shape goes into a function and what comes out
- students should treat generated code as a draft to inspect, not a proof that something is correct
- students should learn when to ask Claude Code or Codex for scaffolding, debugging help, repo navigation, or refactoring support, and when to step back and reason manually
- for important decisions such as baseline choice, repo adoption strategy, or experiment design, students should be encouraged to gather **multiple AI or human views** and then write one consolidated plan before execution
- students should use AI not only for generation, but also for pre-execution review and post-execution/code review

This matters because the goal is accelerated understanding, not outsourced thinking.

---

## ## Bootcamp Coverage Check

A useful test for Weeks 1-10 is this:

> If a student is given a new research topic after the bootcamp, do they have enough foundation to read for 1-2 weeks, adopt a baseline, and begin a supervised experiment without starting from zero?

This plan is designed so the answer is **yes**.

By the end of Week 11, students should have encountered the following foundations:

### 1. Task Framing and Model Selection

Students should be able to:

- map a problem into input and output tensor shapes
- identify whether the task is classification, regression, sequence prediction, structured output, or multimodal
- choose a reasonable first baseline model family
- explain why that baseline is appropriate

### 2. Practical Training Loop Fluency

Students should be able to:

- work with tensors, batches, dataloaders, and train/validation/test splits
- run training and evaluation loops in PyTorch or an equivalent framework
- move between CPU/GPU environments without confusion
- inspect whether a model is actually learning

### 3. Core Deep Learning Rigor

Students should be able to:

- match output heads with the correct loss functions
- interpret training and validation curves
- use `overfit one batch` as a debugging test
- distinguish underfitting, overfitting, instability, and suspiciously strong results
- compare optimizers, regularization choices, and simple ablations without mixing too many variables at once

### 4. Evaluation and Error Analysis

Students should be able to:

- choose metrics appropriate to the task
- go beyond accuracy when needed
- inspect confusion matrices, per-class behavior, regression errors, or forecast errors
- look at failure cases rather than only headline numbers

### 5. Reproducible Experiment Practice

Students should be able to:

- use configuration files
- lock seeds
- keep run folders organized
- save checkpoints and logs
- record enough metadata to rerun an experiment later
- explain what changed and what stayed fixed in a comparison
- connect experiment results to specific git states or commit hashes

### 6. Data and Leakage Awareness

Students should be able to:

- inspect data before training
- recognize common leakage patterns
- understand why chronological splits differ from random splits in sequence data
- validate preprocessing assumptions instead of blindly trusting pipelines

### 7. Pretrained Models and Representation Choice

Students should be able to:

- fine-tune a pretrained model
- compare frozen versus trainable backbones
- think in terms of engineered, extracted, and learned representations
- understand that representation choice is often as important as architecture choice

### 8. Independent Learning, Tool Fluency, and Repo Workflow

Students should be able to:

- read one paper in a structured way
- navigate an external repo without panic
- use AI coding tools such as Claude Code or Codex with verification rather than blind trust
- move a project between local/Colab-style environments and a remote GPU workflow such as RunPod when needed
- build a lightweight research tool when it would materially help the workflow, such as a simple Streamlit demo, small annotation interface, or inspection app
- use basic git and GitHub workflow for research work: clone, branch, commit with meaningful messages, inspect diffs, and relate code changes to experiment changes
- write a falsifiable hypothesis and a short pre-registration

These are the foundations that make later topic-specific learning possible. The bootcamp does **not** need to pre-teach every specialized method students may eventually use. It only needs to ensure they have enough map, enough workflow fluency, and enough rigor to learn those methods independently afterward.

## The 11-Week Bootcamp

## Week 1 - Tabular Foundations and Output Heads

**Big Map row:** `(F,) -> (1,)`, `(1,)`, `(N,)`  
**Rigor habit:** Observation before conclusion  
**Dataset:** Shared tabular dataset that supports regression, binary classification, and multiclass classification

### Technical goals

- Understand the MLP as a shape transformer
- Learn the practical pipeline: tensors, batches, dataloaders, and train/validation/test splits
- See how the **same input** can support different output heads
- Learn loss-head matching:
  - regression -> linear head + MSE/MAE
  - binary classification -> sigmoid/logit setup + BCE
  - multiclass -> logits + cross-entropy
- Build confidence with a clean first end-to-end deep learning run

### Teaching style

This week should stay concrete. Backpropagation is introduced as the mechanism by which the model learns, but not yet as a derivation exercise.

### Assignment

Train an MLP on one shared tabular dataset in three task formulations:

1. regression
2. binary classification
3. multiclass classification

Students record:

- train loss
- validation loss
- one appropriate metric per formulation
- observations labeled as observation vs conclusion

### Deliverables

- three configs or three runs
- one short writeup distinguishing observations from interpretations
- smoke-tested template repo

---

## Week 2 - Images, CNNs, and Smoke-Test Ritual

**Big Map row:** `(C, H, W) -> (N,)`  
**Rigor habit:** Three-level smoke test  
**Dataset:** Shared image classification dataset, ideally the same dataset reused in Week 3

### Technical goals

- Understand image tensors and CNN intuition
- Build a baseline image classifier
- Introduce normalization, augmentation, and why train/validation behavior can diverge
- Compare from-scratch CNN to pretrained fine-tuning
- Learn the three-level smoke test ritual:
  - import test
  - dummy forward pass
  - overfit one batch

### Teaching style

This is where rigor starts appearing through practice. Rather than describing training failure patterns abstractly, the instructor should deliberately show:

- a run that learns
- a run that does not learn
- a smoke test that fails early
- a one-batch overfit sanity check

Students should experience why this ritual matters before reading a long explanation.

### Assignment

1. Train a simple CNN from scratch.
2. Fine-tune a pretrained CNN on the same data.
3. Perform the three-level smoke test and document where failure would be caught.

### Deliverables

- from-scratch baseline
- pretrained baseline
- smoke-test notes
- one-batch overfit result
- short note: when would you run each level of the smoke test again?

---

## Week 3 - Loss, Optimizer, Evaluation, and Reading Loss Curves

**Big Map row:** `(C, H, W) -> (N,)`  
**Rigor habit:** Change one thing at a time  
**Dataset:** Same image classification setup as Week 2

### Technical goals

- Interpret train/validation loss curves
- Compare basic optimizer behavior
- Introduce scheduler and regularization choices at a practical level
- Use confusion matrix and confident errors
- Understand why metrics beyond accuracy matter

### Teaching style

This week should be **example-first**.

Instead of starting with long theory paragraphs, start with a gallery of concrete runs:

- healthy convergence
- overfitting
- no learning
- unstable training
- noisy but improving run

Then ask students:

- What do you notice?
- What hypotheses do you have?
- What single change would you test first?

Only after that should the course summarize the pattern language.

### Assignment

Run a 3-condition ablation on the image classification setup. Good options:

- AdamW vs SGD
- pretrained vs scratch
- augmentation on vs off

Students must:

- declare what changed
- declare what stayed fixed
- interpret the resulting curves
- inspect confusion matrix and 10 confident mistakes

### Deliverables

- 3-condition comparison
- curve interpretation
- confusion matrix
- error analysis

---

## Week 4 - Reproducibility, Experimental Matrix, and Traceability

**Big Map row:** same modeling family, but now with research workflow discipline  
**Rigor habit:** Experimental matrix before coding  
**Dataset:** A different image dataset, so workflow discipline is tested beyond familiarity with the Week 2-3 data

### Technical goals

- Move hyperparameters into YAML config files
- lock seeds
- log experiments systematically
- save checkpoint metadata and understand basic resume-from-checkpoint logic
- understand why git hash, config copy, and metrics log matter
- introduce basic experiment matrix design and simple git hygiene for experiments
- introduce the point at which a run should move from local or Colab-style execution to **RunPod** or another remote GPU workflow
- make explicit the discipline that every reported number should trace to a specific run
- introduce git discipline for experiments: branch or commit before meaningful changes, inspect diffs, and log the code state connected to a run

### Teaching style

This week is where research practice becomes explicit. Students should feel that they are not just training models, but learning how to make runs interpretable, repeatable, and traceable.

### Assignment

Before running, students write a short pre-registration for one comparison on the new dataset. They then refactor the comparison into a reproducible experiment structure with:

- config files
- fixed seeds
- run folders
- TensorBoard logs
- metrics table
- checkpoint metadata
- one traceable summary table where each reported number points back to a specific run
- at least one clean commit or branch checkpoint associated with the experiment setup

### Deliverables

- reproducible experiment on the second image dataset
- per-run config and logs
- short experiment matrix table
- `prereg.md` or equivalent pre-registration note
- traceability note: every reported number points to a specific run folder
- short git note: which commit or branch corresponds to the reported experiment state

---

## Week 5 - Sequences and Recurrent Models

**Big Map row:** `(T, F) -> (1,)`, `(N,)`, `(T'', 1)`  
**Rigor habit:** Long-sequence diagnosis and architecture justification  
**Dataset:** Shared or semi-shared sequence dataset where long-range behavior is visible

### Technical goals

- understand sequence inputs and multiple output-head families
- distinguish regression, classification, and forecasting over sequences
- introduce recurrent sequence models in their natural form:
  - vanilla RNN
  - LSTM or GRU
- make vanishing gradient concrete through a direct comparison
- understand why a model family choice is tied to sequence length and dependency structure

### Teaching style

This week should make one difficult idea visible rather than merely stated: why vanilla RNNs struggle on long sequences. Students should see a concrete contrast between a vanilla recurrent model and an LSTM/GRU on a task where long-range information matters.

### Assignment

1. Train a vanilla RNN and an LSTM/GRU on a long-sequence task.
2. Compare performance and training behavior.
3. Visualize gradient flow or another diagnostic that makes the long-sequence problem concrete.
4. State which output shape family the task belongs to and why.

### Deliverables

- RNN vs LSTM/GRU comparison
- gradient-flow or long-sequence diagnostic plot
- short note on why the chosen sequence architecture is justified
- one clear statement of the task's input/output shape mapping

---

## Week 6 - Representations and Temporal Leakage

**Big Map row:** `(T, F) -> (1,)`, `(N,)`, `(T'', 1)`  
**Rigor habit:** Validate preprocessing and prevent temporal leakage  
**Dataset:** Sensor or time-series dataset, ideally one where handcrafted features are still plausible competitors

### Technical goals

- compare handcrafted features to learned sequence representations
- make representation choice explicit in a domain where it matters
- teach temporal leakage using a concrete broken example
- understand causal feature construction as a research obligation, not a convenience

### Teaching style

This week should make two things vivid:

- handcrafted features can still be competitive
- a leaky pipeline can produce very attractive but false numbers

The leakage demonstration should be dramatic enough that students remember it.

### Assignment

1. Build at least one causal handcrafted feature pipeline.
2. Compare a handcrafted-feature baseline against a learned sequence model.
3. Deliberately break causality in one feature or preprocessing step.
4. Show the inflation in results and explain why it is invalid.

### Deliverables

- handcrafted vs learned representation comparison
- causal vs leaky result table
- documented preprocessing checks
- short note: what made the leaky result look convincing, and why is it still wrong?

---

## Week 7 - Text with Pretrained Transformers and Repo Adoption Primer

**Big Map row:** `(T,) -> (N,)`, `(1,)`, `(T, N)`  
**Rigor habit:** Verify AI-generated code, inspect tokenization, and map external repos  
**Dataset:** Per-student or shared Indonesian text dataset

### Technical goals

- move from classical text features to pretrained transformers
- understand tokenization and sequence-to-vector flow
- compare frozen vs fine-tuned text models
- compare pooling strategies such as `[CLS]` vs mean pooling
- practice using Claude Code, Codex, or a similar tool to inspect, scaffold, or debug model-training code under a verification rule
- introduce repo adoption in a lightweight way through `repo_map.md` or equivalent model/repo mapping
- practice a minimal GitHub workflow: clone or fork, branch for a modification, inspect diffs, and summarize the change clearly

### Teaching style

This week should explicitly bridge from prior text-mining experience:

- show where TF-IDF works
- show where it fails
- show why contextual representations help

This keeps the material from feeling like a hard mode jump into HuggingFace.

### Assignment

1. Run a 2x2 comparison such as:
   - frozen encoder vs fine-tuning
   - `[CLS]` pooling vs mean pooling
2. Inspect tokenizer behavior on real samples.
3. Produce a short `repo_map.md` or model-map for the main transformer codebase or library path you rely on.
4. Make one small change in a branch or isolated git state and inspect the diff before trusting it.
5. Write a short synthesis note comparing at least two AI-assisted suggestions or readings before execution.

### Deliverables

- 2x2 text experiment matrix
- tokenization inspection examples
- macro-F1 or another task-appropriate metric
- one-paragraph representation comparison
- `repo_map.md` or equivalent model/repo map
- short git/GitHub note on the modification branch or diff inspected
- short synthesis note comparing at least two AI-assisted suggestions or readings before execution

---

## Week 8 - Foundation Models

**Big Map row:** any input with pretrained priors  
**Rigor habit:** Model-card literacy, adaptation choice, and fair baseline selection  
**Dataset:** Reuse one prior dataset so students can compare a foundation-model approach against an earlier baseline

### Technical goals

- understand what makes a model a useful foundation model in practice
- build a taxonomy across modalities:
  - text
  - vision
  - vision-language
  - audio
  - time series
  - multimodal and domain-specific families
- distinguish usage patterns:
  - frozen feature extraction
  - LoRA or other adapters
  - full fine-tuning
  - teacher-model or training-time supervision use
- learn how to read a model card and original paper critically
- understand why the same foundation-model family can be used differently depending on compute, data, and task constraints

### Teaching style

This week should connect directly to real research practice. Students should not leave thinking foundation models are a list of brand names; they should leave with a mental model for choosing one, adapting one, or rejecting one.

### Assignment

1. Take one dataset from an earlier week.
2. Select one relevant pretrained or foundation model baseline.
3. Ask at least two independent AI or human-assisted views for model-selection reasoning or adaptation strategy.
4. Compare at least two or three usage strategies, for example:
   - frozen features vs LoRA/adapters vs full fine-tuning
   - small baseline vs foundation-model baseline
   - generic pretrained model vs domain-adjacent pretrained model
5. Read one paper or model report using the three-pass method.
6. Write a short selection note: why this model was chosen, what assumptions it brings, what its limitations are, and why alternative suggestions were rejected.
7. Build a short foundation-model map for 3-4 models, listing:
   - modality
   - pretraining source
   - downstream role
   - adaptation mode
   - whether it could be used as a teacher model during training only

### Deliverables

- 2-condition or 3-condition comparison involving a foundation-model baseline
- structured paper or model-report notes
- short model-selection memo
- foundation-model map for 3-4 models
- reflection: when is a foundation model genuinely helpful, and when might it be unnecessary or misleading?

---

## Week 9 - Multimodal Modeling with Sensors and Repo Adoption Practice

**Big Map row:** multiple tensors -> shared prediction  
**Rigor habit:** Per-modality ablation and multimodal failure analysis  
**Dataset:** Multimodal dataset, ideally including at least one sensor or temporal component plus a second modality

### Technical goals

- understand common multimodal fusion strategies:
  - late fusion
  - early fusion
  - cross-attention or interaction-based fusion
- detect the ignored-modality failure mode
- reason about missing modalities and practical fallback strategies
- reason about temporal alignment across modalities when streams and events do not line up naturally
- practice repo adoption again on a multimodal or less tidy codebase

### Teaching style

This week should stay practical. The point is not to survey all multimodal literature, but to make students confront the real questions that arise as soon as multiple modalities are involved:

- is the model actually using both modalities?
- what happens if one modality is missing?
- how are static and temporal signals aligned?

### Assignment

1. Reproduce a multimodal baseline or adopt a multimodal repo.
2. Run a per-modality ablation: train or evaluate without each modality.
3. Document whether the model appears to ignore one modality.
4. Analyze one missing-modality strategy or fallback plan.
5. Produce a second `repo_map.md`-style reading on this different repo style.
6. If feasible, build a tiny demo or inspection interface, but treat this as a short practical skill rather than the main topic.

### Deliverables

- multimodal baseline or reproduced repo result
- per-modality ablation result
- short note on missing-modality handling
- short note on temporal alignment assumptions
- second repo map or multimodal system map

---

## Week 10 - Paper Reading and Paper Implementation

**Big Map row:** synthesis through research artifacts  
**Rigor habit:** Three-pass paper reading and paper-to-code translation  
**Dataset:** Student uses a curated paper menu and applies the core method to either their own data or a provided compatible dataset

### Technical goals

- learn the three-pass paper reading method in a way that leads directly to implementation
- translate a paper into a minimal runnable core method
- distinguish what in a paper is essential versus optional engineering detail
- run one small ablation or stress test rather than only reproducing blindly

### Teaching style

This week should train a skill many students lack even after reading several papers: turning a research description into working code and a fair first experiment.

### Assignment

1. Choose one paper from a curated menu.
2. Perform a three-pass read.
3. Produce structured notes.
4. Implement the paper's core method or one clearly scoped component.
5. Apply it to your own data or a compatible dataset.
6. Run one ablation or comparison.

### Deliverables

- structured three-pass paper notes
- implementation of the core paper idea or method component
- one small ablation or comparison
- short note: what in the paper was harder to operationalize than it first appeared?

---

## Week 11 - Research Framing, Baseline Selection, and Capstone Proposal

**Big Map row:** consolidation  
**Rigor habit:** 5 Whys, literature-to-experiment translation, and proposal defense  
**Dataset:** No brand-new dataset required; students should work from candidate capstone data, prior bootcamp datasets, or a paper/model family they may realistically continue

### Technical goals

- move from topic interest to falsifiable question
- translate one or two papers or model reports into a realistic first experiment
- justify a baseline choice rather than choosing one by name recognition alone
- define a manageable capstone scope
- write a one-page proposal before capstone begins

### Activities

- review the paper/model log accumulated in earlier weeks
- conduct a 5 Whys exercise
- extract from a paper or model report:
  - the claim
  - the baseline
  - the intervention
  - the metric
  - the simplest faithful experiment
- gather multiple independent views on the proposed project, for example from two AI tools, two prompting styles, or one AI view plus one peer/instructor critique
- synthesize those views into one human-owned capstone plan
- define the capstone experiment matrix:
  - baseline
  - main intervention
  - one focused ablation
  - metric set
  - seed plan
  - expected runtime/cost
- run a pre-execution review:
  - fairness of comparison
  - hidden assumptions
  - missing dependencies
  - likely failure points
- write a short feasibility and risk note:
  - data risks
  - repo or dependency risks
  - compute risks
  - fallback baseline if the preferred plan fails
- present the plan in a short oral defense and receive pushback before capstone starts
- write capstone pre-registration

### Deliverables

- one-page approved capstone proposal
- pre-registration document
- baseline selection memo
- experiment matrix
- feasibility/risk memo
- short synthesis memo showing how multiple views were consolidated
- short oral defense or proposal review

---

## The 3-Week Capstone

The capstone is intentionally short and scoped. It should feel like a serious mini research cycle, not a thesis.

The healthy default is:

- one dataset
- one baseline
- one primary intervention
- one focused ablation
- three-seed comparisons where feasible

---

## Week 12 - Scope, EDA, Baseline, and Reproducible Setup

### Goals

- finalize capstone scope
- inspect data properly
- establish a baseline that can actually run
- put reproducibility discipline in place from the start

### Required outputs

- `prereg.md`
- `eda.md`
- baseline config
- first reproducible baseline run

### Questions to answer

- What exactly is the task?
- What is the baseline?
- What metric matters most?
- What would count as support or failure for the hypothesis?

---

## Week 13 - Main Experiment and Focused Ablation

### Goals

- run the main intervention
- include one focused ablation that helps interpretation
- compare against the baseline cleanly

### Required outputs

- baseline vs intervention comparison
- one ablation or representation comparison
- curves, metrics, and interpretation draft

### Questions to answer

- Did the intervention help?
- Is the effect large enough to matter?
- What is the most plausible explanation?

---

## Week 14 - Analysis, Report, Demo, Presentation

### Goals

- synthesize the findings honestly
- communicate clearly
- deliver a usable final artifact

### Required outputs

- final report
- reproducible repo
- demo if appropriate
- final presentation

### Questions to answer

- What was learned?
- What did not work?
- What is the next experiment, if the project continued?

## Recommended Capstone Deliverables

At minimum, each student should produce:

- a reproducible project repo
- a 6-8 page report
- one short presentation
- a demo if the task benefits from one

The report should include:

1. problem and motivation
2. data and EDA
3. baseline
4. intervention
5. results
6. error analysis
7. conclusion and next steps

---

## Suggested Assessment Lens

Assessment should emphasize research maturity, not just final numbers.

The most useful lens remains:

- **Curiosity** - asks good questions, notices anomalies
- **Rigor** - controls variables, logs properly, interprets carefully
- **Skepticism** - checks data, distrusts suspiciously strong results
- **Ownership** - understands and can explain what was built

Students should not be rewarded merely for a large positive result. They should be rewarded for:

- honest experiment design
- reproducibility discipline
- correct interpretation
- thoughtful next steps

---

## Summary of the Hybrid Philosophy

This hybrid (revised) plan aims to preserve the best of both approaches:

- from the application-first plan, it keeps momentum, the big map, pretrained-model fluency, breadth, and realistic RA preparation
- from the rigor-heavy plan, it keeps loss/evaluation discipline, debugging habits, reproducibility, experiment design, data validation, and hypothesis-driven work

The main pedagogical shift is simple:

> Teach the difficult ideas through runs, comparisons, and examples first, then attach the deeper theory once students have something concrete to interpret.

That keeps the depth, but reduces the chance that students bounce off the course before they experience success.
