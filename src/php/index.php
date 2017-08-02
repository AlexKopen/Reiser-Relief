<?php

require_once __DIR__ . '/vendor/autoload.php';
use Symfony\Component\HttpFoundation\Request;

require_once __DIR__ . '/admin/database.php';

$assets = file_get_contents('assets.json');
$assetsJson = json_decode($assets, true);
$masterStylesheet = 'resources/css/' . $assetsJson['style.css'];
$masterScript = 'resources/js/' . $assetsJson['all.min.js'];

$settings = file_get_contents('admin/settings.json');
$settingsJson = json_decode($settings, true);
$rootURL = $settingsJson['rootURL'];
$production = $settingsJson['production'];

$app = new Silex\Application();
$app['debug'] = !$production;

$twigParameters = array(
    'twig.path' => __DIR__ . '/resources/templates'
);

if ($production) {
    $twigParameters['twig.options'] = array(
        'cache' => __DIR__ . '/cache',
    );
}

$app->register(new Silex\Provider\TwigServiceProvider(), $twigParameters);

$app['twig']->addGlobal('RootURL', $rootURL);
$app['twig']->addGlobal('Production', $production);
$app['twig']->addGlobal('MasterStyleSheet', $masterStylesheet);
$app['twig']->addGlobal('MasterScript', $masterScript);
$app['twig']->addGlobal('Year', date("Y"));

$pages = [
    "about",
    "events",
    "experience",
    "give",
    "contact"
];

$app->get('/', function () use ($app, $news, $rootURL) {
    return $app['twig']->render('home/home.twig', array(
        'Title' => 'Home',
        'SlideShowImages' => array(
            array(
                'Url' => 'experience-slide.jpg',
                'Alt' => 'Experience',
                'Header' => 'Visit Haiti',
                'Description' => 'Experience the opportunity of a lifetime by applying for a mission trip to Haiti',
                'Link' => $rootURL . 'experience'
            ),
            array(
                'Url' => 'work-slide.jpg',
                'Alt' => 'Our Work',
                'Header' => 'What we Do',
                'Description' => 'Learn more about Reiser Relief including our work, upcoming events, and ways you can help',
                'Link' => $rootURL . 'about'
            ),
            array(
                'Url' => 'support-slide.jpg',
                'Alt' => 'Support Us',
                'Header' => 'Give Today',
                'Description' => 'Help those in need with a donation which will provide water, food, care, and so much more',
                'Link' => $rootURL . 'give'
            )
        ),
        'News' => $news
    ));
});

$AboutTitle = 'About';
$AboutDisplayTitle = 'About Us';

$app->get('/about/our-work', function () use ($app, $AboutTitle, $AboutDisplayTitle) {
    return $app['twig']->render('about/about.twig', array(
        'Title' => $AboutTitle,
        'DisplayTitle' => $AboutDisplayTitle,
        'Active' => 'Our Work'
    ));
});

$app->get('/about/our-board', function () use ($app, $AboutTitle, $AboutDisplayTitle) {
    return $app['twig']->render('about/about.twig', array(
        'Title' => $AboutTitle,
        'DisplayTitle' => $AboutDisplayTitle,
        'Active' => 'Our Board'
    ));
});

$app->get('/about/our-founder', function () use ($app, $AboutTitle, $AboutDisplayTitle) {
    return $app['twig']->render('about/about.twig', array(
        'Title' => $AboutTitle,
        'DisplayTitle' => $AboutDisplayTitle,
        'Active' => 'Our Founder'
    ));
});

$EventsTitle = 'Events';

$app->get('/events/keep-the-wheel-turning', function () use ($app, $EventsTitle) {
    return $app['twig']->render('events/events.twig', array(
        'Title' => $EventsTitle,
        'DisplayTitle' => $EventsTitle,
        'Active' => 'Keep the Wheel Turning'
    ));
});

$app->get('/events/give-to-the-max-day', function () use ($app, $EventsTitle) {
    return $app['twig']->render('events/events.twig', array(
        'Title' => $EventsTitle,
        'DisplayTitle' => $EventsTitle,
        'Active' => 'Give to the Max Day'
    ));
});

$app->get('/experience', function () use ($app, $questions) {
    return $app['twig']->render('experience/experience.twig', array(
        'Title' => 'Experience',
        'DisplayTitle' => 'Experience',
        'Questions' => $questions
    ));
});

$app->get('/experience/trip-dates', function () use ($app) {
    return $app['twig']->render('experience/trip-dates.twig', array(
        'Title' => 'Experience - Mission Trip Selection',
        'DisplayTitle' => 'Experience - Mission Trip Selection'
    ));
});

