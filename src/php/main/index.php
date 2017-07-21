<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/php/urls.php';
require_once __DIR__ . '/php/database-data.php';

use Symfony\Component\HttpFoundation\Request;

$app = new Silex\Application();
$app['debug'] = true;

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__ . '/resources/templates',
));

$app['twig']->addGlobal('MasterStyleSheet', $masterStylesheet);
$app['twig']->addGlobal('MasterScript', $masterScript);
$RootURL = 'http://localhost/Reiser-Relief/dist/';
$app['twig']->addGlobal('RootURL', $RootURL);

$pages = [
    "about",
    "events",
    "experience",
    "give",
    "contact"
];

$app->get('/', function () use ($app, $news) {
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
        ),
        'News' => $news
    ));
});

$AboutTitle = 'About';
$AboutDisplayTitle = 'About Us';

$app->get('/about/our-mission', function () use ($app, $AboutTitle, $AboutDisplayTitle) {
    return $app['twig']->render('about/about.twig', array(
        'Title' => $AboutTitle,
        'DisplayTitle' => $AboutDisplayTitle,
        'Active' => 'Our Mission'
    ));
});

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

$app->get('/experience', function () use ($app) {
    return $app['twig']->render('experience/experience.twig', array(
        'Title' => 'Experience',
        'DisplayTitle' => 'Experience',
        'Questions' => array(
            array(
                'Question' => 'How far in advance do I need to apply?',
                'Answer' => 'We can take up to 16 people on a mission trip including the trip leaders. 
                Trips are available until filled. We encourage applications at least 4 months before the trip.'
            ),
            array(
                'Question' => 'What airport do I fly into?',
                'Answer' => 'Toussaint L’Ouverture International Airport (PAP) in Port Au Prince.'
            ),
            array(
                'Question' => 'What do I pack?',
                'Answer' => 'Refer to our packing list.',
                'Link' => 'https://drive.google.com/file/d/0By871gytPLeeMmhsdEJDc2NOMHc/view?usp=sharing'
            ),
            array(
                'Question' => 'How can I raise support?',
                'Answer' => 'We encourage team members to include friends and family in their mission by asking for prayer or financial support. Your team leader can provide a support letter template and give ideas on how to get your community involved in your mission.'
            ),
            array(
                'Question' => 'Do I have to be Catholic or Christian to go on a Reiser Relief trip?',
                'Answer' => 'A Catholic priest, Fr. Bernard Reiser, founded Reiser Relief. We are a Catholic based organization, but we welcome all Christian believers and non-believers to join in our ministry. While we will pray together on trips, participation is optional and we respect your boundaries. Expect to be spiritually challenged on this trip. “Listen, my dear brothers: Has not God chosen those who are poor in the eyes of the world to be rich in faith and to inherit the kingdom he promised to those to love him?” James 2:5'
            ),
            array(
                'Question' => 'I’m not sure I’m cut out to be a missionary. Should I go?',
                'Answer' => 'Pray and examine your heart. Prepare to humble yourself. Haitians will teach you a great deal. Are you flexible? Are you willing to be uncomfortable, challenged and overwhelmed? If you have an open heart God will work through you.'
            ),
            array(
                'Question' => 'I have physical limitations. Is that OK?',
                'Answer' => 'We encourage you to discuss physical limitations with your potential trip leader. If God has put this on your heart and we feel confident that you can travel safely, we will find a way to accommodate special needs.'
            ),
            array(
                'Question' => 'What language do they speak in Haiti?',
                'Answer' => 'Creole and French are the two official languages. Our teams always have Haitian interpreters with them in the field. It’s helpful to learn basic Creole phrases before your trip.'
            ),
            array(
                'Question' => 'Is it hot?',
                'Answer' => 'Yes, but not unbearable! The average daily high in January is 87 degrees F and in July is 92 degrees F. Rainy months are April, May, August, September and October. There is air conditioning in the bedrooms and fans throughout the house. You will sweat.'
            ),
            array(
                'Question' => 'Is Haiti safe?',
                'Answer' => 'Overall Haitians are friendly and peaceful people. However, there are risks associated with any international travel. Team members in Haiti are required to follow strict rules to minimize risk and we take every precaution possible to keep you safe. The guesthouse where we sleep has a high security wall topped with barbed wire and 24 hour security.'
            ),
            array(
                'Question' => 'How will we travel around Haiti?',
                'Answer' => 'We will ride in a “tap tap.” This Haitian version of a bus allows for open air viewing of the city and sites while we travel. Many roads in Haiti are extremely rough and you will be bounced around.'
            ),
            array(
                'Question' => 'Where do we stay?',
                'Answer' => 'We stay in one of the guesthouses operated by Healing Haiti in Port Au Prince, 15 minutes from the airport. The houses have air-conditioned bedrooms and bathrooms with showers and flushing toilets. The bedrooms have bunk beds, pillows and blankets. We eat family style in a dining room. A 6-foot security wall surrounds the houses.'
            ),
            array(
                'Question' => 'What kind of food will we be eating?',
                'Answer' => 'Haitian staff at the guesthouse prepares breakfast and dinner. We will eat mostly American style food (like pancakes, French toast, tacos and spaghetti) and some traditional Haitian food including rice and beans, plantain and vegetables.'
            ),
            array(
                'Question' => 'Do I need to bring my own food?',
                'Answer' => 'Team members buy snacks in the US and carry them to Haiti in our luggage. We eat snacks while on the go for lunch and share all of our food. Typical items are beef sticks, granola bars, nuts, dried fruit, and crackers. Please don’t bring anything containing chocolate. It will melt! If you have special dietary needs you are welcome to bring your own food. Haitian staff members cook our meals in the kitchen. You are welcome to prepare your own food in the kitchen.'
            ),
            array(
                'Question' => 'Is it safe to drink the water?',
                'Answer' => 'We provide you with purified Culligan water to drink while out in the field and at the guesthouse. It is not safe to drink tap water.'
            ),
            array(
                'Question' => 'Will there be an opportunity to buy souvenirs?',
                'Answer' => 'Yes! We will shop at least once during our mission trip. Haitians create many beautiful souvenirs they are eager to sell. Bartering is customary and should be used for purchases bought on the street. There are also goods for sale at the airport.'
            ),
            array(
                'Question' => 'Do I have to get shots?',
                'Answer' => 'We are not medical professionals and cannot provide immunization advice. We encourage everyone to seek professional advice from his or her doctor or travel clinic.'
            ),
            array(
                'Question' => 'How will our team prepare for the trip?',
                'Answer' => 'There will be two trip meetings before the trip where your leader will guide you through everything you need to know. There is also a packing meeting shortly before the trip where we pack donations and group items together.'
            ),
            array(
                'Question' => 'Is there follow up after the trip?',
                'Answer' => 'Post trip your team will have a reunion meeting. This will help you process what you learned, give you support, and help you explore ways to respond.'
            ),
            array(
                'Question' => 'Is there additional paperwork?',
                'Answer' => 'Your trip leader will let you know when to submit a Consent of Treatment Form. If you are a minor, your trip leader will let you know when to submit Forms for Minors.'
            )
        )
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

$app->get('/contact/contact-submit/', function (Request $request) use ($app) {
    $name = $request->get('name');
    $email = $request->get('email');
    $subject = $request->get('subject');
    $message = $request->get('message');

    return $app['twig']->render('contact/contact-submit.twig', array(
        'Title' => 'Contact',
        'DisplayTitle' => 'Contact Us'
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
$app->get('/{wildCard}/', function ($wildCard) use ($app, $RootURL, $pages) {
    $wildCard = strtolower($wildCard);
    if (in_array($wildCard, $pages)) {
        return $app->redirect($RootURL . $wildCard);
    } else {
        return $app['twig']->render('common/404.twig', array(
            'Title' => 'Not Found',
            'DisplayTitle' => 'Not Found'
        ));
    }

})->assert('wildCard', '.*');

$app->get('/about', function () use ($app, $RootURL) {
    return $app->redirect($RootURL . 'about/our-mission');
});

$app->get('/events', function () use ($app, $RootURL) {
    return $app->redirect($RootURL . 'events/keep-the-wheel-turning');
});

$app->get('/trips', function () use ($app, $RootURL) {
    return $app->redirect($RootURL . 'experience');
});

$app->run();
