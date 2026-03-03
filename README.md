<p>
  <img src="./assets/images/seeker's-eye.png" width="80" style="vertical-align: middle; margin-right: 16px;" />
  <span style="font-size: 2em; font-weight: bold; vertical-align: middle;">Seeker’s Eye</span><br>
  <span style="font-size: 1em; color: #555;">A React Native photo contest app focused on perspective and visual storytelling.</span>
</p>

---

**Seeker’s Eye** is a React Native photo contest app focused on perspective and visual storytelling.  
Users can explore, share, and vote on photos in a safe and positive environment.

_See what others see._

The app is an [Expo](https://expo.dev) and was bootstrapped using [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Getting Started

Follow these steps to get the app running locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/seekers-eye.git
cd seekers-eye
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npx expo start
```

or

```bash
npm start
```

### 4. Run the app

Once server is running you can open the ap in one of the following ways:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

---

## Functional Guide

### Project Overview

### Application Name:

Seeker's eye

### Application Category / Topic:

Communication

### Purpose and Vision

Seeker’s Eye is a safe space to share and celebrate photos through weekly contests, where each user can vote once per picture. After voting closes, images remain available for viewing. Unlike typical social apps, the focus is on visual exploration and reflection—helping users notice beauty, appreciate small details, and cultivate a positive perspective in everyday life.

---

### User Access & Permissions

#### Guest (Unauthenticated)

Guests can access the Home screen, where all photos are displayed. They can pull to refresh and fetch newly added photos, and view photo details including description, author, votes, and time remaining if voting is still open. Guests **cannot vote**, and a button clearly indicates this, directing them to the Login screen.  
Additionally, guests can access the Info and System screens, where they can view app version and toggle themes. Each page has a header displaying relevant messages or subheadings.

#### Authenticated User

Logged-in users have full access to all guest features, **plus additional functionality**:

- **Voting:** Users can vote on photos in the detail screen.
- **Add Photo:** Upload photos from the camera or gallery (permissions required). Title and description are mandatory, with clear error messages and toast notifications guiding the user.
- **Profile:** View name, email, and avatar (or initials if no avatar). Edit display name and upload avatar (email is not editable).
- **Photo Management:** See all uploaded photos with likes, edit, and delete options.
  - **Edit Photo:** Change title and/or description.
  - **Delete Photo:** Remove photos with a confirmation modal to prevent mistakes.
- **Theme & Settings:** Theme switch available for convenience.
- **Logout:** Logs the user out and returns to the Home screen.

---

### Authentication & Session Handling

#### Authentication Flow

1. **App Launch:**  
   When the app starts, it checks whether a user session already exists using Firebase Authentication.

2. **Authentication Check:**  
   The authentication state is monitored through an Auth Context. If a valid session is found, the user remains logged in; otherwise, the app treats the user as a guest.

3. **Login & Registration:**  
   Users can register with a username, email, and password. After successful registration, the user is automatically logged in.  
   Existing users can log in using their email and password.

4. **Logout:**  
   When a user logs out, the Firebase session is cleared and the app returns to the Home screen in guest mode.

#### Session Persistence

User authentication is handled by Firebase Authentication using email and password credentials.

The session is stored securely by Firebase and monitored through a global Auth Context. This enables automatic login after app restart, keeping the user authenticated until they explicitly log out.

---

### Navigation Structure

#### Root Navigation Logic

The app uses a root Stack Navigator that manages the main navigation flows. It contains:

- `TabNavigator` – Main application screens
- `AuthNavigator` – Login and registration screens
- `Settings` – System/settings screen

Authentication state is handled via Auth Context. Protected tabs require authentication and redirect unauthenticated users to the Login screen when accessed.

<br>

#### Main Navigation

The primary navigation is implemented using a Bottom Tab Navigator.

The app contains multiple main sections (tabs), such as:

- Home
- Add Photo (protected)
- Profile (protected)
- Additional informational screen

Each tab displays an icon and label. Screens that require authentication are wrapped in a `ProtectedScreen` component, preventing unauthorized access.

<br>

#### Nested Navigation

Yes, the app uses nested navigation structures:

- **Stack inside Tabs**
  - `HomeNavigator` (Stack)
  - `ProfileNavigator` (Stack)
  - `AuthNavigator` (Stack)

##### Included Screen Types:

- Standard screens (Home, Profile, Login, Register)
- Modal screens (Photo Details, Edit Profile Photo)
- Edit screens (Edit Profile, Edit Photo)

Modal presentations use native stack options such as `presentation: "modal"` and custom animations.

<br>

### List → Details Flow

#### List / Overview Screen (Home)

The Home screen displays a list of all uploaded photos. Each item shows a preview image and basic metadata (e.g., title or vote count).

User interactions:

- Pull-to-refresh to fetch new photos
- Tap on a photo to open its detail view

<br>

#### Details Screen

Navigation to the Details screen is triggered by tapping a photo from the Home list.

The following data is passed via route parameters:

- Photo ID
- Image URL
- Title
- Description
- Author
- Vote count
- Voting ends at (timestamp)

The Details screen displays full photo information and allows authenticated users to vote. If the user is not authenticated, they are redirected to the Login screen when attempting to vote.

<br>

#### List → Details Flow (Profile Section)

##### Profile List (My Photos)

The Profile screen displays the authenticated user’s personal information and a list of all photos they have uploaded. User data (name, email, avatar) is shown in a profile card, while photos are fetched in real time from Firestore using a query filtered by the user’s `authorId`.

User interactions:

- Edit profile information
- View total number of uploaded photos
- Scroll through their own photo list
- Tap on Edit button to navigate to the Edit Photo screen
- If no photos exist, an empty-state message is shown with a button redirecting to the Add Photo screen

<br>

##### Edit Photo (Details View)

When a user selects one of their uploaded photos, navigation is triggered to the **Edit Photo** screen.

Route parameters include:

- Photo ID
- Title
- Description
- Image data

From this screen, users can:

- Update the title and/or description
- Delete the photo (with confirmation modal to prevent accidental deletion)

This creates a complete List → Details → Edit/Delete flow within the Profile section.

---

### Data Source & Backend

#### Backend Type

The application uses a real backend powered by Firebase services.

#### Technologies Used

- **Firebase Authentication** – Handles user registration, login, logout, and session persistence using email and password.
- **Cloud Firestore** – Stores application data, including photo metadata (title, description, author, votes, timestamps) and user-related information. Real-time listeners are used to keep the UI synchronized with database changes.
- **Firebase Storage** – Stores uploaded images securely and provides downloadable URLs for display within the app.

This architecture enables secure authentication, real-time updates, and scalable cloud-based image storage.

---

### Data Operations (CRUD)

The application implements full CRUD functionality using Firebase services. Separate service layers are used for Authentication, Photos, and Users to ensure modular and maintainable code.

<br>

#### Read (GET)

**Fetching All Photos (Home Screen):**  
All photos are retrieved from Firestore and displayed on the Home screen. Data is refreshed in three ways:

- Initial fetch when the screen loads
- `useFocusEffect` to refresh data when returning to the screen
- **Pull-to-refresh**, allowing users to manually reload the latest photos

This ensures users always see up-to-date content.

**Fetching User-Specific Photos (Profile Screen):**  
On the Profile screen, photos are fetched by filtering documents using the authenticated user’s `authorId`. Real-time updates are handled using Firestore’s `onSnapshot`, keeping the UI synchronized with database changes.

Authentication state is monitored via `onAuthStateChanged`, and user data is managed through Auth Context and local state.

<br>

#### Create (POST)

**Add Photo:**  
When a user uploads a photo:

1. The image is stored in Firebase Storage.
2. A new document is created in the `photos` collection in Firestore (including metadata such as title, description, author, votes, and timestamps).
3. A reference is associated with the user in the database.

This ensures both secure media storage and structured metadata persistence.

<br>

#### Update (PUT / PATCH)

**Edit Profile:**  
Users can update their display name and/or avatar. The user document in Firestore is updated, and changes are reflected immediately in the UI.

**Edit Photo:**  
Users can modify the title and/or description of their own photos. The Firestore document is updated, and UI changes appear automatically due to real-time listeners or screen refocus.

<br>

#### Delete (DELETE)

**Delete Photo:**  
When a photo is deleted:

1. The image file is removed from Firebase Storage.
2. The corresponding document is deleted from Firestore.

A confirmation modal prevents accidental deletion. The UI updates automatically after removal due to real-time synchronization.

---

### UI Synchronization

- `useFocusEffect` refreshes data when navigating back to the Home screen.
- Pull-to-refresh allows manual data reloading.
- Firestore `onSnapshot` enables real-time updates in the Profile section.
- `onAuthStateChanged` ensures authentication state consistency across the app.

This architecture guarantees consistent, real-time, and user-controlled data updates.

---

### Forms & Validation

#### Forms Used

The application includes the following forms:

- **Register**
- **Login**
- **Add Photo**
- **Edit Photo**
- **Edit Profile**

All forms are implemented using a custom `useForm` hook with centralized validation logic.  
Validation errors are displayed clearly below input fields using styled UI elements (red error text).  
If a user attempts to submit an invalid form, a toast notification is also shown to highlight the issue.

<br>

#### Input Controls

Beyond standard text inputs, the app uses:

- **Image Picker / Camera**: Users can take a photo with the camera or select from the gallery. Implemented in **Add Photo** (uploading contest images) and **Edit Profile** (uploading avatar).
- **Switch**: Theme toggle switch available in **Settings** and Profile screens to switch between light and dark modes.
- **Slider**: A picture quality slider in **Add Photo** and **Edit Profile**, allowing users to adjust image quality before uploading.

These input types enhance usability and allow interaction beyond typing text.
<br>

### Validation Rules

Validation is handled through a reusable `validateInputField` function using predefined constants for field lengths and patterns.

Below are key validated fields:

#### Email

- Required field
- Must match a valid email pattern (regex validation)

#### Username

- Required field
- Must meet minimum length requirement

#### Password

- Required field
- Must meet minimum length requirement

#### Confirm Password (Multiple Rules)

- Required field
- Must match the entered password

#### Title (Multiple Rules)

- Required field
- Must meet minimum length
- Must not exceed maximum length

### Description (Multiple Rules)

- Required field
- Must meet minimum length
- Must not exceed maximum length

All validation rules ensure consistent data quality, prevent invalid submissions, and improve user experience through immediate feedback.

---

### Native Device Features

#### Used Native Feature

The application integrates the **Image Picker (Camera & Gallery access)** provided by the device.

<br>

#### Usage Description

The Image Picker is used in two main areas of the application:

- **Add Photo Screen:**  
  Users can take a new photo using the device camera or select an existing image from the gallery. The selected image is uploaded to Firebase Storage and stored as part of the photo submission.

- **Edit Profile Screen:**  
  Users can upload or change their avatar by choosing an image from the gallery or taking a new photo. The image is stored in Firebase Storage and linked to the user’s profile.

<br>

#### Permissions Handling

Before accessing the camera or photo library, the application requests the required device permissions.

If permission is granted, the user can proceed with image selection. If denied, the app handles the situation gracefully by preventing access and informing the user.

This ensures compliance with mobile platform security standards while providing a smooth and secure user experience.

---

### Typical User Flow

#### Guest User

1. **Launch App:** The guest opens the app and lands on the Home screen displaying all photos.
2. **Browse Photos:** The guest scrolls through photos and can pull to refresh the list.
3. **View Details:** Tapping a photo opens the Details screen to see full information (author, description, votes, voting status).
4. **Access Protected Features:** Attempting to vote, or opening the Add Photo or Profile tabs, triggers a redirect to the Login screen.
5. **Access Info & Settings Screens:** Both Info and System/Settings screens are accessible to all users. Users can view app version and switch themes regardless of authentication.

<br>

#### Authenticated User

1. **Launch & Auto-Login:** The user opens the app. If they did not log out in a previous session, Auth Context detects the existing session and automatically logs them in.
2. **Explore Photos:** Browse photos on the Home screen and pull to refresh. Tapping a photo opens the Details screen, where they can vote if the contest is open.
3. **Upload Photo:** Navigate to Add Photo to take a new picture or select from the gallery, add a title and description, and submit it. The new photo appears in their Profile.
4. **Manage Profile:** Access the Profile screen to view personal information and uploaded photos. Edit profile details (display name/avatar) or edit/delete photos.
5. **Logout:** The user can log out from the Profile screen, returning to the Home screen as a guest.
6. **Access Info & Settings Screens:** Authenticated users can also view Info and System/Settings screens. Theme switching is available for convenience in Profile screen as well.

---

### Error & Edge Case Handling

#### Authentication Errors

- **Login/Registration Failures:**  
  Incorrect credentials, weak passwords, or email conflicts trigger clear inline validation messages and a toast notification describing the problem.
- **Protected Actions for Guests:**  
  Attempting to vote, add a photo, or access the Profile tab as a guest redirects to the Login screen.

#### Network or Data Errors

- **Firestore / Storage Errors:**  
  Failures during photo fetch, image upload, or profile update show toast messages. Operations can be retried via pull-to-refresh or re-submission.
- **Error Logging:**  
  Errors are logged in the console for debugging while providing user-friendly feedback.

#### Empty or Missing Data States

- **Empty Photo Lists:**  
  Profile or Home screens show a friendly message and an action button if no photos are available.
- **No Changes Made:**  
  Attempting to save profile edits without changes triggers a toast message indicating no updates were detected.
- **Missing Required Fields:**  
  All forms prevent submission if required fields are empty or invalid, highlighting fields in red and showing a toast notification.

#### Forms Consistency

- **Inline Validation + Toast Feedback:**  
  All forms (Login, Register, Add Photo, Edit Photo, Edit Profile) follow the same pattern: inline error messages under inputs and toast notifications on submit for overall errors or success messages.

This approach ensures **robust, consistent, and user-friendly error handling** across the entire app.
