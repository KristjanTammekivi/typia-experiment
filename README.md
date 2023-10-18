# Fiddling around with typia

We use typia partially to test the types that endpoints return. Since assertEquals
throws an error with only the first incorrect property, we instead use something
like `testType(() => validateEquals(...))`` to get a full report of all the errors.

I wanted to make it less verbose by using a custom transform ahead of typia so
`testType<SomeType>(someValue)` would be transformed to `const result = validateEquals<SomeType>(someValue)` + some more code to check the result and throw an error if it's not valid, but for some reason the transformed code doesn't seem
to get passed to typia. I'm not sure if it's a bug or if I'm doing something wrong.

## Steps to reproduce

1. Clone this repo
2. Run yarn run setup
3. Check compiled files in dist. example-typetest has validateEquals in it that has not been transformed, but example-validateequals has the fully transformed code
