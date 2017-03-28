<?php

require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/php/urls.php';

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
            array(
                'Url' => 'experience-slide.jpg',
                'Alt' => 'Experience',
                'Header' => 'Leave your Comfort Zone',
                'Description' => 'Experience the opportunity of a lifetime by applying for a mission trip to Haiti'
            ),
            array(
                'Url' => 'work-slide.jpg',
                'Alt' => 'Our Work',
                'Header' => 'What we Do',
                'Description' => 'Learn more about Reiser Relief including our work, upcoming events, and ways you can help'
            ),
            array(
                'Url' => 'support-slide.jpg',
                'Alt' => 'Support Us',
                'Header' => 'Give Today',
                'Description' => 'Help those in need with a donation which will provide water, food, care, and so much more'
            )
        )
    ));
});

$app->get('/about', function () use ($app) {
    return $app['twig']->render('about.twig', array(
        'Title' => 'About',
        'DisplayTitle' => 'About Us'
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
        'Title' => 'Contact!'
    ));
});

$app->error(function () use ($app) {
    return $app['twig']->render('404.twig', array(
        'Title' => 'Not Found'
    ));
});

$app->run();

?>
