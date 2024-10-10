# Protech

## Tips and Tricks Blog Site (Frontend)

[Live URL](https://pro-tech-steel.vercel.app/)

### Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage Guide](#usage-guide)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Credentials](#credentials)
- [Contact](#contact)

## Features

- **User Authentication:** Secure sign-up, login, logout, and JWT-based authentication.
- **Post Creation & Management:** Users can create posts with a rich text editor, categorize posts, and attach images.
- **Upvote & Commenting System:** Users can upvote/downvote posts, comment, and interact with other posts.
- **Admin Dashboard:** Manage users, posts, and analytics.
- **Search & Filter:** Search and filter posts with debounced API calls.
- **Payment Integration:** Premium access for exclusive posts using Aamarpay/Stripe.

## Technologies Used

- **Frontend Framework:** Next.js
- **UI Library:** NextUI
- **Data Fetching & State Management:** Tanstack Query (React Query)
- **HTTP Client:** Axios
- **Deployment:** Vercel

## Usage Guide

Follow these instructions to set up and run the frontend application locally.

### Step 1

Open your terminal and navigate to the directory where you want to add the project.

### Step 2

Clone the repository using the following command:

```bash
git clone https://github.com/rakibul58/protech-client.git
```

### Step 3

Navigate into the project folder:

```bash
cd protech-client
```

### Step 4

Install the dependencies:

```bash
yarn install
```

### Step 5

Create a `.env.local` file in the root directory and add the following environment variables. Update these variables with your backend and API keys as necessary:

```plaintext
NEXT_PUBLIC_BASE_API_DEV=
NEXT_PUBLIC_BASE_API_PROD=
NEXT_PUBLIC_CLOUDINARY_URI=
NEXT_PUBLIC_CLOUDINARY_PRESET=
NEXT_PUBLIC_EDITOR_API_KEY=
```

### Step 6

Run the application in development mode:

```bash
yarn dev
```

The app should now be running on `http://localhost:3000`.

## Usage

Once the frontend application is set up and running, you can access the homepage at `http://localhost:3000`. From here, you can register, log in, create posts, upvote, comment, and explore other features.

## Credentials

### Admin Credentials

- **Email:** admin@protech.com
- **Password:** 123

### User Credentials

- **Email:** student3@test.com
- **Password:** 123

## Contact

For any questions or feedback, please contact:

- **Name:** Muhammed Rakibul Hasan
- **Email:** rhrahi14@gmail.com