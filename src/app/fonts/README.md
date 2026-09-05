# Poppins

Self-hosted so the build does not depend on a third-party service.

`next/font/google` downloads these from `fonts.googleapis.com` **at build time**.
That is a network call in the middle of every clean build, and it is a hard
failure, not a fallback: a DNS blip during development here produced

```
Failed to fetch `Poppins` from Google Fonts.
> Build failed because of webpack errors
```

Committing the files makes builds reproducible and lets them run offline or in a
network-restricted CI or deploy environment.

## What is here

The **latin** subset only, in the five weights the stylesheets ask for
(300/400/500/600/700) — about 39 KB in total. The site is English-only, so the
other subsets Google serves (devanagari, latin-ext) would be dead weight.

Sourced from the Google Fonts CSS API and used through
[`next/font/local`](../layout.tsx), which still generates the size-adjusted
fallback metrics that stop the swap from shifting the layout.

## Licence

Poppins is licensed under the SIL Open Font License 1.1, which permits
redistribution — including bundled in a commercial project like this one — with
the licence retained. Copyright Indian Type Foundry, Jonny Pinhorn.

<https://openfontlicense.org/>

To refresh them, re-download the latin `@font-face` `src` URLs from
`https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700`
with a browser User-Agent (the API serves TTF to unknown agents).
