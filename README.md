### Prerequisite:

1. Install yarn - `npm install -g yarn`


### Project setup instruction

1. Clone this repo
2. Copy .env.example to .env
3. Create db and configure everyting in .env
4. Run `composer install`
5. Run `php artisan key:generate`
6. Run `php artisan migrate --seed`
7. Run `php artisan storage:link`
8. Run `yarn`
9. For front-end/spa application run `yarn dev` & for backend/admin-panel run `yarn watch`

### Prerequisites
Ensure the following software is installed on your local machine and server:

1. PHP (preferably PHP 8.x)
2. Composer (for PHP dependency management)
3. Node.js and npm (for front-end dependencies)
4. MySQL (for database management)
5. RabbitMQ (for handling queues)
6. Git (for version control)
7. Docker (optional, for local environment setup)
8. AWS CLI or equivalent server management tools (for deploying via CI/CD)
