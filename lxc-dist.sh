#!/bin/ash

APP_DIR=/libri-mei

rm -rf "${APP_DIR}"

mkdir -p "${APP_DIR}"

cp -R ./public "${APP_DIR}"
cp -R ./.next/standalone/* "${APP_DIR}"
cp -R ./.next/standalone/.next "${APP_DIR}"
cp -R ./.next/static "${APP_DIR}/.next"

echo "NODE_ENV=production" > "${APP_DIR}/.env"
echo "NEXT_TELEMETRY_DISABLED=1" >> "${APP_DIR}/.env"
echo "PORT=80" >> "${APP_DIR}/.env"
echo "HOSTNAME='0.0.0.0'" >> "${APP_DIR}/.env"
echo "LIBRARY_FOLDER=/elibrary" >> "${APP_DIR}/.env"

cp ./lxc-initd.alpine /etc/init.d/libri-mei

rc-update add libri-mei
rc-service libri-mei stop
rc-service libri-mei start
