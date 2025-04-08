---
title: 'Services, Not Scripts'
date: '2019-02-16'
tags:
  - Cloud
  - SRE
  - DevOps
---

> This piece was published for fellow Site Reliability Engineers at my workplace
> and has been lightly edited for a more general audience. I wrote this article
> to advocate changing how we automate and provide infrastructure
> to our organization. I reference Google Cloud as our cloud vendor,
> but this piece is applicable to any developer on the cloud or not
> who wants to build tools and services not provided by their platform.

When a cloud vendor does not provide a critical database or service, a company
usually must step in and implement a custom solution to fill the gap. At our
company, two such examples would be our deployments of Apache Solr and Apache
Cassandra. Although need drives adoption of tools not provided by the cloud
vendor, would the usability of our own offerings match a similar cloud service?

In other words, can we make deploying our software infrastructure as ergonomic
as Google Cloud offerings? GCP provides the tools to do so, but we would need to
fundamentally change how we deploy systems such as databases in GCP.

## The Infrastructure Lifecycle

<!-- Dive into what it takes to fully operate a database -->
<!-- Describe how this is done without an infrastructure service -->
  <!-- Downsides of the current system -->

When deploying a new system, many would consider being able to bring up a new
instance or cluster on demand an accomplishment in itself. But, creating a
database is just the beginning. A few things you would need to be able to do to
manage any database effectively:

- Have thorough and detailed monitoring for each database deployment
- Be able to create backups on demand and on a schedule
  - Backups need to be tested regularly to guarantee data integrity
  - Restore backups to existing database on demand
- Run various administrative tasks on demand
  - Configuration changes
  - Networking changes
  - Schema/Data updates

How do many teams accomplish these tasks today? Teams usually build up a
collection of ad-hoc scripts to handle these tasks as needed. More sophisticated
automation would involve orchestration in a CI pipeline or dedicated services
deployed into a project to perform these tasks automatically. In some cases,
tasks that are infrequent or difficult to script are done by hand, as the work
does not justify the automation investment to an already swamped SRE team.

The majority of teams are fairly successful in operating and owning the full
infrastructure lifecycle in the current model, so what's the problem? I would
say that the cost is paid by the organization as a whole. For every team that
independently develops their own good enough management system, there are other
teams across the organization that cannot use the same automation. It could be
that the teams simply do not know what automation is available from others, a
classic discoverability problem. Or, the automation is highly customized and to
the specific needs of the team and environment and not truly reusable.

In the long run, every single team pays in opportunity cost and accessibility to
potentially global improvements in our infrastructure. If SREs run all
automation, why bother spending extra time building tooling to make this
automation available to developers? If we only need to address our own teams'
concerns, why bother developing infrastructure automation that could be reused
by every other team in our organization?

The fundamental reason for our status quo comes down to incentives. Recognizing
the cause is not enough. If each team building their own custom infrastructure
is insufficient, what is the solution?

## It's All APIs

<!-- Multiple frontends -->
<!-- Infrastructure lifecycle encapsulation -->
<!-- Administrative task APIs -->

> I don't care how you build it, just get me a cluster.

When creating anything in Google Cloud, from resources as simple as a single VM
to massive database clusters, it all starts with an API call. There are more
options than calling the API directly though. Options are as varied from
clicking buttons in a UI, to writing declarative code with Deployment Manager or
Terraform, To fully dynamic scripts and systems to call GCP APIs directly. The
main enabler of this accessibility is the APIs that control almost everything in
Google Cloud.

Behind an API lies whatever code, systems, and processes are needed to
accomplish a task. The greatest benefit of an API is that as long as the
interface between a client and service (the contract) is followed, The client
does not have to know or particularly care how a resource is created. Another
benefit of the API is that they can be used in a consistent, widely available
way (HTTPS in this case). With such accessibility, there can be multiple clients
and tools as each just needs to call an API in the end.

When comparing the ease of use of an API to the collection custom scripts and
processes used today, which would you prefer to use? Which option would
developers on your team rather use? What option would developers in other teams
prefer?

## Infrastructure as a Service

<!-- Deployment treated as a logical unit -->
<!-- Full service ownership -->
  <!-- Do the work for them -->
  <!-- Alignment of knowledge and incentives -->

> You're the expert, just do it for me.

In addition to the endpoints available to create resources, Most APIs have
additional endpoints to handle various administrative tasks during the lifecycle
of a database. For example, GCP Cloud SQL can configure an automatic backup
schedule of a Postgres database when creating an instance. On top of that, they
also provide an separate endpoint to trigger a full backup on demand. By
implementing backups themselves (correctly and reliably) they save every single
user of Cloud SQL from having to separately and redundantly implement backups.

