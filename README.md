# Tushar Chavhan Portfolio

This is a corrected static portfolio website for GitHub Pages. It uses only HTML, CSS, and JavaScript, so no build step is required.

## How to deploy on GitHub Pages

1. Extract this zip file.
2. Upload these files to a GitHub repository.
3. In GitHub, open `Settings` > `Pages`.
4. Choose `Deploy from a branch`.
5. Select the `main` branch and `/root`.
6. Save.

Your site will publish at a GitHub Pages URL after GitHub finishes deployment.

## Files

- `index.html`: website content
- `css/style.css`: design and responsive layout
- `js/app.js`: mobile menu, stat counter, and contact form settings
- `assets/images/hero-network.png`: visual background used on the home section
- `.nojekyll`: keeps GitHub Pages from treating the site as a Jekyll project
- `CONTACT_SETUP.md`: exact steps for sending contact form requests to email and Google Sheets

## What you should edit later

Search in `index.html` for `Enter your text`. Replace those placeholder lines with your real information.

Suggested fields to update:

- Email
- Phone number
- LinkedIn URL
- GitHub URL
- Resume PDF link
- Actual certification status
- Project links and descriptions
- Current job title, company, and years of experience

## Contact form

The form is ready for both Formspree email delivery and Google Forms/Sheets storage, but you must paste your own service values in `js/app.js`.

Open `CONTACT_SETUP.md` and follow the steps. After setup, you will receive contact requests in your email and also see them inside your Google Form responses or linked Google Sheet. The contact form includes name, optional email, mobile number, and message.

The current project already includes known details from your original zip: Tushar Chavhan, telecom and cloud engineering, 4G EPC, 5G Core, Azure, Kubernetes, Terraform, Linux, Python, OpenShift, DevOps, and networking.
