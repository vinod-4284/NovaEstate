# NovaEstate Full Stack
Frontend: HTML/CSS/JavaScript + Leaflet
Backend: Java 21 + Spring Boot 3 + Spring Security + JWT + JPA + MySQL

## Database
Create MySQL database `novaestate` or let Hibernate create it.
Default credentials in application.properties:
root / root
Change these for your machine.

## Run backend
cd backend
mvn spring-boot:run

## Run frontend
cd frontend
python -m http.server 5500
Open http://localhost:5500/login.html

Demo account:
vinod@novaestate.com / MXXX@4XXX4
demo@novaestate.com / 123456

## API
POST /api/auth/login
POST /api/auth/register
GET /api/properties
GET /api/properties/{id}
POST /api/properties (JWT)
PUT /api/properties/{id} (JWT)
DELETE /api/properties/{id} (JWT)
GET /api/profile (JWT)
PUT /api/profile (JWT)
