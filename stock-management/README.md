# Please follow the instructions

`Server Requirements:` Php server & CLI version >= 8.1 <br>

- clone this git repository <br>
- copy .env.example to .env <br>
- configure all info in .env <br>
- run command <code>composer install</code> <br>
- run command <code>php artisan migrate</code><br>
- run command <code>php artisan key:generate</code> <br>
- copy passport oauth public & private keys from system microservice **_storage_** folder and past to current microservice **_storage_** folder <br>
- copy passport credentials from system microservices and update to .env <br>
- copy rabbitmq credentials from system microservices and update to .env <br>
- run command <code>php artisan storage:link</code>
- run command <code>php artisan optimize:clear</code>

# Docker user? Please follow this instructions

- clone this git repository <br>
- copy .env.example to .env <br>
- configure all info in .env <br>
- run command <code>docker-compose up --build -d</code> <br>
- run command <code>docker-compose exec product_app composer install</code> <br>
- run command <code>docker-compose exec product_app php artisan migrate</code><br>
- run command <code>docker-compose exec product_app php artisan key:generate</code> <br>
- copy passport oauth public & private key from system microservice **_storage_** folder and past to current microservice **_storage_** folder <br>
- copy passport credentials from system microservices and update to .env <br>
- copy rabbitmq credentials from system microservices and update to .env <br>
- run command <code>docker-compose exec product_app php artisan storage:link</code>
- run command <code>docker-compose exec product_app php artisan optimize:clear</code>
- access url _**[http://lvh.me:8081](http://lvh.me:8081/)**_




