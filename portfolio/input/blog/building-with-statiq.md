Title: Building this site with Statiq.Web
Published: 2026-06-10
Description: A quick look at how the site is put together and deployed.
---

A few notes on how this site is structured, in case it's useful to anyone else building with Statiq.Web.

## The shape of the project

The whole thing is a single .NET console app. Content lives in Markdown and Razor files under an `input` folder, and Statiq turns it into static HTML in an `output` folder when the app runs.

Layouts are plain Razor. A single `_Layout.cshtml` wraps every page, and the blog index queries the other pages to build its list.

## Deployment

Every push to the `main` branch triggers a GitHub Actions workflow. It builds the site with .NET, then hands the generated `output` folder to Azure Static Web Apps. The whole deploy takes about a minute.

That's it — no servers, no manual steps. Write a Markdown file, push, and it's live.
