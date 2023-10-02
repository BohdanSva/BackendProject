# Backend Project - Simplified Property CRM System

## This project intends create a fully functioning React Toolkit application to run 3 interrelated databases - of property, investors and contacts - allowing the user to manage all 3, and implements a Role-Based Access Control that allows an admin to see all user interactions. 

---

## Project Documentation

Included in the project folder are:

- [x] Assets
    - Favicons
    - Images

- [x] Stylesheets
    - The stylesheet index.css is the top-level stylesheet controlling the React application's styles
    - Individual CSS and SCSS stylesheets have been created on an as-needed basis per individual components

- [x] Component JSX files
    1. Account control
        - Secured login page
        - Register new user page, registration successful page
        - Unauthorised access page (users can't view admin pages, anonymous users can't view user pages)
    2. Menu
        - Menu landing page for admin and user each
        - Separate navbar for admin and user
    3. Property portal 
        - Pagination
        - Search properties
        - Show in imperial / metric system switch
        - Add new property
        - Detailed veiw
            - Edit details
            - Delete property
            - Upload image
    4. Investor portal
        - Pagination
        - Search investors
        - Add new investor
        - Detailed view
            - Edit details
            - Replace contact person
            - Delete investor
    5. People portal
        - Pagination
        - Search contacts by any database column
        - Import contacts from Excel into SQL database
        - Export contacts from SQL database into Excel
        - Add new contact
    6. Blog
        - Blog summary page
        - Indiviudal blog post page using slug / useParams
        - Admin ability to delete and edit blog posts
    7. Not found page
        - Shown only in error 404 instances

- [x] Other files
    1. Utils
        - Formatting functions to format output based on local date, currency and area measurement formats
    2. Dotenv file

- [x] This project documentation Markdown file

---

## APIs Used

1. None

---

## Libraries Used

### Backend
- Nodemon
- Express
- CORS
- Body Parser
- MySQL
- UUID
- SHA256
- Express Rate Limit
- Helmet
- Multer
- Path
- Dotenv

### Frontend
- Axios
- Bootstrap (via CDN)
- React Router DOM
- React Select
- React Paginate
- React Icons
- React Toastify
- SASS
- XLSX

---

## Viewport Breakpoints

- The application is using breakpoints at:
    - Desktop: >= 1024px
    - Tablet: 1023px - 768px
    - Smartphone: <= 767px

- The breakpoints are implemented in the relevant CSS files and by utilizing Bootstrap breakpoint class nomenclature. 

- The mobile version has been optimised for iPhone 12 Pro.
