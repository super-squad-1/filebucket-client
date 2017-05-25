# Filebucket client

<!-- * A short description of your application -->
Filebucket is a Dropbox-like app that allows users to upload files into a
virtual file system. Anyone can read or dowload files and owners can delete
or rename their own files. Filebucket stores information for the files on a
MongooseDB database and stores the files in an AWS S3 bucket. The client is
built using Bootstrap and Handlebars

<!-- * A brief explanation of the technologies (Node modules, Express middleware etc) used. -->

## Approach
For the front-end we primarily worked in pairs, switching drivers regularly.  This
enabled us to problem solve together.  We also broke it into small steps so that we could commit regularly once we knew our code for that step was functional.

## Challenges
<!-- * Notes on any unsolved problems or major hurdles your team had to overcome. -->
Intially we were challenged with git merging without hitting any conflicts.  We overcame this by always working on a feature branch and assigning roles for merging in to development.  Communication was important in order to achieve this.

## Dependencies
```npm install``` to install dependencies

## Data Models
<!-- * A link to your ERD - what data models does your app use? -->
http://imgur.com/S4wFmJe

## Wireframes
http://imgur.com/sQDYgyl
http://imgur.com/wCyj8U3

## Project Links
[FRONTEND-DEPLOY]  https://super-squad-1.github.io/filebucket-client/
[FRONTEND-REPO]  https://github.com/super-squad-1/filebucket-client
[BACKEND-DEPLOY]  https://safe-retreat-33747.herokuapp.com
[BACKEND-REPO]  https://github.com/super-squad-1/filebucket-server

## User Stories

Before Sign In:
- User can Sign Up
- User can Sign In

After Sign In:
- User can Change Password
- User can Sign Out

All Users can:
- See files
- Upload a file
- View a file
- Download a file

Owner Users can:
- Delete their files
- Rename their file's title

### Authentication Stories

**User Story: User Sign Up (Create)**

As an unregistered user, I want to sign up and create an account so I can use the application.

**User Story: User Sign In (Read)**
As a registered user, I want to sign in so I can access my files.

**User Story: User Change Password (Update)**
As an authenticated user, I want to change my password so that my account remains secure.

**User Story: User Sign Out (Destroy)**
As an authenticated user, I want to sign out so I can end my session with my account secure.

### File Management Stories

**User Story: File Upload (Create)**
As an authenticated user, I want to upload a file so that is accessible to myself and others.

**User Story: File Index (Read)**
As an authenticated user, I want to see a list of files.

**User Story: File Rename (Update)**
As an authenticated user, I want to rename a file so its name accurately reflects the file contents.

**User Story: File Delete (Destroy)**
As an authenticated user, I want to delete a file because I no longer want it stored in the system.

**User Story: File Download (Read)**
As an authenticated user, I want to download a file so that I can use it locally.

**User Story: File Properties (Read)**
As a user, I want to see the properties of a file so that I can know more information about the file.