The above example demonstrates why providing Infrastructure as a Service (IaaS)
is so powerful. Behind each IaaS API is a service owned and operated by a team
whose primary mission is to deploy and manage that resource. When your 9 to 5 is
reliably deploying Solr clusters, you will become very knowledgable on how to
build Solr clusters. Compare the mission to that of an SRE team supporting a
product. Although they may own and operate custom databases, they must balance
improving their automation and knowledge with their other responsibilities. They
will create just enough automation to further their mission, and develop just
enough knowledge to solve their operational problems. When the fundamentals must
be compromised, goals like reusability for the greater organization fall to the
wayside.

The main goal of building your own IaaS is to realign incentives. With teams
dedicated to creating infrastructure for the whole organization, features we
want for our own infrastructure will happen automatically. Mission oriented
services will naturally have teams knowledgable on the systems they operate, and
automating database management tasks becomes logical when service owners must
perform them all the time. With a centralized point of improvement, a service
developing a robust backup solution can make an innovation available to the
organization by creating a new endpoint.

## The Loop

<!-- Virtuous cycle between IaaS and SRE -->
<!-- Virtuous cycle internal to IaaS teams -->
  <!-- Scale forces improvement -->

The end result of adopting IaaS for all infrastructure is a virtuous cycle. When
you can simply call an API and get a fully working database cluster, why
duplicate effort and build your own automation? With time freed from building
core automation, SRE teams can focus on higher level automation that provide
more visible benefits or fill gaps not addressed by IaaS offerings. Observing
what SRE teams move to work on drives improvements to existing services and
signals potential IaaS services to start building.

There is a second virtuous cycle that happens to each service team. The main
cause here is **scale**. When forced to own the lifecycle of many, many
deployments of a system, processes that teams could get away individually simply
stop working. When managing hundreds of deployments, operators cannot memorize
the details of every deployment and must design a metadata store to track
resource deployments. Running manual processes for many deployments becomes
impractical and is aggressively automated away. SRE teams that would be tempted
to customize deployments for their own use cases cannot support every separate
teams' needs and will scope their offerings to what is truly usable by everyone.

## Reaching The Goal

> Make it easy to do the right thing.

If at this point you are convinced that providing our own Infrastructure as a
Service is a good idea, the question is: how do we get from what we do today
to the next level? After all, transitioning from ad-hoc scripts and pipelines
to advanced self-service platforms is not an overnight change.

The main measure we should evaluate progress is **accessibility**. By
accessibility, I mean measuring the usability of clients (development and SRE
teams internal to our organization) in deploying infrastructure using our APIs.
Thinking about accessibility leads to orienting questions:

- Are deployed databases reliable and client teams are confident they work?
- Are the services we build simple to access and use by teams?
  - As simple as Google APIs integration with IAM?
  - Do we have the tooling to make working with our APIs as ergonomic as GCP APIs?
    - eg. Dashboards, Infrastructure as Code, scripts, etc.
- Is it as simple to delete resources no longer needed as it is to create them?
- Can clients call endpoints to have administrative tasks done for them?
  - Backups, Configuration updates, etc.
- Do clients have visibility on their deployed systems?
  - SREs: Monitoring dashboards and alerting automatically created per installation

There is good news for what we are trying to do: we have many examples to learn
from and tools we can use to build our own systems. Our strongest example is
Google Cloud itself. Google Cloud is in the business of creating APIs to deploy
systems and should be a benchmark to compare our internal offerings to. GCP also
provides features such as [Type
Providers](https://cloud.google.com/deployment-manager/docs/configuration/type-providers/process-adding-api)
and [Composite
Types](https://cloud.google.com/deployment-manager/docs/configuration/templates/create-composite-types).
If integrated with our internal APIs, we can use tooling like Deployment Manager
to create custom deployments with the same workflow we use for Google Cloud
services.

There is also value in observing how users of cloud platforms solve the same
issue. Companies like Netflix are well known as innovators in cloud adoption and
have faced the same kind of infrastructure challenges in their environment. We
would do well to learn and take a page from how they solved these problems.

## Conclusion

Embracing an Infrastructure as a Service mentality is certainly worth doing. I
would not say it is a simple transition from the current practice to what is
possible, but the benefits described above are substantial. By embracing change,
we can dramatically improve how SRE serves our organization's needs; and I
personally think its the kind of work that puts the _Engineering_ in
_Reliability Engineering_.
