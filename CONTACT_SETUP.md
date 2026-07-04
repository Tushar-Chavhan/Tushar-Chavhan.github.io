# Contact Form Setup

Your contact form can send every request to two places:

1. Formspree: sends the message to your email inbox.
2. Google Forms: saves the same message in Google Forms and optionally Google Sheets.

You only need to edit one file after creating the services:

`js/app.js`

At the top of that file, replace these placeholder values:

```js
formspreeEndpoint: "PASTE_YOUR_FORMSPREE_ENDPOINT_HERE",
googleFormEndpoint: "PASTE_YOUR_GOOGLE_FORM_ACTION_URL_HERE",
googleFields: {
  name: "PASTE_GOOGLE_NAME_ENTRY_ID_HERE",
  email: "PASTE_GOOGLE_EMAIL_ENTRY_ID_HERE",
  mobile: "PASTE_GOOGLE_MOBILE_ENTRY_ID_HERE",
  message: "PASTE_GOOGLE_MESSAGE_ENTRY_ID_HERE"
}
```

## Option 1: Formspree Email

Use this to receive portfolio contact requests directly by email.

1. Go to `https://formspree.io/`.
2. Create a free account using the email where you want to receive requests.
3. Create a new form.
4. Formspree will give you an endpoint like:

```text
https://formspree.io/f/abcdwxyz
```

5. Copy that URL.
6. Open `js/app.js`.
7. Replace:

```js
formspreeEndpoint: "PASTE_YOUR_FORMSPREE_ENDPOINT_HERE",
```

with:

```js
formspreeEndpoint: "https://formspree.io/f/abcdwxyz",
```

Use your real Formspree URL, not the demo URL above.

## Option 2: Google Forms and Google Sheets

Use this to save all contact requests in a response table.

1. Go to `https://forms.google.com/`.
2. Create a new blank form.
3. Add exactly these four questions:

```text
Name
Email
Mobile
Message
```

Email is optional on your website. In Google Forms, do not mark Email as required.

4. Click the three dots menu and choose `Get pre-filled link`.
5. Enter demo values:

```text
Name: demo name
Email: demo@example.com
Mobile: 9876543210
Message: demo message
```

6. Click `Get link` and copy the link.
7. Paste the copied link into Notepad.

The link will look similar to this:

```text
https://docs.google.com/forms/d/e/FORM_ID/viewform?usp=pp_url&entry.111111=demo+name&entry.222222=demo%40example.com&entry.333333=9876543210&entry.444444=demo+message
```

8. Change `/viewform` to `/formResponse`.
9. Remove everything after `/formResponse`.

Your final Google form endpoint should look like this:

```text
https://docs.google.com/forms/d/e/FORM_ID/formResponse
```

10. Copy the four entry IDs from the prefilled link:

```text
entry.111111  = Name
entry.222222  = Email
entry.333333  = Mobile
entry.444444  = Message
```

11. Open `js/app.js`.
12. Replace the Google placeholders:

```js
googleFormEndpoint: "https://docs.google.com/forms/d/e/FORM_ID/formResponse",
googleFields: {
  name: "entry.111111",
  email: "entry.222222",
  mobile: "entry.333333",
  message: "entry.444444"
}
```

Use your real form URL and your real `entry.xxxxxx` values.

## Where You Will See Requests

After setup:

- Email copy: Formspree will send the request to your email inbox.
- Saved copy: Google Forms will show it under the `Responses` tab.
- Spreadsheet copy: In Google Forms, click `Responses` and then the green Sheets icon to create a Google Sheet.

## Important

Do not leave the placeholder values in `js/app.js`. The form will only work after replacing them with your real Formspree and Google Forms values.

After editing, upload the updated files to GitHub again.
