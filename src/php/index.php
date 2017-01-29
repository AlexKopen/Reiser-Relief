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
$app['twig']->addGlobal('RootURL', 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI']);

$app->get('/', function () use ($app) {
    return $app['twig']->render('home.twig', array(
        'Title' => 'Home'
    ));
});

$app->error(function () use ($app) {
    return $app['twig']->render('404.twig', array(
        'Title' => 'Not Found'
    ));
});

$app->run();

?>
