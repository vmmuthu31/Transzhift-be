# TranzShift - Driver and Transporter Marketplace Platform

## Overview

TranzShift is a digital platform designed to connect professional drivers with transport companies, streamlining onboarding, job management, and operational workflows. This backend application supports features like driver registration, job postings, and profile activation.

---

## Features

- **Driver Management:**

  - Registration, document upload, and profile activation.
  - Status tracking (`Pending`, `Verified`, `Active`).

- **Job Management:**

  - Job creation, approval, and matching.

- **Agent Workflow:**

  - Agent verification for drivers and jobs.

- **File Uploads:**
  - Document storage and retrieval using Multer.

---

## Prerequisites

1. **Node.js** (v14 or above)
2. **MongoDB** (local or cloud instance)
3. **npm** (comes with Node.js)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tranzshift
```

### 2. Install Dependencies

```bash
yarn
```

### 3. Configure Environment

Set up your MongoDB connection and other configurations in a `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/driverTransporterPlatform
PORT=8000
UPLOAD_DIR=uploads/
```

### 4. Start MongoDB

Make sure MongoDB is running on your local machine or connect to a cloud database.

### 5. Run the Application

```bash
yarn dev
```

---

## API Endpoints

### Driver Management

1. **Register a Driver**

   - **URL:** `/register-driver`
   - **Method:** `POST`
   - **Body (Form Data):**
     - `basicInfo` (JSON): Driver's basic details.
     - `professionalInfo` (JSON): Driver's professional details.
     - `Files:`
       - `drivingLicense`
       - `aadhaarCard`
       - `panCard`
       - `experienceCertificates`
       - `policeVerification`
       - `medicalFitnessCertificate`
   - **Response:**
     ```json
     {
         "message": "Driver registered successfully",
         "driver": { ... }
     }
     ```

2. **Verify a Driver**

   - **URL:** `/verify-driver/:id`
   - **Method:** `POST`
   - **Response:**
     ```json
     {
         "message": "Driver verified successfully",
         "driver": { ... }
     }
     ```

3. **Activate Driver Profile**
   - **URL:** `/activate-driver/:id`
   - **Method:** `POST`
   - **Response:**
     ```json
     {
         "message": "Driver profile activated",
         "driver": { ... }
     }
     ```

### Job Management

1. **Post a Job**

   - **URL:** `/post-job`
   - **Method:** `POST`
   - **Body:**
     ```json
     {
       "jobType": "Full-Time",
       "location": "Mumbai",
       "salary": 25000,
       "experienceRequired": "2 years",
       "vehicleType": "Truck",
       "routeDetails": "Delhi-Mumbai"
     }
     ```
   - **Response:**
     ```json
     {
         "message": "Job posted successfully",
         "job": { ... }
     }
     ```

2. **Approve a Job**
   - **URL:** `/approve-job/:id`
   - **Method:** `POST`
   - **Response:**
     ```json
     {
         "message": "Job approved successfully",
         "job": { ... }
     }
     ```

---

## Folder Structure

```plaintext
tranzshift/
├── app.js           # Main application file
├── models/          # MongoDB schemas and models
├── routes/          # API route handlers
├── uploads/         # Directory for uploaded files
├── package.json     # Project metadata and dependencies
└── README.md        # Documentation
```

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License.

---

## Contact

For any inquiries, please contact:

- **Email:** support@tranzshift.com
- **Slack:** `#tranzshift-devs`
