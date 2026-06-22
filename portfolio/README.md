# Portfolio

A personal portfolio and blog built with [Statiq.Web](https://www.statiq.dev/) (a .NET static site generator) and hosted on **Azure Static Web Apps**. Classic editorial design, light theme, with About + Experience, a blog, and a working contact form.

## Prerequisites

- [.NET SDK 8.0+](https://dotnet.microsoft.com/download)
- A [GitHub](https://github.com/) account
- An [Azure](https://portal.azure.com/) account (the Static Web Apps free tier is enough)

## Run it locally

```bash
dotnet run -- preview
```

Then open the URL it prints (usually `http://localhost:5080`). The `preview` command serves the site and rebuilds as you edit.

To just generate the static output without serving:

```bash
dotnet run
```

The generated site lands in the `output/` folder.

## Make it yours

Almost everything you'll edit lives in a few places:

- **`appsettings.json`** — your name, role, tagline, location, email, and social links. These flow into every page.
- **`input/index.cshtml`** — your About text and the Experience timeline.
- **`input/contact.cshtml`** — the contact page.
- **`input/blog/`** — blog posts. Each post is a Markdown file with a small front-matter header (`Title`, `Published`, `Description`). Copy `welcome.md` to start a new one.
- **`input/assets/css/site.css`** — colors and typography (design tokens are at the top).

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

## Deploy to Azure Static Web Apps

The easiest path lets Azure wire up GitHub for you:

1. In the [Azure portal](https://portal.azure.com/), create a **Static Web App**.
2. Choose **GitHub** as the source and authorize it, then pick this repo and the `main` branch.
3. For **Build Presets**, choose **Custom** and set:
   - **App location:** `output`
   - **Api location:** `api`
   - **Output location:** *(leave blank)*
4. Create the resource. Azure adds a deploy-token secret to your repo and commits its own workflow file.

**Important:** Azure's generated workflow won't know how to build Statiq. Either delete the workflow Azure adds and keep the one in this repo (`.github/workflows/azure-static-web-apps.yml`), or copy the `Setup .NET` + `Build site with Statiq` + `skip_app_build: true` bits into Azure's file. The workflow in this repo is already correct — just make sure the secret name matches.

Check the secret name under **GitHub repo → Settings → Secrets and variables → Actions**. The workflow here expects `AZURE_STATIC_WEB_APPS_API_TOKEN`; if Azure created a differently named secret, either rename it or update the workflow.

After that, **every push to `main` builds and deploys automatically.**

## Contact form

The form posts to `/api/contact`, an Azure Function that ships in the `api/` folder. Out of the box it validates submissions and logs them (visible in your Static Web App's Function logs) and returns success.

To actually receive emails, open `api/contact/index.js` and follow the SendGrid example in the comments: add `@sendgrid/mail` to `api/package.json`, then set `SENDGRID_API_KEY`, `CONTACT_TO`, and `CONTACT_FROM` under your Static Web App's **Configuration** in the Azure portal.

Prefer no backend at all? You can delete the `api/` folder, sign up for [Web3Forms](https://web3forms.com/) (free), and point the form's `fetch` URL in `input/assets/js/site.js` at their endpoint with your access key.

## Project layout

```
.
├─ Portfolio.csproj         # .NET project
├─ Program.cs               # Statiq bootstrapper
├─ appsettings.json         # your details (edit me)
├─ input/                   # site content & templates
│  ├─ _Layout.cshtml        # page shell
│  ├─ _ViewStart.cshtml     # default layout binding
│  ├─ index.cshtml          # About + Experience
│  ├─ contact.cshtml        # contact page
│  ├─ 404.cshtml
│  ├─ staticwebapp.config.json
│  ├─ assets/               # css + js
│  └─ blog/                 # blog index + posts
├─ api/                     # Azure Functions (contact form)
└─ .github/workflows/       # CI/CD to Azure
```
