FROM php:7.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
      unzip

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# RUN composer install

# Set working directory
WORKDIR /var/www/api