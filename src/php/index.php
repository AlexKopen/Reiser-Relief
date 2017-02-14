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
$app['twig']->addGlobal('RootURL', 'http://localhost/Reiser-Relief/dist/');

$app->get('/', function () use ($app) {
    return $app['twig']->render('home.twig', array(
        'Title' => 'Home',
        'SlideShowImages' => array(
            array('Url' => 'banner1.jpg', 'Alt' => 'Banner 1'),
            array('Url' => 'banner2.jpg', 'Alt' => 'Banner 2'),
            array('Url' => 'banner3.jpg', 'Alt' => 'Banner 3'),
            array('Url' => 'banner4.jpg', 'Alt' => 'Banner 4')
        )
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
