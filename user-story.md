# User Story Template

> Reference template used to write the GiftLink user stories tracked as GitHub
> issues in this repository. Each story is created from this template, given a
> label from `new`, `backlog`, `technical debt` or `icebox`, and broken into
> tasks before development.

---

## User Story Template

````markdown
# Title

# Description
As a [type of user], I want to [goal] so that [benefit].

# Details and Assumptions
- [Document what you know, including the data, constraints, or background.]
- [List any assumption the team is making about users or the system.]

# Acceptance Criteria
```gherkin
Given [some context]
When [a certain action is taken]
Then [the observed outcome should be]
```
- [Add one Given/When/Then block per testable behaviour.]

# Out of Scope
- [Thing that is explicitly not being built in this story]

# Dependencies
- [Story ID or external service this story relies on]
````

---

## As a

Describe the user role in plain language, for example:

- a registered user
- a visitor browsing gifts
- a user posting an unwanted household item
- an administrator moderating listings

---

## I want to

Describe the goal or feature in one sentence, using the user's own language.
Keep it about intent, not implementation, for example
"I want to save an item I no longer need so that someone else can reuse it."

---

## So that

Describe the benefit or value the user receives. This is the "why" and is what
keeps a story from being a technical task.

---

## Details and Assumptions

Document everything the team knows about the story that is not obvious from the
title: the data involved, business rules, non-functional constraints, and any
assumptions about the user or the system. This section removes ambiguity before
the story is estimated.

- The gift data comes from the seeded `gifts` collection (`giftdb` database).
- Users must be authenticated before posting an item.
- Assumes the API is available at the configured backend URL.

## Acceptance Criteria

Written in Gherkin syntax so each behaviour is testable: **Given** a context,
**When** an action is taken, **Then** an observable outcome occurs. Cover the
happy path, the validation and error paths, and any permissions involved.

```gherkin
Given [some context]
When [a certain action is taken]
Then [the observed outcome should be]

Given a registered user is on the login page
When they submit a valid email and password
Then they are redirected to the landing page with a token stored

Given a user is on the login page
When they submit a blank email or password
Then an inline validation message is shown
```

---

## Story Format

> **As a** [user], **I want to** [capability], **so that** [benefit].

---

## Example

```markdown
# As a registered user, I want to log in so that I can manage my profile and the items I have posted

# Description
As a registered user, I want to log in so that I can manage my profile and the
items I have posted. The login form should post the email and password to the
authentication API and store the returned JSON Web Token for later requests.

# Details and Assumptions
- The user already has an account created through the register page.
- The API returns a JSON Web Token on a successful login.
- The backend is reachable at the configured API base URL.

# Acceptance Criteria
```gherkin
Given a registered user is on the login page
When they submit a valid email and password
Then they are redirected to the landing page with a token stored

Given a user is on the login page
When the email or password field is left blank
Then an inline message is shown

Given a user is on the login page
When the credentials are incorrect
Then an error is shown without revealing whether the email exists

Given a logged-in user makes a later request
When the request is sent
Then the Content-Type header is set and the Authorization header carries the bearer token
```

# Out of Scope
- Password reset by email
- Social login providers

# Dependencies
- /api/auth/login endpoint must be implemented
```

---

## Kanban Labels

| Label | Meaning |
|-------|---------|
| `new` | Story accepted but not yet scheduled. |
| `backlog` | Story agreed and scheduled for a future sprint. |
| `technical debt` | Work needed to improve quality, performance or structure. |
| `icebox` | Idea parked for possible future consideration. |