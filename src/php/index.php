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

if ($production && !(strpos(getenv('HTTP_USER_AGENT'), 'Mac') !== false)) {
    $twigParameters['twig.options'] = array(
        'cache' => __DIR__ . '/cache',
    );
}

function CallAPI($method, $url, $data = false)
{
    $curl = curl_init();

    switch ($method) {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);

            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_PUT, 1);
            break;
        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);

    curl_close($curl);

    return $result;
}

$callAPI = 'CallAPI';

$app->register(new Silex\Provider\TwigServiceProvider(), $twigParameters);

$app['twig']->addGlobal('RootURL', $rootURL);
$app['twig']->addGlobal('Production', $production);
$app['twig']->addGlobal('MasterStyleSheet', $masterStylesheet);
$app['twig']->addGlobal('MasterScript', $masterScript);

$pages = [
    "about",
    "events",
    "experience",
    "give",
    "contact"
];

$app->get('/', function () use ($app, $production, $news, $rootURL, $callAPI) {
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
        'News' => !$production ? $news : json_decode(json_decode($callAPI('GET', 'http://localhost/Reiser-Relief/dist/admin/api/news')),true)
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

if (!$production) {
    $app->get('/events/keep-the-wheel-turning', function () use ($app, $EventsTitle) {
        $KTWTText = 'Join us Thursday, April 27, for an excellent evening! Fellowship, games, soft drinks, appetizers, cash bar.  Let’s honor the legacy of our dear departed Father Reiser. Money raised will fund the construction of a kitchen and dining hall at Guardian Angels Primary School in Haiti.';

        return $app['twig']->render('events/events.twig', array(
            'Title' => $EventsTitle,
            'DisplayTitle' => $EventsTitle,
            'Active' => 'Keep the Wheel Turning',
            'EventText' => $KTWTText
        ));
    });

    $app->get('/events/give-to-the-max-day', function () use ($app, $EventsTitle) {
        $GTMDText = 'Thank you to all who attended, mailed in donations, gave on-line, volunteered and provided prayer support for this event. Over $78,000 was raised at our event, and $56,000 online and by mail. In addition we met a $40,000 matching grant for a total of $174,000! All funds will go directly to our partners in Marfranc to rebuild dormitories, the convent, school, and to provide emergency food relief and supplies to the community. Our next fall event will be Friday, November 10, 2017, at the Minneapolis Marriott Northwest in Brooklyn Park, MN.';

        return $app['twig']->render('events/events.twig', array(
            'Title' => $EventsTitle,
            'DisplayTitle' => $EventsTitle,
            'Active' => 'Give to the Max Day',
            'EventText' => $GTMDText
        ));
    });

} else {
    $app->get('/events/keep-the-wheel-turning', function (Request $request) use ($app, $EventsTitle) {
        $eventText = json_decode($request->get('admin/events'))[1]->content;

        return $app['twig']->render('events/events.twig', array(
            'Title' => $EventsTitle,
            'DisplayTitle' => $EventsTitle,
            'Active' => 'Keep the Wheel Turning',
            'EventText' => $eventText
        ));
    });

    $app->get('/events/give-to-the-max-day', function (Request $request) use ($app, $EventsTitle) {
        $eventText = json_decode($request->get('admin/events'))[0]->content;

        return $app['twig']->render('events/events.twig', array(
            'Title' => $EventsTitle,
            'DisplayTitle' => $EventsTitle,
            'Active' => 'Give to the Max Day',
            'EventText' => $eventText
        ));
    });
}

$questions = array(
    array(
        'question' => 'How far in advance do I need to apply?',
        'answer' => 'We can take up to 16 people on a mission trip including the trip leaders. 
                Trips are available until filled. We encourage applications at least 4 months before the trip.'
    ),
    array(
        'question' => 'What airport do I fly into?',
        'answer' => 'Toussaint L’Ouverture International Airport (PAP) in Port Au Prince.'
    ),
    array(
        'question' => 'What do I pack?',
        'answer' => 'Refer to our packing list.',
        'link' => 'https://drive.google.com/file/d/0By871gytPLeeMmhsdEJDc2NOMHc/view?usp=sharing'
    ),
    array(
        'question' => 'How can I raise support?',
        'answer' => 'We encourage team members to include friends and family in their mission by asking for prayer or financial support. Your team leader can provide a support letter template and give ideas on how to get your community involved in your mission.'
    ),
    array(
        'question' => 'Do I have to be Catholic or Christian to go on a Reiser Relief trip?',
        'answer' => 'A Catholic priest, Fr. Bernard Reiser, founded Reiser Relief. We are a Catholic based organization, but we welcome all Christian believers and non-believers to join in our ministry. While we will pray together on trips, participation is optional and we respect your boundaries. Expect to be spiritually challenged on this trip. “Listen, my dear brothers: Has not God chosen those who are poor in the eyes of the world to be rich in faith and to inherit the kingdom he promised to those to love him?” James 2:5'
    ),
    array(
        'question' => 'I’m not sure I’m cut out to be a missionary. Should I go?',
        'answer' => 'Pray and examine your heart. Prepare to humble yourself. Haitians will teach you a great deal. Are you flexible? Are you willing to be uncomfortable, challenged and overwhelmed? If you have an open heart God will work through you.'
    ),
    array(
        'question' => 'I have physical limitations. Is that OK?',
        'answer' => 'We encourage you to discuss physical limitations with your potential trip leader. If God has put this on your heart and we feel confident that you can travel safely, we will find a way to accommodate special needs.'
    ),
    array(
        'question' => 'What language do they speak in Haiti?',
        'answer' => 'Creole and French are the two official languages. Our teams always have Haitian interpreters with them in the field. It’s helpful to learn basic Creole phrases before your trip.'
    ),
    array(
        'question' => 'Is it hot?',
        'answer' => 'Yes, but not unbearable! The average daily high in January is 87 degrees F and in July is 92 degrees F. Rainy months are April, May, August, September and October. There is air conditioning in the bedrooms and fans throughout the house. You will sweat.'
    ),
    array(
        'question' => 'Is Haiti safe?',
        'answer' => 'Overall Haitians are friendly and peaceful people. However, there are risks associated with any international travel. Team members in Haiti are required to follow strict rules to minimize risk and we take every precaution possible to keep you safe. The guesthouse where we sleep has a high security wall topped with barbed wire and 24 hour security.'
    ),
    array(
        'question' => 'How will we travel around Haiti?',
        'answer' => 'We will ride in a “tap tap.” This Haitian version of a bus allows for open air viewing of the city and sites while we travel. Many roads in Haiti are extremely rough and you will be bounced around.'
    ),
    array(
        'question' => 'Where do we stay?',
        'answer' => 'We stay in one of the guesthouses operated by Healing Haiti in Port Au Prince, 15 minutes from the airport. The houses have air-conditioned bedrooms and bathrooms with showers and flushing toilets. The bedrooms have bunk beds, pillows and blankets. We eat family style in a dining room. A 6-foot security wall surrounds the houses.'
    ),
    array(
        'question' => 'What kind of food will we be eating?',
        'answer' => 'Haitian staff at the guesthouse prepares breakfast and dinner. We will eat mostly American style food (like pancakes, French toast, tacos and spaghetti) and some traditional Haitian food including rice and beans, plantain and vegetables.'
    ),
    array(
        'question' => 'Do I need to bring my own food?',
        'answer' => 'Team members buy snacks in the US and carry them to Haiti in our luggage. We eat snacks while on the go for lunch and share all of our food. Typical items are beef sticks, granola bars, nuts, dried fruit, and crackers. Please don’t bring anything containing chocolate. It will melt! If you have special dietary needs you are welcome to bring your own food. Haitian staff members cook our meals in the kitchen. You are welcome to prepare your own food in the kitchen.'
    ),
    array(
        'question' => 'Is it safe to drink the water?',
        'answer' => 'We provide you with purified Culligan water to drink while out in the field and at the guesthouse. It is not safe to drink tap water.'
    ),
    array(
        'question' => 'Will there be an opportunity to buy souvenirs?',
        'answer' => 'Yes! We will shop at least once during our mission trip. Haitians create many beautiful souvenirs they are eager to sell. Bartering is customary and should be used for purchases bought on the street. There are also goods for sale at the airport.'
    ),
    array(
        'question' => 'Do I have to get shots?',
        'answer' => 'We are not medical professionals and cannot provide immunization advice. We encourage everyone to seek professional advice from his or her doctor or travel clinic.'
    ),
    array(
        'question' => 'How will our team prepare for the trip?',
        'answer' => 'There will be two trip meetings before the trip where your leader will guide you through everything you need to know. There is also a packing meeting shortly before the trip where we pack donations and group items together.'
    ),
    array(
        'question' => 'Is there follow up after the trip?',
        'answer' => 'Post trip your team will have a reunion meeting. This will help you process what you learned, give you support, and help you explore ways to respond.'
    ),
    array(
        'question' => 'Is there additional paperwork?',
        'answer' => 'Your trip leader will let you know when to submit a Consent of Treatment Form. If you are a minor, your trip leader will let you know when to submit Forms for Minors.'
    )
);

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

if (!$production) {
    $app->post('/experience/apply/apply-submit', function () use ($app) {

        $formSuccess = true;

        return $app['twig']->render('experience/apply-submit.twig', array(
            'Title' => 'Experience - Apply',
            'DisplayTitle' => 'Experience - Mission Trip Application',
            'FormSuccess' => $formSuccess
        ));
    });

} else {
    $app->post('/experience/apply/apply-submit', function (Request $request) use ($app) {

        $response = $request->post('/admin/applications');

        $formSuccess = $response['status'];

        return $app['twig']->render('experience/apply-submit.twig', array(
            'Title' => 'Experience - Apply',
            'DisplayTitle' => 'Experience - Mission Trip Application',
            'FormSuccess' => $formSuccess
        ));
    });
}

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

if (!$production) {
    $app->post('/contact/contact-submit', function () use ($app) {

        $formSuccess = true;

        return $app['twig']->render('contact/contact-submit.twig', array(
            'Title' => 'Contact',
            'DisplayTitle' => 'Contact Us',
            'FormSuccess' => $formSuccess
        ));
    });

} else {
    $app->post('/contact/contact-submit', function (Request $request) use ($app) {

        $response = $request->post('/admin/contact');

        $formSuccess = $response['status'];

        return $app['twig']->render('contact/contact-submit.twig', array(
            'Title' => 'Contact',
            'DisplayTitle' => 'Contact Us',
            'FormSuccess' => $formSuccess
        ));
    });
}

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
    return $app->redirect($rootURL . 'events/give-to-the-max-day');
});

$app->get('/trips', function () use ($app, $rootURL) {
    return $app->redirect($rootURL . 'experience');
});

$app->run();
