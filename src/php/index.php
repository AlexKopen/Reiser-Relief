<?php

require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/urls.php';

$app = new Silex\Application();
$app['debug'] = true;

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/resources/templates',
));

$app['twig']->addGlobal('MasterStyleSheet', $masterStylesheet);
$app['twig']->addGlobal('MasterScript', $masterScript);
$url = 'http://localhost/Reiser-Relief/dist/';
$app['twig']->addGlobal('RootURL', $url);

$app->get('/', function () use ($app) {
    return $app['twig']->render('home.twig', array(
        'Title' => 'Home'
    ));
});

$app->get('/about', function () use ($app) {
    return $app['twig']->render('about.twig', array(
        'Title' => 'About'
    ));
});

$app->get('/events', function () use ($app) {
    return $app['twig']->render('events.twig', array(
        'Title' => 'Events'
    ));
});

$app->get('/experience', function () use ($app) {
    return $app['twig']->render('experience.twig', array(
        'Title' => 'Experience'
    ));
});

$app->get('/give', function () use ($app) {
    return $app['twig']->render('give.twig', array(
        'Title' => 'Give'
    ));
});

$app->get('/contact', function () use ($app) {
    return $app['twig']->render('contact.twig', array(
        'Title' => 'Contact'
    ));
});

$app->error(function () use ($app) {
    return $app['twig']->render('404.twig', array(
        'Title' => 'Not Found'
    ));
});

$app->run();

?>
