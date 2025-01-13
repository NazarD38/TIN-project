# Assassins-project

## Overview
**Assassins-project** to aplikacja internetowa służąca do zarządzania zabójcami, ich umiejętnościami, bronią i powiązanymi organizacjami. Projekt obejmuje takie funkcje, jak operacje CRUD, uwierzytelnianie oparte na rolach i paginacja, co czyni go idealnym systemem do organizowania i zarządzania powiązanymi danymi.

---

## Features
- **Assassins Management**:
  - Add, edit, delete, and view detailed assassin information such as:
    - Name
    - Specialization
    - Description
    - Weapons of current assassin
    - Skills of current assassin
    - Associated organization
- **Organizations Management**:
  - Manage organization details, including:
    - Name
    - Headquarters
    - Founded year
- **Skills Management**:
  - Add, update, delete, views and assign skills to assassins.
  - Include proficiency levels and notes for assassin-specific skills.
- **Weapons Management**:
  - Add, update, delete,views and link weapons to assassins.
- **User Management**:
  - Authentication: Secure login, registration, and logout.
  - Authorization: Role-based access control (e.g., admin, user, weaponsmith, witch).
- **Pagination**:
  - Efficiently handle large datasets for all entities.

---

## Technologies Used
- **Backend**: Node.js, Express.js
- **Frontend**: EJS templating, HTML, CSS
- **Database**: MySQL
- **Authentication**: bcrypt for password hashing, cookie-based sessions
- **Middleware**:
  - User authentication
  - Role-based access control
---


## Functionality Overview

| **Functionality**                 | **Description**                                            | **Access Control**                                           |
|-----------------------------------|------------------------------------------------------------|-------------------------------------------------------------|
| **Add Assassin**                  | Allows adding a new assassin                               | Requires a logged-in user with the **admin** role           |
| **Edit Assassin**                 | Allows editing assassin details                            | Requires a logged-in user with the **admin** role           |
| **Delete Assassin**               | Allows deleting an assassin                                | Requires a logged-in user with the **admin** role           |
| **View Assassin List**            | Displays a paginated list of assassins                    | Accessible to logged-in users (**admin, user**)             |
| **View Assassin Details**         | Displays details of an assassin, including weapons and skills | Accessible to logged-in users (**admin, user**)             |
| **Manage Organizations**          | Add, edit, and delete organizations                       | Requires a logged-in user with the **admin** role           |
| **Manage Weapons**                | Add, edit, and delete weapons                             | Requires a logged-in user with the **weaponsmith** role     |
| **Manage Skills**                 | Add, edit, and delete skills                              | Requires a logged-in user with the **witch** role           |
| **Manage Users**                  | Update user roles                                         | Requires a logged-in user with the **admin** role           |




---

## Database Schema

### Assassin Table
| Column          | Type        | Description                         |
|-----------------|-------------|-------------------------------------|
| id              | INT         | Primary key                        |
| name            | VARCHAR     | Name of the assassin               |
| specialization  | VARCHAR     | Assassin's area of expertise       |
| description     | TEXT        | Brief description                  |
| price           | DECIMAL     | Price for the assassin's service   |
| image_url       | VARCHAR     | Path to the assassin's image       |
| organization_id | INT         | Foreign key referencing the Organization table |

### Organization Table
| Column          | Type        | Description                         |
|-----------------|-------------|-------------------------------------|
| id              | INT         | Primary key                        |
| name            | VARCHAR     | Name of the organization           |
| headquarters    | VARCHAR     | Headquarters location              |
| founded_year    | INT         | Year the organization was founded  |

### Skill Table
| Column          | Type        | Description                         |
|-----------------|-------------|-------------------------------------|
| id              | INT         | Primary key                        |
| name            | VARCHAR     | Name of the skill                  |
| description     | TEXT        | Detailed description               |

### Weapon Table
| Column          | Type        | Description                         |
|-----------------|-------------|-------------------------------------|
| id              | INT         | Primary key                        |
| name            | VARCHAR     | Name of the weapon                 |
| type            | VARCHAR     | Weapon type (e.g., Blade, Rifle)   |
| damage          | DECIMAL     | Damage rating                      |
| description     | TEXT        | Weapon description                 |
| assassin_id     | INT         | Foreign key referencing the Assassin table |

### User Table
| Column          | Type        | Description                         |
|-----------------|-------------|-------------------------------------|
| id              | INT         | Primary key                        |
| username        | VARCHAR     | Username                           |
| password        | VARCHAR     | Hashed password                    |
| role            | VARCHAR     | User role (e.g., admin, user)      |

---

## API Endpoints

### Assassins
- **GET `/assassins`**: Fetch a paginated list of all assassins.
- **GET `/assassins/:id`**: Retrieve details of a specific assassin.
- **POST `/assassins/add`**: Add a new assassin.
- **POST `/assassins/edit/:id`**: Edit an existing assassin.
- **POST `/assassins/delete/:id`**: Delete an assassin.

### Organizations
- **GET `/organizations`**: Fetch a paginated list of all organizations.
- **GET `/organizations/:id`**: Retrieve details of a specific organization.
- **POST `/organizations/add`**: Add a new organization.
- **POST `/organizations/edit/:id`**: Edit an organization's details.
- **POST `/organizations/delete/:id`**: Delete an organization.

### Skills
- **GET `/skills`**: Fetch a paginated list of all skills.
- **GET `/skills/:id`**: Retrieve details of a specific skill.
- **POST `/skills/add`**: Add a new skill.
- **POST `/skills/edit/:id`**: Edit an existing skill.
- **POST `/skills/delete/:id`**: Delete a skill.

### Weapons
- **GET `/weapons`**: Fetch a paginated list of all weapons.
- **GET `/weapons/:id`**: Retrieve details of a specific weapon.
- **POST `/weapons/add`**: Add a new weapon.
- **POST `/weapons/edit/:id`**: Edit an existing weapon.
- **POST `/weapons/delete/:id`**: Delete a weapon.

### Users
- **GET `/users`**: Fetch a paginated list of all users.
- **POST `/users/update-role`**: Update the role of a specific user.
- **POST `/users/delete/:id`**: Delete a user.

---

## User Roles
The system supports role-based access control:
- **Admin**: Full access to all features and data.
- **User**: Can view limited data on assassins and organizations.
- **Weaponsmith**: Manage weapons (add, edit, delete).
- **Witch**: Manage skills (add, edit, delete).

---

## Steps to Run the Application

1. **Install dependencies**:
   npm install
   
## Set Up the Database
1. **Database Requirement**:
   - Ensure MySQL (version 8.0 or later) is installed on your system.

2. **Create the Database**:
   - Access your MySQL instance (e.g., via `mysql` CLI or a database management tool).
   - Run the following command to create the database:
     ```sql
     CREATE DATABASE system_assassin;
     ```

3. **Configure the Database Connection**:
   - Open the `pool.js` file in your project.
   - Update the database configuration to match your environment:
     ```javascript
     const mysql = require('mysql2/promise');
     const pool = mysql.createPool({
         host: 'localhost',
         user: 'your_username', // Replace with your MySQL username
         password: 'your_password', // Replace with your MySQL password
         database: 'system_assassin',
     });

     module.exports = pool;
     ```

4. **Run Migrations**:
   - Execute the SQL scripts provided in the project directory to set up the necessary tables:
     ```bash
     mysql -u your_username -p system_assassin < path_to_migration.sql
     ```
   - Replace `path_to_migration.sql` with the path to your SQL script.

---

## Start the Application

1. **Install Dependencies**:
   Run the following command to install all required dependencies:
   ```bash
   npm install
