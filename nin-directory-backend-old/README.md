# Nigerians in Northampton — Backend API

Real backend for the business directory workflow.

## Flow

1. `list-your-business.html` sends a multipart submission to the API.
2. The API validates the fields and image uploads.
3. MongoDB stores the submission with `status: pending`.
4. Images are stored on the server filesystem.
5. Admin endpoints list and review pending submissions.
6. Approving a submission creates a public `Business` record.
7. Public directory endpoints return approved business records only.

## Requirements

- Node.js 20+
- MongoDB Atlas or another MongoDB deployment
- Frontend served from an allowed origin

## Setup

```bash
npm install
copy .env.example .env
```

On macOS/Linux, use `cp .env.example .env`.

Set at least:

```text
MONGODB_URI=...
ADMIN_API_KEY=...
FRONTEND_ORIGIN=http://127.0.0.1:5500,http://localhost:5500
PUBLIC_BASE_URL=https://nigerians-in-northampton-backend.onrender.com
```

## Run

```bash
npm run dev
```

Health check:

```text
GET https://nigerians-in-northampton-backend.onrender.com/api/health
```

## Public API

```text
GET /api/businesses
GET /api/businesses/:id
```

Optional query parameters for the collection:

```text
category=food
area=abington
search=hair
sort=featured|rating|recent|name
```

## Submit a business

```text
POST /api/business-submissions
Content-Type: multipart/form-data
```

Text fields:

```text
businessName
categoryKey
areaKey
description
services          JSON array
phone
whatsappNumber
email
website
hasWhatsApp
hasOnline
hasBooking
address
postcode
town
lat
lng
hours             JSON object
ownerName
ownerPhone
ownerEmail
ownerNote
```

Files:

```text
coverImage       one image
 galleryImages   up to five images
```

## Admin authentication

Use either:

```http
Authorization: Bearer YOUR_ADMIN_API_KEY
```

or:

```http
x-admin-api-key: YOUR_ADMIN_API_KEY
```

Admin endpoints:

```text
GET /api/business-submissions?status=pending
GET /api/business-submissions/:reference
PATCH /api/business-submissions/:reference/status
```

Approve example:

```json
{
  "status": "approved",
  "note": "Approved after review."
}
```

Allowed statuses:

```text
pending
approved
rejected
changes_requested
```

## Image storage

The current backend stores uploads on disk. That is fine for a normal VPS or another host with persistent storage. For a deployment with ephemeral storage, move these uploads to S3-compatible object storage or Cloudinary before production.

## Frontend integration

The updated `list-your-business.html` posts directly to:

```text
POST https://nigerians-in-northampton-backend.onrender.com/api/business-submissions
```

The updated `businesses.html` and `listing.html` first try the public API and fall back to `assets/js/business-data.js` when the API is unavailable. This keeps the current demo directory working during development while approved MongoDB listings can begin appearing through the API.

To point the frontend at a deployed API, define this before the page scripts load:

```html
<script>
  window.NIN_API_BASE_URL = "https://your-api-domain.example.com/api";
</script>
```
