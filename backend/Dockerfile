FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip git curl \
    && docker-php-ext-install pdo_mysql zip

# Set working directory
WORKDIR /var/www/html

# Copy Laravel project (make sure this includes artisan!)
COPY ./laravel/ /var/www/html/

# Make artisan executable
RUN chmod +x /var/www/html/artisan

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# OPTIONAL: Set permissions (skip if slow on build)
# RUN chown -R www-data:www-data /var/www/html \
#     && chmod -R 755 /var/www/html

# Expose port
EXPOSE 8000

# Run Laravel dev server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
