# User Story Template

> Reference template used to write the GiftLink user stories tracked as GitHub
> issues in this repository. Each story is created from this template, given a
> label from `new`, `backlog`, `technical debt` or `icebox`, and broken into
> tasks before development.

---

## User Story Template

```markdown
# Title

# Description
As a [type of user], I want to [goal] so that [benefit].

# Acceptance Criteria
1. It is done when...
2. It is done when...
3. It is done when...

# Out of Scope
- [Thing that is explicitly not being built in this story]

# Dependencies
- [Story ID or external service this story relies on]
```

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

## Acceptance Criteria

Written as testable statements, using the format "It is done when...". Cover the
happy path, the validation and error paths, and any permissions involved.

| # | Criterion |
|---|-----------|
| 1 | It is done when the user submits a valid value. |
| 2 | It is done when a required field is left blank and the user sees a clear message. |
| 3 | It is done when an unauthorised user attempts the action and is refused. |

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

# Acceptance Criteria
1. It is done when a registered user submits a valid email and password and is
   redirected to the landing page with a token stored.
2. It is done when the email or password is blank and an inline message is shown.
3. It is done when the credentials are incorrect and an error is shown without
   revealing whether the email exists.
4. It is done when the request is sent with a Content-Type header and the
   Authorization header carries the bearer token on later requests.

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