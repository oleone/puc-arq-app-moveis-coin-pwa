'use strict';

const CACHE_NAME = "coin_exposer_estatico";

const FILES_CACHE = [
    'css/animate.min.css',
    'css/bootstrap.min.css',
    'css/main.css',
    'images/logo.png',
    'js/bootstrap.bundle.min.js',
    'fonts/Poppins-Regular.ttf',
    'offline.html',
    'js/main.js',
    'service_worker.js',
    'manifest.json',
    'api/criptocurrency-list.json',
    'api/criptocurrency.json',
];

//Instalação e Ativação do PWA

self.addEventListener('activate', (evt) => {

    evt.waitUntil(

        caches.keys().then((keylist) => {

            return Promise.all(keylist.map((key) => {

                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }

            }));

        })
    )
});

self.addEventListener('install', (evt) => {

    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Service Worker: registrando caches estáticos");
            return cache.addAll(FILES_CACHE);
        })
    );

    self.skipWaiting();

});

//Responder a Experiência Off-line

self.addEventListener('fetch', (evt) => {

    if (evt.request.mode !== 'navigate') {
        return;
    }

    evt.respondWith(

        fetch(evt.request).catch(() => {

            return caches.open(CACHE_NAME).then((cache) => {

                return cache.match('offline.html');

            });

        })

    );

});