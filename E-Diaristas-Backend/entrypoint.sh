#!/bin/bash

python manage.py flush --no-input
python manage.py migrate

exec "$@"
