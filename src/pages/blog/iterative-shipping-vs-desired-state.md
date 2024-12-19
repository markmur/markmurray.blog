---
templateKey: blog-post
title: <strong>Iterative Shipping</strong> vs Desired State
description:
  Why solving buyer frustrations through iterative shipping often beats waiting
  for perfect solutions.
date: 2024-12-18T00:00:00.000Z
pinned: true
tags:
  - Product
  - Engineering
  - Commerce
---

> A "perfect" codebase is ideal, but should never come at a cost to the end
> user.

## Balancing Desired State with Iterative Shipping

In product engineering, there is almost always a tension between shipping a
product which satisfies both the expected user experience as well as
implementing a technical desired state. Engineers want a codebase that is easy
to reason about and debug, composable by nature and a platform for building new
features upon easily.

While the appeal of perfect solutions is strong, iterative shipping often yields
better results. By shipping smaller updates that tackle specific frustrations,
we create a feedback loop that helps validate solutions in real-world
conditions. This is particularly crucial in commerce, where both merchants and
buyers have immediate needs that can't wait for perfect solutions.

### The Trade-offs

Aiming to deliver polished, feature-complete solutions often leads to longer
development cycles, during which buyer frustrations remain unaddressed. In
fast-moving markets, this can result in losing users to competitors who are
quicker to address immediate needs.

However, iterative shipping brings several advantages:

- Faster adaptation to changing circumstances and user needs
- Reduced complexity through smaller, manageable pieces
- Easier testing, review, and deployment
- Compounding gains through continuous small improvements
- Immediate value delivery to users

### The Value of Iterative Shipping

At its core, our mission as software engineers is to deliver value to our users,
particularly in commerce where both merchants and buyers have immediate needs.
By shipping smaller updates that tackle specific frustrations, we create a
feedback loop that helps validate solutions in real-world conditions while
ensuring users are never blocked. When optimizing for conversion, both buyers
and merchants are almost always happy.

### The Risks of Perfect Solutions

Aiming to deliver polished, feature-complete solutions often leads to longer
development cycles, during which buyer frustrations remain unaddressed. In
fast-moving markets, this can result in losing users to competitors who are
quicker to address immediate needs. Extended development cycles can create an
increasingly wide disconnect between user expectations and the final delivered
product.

### Finding the Right Approach

Iterative shipping enables us to adapt to changing circumstances and user needs.
From an engineering perspective, breaking work into smaller pieces reduces
complexity, making changes easier to test, review, and deploy. Even small
improvements can yield significant results through compounding gains over time.

However, iterative shipping presents challenges:

- Technical debt from rapid updates
- User experience fragmentation
- Overwhelming users with frequent changes

These risks can be mitigated by:

- **Complete User Journeys**: Bundling updates that complete entire workflows
- **Maintain UI Consistency**: Coordinating related visual changes
- **Align with Mental Models**: Grouping naturally associated features

When evaluating the trade-offs between iterative shipping and desired state,
it's important to remain focused on what truly matters: the buyer's experience.
While clean architecture and technical excellence are admirable pursuits, they
should never come at the expense of user satisfaction or business outcomes.

A perfectly architected codebase that frustrates users is ultimately a failed
product. Buyers don't experience our class hierarchies, design patterns, or
system architecture—they experience slow page loads, confusing workflows, and
bugs that prevent them from completing their tasks. When faced with the choice
between addressing a critical user-facing issue or refactoring toward an ideal
technical state, the user's experience should almost always take precedence.
**The most elegant codebase in the world means nothing if users abandon your
product due to poor experience.**

This outcome-driven mindset helps teams maintain perspective when prioritizing
work. A "good enough" solution that resolves a buyer's pain point today creates
more value than a perfect solution delivered months later. Technical debt can be
managed and improved over time through careful refactoring and incremental
improvements, but lost users and damaged trust are much harder to recover.

## Putting Users First

The ideal approach often lies somewhere in the middle. A desired state can serve
as a guiding north star, providing clarity and direction for the team. However,
breaking that vision into iterative milestones—each focused on solving a
specific buyer frustration—ensures progress without stagnation.

By adopting an iterative mindset, we not only demonstrate empathy for our users
but also create a sustainable development process that allows us to learn,
adapt, and improve over time. The desired state is not a static endpoint but an
evolving target that reflects the ever-changing needs of our users.

In the end, our success is measured not by how perfectly we execute our initial
vision but by how effectively we solve the real-world problems of our buyers. By
prioritizing iterative shipping, we make progress visible, actionable, and
impactful—one step at a time.
