---
title: "How CUE Wins"
date: 2021-02-20T00:27:14-08:00
tags:
  - configuration
  - CUE
  - cloud
---

We see plenty of configuration languages, but surprisingly one has not become the one true language that is used everywhere. Why is that? One would think writing out data structures by hand would not be that hard. Why not configure everything in JSON and call it a day? If JSON does not provide enough abstraction to do the job, why not pick a general programming language like Python? Not for a lack of effort, the industry has failed to standardize on a solution that we are satisfied with and move on.

I developed an answer while writing [The Configuration Complexity Curse](https://blog.cedriccharly.com/post/20191109-the-configuration-complexity-curse/) for [CUE](https://cuelang.org/docs/about/). I wanted to know why a configuration language like CUE did not succeed much earlier. Until recently, most organizations did not need particularly complex configuration to do their work. Exceptions exist (CUE's design comes from computational linguistics, where a human language is defined as a massive configuration), but it is the rise of cloud computing that made managing complex configuration a widespread need. I framed CUE intentionally in terms of working with cloud tools like Kubernetes and Terraform because I recognized the general interest and appetite for better workflows for infrastructure configuration.

Success as a configuration language is more than copying a programming language grammar without the Turing completeness. Previous iterations restrict developers in an attempt to be principled without giving commesurate advantage in return. This new environment is a vacuum that a new language can fill. Now that almost all organizations must grapple with complex configuration, CUE is positioned to match the challenge and scale across the industry. Critically, CUE delivers while staying principled. Configuration should be non-Turing complete! Developing a language is a series of trade-offs. Powerful CUE features such as the query engine, simplified code generation/modification, and more are viable after disallowing recursion. A good trade for a safer language on top of all that.

In the long term, CUE wins by achieving **ubiquity**. A configuration language that is widely used and integrated is the key to overcoming the (related) [Configuration Complexity Clock](http://mikehadlow.blogspot.com/2012/05/configuration-complexity-clock.html). The clock describes the cycle of managing application configuration from hardcoded values morphing into a full blown Domain Specific Language (DSL) and finally back to hardcoded as the custom DSL becomes cumbersome. Although DSLs are better suited for configuration, it is the surrounding context like debugging, tooling, and IDE support that is lacking and drives developers back to hardcoding so they have the benefit of a supported language. Again, building a language is *more than a syntax*. It is the workflows and integrations that make or break a language. In the future, CUE will be the new default because it best handles working in the domain of configuration data.

To be fair, building a language is no simple task. Building a ubiquitous language used by developers everywhere is an even heavier lift. But, CUE has the opportunity to be dominant because it is a configuration language. This is a key difference: if a programming languages are a classic network effect, configuration languages are a market.

## Configuration Is A Two-Sided Market

Programming languages benefit from network effects in multiple dimensions. The more users of the language, the more and better libraries, documentations, tutorials, etc. are available which attracts even more users. Once an organization has their core needs met (things like the development toolchain and core libraries) they are fairly independent. They can go off and do their own thing without caring what others do as long as they can build the desired software.

In contrast, configuration is not valued by itself. Configuration is closer to a contract or standard between users and software where the goal is to feed structured data to a program that does the useful work. Why does that matter? For a configuration language, success looks like making a market between users and tool developers. Each side wants access to the other as the reason to use a configuration language like CUE:

- Users want to be able to use CUE (with its powerful features and tooling) across multiple workflows
- Tool makers want their users using CUE if they are making the effort to support a configuration language

For example, a developer wants to configure their whole automation pipeline, involving Github Actions (CI), Terraform (infrastructure), Kubernetes (compute orchestration) and other tools.
