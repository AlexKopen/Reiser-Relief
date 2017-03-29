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
$RootURL = 'http://localhost/Reiser-Relief/dist/';
$app['twig']->addGlobal('RootURL', $RootURL);

$app->get('/', function () use ($app) {
    return $app['twig']->render('home/home.twig', array(
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

$AboutTitle = 'About';
$AboutDisplayTitle = 'About Us';

$app->get('/about', function () use ($app, $RootURL) {
    return $app->redirect($RootURL . 'about/our-mission');
});

$app->get('/about/our-mission', function () use ($app, $AboutTitle, $AboutDisplayTitle) {
    return $app['twig']->render('about/our-mission.twig', array(
        'Title' => $AboutTitle,
        'DisplayTitle' => $AboutDisplayTitle,
        'Active' => 'Our Mission'
    ));
});

$app->get('/about/our-work', function () use ($app, $AboutTitle, $AboutDisplayTitle) {
    return $app['twig']->render('about/our-work.twig', array(
        'Title' => $AboutTitle,
        'DisplayTitle' => $AboutDisplayTitle,
        'Active' => 'Our Work'
    ));
});

$app->get('/about/our-board', function () use ($app, $AboutTitle, $AboutDisplayTitle) {
    return $app['twig']->render('about/our-board.twig', array(
        'Title' => $AboutTitle,
        'DisplayTitle' => $AboutDisplayTitle,
        'Active' => 'Our Board'
    ));
});

$app->get('/about/our-founder', function () use ($app, $AboutTitle, $AboutDisplayTitle) {
    return $app['twig']->render('about/our-founder.twig', array(
        'Title' => $AboutTitle,
        'DisplayTitle' => $AboutDisplayTitle,
        'Active' => 'Our Founder'
    ));
});

$app->get('/events', function () use ($app) {
    return $app['twig']->render('events/events.twig', array(
        'Title' => 'Events',
        'DisplayTitle' => 'Events'
    ));
});

$app->get('/experience', function () use ($app) {
    return $app['twig']->render('experience/experience.twig', array(
        'Title' => 'Experience'
    ));
});

$app->get('/give', function () use ($app) {
    return $app['twig']->render('give/give.twig', array(
        'Title' => 'Give'
    ));
});

$app->get('/contact', function () use ($app) {
    return $app['twig']->render('contact/contact.twig', array(
        'Title' => 'Contact'
    ));
});

$app->error(function () use ($app) {
    return $app['twig']->render('common/404.twig', array(
        'Title' => 'Not Found'
    ));
});

$app->run();

?>
