---
title: "Cheap Thought"
date: 2023-03-29T22:25:41-05:00
draft: true
---

Software engineering, the realm of bits, has long been organized around the idea that developing software is an expensive endeavor. Not only are software engineers costly, but code itself carries a certain _weight_. Once code is written, it must be maintained and extended. Bugs and migrations are costly mistakes, prompting us to adopt practices such as continuous integration (CI), test-driven development (TDD), and code reviews. These practices aim to identify issues as early as possible and shift development leftward.

Imagine a future where artificial intelligence, through autonomous agents or hyper-augmented humans, makes writing code (essentially, _thinking_) too cheap to meter. The realization may set in that most code is merely commoditized scaffolding. The true bottleneck becomes our understanding, the limit of complexity we can grasp and convey between humans and machines. Beneath the surface, a vast, dynamic structure of code and computation will support us.

This vision isn't so different from what we do today. Developers already stand on giants atop of titans, from foundational theory in managing data to practical open-source libraries that get the nitty-gritty work done. In larger companies, the developers working on the connective tissue we call infrastructure can match or dwarf the application developers that build for the actual end user. The key difference will lie in how we operate within this scaffold. Any part of the codebase resembling reusable glue will be generated on-demand from prior work. The pace of change will be breathtaking, with the ability to generate multiple possible modifications, test each in independent environments, and deploy immediately for users.

Like a fractal, we will learn to focus on the most significant idea at each level of the stack. What drives the core thesis of the company? What is the most meaningful improvement to our app? What is the most important task to accomplish today?

## SaaS At Risk

While AI-assisted programming intuitively shortens development cycles in general, it could prove highly disruptive for Software-as-a-Service (SaaS) companies, as it directly challenges the core aspects that make their business model appealing: operations and integration work.

In a previous [thread](https://twitter.com/cedricgc/status/1466206986769371136), I discussed why managed SaaS offerings are highly effective for development tools - while code can be open-sourced, effective operations of distributed systems cannot. Many customers are more than happy to pay for seamless solutions that they can plug into their stack. Likewise, achieving maintainable integration with the myriad of tools available is often difficult in-house and can be outsourced to a properly incentivized service.

AI-assisted programming chips away at both pillars. With AI-driven tools streamlining system setup, maintenance, and troubleshooting, the lower barrier to entry invites competition from new entrants in the market. Going further, this technology empowers organizations to develop custom solutions in-house, enabling teams to manage the integration workload while maintaining control over the product roadmap and priorities.
