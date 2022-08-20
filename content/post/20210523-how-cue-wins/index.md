---
title: "How CUE Wins"
date: 2021-05-23T00:27:14-08:00
tags:
  - configuration
  - CUE
  - cloud
---

We see plenty of configuration languages, but surprisingly one has not become the one true language that is used everywhere. Why is that? One would think writing out data structures by hand would not be that hard. Why not configure everything in JSON and call it a day? If JSON does not provide enough abstraction to do the job, why not pick a general programming language like Python? Not for a lack of effort, the industry has failed to standardize on a solution that we are satisfied with and move on.

I developed an answer while writing [The Configuration Complexity Curse](https://blog.cedriccharly.com/post/20191109-the-configuration-complexity-curse/) for [CUE](https://cuelang.org/docs/about/). I wanted to know why a data configuration language (DCL) like CUE did not succeed much earlier. Until recently, most organizations did not need particularly complex configuration to do their work. Exceptions exist (CUE's design comes from computational linguistics, where a human language is defined as a massive configuration), but it is the rise of cloud computing that made managing complex configuration a widespread need. I framed CUE intentionally in terms of working with cloud tools like Kubernetes and Terraform because I recognized the general interest and appetite for better workflows for infrastructure configuration.

Success as a configuration language is more than copying a programming language grammar without the Turing completeness. Previous iterations restrict developers in an attempt to be principled without giving commensurate advantage in return. This new environment is a vacuum that a new language can fill. Now that almost all organizations must grapple with complex configuration, CUE is positioned to match the challenge and scale across the industry. Critically, CUE delivers while staying principled. Configuration should be non-Turing complete! Developing a language is a series of trade-offs. Powerful CUE features such as the query engine, simplified code generation/modification, and more are viable after disallowing recursion. A good trade for a safer language on top of all that.

In the long term, CUE wins by achieving **ubiquity**. A configuration language that is widely used and integrated is the key to overcoming the (inspired) [Configuration Complexity Clock](http://mikehadlow.blogspot.com/2012/05/configuration-complexity-clock.html). The clock describes the cycle of managing application configuration from hardcoded values morphing into a full blown Domain Specific Language (DSL) and finally back to hardcoded as the custom DSL becomes cumbersome. Although DSLs are better suited for configuration, it is the surrounding context like debugging, tooling, and libraries that is lacking and drives developers back to hardcoding so they have the benefit of a supported language. Again, building a language is *more than a syntax*. It is the workflows and integrations that make or break a language. In the future, CUE will be the new default because it best handles working in the domain of configuration data.

To be fair, building a language is no simple task. Building a ubiquitous language used by developers everywhere is an even heavier lift. But, CUE has the opportunity to be dominant because it is a configuration language. This is a key difference: if a programming languages are a classic network effect, configuration languages are a market.

## Configuration Is A Two-Sided Market

Programming languages benefit from network effects in multiple dimensions. The more users of the language, the more and better libraries, documentations, tutorials, etc. are available which attracts even more users. Once an organization has their core needs met (things like the development toolchain and core libraries) they are fairly independent. They can go off and do their own thing without caring what others do as long as they can build the desired software.

In contrast, configuration is not valued by itself. Configuration is closer to a contract or standard between users and software where the goal is to feed structured data to a program that does the useful work. Why does that matter? For a configuration language, success looks like making a market between users and tool developers. Each side wants access to the other as the reason to use a language like CUE:

- Users want to be able to use CUE (with its powerful features and tooling) across multiple workflows
- Tool makers want high demand for CUE to justify supporting a configuration language

The challenge is that we are stuck in a local maxima. Almost every tool uses configuration but it is not the differentiator, so most developers settle on using a language that is widely known and supported, like YAML. Writ large, it is the undifferentiated heavy lifting that underlies modern software development.

![Image of infrastructure tools and their chosen configuration languages](two-sided-market.png "Tools and chosen configuration languages")
*Many developer tools have similar workflows, but they vary in configuration choices*

CUE will need to create a two sided market, which is harder than a network effect because each side has its own economies of scale and then matching those groups is a classic chicken-and-egg problem. A tall order. In return for overcoming this challenge, this barrier to entry becomes a powerful moat that would make CUE truly dominant for configuration. This is where configuration languages differ from programming languages. Even with network effects, there is plenty of specialization (such as garbage collected vs manual memory management) and independence for the industry to support multiple popular languages. There is less opportunity in configuration, where developers would not want to support multiple complex formats for a single tool or to learn multiple advanced configuration languages for largely the same kind of work.

The winning language will enjoy a power law where that language is the ubiquitous, default choice for configuration integration, libraries, and workflows. Other languages will exist, but would be relatively niche and limited without the same widespread support. The barrier becomes a moat.

## Chasing The Long Tail

The hardest part of making the market is that many different actors need to be brought in to kickstart the engine. Between CUE users and CUE tool makers, it is the tool makers that are more accessible for initial gains and rapid feedback. For one, tool makers are the much smaller group and hands-on help from the core CUE team goes much farther. Developers also acutely feel the pain building complex applications with anemic configuration options. Try building a modern compute management or continuous integration system and realize the your configuration options are YAML/JSON (maybe with a JSON schema if generous). At a certain point, the complexity of the problem space requires a more advanced configuration, and those developers would most benefit with the option to provide CUE integration.

Supporting the possible universe of integrations with tools (Terraform, Kubernetes) and adaptors to other standards (YAML, Protocol Buffers) is the long tail. It is certainly where much of the long term work for the language will happen, but it also the most powerful mechanism for CUE's growth. Large projects that adopt CUE effectively onboard their users to CUE.

CUE does have advantages managing all these integrations. As discussed earlier, configuration is not core to a application's implementation. Configuration lives at the margins as data before it is pulled in and used, which means that can be changed independently from the software. If a given tool takes in YAML/JSON as an input, because CUE can export as JSON with some automation a user can have a complete configuration workflow in CUE and the software does not have to be modified to work with the exported JSON. In this way CUE is *permissonless*, it is possible for a third party to provide CUE libraries without working on the project directly. We already see this with the community building libraries for working with Terraform, Cloudformation, Kubernetes, and various CI products. Once CUE package management lands, we will see many more libraries as sharing CUE code becomes much simpler.

## Capturing The Cloud

Although CUE has potential for all configuration use cases, initial focus should be on areas like cloud computing that have high potential for growing the userbase. Why cloud specifically? Cloud computing is still relatively new and is still growing massively, and declarative cloud configuration is even more recent. This presents an unique opportunity as an area with complex configuration needs that is in widespread demand. There are disciplines that use advanced configuration regularly, but something like computational linguistics is niche, while everyone needs to manage servers and databases.

Even with many projects tackling infrastructure management, there is space for CUE to be the default language of choice. The main reason is that configuration languages fit much better in the new paradigm of **Infrastructure as Data** (IaD). Kelsey Hightower contrasts IaD with Infrastructure as Code (IaC) [here](https://twitter.com/kelseyhightower/status/1164194470436302848) and [here](https://twitter.com/kelseyhightower/status/1338927903908630528). The driving point is that data is simpler to analyze, manipulate, serialize, and transport than code is. The goal then is finding the most effective way to model and manage data structures.

The answer of course is a configuration language, but it is not the better choice just because it is not Turing complete. Going back to the introduction, why not standardize on a language like Python as the default option for complex configuration? There are advantages. An established language has a large community, wide library support for different formats and protocols, as well as tooling like package managers and linters.

The main (and underappreciated) reason to back CUE is *opportunity cost*. It is taken for granted that a modern programming language will come with a complete, integrated toolchain, but the same expectations have yet to come for configuration languages. What makes this surprising is that CUE is even better positioned to provide advanced tooling then a programming language. As it turns out, in a CUE it is much easier to [generate and extract code](https://cuelang.org/docs/usecases/generate/) from other languages to CUE and [vice versa](https://cuelang.org/docs/integrations/). CUE as a language not only makes code generation easier, meta code analysis and modification simplify enough to be built into the toolchain. Those kind of benefits show up in the [query engine](https://cuelang.org/docs/usecases/query/) and refactoring tools like `cue vet`, `cue trim`, and `cue fmt`. Are these capabilities possible with a language like Python? Some, but the restricted nature of CUE makes it much easier to implement in a restricted language, enough that advanced features and workflows can be supported first party by the core language team.

## Laying Layers

![Image of CUE components, building up from core engine to user integrations](cue-components.jpg "CUE Components")
*Image from [Open Core Summit 2020 presentation](https://www.coss.community/cossc/ocs-2020-breakout-marcel-van-lohuizen-google-17i0)*

A high level view of the CUE components show how all these pieces come together. From the image above, the core engine and DSL is what is regularly thought as the language of CUE. But it is not that developers are given a basic language and left to build out the rest. CUE also exposes key capabilities (like code generation and conversion adaptors) right in the API and `cue` command. Think of these as layers, with the core team doing heavy lifting to provide some powerful features that can be used by users of CUE or even other tools that integrate with CUE for its configuration.

The end result is this dramatically lowers the *barrier of entry* for developers looking to create declarative interfaces to their systems and tools. This is a decentralizing effect, shifting advanced configuration from a specialized skill to a place where any developer can ship CUE support with their tool - a new default. Democratizing configuration is a core part of supporting that long tail of tools that is so important to CUE's growth.

Decentralizing configuration is critical because CUE is open source. The reality is that ubiquity requires buy in from many different actors, it is simply not practical to support the universe of systems and workflows that benefit from declarative configuration. The answer is to give developers leverage, to make it so simple integrate CUE that projects (or even users of a tool) add support independently with little friction.

This is what will separate newer infrastructure management techniques from the current state of the art. Tools like Terraform and Pulumi are centrally backed by corporations. They have to be, because supporting all the major clouds (across multiple languages) is an enormous effort to build out the code generation and toolchain support. Credit to them, these are open source projects with robust integrations, but the scope and efforts required to achieve it is not realistic without a backing company.

The downside of centralized support is that resources are finite. Doing the work to build and maintain integrations over time is non-trivial even with a plugin system, enough to require a company with the resources to support the multiple languages in play. The status quo is tractable for the large, widely supported public clouds, but how about private clouds and custom systems (down to the smaller tools) that also benefit from the same techniques? Going even farther what if our definition of declarative infrastructure grows to support the larger [universe of software](https://twitter.com/zackkanter/status/1383902689545752579) out there?

## Collaborative Configuration

![CUE as the configuration layer for developers](collaborative-configuration.png "CUE as the configuration layer for developers")
*With CUE as the ubiquitous configuration language, every developer benefits from economies of scale*

CUE paired with package management and some community standardized automation will lower the bar enough that a CUE module (likely autogenerated from the source code) will be enough to make a system declarative with minimal effort. This is key force for decentralization, because when it is simple enough for everyone to build in declarative configuration it will happen independently without centralized coordination.

The exciting part is when the economies of scale kick in. It turns out developers largely end of writing the same kind of configuration for the same kinds of tools, but lacked a common means to share those schemas and templates with the each other. Does everybody individually need to discover the best practices way to define an AWS load balancer with Terraform? With CUE, a standard way to define a piece of infrastructure is a schema that can be packaged and reused by any developer. Zooming into the organizational level, the same challenge of sharing reusable schema exists and looks more like policy (where a company wants every team to follow certain standards for security/simplicity). Thanks to unification it is likely that developers will use a community created configuration library for a tool (Kubernetes, Terraform, Jenkins, etc.) and then internally a company will layer their own libraries to enforce specific policies and remove most of the boilerplate for teams on the ground.

The long term goal is freeing developers from much of the undifferentiated heavy lifting that goes into configuration. The current situation is analogous to every developer having to create a build tool and standard library for every project they work on. An ubiquitous configuration language would have the long tail of libraries and integrations to avoid much of the duplicated work done today. The new default enables the industry to focus on higher level use cases that everyone would benefit from. For example, a framework to read declarative configuration from a Git repository and sync with some online system (this already [exists](https://www.weave.works/oss/flux/) for Kubernetes) would be generally useful for many tools. Another application is tooling to analyze configuration changes and prevent rollouts that break services before they happen. Eventually, complex systems will ship with a configuration toolchain that ships with best practices libraries and workflows to develop and manage them through production.

## Building A Language Is A Marathon

The configuration complexity curse can be overcome. CUE is the language that can push past the configuration clock by offering ubiquity: it will provide enough value that it will be default solution for configuration. Of course, achieving this goal will be require hard work to build out the language, tooling, documentation, and community. All those layers described previously are a place where a contributor can create a lasting impact:

**Learning and using CUE.** Outside all of the talk of markets and long tails, CUE at the most basic level really is a great language for configuration. A nice aspect of the language is that is easy to get started. CUE be used for validation against regular JSON and YAML files, so validation of existing configuration can be accomplished with a matching CUE schema and `cue vet`. A common issue is that managing JSON is unwieldy with only a few tools. Multiply that across multiple projects and reusable configuration becomes acute. With CUE, a developer can build out libraries and automation that can give value to a whole organization, which leads to...

**Developing configuration libraries.** Capturing the long tail of tools is a core part of CUE succeeding, and the universe to be tackled is massive, far larger than what can be handled by a single team. Thankfully, CUE provides primitives like code generation and package management to make complex configuration accessible to all kinds of developers. Creating and sharing libraries to work with systems like Kubernetes, Terraform, Jenkins, GitHub Actions, Packer, and more (especially your own tool!) can be immediately leveraged by the wider community. Building out support for key projects can effectively set best practices for how to use a tool, as it will be the most ergonomic way to interface with any of these complex systems. Many smart teams recognize this and are building CUE support first party, effectively defining better interfaces to use their tool from the start. The next logical step is to help CUE itself, which is...

**Contributing to CUE core projects.** CUE has made incredible progress in only two years, but there are challenges to be tackled before we reach 1.0. The CUE DSL and engine are projects that are fairly ambitious in their vision, a programming languages developer would find this an interesting problem to work on. Outside of the language itself, plenty opportunity exists in important projects like [unity](https://github.com/cue-sh/unity), which tests the corpus of CUE modules out there to help the core team improve CUE and test language updates against CUE code people are actually writing. Get involved joining the CUE [discussions](https://github.com/cuelang/cue/discussions) and [Slack](https://cuelang.slack.com/ssb/redirect).

The novelty of CUE and dynamics of configuration languages make this an opportunity to work on a language that will be used by every developer. Programmers are stuck in a local maxima for configuration, the status quo does not meet the challenges developers face today, but current solutions are too fragmented and anemic to break through to a better state. CUE is the right project at the right time that can achieve ubiquity and redefine how we work with configuration in the future.