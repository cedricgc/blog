---
title: "Cheap Thought"
date: 2023-04-07T22:25:41-05:00
description: "How AI-enabled coding will disrupt SaaS businesses and shift value toward data, hyperpersonalization, and user attention."
summary: "When AI makes writing code too cheap to meter, software economics fundamentally change. SaaS moats weaken as value shifts to data and hyperpersonalized experiences."
tags:
  - Artificial Intelligence
  - Business
---

Software engineering, the realm of bits, has long been organized around the idea that developing software is an expensive endeavor. Not only are software engineers costly, but code itself carries a certain _weight_. Once code is written, it must be maintained and extended. Bugs and migrations are costly mistakes, prompting us to adopt practices such as continuous integration (CI), test-driven development (TDD), and code reviews. These practices aim to identify issues as early as possible and shift development leftward.

Imagine a future where artificial intelligence, through autonomous agents or hyper-augmented humans, makes writing code (essentially, _thinking_) too cheap to meter. The realization may set in that most code is merely commoditized scaffolding. The true bottleneck becomes our understanding, the limit of complexity we can grasp and convey between humans and machines. Beneath the surface, a vast, dynamic structure of code and computation will support us.

This vision isn't so different from what we do today. Developers already stand on giants atop of titans, from foundational theory in managing data to practical open-source libraries that get the nitty-gritty work done. In larger companies, the developers working on the connective tissue we call infrastructure can match or dwarf the application developers that build for the actual end user. The key difference will lie in how we operate within this scaffold. Any part of the codebase resembling reusable glue will be generated on-demand from prior work. The pace of change will be breathtaking, with the ability to generate multiple possible modifications, test each in independent environments, and deploy immediately for users.

Like a fractal, we will learn to focus on the most significant idea at each level of the stack. What drives the core thesis of the company? What is the most meaningful improvement to our app? What is the most important task to accomplish today?

## SaaS At Risk

While AI-assisted programming intuitively shortens development cycles in general, it could prove highly disruptive for Software-as-a-Service (SaaS) companies, as it directly challenges the core aspects that make their business model appealing: operations and integration work.

In a previous [thread](https://twitter.com/cedricgc/status/1466206986769371136), I discussed why managed SaaS offerings are highly effective for development tools - while code can be open-sourced, effective operations of distributed systems cannot. Many customers are more than happy to pay for seamless solutions that they can plug into their stack. Likewise, achieving maintainable integration with the myriad of tools available is often difficult in-house and can be outsourced to a properly incentivized service.

AI-assisted programming chips away at both pillars. With AI-driven tools streamlining system setup, maintenance, and troubleshooting, the lower barrier to entry invites competition from new entrants in the market. Going further, this technology empowers organizations to develop custom solutions in-house, enabling teams to manage the integration workload while maintaining control over the product roadmap and priorities.

## Hyperpersonalization

An intuitive conclusion of projecting AI development into the future is that the marginal cost of writing software trends towards zero. But, it is worth examining the specific risks posed to the SaaS business model: the reduced barrier to entry not only fuels competition but also weakens the core moats that render pure software businesses defensible.

Where does value accrue in a disrupted world? I think it plays out like this:

Focus shifts to data storage and representation...
Enabling the creation hyper-personalized user experiences...
Ultimately to attract and retain valuable user attention

Data is valuable, aptly referred to as "digital gold" by many. However, the affordability of AI-powered processing implies that any data sent to another machine will likely be scraped and repurposed. Consequently, data will be even more precious, requiring security measures to mitigate risks while the pressure to collect personal information will decline in hand with the reliance on centralized software services.

While personal data is quite valuable, abundant code is not. As mentioned earlier, a mere fraction of software contributes to a company's unique value proposition, with the majority of code relegated to the indistinct realm of "infrastructure." While infrastructure supports innovative applications, intense competition is likely to promote widespread standardization in pursuit of fast execution. If the code does not advance a company's core mission, it makes sense to entrust AI with its management in the most cost-effective and maintainable manner.

Where does our focus go? We write software to enable users. We design systems that can be used by many people at once, as creating custom software for each person would be impractical. But with AI, we can imagine a world where UIs are generated on demand based on the specification of the data and learned preferences of the user. When retaining each marginal user vs the competition is critical, companies will be willing to build the systems and expertise needed to deeply understand each user and create experiences they cannot find anywhere else.

## Conclusion

The key message of this essay is that AI-enabled coding fundamentally alters the dynamics of software economics. In its place, companies compete to create novel experiences deeply tailored to each user.

Although navigating the change will be challenging, I think we have an exciting future where software is designed to be an extension of will. We make tradeoffs and accept drudgery because it would be infeasible to automate, integrate, and customize our work to the level where the human in the loop is truly doing the most meaningful work. AI holds the potential to create a future where we can have our cake and eat it too.

There is more to say on how we develop software with AI-enabled programming. An upcoming post, Hyperstandardization, will explore how to think about infrastructure vs application code, the mechanics of hyper-standardized development, and why we will see many more protocols.
