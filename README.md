
# Tele Medecine website

The Telemedicine Service platform provides remote healthcare services, allowing users to consult doctors, schedule appointments, and manage medical records online. It supports both patients and doctors with features such as profile management, appointment booking, medical file handling, and payment options. The backend handles user authentication, appointment scheduling, and billing, offering a convenient and efficient telemedicine experience for users seeking medical advice from the comfort of their homes.


## API References
base api = localhost:5000/api/v1
This section outlines the available routes for the Telemedicine Service API.

### User Routes
- **GET** `/user` - Get user information.
- **POST** `/user` - Create a new user.

### Authentication Routes
- **POST** `/auth/register` - Register a new user.
- **POST** `/auth/login` - Login with credentials and receive a token.

### Admin Routes
- **GET** `/admin/dashboard` - Retrieve admin dashboard data.

### Doctor Routes
- **GET** `/doctor` - List all doctors.
- **POST** `/doctor` - Add a new doctor.

### Patient Routes
- **GET** `/patients` - List all patients.
- **POST** `/patients` - Register a new patient.

### Schedule Routes
- **GET** `/schedules` - Get all available schedules.
- **POST** `/schedules` - Create a new schedule.

### Doctor Schedule Routes
- **GET** `/doctor-schedules` - Get doctor-specific schedules.

### Appointment Routes
- **GET** `/appointment` - Retrieve all appointments.
- **POST** `/appointment` - Create a new appointment.

### Payment Routes
- **POST** `/payment` - Process a payment.

### Prescription Routes
- **GET** `/prescription` - List all prescriptions.
- **POST** `/prescription` - Create a new prescription.

### Review Routes
- **GET** `/review` - Get all reviews.
- **POST** `/review` - Add a new review.

### Meta Routes
- **GET** `/meta` - Retrieve meta information.

### Specialties Routes
- **GET** `/specialties` - List all specialties.

## Appendix A

This appendix provides an overview of the database schema for the Telemedicine Service backend, based on the Prisma ORM. It defines models for different entities such as Users, Doctors, Patients, Appointments, Payments, and more. The schema includes various relationships between models, such as one-to-many and many-to-many, and defines enums for status and roles.

You can find the full schema in the prisma/schema.prisma file.

## Appendix B

Here are the key environment variables required for the project:

DATABASE_URL: Connection string to your PostgreSQL database.
NODE_ENV: Defines the environment (e.g., development, production).
PORT: Port where the server runs.
JWT_SECRET: Secret key for JWT token signing.
EXPIRES_IN: Expiration time for JWT tokens.
REFRESH_TOKEN_SECRET: Secret key for refresh token signing.
RESET_PASS_TOKEN: Secret used for password reset tokens.
For more information, refer to the .env file in the repository.


## Appendix C:Routes
The project uses Express for routing. Here's a quick reference to the API routes available in the backend:

>/user: Handles user-related endpoints.
/admin: Manages admin-related routes.
>/auth: Authentication routes.
/doctor: Doctor-specific routes.
>/patients: Patient-related routes.
/appointments: Routes for managing appointments.
>/payment: Handles payment-related routes.
/prescription: Prescription management routes.
>/review: Patient and doctor review routes.
For more detailed information on each route, see the respective module routes in the routes folder.### Environment Variables

- **DATABASE_URL**: PostgreSQL connection string for the database.
  - Example: `postgresql://username:password@localhost:5432/healtcare_service?schema=public`
  
- **NODE_ENV**: Set the environment (e.g., `development`, `production`).
  - Example: `development`
  
- **PORT**: The port your server will run on.
  - Example: `5000`
  
- **JWT_SECRET**: Secret key used for signing JWT tokens.
  - Example: `Secret`

- **EXPIRES_IN**: Expiration time for JWT tokens.
  - Example: `5m`
  
- **REFRESH_TOKEN_SECRET**: Secret key for refreshing tokens.
  - Example: `secret`

- **REFRESH_TOKEN_EXPIRES_IN**: Expiration time for refresh tokens.
  - Example: `365d`
  
- **RESET_PASS_TOKEN**: Secret token used for password reset.
  - Example: `secret`
  
- **RESET_PASS_TOKEN_EXPIRES_IN**: Expiration time for password reset token.
  - Example: `5m`
  
- **FORGET_PASS**: Token used for forgot password functionality.
  - Example: `secret`
  
- **FORGET_EMAIL**: Email address used for sending forget password emails.
  - Example: `example5@gmail.com`

- **RESET_PASS_LINK**: URL for password reset page.
  - Example: `http://localhost:8080/reset-password`
  
- **STORE_ID**: Store ID for payment gateway.
  - Example: `secret`
  
- **STORE_PASSWORD**: Store password for payment gateway.
  - Example: `secret@ssl`
  
- **SUCCESS_URL**: URL for a successful payment response.
  - Example: `http://localhost:8080/payment`
  
- **FAIL_URL**: URL for failed payment response.
  - Example: `http://localhost:8080`
  
- **CANCEL_URL**: URL for canceled payment response.
  - Example: `http://localhost:3030/cancel`
  
- **SSL_PAYMENT_API**: API endpoint for payment processing.
  - Example: `secret`
  
- **SSL_VALIDATION_API**: API endpoint for payment validation.
  - Example: `secret`



## Running Tests

To run tests, run the following command

```bash
  npm run dev
```


## Run Locally

Clone the project

```bash
  git clone https://github.com/foysal5965/telemedicine-service-backend/tree/main
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

