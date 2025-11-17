# Commit message convention

This is the convention of commit message

```bash
type(scope): ticket-number: commit description
```

`type` is mandatory and can be one of following value

- `feat`: new feature for the user, not a new feature for build script
- `fix`: bug fix for the user, not a fix to a build script
- `hotfix`: production hot fix
- `style`: formatting, missing semi colons, ESLint errors etc; no production code change
- `refactor`: refactoring code, renaming a variable
- `test`: adding missing tests, refactoring tests; no production code change
- `chore`: updating npm scripts etc; change documentation, no production code change

`scope` is optional and can be one of following value (feature name or folder name)

- `auth`
- `core`
- `services`
- `composables`
- `etc...`

`ticket-number` is optional

`commit description` is mandatory and must be in all lower case, except proper names

## Rules

- Commit message must not be longer than 100 characters
- If there are multiple scopes in a commit, they will be separated by comma
- There must be only one space before ticket number
- There must be only one space before commit description

## Config & Documents

- You can config rule of commitlint in file commitlint.config.cjs
- Document for commitlint at https://commitlint.js.org/#/reference-rules

## Example

```bash
// ❌ Bad commit messages
git commit -m "Fix memory leak issue"
git commit -m "fix (core): SGVTN-123: fix memory leak issue"
git commit -m "fix(core):  SGVTN-123: fix memory leak issue"
git commit -m "fix(core): SGVTN-123:   fix memory leak issue"
git commit -m "fix(core): SGVTN-123: Fix memory leak issue"

// ✅ Good commit messages
git commit -m "fix(core): SGVTN-123: fix memory leak issue"
git commit -m "feat(payment-offline): SGVTN-1616: implement entry game banner"
git commit -m "refactor(auth,core): replace global objects w/dependency injection tokens"
git commit -m "chore: update README file"

```

You can test the validity of your commit message by running this command in your terminal

```bash
echo "your commit message" | npm run commitlint
```