$app->get('/experience/apply', function () use ($app) {
    return $app['twig']->render('experience/apply.twig', array(
        'Title' => 'Experience - Apply',
        'DisplayTitle' => 'Experience - Mission Trip Application'
    ));
});

$app->post('/experience/apply/apply-submit', function (Request $request) use ($app) {
    $formData = array(
        'first' => $request->get('first'),
        'middle' => $request->get('middle'),
        'last' => $request->get('last'),
        'addressLine1' => $request->get('address-line-1'),
        'addressLine2' => $request->get('address-line-2'),
        'city' => $request->get('city'),
        'state' => $request->get('state'),
        'zip' => $request->get('zip'),
        'homePhone' => $request->get('home-phone'),
        'cellPhone' => $request->get('cell-phone'),
        'email' => $request->get('email'),
        'month' => $request->get('month'),
        'day' => $request->get('day'),
        'year' => $request->get('year'),
        'nationality' => $request->get('nationality'),
        'birthPlace' => $request->get('birth-place'),
        'maidenName' => $request->get('maiden-name'),
        'maritalStatus' => $request->get('marital-status'),
        'gender' => $request->get('gender'),
        'passportNumber' => $request->get('passport-number'),
        'passportIssueDateMonth' => $request->get('passport-issue-date-month'),
        'passportIssueDateDay' => $request->get('passport-issue-date-day'),
        'passportIssueDateYear' => $request->get('passport-issue-date-year'),
        'passportExpirationDateMonth' => $request->get('passport-expiration-date-month'),
        'passportExpirationDateDay' => $request->get('passport-expiration-date-day'),
        'passportExpirationDateYear' => $request->get('passport-expiration-date-year'),
        'question1' => $request->get('question-1'),
        'question2' => $request->get('question-2'),
        'question3' => $request->get('question-3'),
        'question4' => $request->get('question-4'),
        'question5' => $request->get('question-5'),
        'question6' => $request->get('question-6'),
        'person1Name' => $request->get('person-1-name'),
        'person1Relationship' => $request->get('person-1-relationship'),
        'person1Phone' => $request->get('person-1-phone'),
        'person1Email' => $request->get('person-1-email'),
        'person2Name' => $request->get('person-2-name'),
        'person2Relationship' => $request->get('person-2-relationship'),
        'person2Phone' => $request->get('person-2-phone'),
        'person2Email' => $request->get('person-2-email')
    );

    $formSuccess = submitApplication($formData);

    return $app['twig']->render('experience/apply-submit.twig', array(
        'Title' => 'Experience - Apply',
        'DisplayTitle' => 'Experience - Mission Trip Application',
        'FormSuccess' => $formSuccess
    ));
});

$app->get('/give', function () use ($app) {
    return $app['twig']->render('give/give.twig', array(
        'Title' => 'Give',
        'DisplayTitle' => 'Give'
    ));
});

$app->get('/contact', function () use ($app) {
    return $app['twig']->render('contact/contact.twig', array(
        'Title' => 'Contact',
        'DisplayTitle' => 'Contact Us'
    ));
});

$app->post('/contact/contact-submit', function (Request $request) use ($app) {
    $formData = array('name' => $request->get('name'),
        'email' => $request->get('email'),
        'subject' => $request->get('subject'),
        'message' => $request->get('message')
    );

    $formSuccess = submitContact($formData);

    return $app['twig']->render('contact/contact-submit.twig', array(
        'Title' => 'Contact',
        'DisplayTitle' => 'Contact Us',
        'FormSuccess' => $formSuccess
    ));
});

if (!$app['debug']) {
    $app->error(function () use ($app) {
        return $app['twig']->render('common/404.twig', array(
            'Title' => 'Not Found',
            'DisplayTitle' => 'Not Found'
        ));
    });
}

//Redirects
$app->get('/{wildCard}/', function ($wildCard) use ($app, $rootURL, $pages) {
    $wildCard = strtolower($wildCard);
    if (in_array($wildCard, $pages)) {
        return $app->redirect($rootURL . $wildCard);
    } else {
        return $app['twig']->render('common/404.twig', array(
            'Title' => 'Not Found',
            'DisplayTitle' => 'Not Found'
        ));
    }

})->assert('wildCard', '.*');

$app->get('/about', function () use ($app, $rootURL) {
    return $app->redirect($rootURL . 'about/our-work');
});

$app->get('/events', function () use ($app, $rootURL) {
    return $app->redirect($rootURL . 'events/keep-the-wheel-turning');
});

$app->get('/trips', function () use ($app, $rootURL) {
    return $app->redirect($rootURL . 'experience');
});

$app->run();
