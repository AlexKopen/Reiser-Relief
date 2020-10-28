<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once 'Spyc.php';

$assets = file_get_contents('assets.json');
$assetsJson = json_decode($assets, true);
$masterStylesheet = 'resources/css/' . $assetsJson['style.css'];
$masterScript = 'resources/js/' . $assetsJson['all.min.js'];
$settings = Spyc::YAMLLoad('settings.yaml');

$app = new Silex\Application();
$app['debug'] = !$settings['production'];

$twigParameters = array(
    'twig.path' => __DIR__ . '/resources/templates'
);

if ($settings['production']) {
    $twigParameters['twig.options'] = array(
        'cache' => __DIR__ . '/cache',
    );
}

function CallAPI($method, $url, $data = false)
{
    $curl = curl_init();

    switch ($method) {
        case 'POST':
            curl_setopt($curl, CURLOPT_POST, 1);

            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case 'PUT':
            curl_setopt($curl, CURLOPT_PUT, 1);
            break;
        default:
            if ($data)
                $url = sprintf('%s?%s', $url, http_build_query($data));
    }

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);

    curl_close($curl);

    return $result;
}

$callAPI = 'CallAPI';

$app->register(new Silex\Provider\TwigServiceProvider(), $twigParameters);

$app['twig']->addGlobal('MasterStyleSheet', $masterStylesheet);
$app['twig']->addGlobal('MasterScript', $masterScript);
$app['twig']->addGlobal('Production', $settings['production']);
$app['twig']->addGlobal('ProductionURL', $settings['productionURL']);

$app->get('/', function () use ($app, $callAPI) {
    return $app['twig']->render('home/home.twig', array(
        'Title' => 'Home',
        'SlideShowImages' => array(
            array(
                'Url' => 'event-slide.jpg',
                'Alt' => 'Gala 2020',
                'Header' => 'You\'re Invited!',
                'Description' => 'Virtual Gala<br>November 12, 2020<br><span class="hide-text-on-small">Click this slide for more information</span>',
                'Link' => '/gala'
            ),
            array(
                'Url' => 'work-slide.jpg',
                'Alt' => 'Core Values',
                'Header' => 'Our Impact',
                'Description' => 'Learn how we improve the lives of those we serve',
                'Link' => '/about'
            ),
            array(
                'Url' => 'missions-slide.jpg',
                'Alt' => 'Missions',
                'Header' => 'Missions',
                'Description' => 'Live out God\'s call to serve by applying for a mission trip to Haiti',
                'Link' => '/missions'
            ),
            array(
                'Url' => 'support-slide.jpg',
                'Alt' => 'Support Us',
                'Header' => 'Support Us',
                'Description' => 'Help us break the cycle of poverty with a one-time or recurring gift',
                'Link' => '/donate'
            ),
            array(
                'Url' => 'contact-slide.jpg',
                'Alt' => 'Contact',
                'Header' => 'Join Us',
                'Description' => 'We would love to learn more about you and your interest in our ministry',
                'Link' => '/contact'
            )
        ),
        'News' => json_decode($callAPI('GET', 'https://api.reiserrelief.org/public/news/5'), true)
    ));
});

$AboutTitle = 'About';
$AboutDisplayTitle = 'About Us';

$app->get('/about/core-values', function () use ($app, $AboutTitle, $AboutDisplayTitle) {
    return $app['twig']->render('about/about.twig', array(
        'Title' => $AboutTitle,
        'DisplayTitle' => $AboutDisplayTitle,
        'Active' => 'Core Values'
    ));
});

$boardMembers = array(
    array(
        'image' => 'will_jude',
        'name' => 'Will Jude',
        'title' => 'Executive Director',
        'email' => 'willjude@reiserrelief.org',
        'bio' => 'Will Jude graduated from St. John’s University with a bachelor’s degree in political science and communication. His involvement in Haiti extends over six years and includes work in the country’s poorest slum areas. Prior to joining Reiser Relief, Will served as the director of Just 4 Them Inc. Will enjoys spending time with family and friends and participating in activities at his local Catholic church. Will became Reiser Relief’s Executive Director in 2018.'
    ),
    array(
        'image' => 'ann_brau',
        'name' => 'Ann Brau',
        'title' => 'Board President',
        'email' => 'annbrau@reiserrelief.org',
        'bio' => 'My husband and I live in Eden Prairie, MN where we raised our three grown daughters. I was baptized and married by my uncle, Father Reiser. He taught me by example that God gets his work on Earth done by calling on people whose hearts are humble and willing to serve. It has been my honor to continue his work in Haiti since joining the Board shortly after his death.'
    ),
    array(
        'image' => 'joyce_getchell',
        'name' => 'Joyce Getchell',
        'title' => 'Co-Vice President',
        'bio' => 'I live in Forest Lake, MN with my husband Greg and my three school aged children. I joined the Board in 2012 shortly after my uncle, Father Reiser, passed away. My service started with a desire to carry on my uncle’s legacy. It has since expanded to a passion to follow God’s command to go and serve.'
    ),
    array(
        'image' => 'jerry_welle',
        'name' => 'Jerry Welle',
        'title' => 'Treasurer',
        'bio' => 'I live in White Bear Lake, MN and have 3 grown children and numerous grandchildren. I belong to St. Mary of the Lake Church, which was Father Reiser’s first parish assignment. I joined the Board in 2015 after praying for a new way to serve and feeling a calling to help Reiser Relief. I bring many years of experience in the financial sector to the Board. Prior to joining Reiser Relief, I served on the Board of Directors of the Catholic Spirit Newspaper for 15 years as Chairman of the Finance Committee.'
    ),
    array(
        'image' => 'beth_simms',
        'name' => 'Beth Simms',
        'title' => 'Secretary',
        'bio' => 'My husband and I live in White Bear Lake, MN where we raised our three daughters. As a child, I always read my mother\'s Maryknoll magazine, which instilled in me the desire to one day do international mission work, preferably in Haiti. Though it took a while, I went on my first mission trip in March, 2016 after Reiser Relief connected with St. Mary of the Lake Church. I feel very blessed to have had the opportunity to participate in a second trip since then and to be a member of the Board.'
    ),
    array(
        'image' => 'rick_wilder',
        'name' => 'Rick Wilder',
        'title' => 'Board Member',
        'bio' => 'Through my years of friendship with Father Reiser he became an inspiration for me, my wife, and my three children. When he would talk to me, I knew that everything was according to God’s will. In 2006, Father Reiser asked me to become a board member, so that with his directive, we could alleviate the suffering of the poor in Haiti. I bring many years of experience as a business owner to the Board. Father Reiser remains to this day an inspiration to respect life and follow God’s lead.'
    ),
    array(
        'image' => 'doris_schulte',
        'name' => 'Doris Schulte',
        'title' => 'Board Member',
        'bio' => 'Father Reiser, our pastor and cherished friend, went to Haiti and what he saw broke his heart wide open. His commitment to make a difference in Haiti inspired us to start fundraising for his cause. Father Reiser asked me to join the Board in 2006. Over the years, we have raised hundreds of thousands of dollars to reduce suffering in Haiti.'
    ),
    array(
        'image' => 'mary_welle',
        'name' => 'Mary Welle',
        'title' => 'Board Member',
        'bio' => 'I live in White Bear Lake, MN with my husband, Jerry, who is the treasurer of Reiser Relief. We have three grown children and 6 grandchildren. We belong to St. Mary of the Lake Church, which was Father Reiser’s first assignment as a priest. My first mission trip to Haiti was in 2010. In 2014, Ann Brau and myself brought Father Ralph Talbot on his first mission trip to Haiti. Since then, Father Talbot and St. Mary of the Lake Church have become very involved in Reiser Relief and have supported several projects in Haiti. I help manage the relationship between St. Mary of the Lake Church and Reiser Relief. I have been on the Board since 2017.'
    ),
    array(
        'image' => 'bernie_maciej',
        'name' => 'Bernie Maciej',
        'title' => 'Board Member',
        'bio' => 'I am a nephew of Father Reiser. I joined the Board in early 2012 to help provide education and elder care to the poorest people of Haiti. My desire is to continue to expand Father Reiser’s legacy.'
    ),
    array(
        'image' => 'joline_caswell',
        'name' => 'Joline Caswell',
        'title' => 'Board Member',
        'bio' => 'I live in White Bear Lake, MN with my husband, Phil, and we have 3 grown children. In 2016, I joined my mother and husband on a mission trip to Haiti, through Reiser Relief and St. Mary of the Lake Church. I witnessed the immense need there, as well as the amazing impact Reiser Relief was having on people\'s lives. I felt called to serve and help Reiser Relief in their on-going mission and was honored to join the Board in 2017.'
    )
);

$app->get('/about/board-members', function () use ($app, $AboutTitle, $AboutDisplayTitle, $boardMembers) {
    return $app['twig']->render('about/about.twig', array(
        'Title' => $AboutTitle,
        'DisplayTitle' => $AboutDisplayTitle,
        'Active' => 'Board Members',
        'BoardMembers' => $boardMembers
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

$app->get('/events', function () use ($app, $EventsTitle) {
    return $app['twig']->render('events/events.twig', array(
        'Title' => $EventsTitle,
        'DisplayTitle' => $EventsTitle,
    ));
});

$GalaTitle = 'Virtual Gala 2020';

$app->get('/gala', function () use ($app, $GalaTitle) {
    return $app['twig']->render('gala/gala.twig', array(
        'Title' => $GalaTitle,
        'DisplayTitle' => $GalaTitle,
    ));
});

$questions = array(
    array(
        'question' => 'How far in advance do I need to apply?',
        'answer' => '<p class="question-answer">We can take up to 30 people on a mission trip including the trip leaders.  Spots are available until filled.</p>'
    ),
    array(
        'question' => 'Is there an age minimum?',
        'answer' => '<p class="question-answer">Participants must be at least 18 years old, unless the trip is organized by a high school through Reiser Relief, or the participant is traveling with an adult guardian.</p>'
    ),
    array(
        'question' => 'What airport do I fly into?',
        'answer' => '<p class="question-answer">Toussaint L’Ouverture International Airport (PAP) in Port Au Prince, Haiti.</p>'
    ),
    array(
        'question' => 'What is the cost?',
        'answer' => '<div class="question-answer">
                        <p>$875 (Unless otherwise noted), which includes:</p>
                        <ul>
                            <li>$125 deposit</li>
                            <li>Lodging and security</li>
                            <li>Breakfast and dinner daily</li>
                            <li>Safe drinking water</li>
                            <li>Transportation to / from airport and mission sites</li>
                            <li>1 Mission t-shirt (unless otherwise noted)</li>
                        </ul>

                        <p>Other expenses / US:</p>
                        <ul>
                            <li>You purchase your own airline ticket.  You can check ticket prices by searching for
                                flights
                                from your airport to Port au Prince (PAP)
                            </li>
                            <li><a href="http://www.volunteercard.com/reiserrelief.html" target="_blank">$29 travel insurance</a></li>
                            <li>Group snacks for lunch (purchased in the US and brought to Haiti)</li>
                            <li>Passport</li>
                            <li>Vaccinations</li>
                        </ul>
                        <p>Other expenses / Haiti:</p>
                        <ul>
                            <li>$10 Haiti entrance tax</li>
                            <li>Souvenirs</li>
                        </ul>
                    </div>'
    ),
    array(
        'question' => 'What do I pack?',
        'answer' => '<p class="question-answer">Contact your trip leader for the packing list.</p>'
    ),
    array(
        'question' => 'How can I raise support?',
        'answer' => '<p class="question-answer">We encourage team members to include friends and family in their mission by asking for prayer or financial support. Your team leader can provide a support letter template and give ideas on how to get your community involved in your mission.</p>'
    ),
    array(
        'question' => 'I am not sure I am cut out to be a missionary. Should I go?',
        'answer' => '<p class="question-answer">Pray and examine your heart. Prepare to humble yourself. Haiti will teach you a great deal. Are you flexible? Are you willing to be uncomfortable, challenged and overwhelmed? If you have an open heart, God will work through you.</p>'
    ),
    array(
        'question' => 'I have physical limitations. Is that OK?',
        'answer' => '<p class="question-answer">We encourage you to discuss physical limitations with your trip leader. If God has put this on your heart and we feel confident that you can travel safely, we will find a way to accommodate your needs.</p>'
    ),
    array(
        'question' => 'What language do they speak in Haiti?',
        'answer' => '<p class="question-answer">Creole and French are the two official languages.</p>'
    ),
    array(
        'question' => 'Is it hot?',
        'answer' => '<p class="question-answer">Yes, but not unbearable. The average daily high in January is 87 degrees and in July is 92 degrees. Rainy months are April, May, August, September and October. There is air conditioning in the bedrooms. You will sweat when we are out in the mission field.</p>'
    ),
    array(
        'question' => 'Is Haiti safe?',
        'answer' => '<p class="question-answer">Overall, Haitians are friendly and peaceful people. However, there are risks associated with any international travel. Team members in Haiti are required to follow rules that minimize risk and we take every precaution possible to keep you safe. The guesthouse where we sleep has a high security wall topped with barbed wire and a security guard at the gate 24/7.</p>'
    ),
    array(
        'question' => 'How will we travel around Haiti?',
        'answer' => '<p class="question-answer">We will ride in either a bus or an open-bed truck. Many roads in Haiti are rough and you will be bounced around.</p>'
    ),
    array(
        'question' => 'What kind of food will we be eating?',
        'answer' => '<p class="question-answer">Haitian staff at the guesthouse prepare breakfast and dinner. We will eat traditional Haitian foods such as rice, chicken, beans, plantain and vegetables. We will also occasionally eat “American” foods such as pancakes, burgers, and spaghetti.</p>'
    ),
    array(
        'question' => 'Do I need to bring my own food?',
        'answer' => '<p class="question-answer">Team members buy snacks in the US and carry them to Haiti in our luggage. We eat snacks while on the go for lunch and share all of our food. Typical items are beef sticks, granola bars, nuts, dried fruit, and crackers. Please don’t bring anything containing chocolate. It will melt! If you have special dietary needs you are welcome to bring your own food. Haitian staff members cook meals in the guesthouse kitchen.</p>'
    ),
    array(
        'question' => 'Is it safe to drink the water?',
        'answer' => '<p class="question-answer">We provide you with purified water to drink while out in the field and at the guesthouse. It is not safe to drink tap water.</p>'
    ),
    array(
        'question' => 'Will there be an opportunity to buy souvenirs?',
        'answer' => '<p class="question-answer">Yes. Haitians create many beautiful souvenirs and are eager to sell them. Bartering is customary and should be used for purchases bought on the street. There are also goods for sale at the airport.</p>'
    ),
    array(
        'question' => 'How do I access the mission trip blog?',
        'answer' => '<p class="question-answer"><a href="https://reiserreliefjournal.blogspot.com/" class="plain-link" target="_blank">You can access the mission blog here</a>.</p>'
    ),
    array(
        'question' => 'How do I apply for a trip?',
        'answer' => '<p class="question-answer">Complete the online application and pay the $125 deposit. Send an email to <a href="mailto:info@reiserrelief.org" class="plain-link">info@reiserrelief.org</a> with any questions
about the application process.</p>'
    )
);

$app->get('/missions', function () use ($app, $questions, $callAPI) {
    $allTrips = json_decode($callAPI('GET', 'https://api.reiserrelief.org/public/trip-dates-date-filtered'), true);
    return $app['twig']->render('missions/missions.twig', array(
        'Title' => 'Missions',
        'DisplayTitle' => 'Missions',
        'Questions' => $questions,
        'Trips' => $allTrips
    ));
});

$app->get('/missions/apply', function () use ($app) {
    if (isset($_GET['id'])) {
        return $app['twig']->render('missions/apply.twig', array(
            'Title' => 'Missions - Mission Trip Application',
            'DisplayTitle' => 'Mission Trip Application',
            'TripId' => $_GET['id'],
            'TripDate' => $_GET['date']
        ));
    } else {
        return $app->redirect('/missions/trip-dates');
    }
});

$app->post('/missions/apply/apply-submit', function () use ($app, $callAPI) {
    if (isset($_GET['id'])) {
        $_POST['tripId'] = $_GET['id'];
        $callAPI('POST', 'https://api.reiserrelief.org/public/application', $_POST);
    }

    return $app['twig']->render('missions/apply-submit.twig', array(
        'Title' => 'Missions - Mission Trip Application',
        'DisplayTitle' => 'Mission Trip Application'
    ));
});

$app->get('/donate', function () use ($app) {
    return $app['twig']->render('donate/donate.twig', array(
        'Title' => 'Donate',
        'DisplayTitle' => 'Donate',
        'UseStripe' => true
    ));
});

$app->get('/contact', function () use ($app) {
    return $app['twig']->render('contact/contact.twig', array(
        'Title' => 'Contact',
        'DisplayTitle' => 'Contact Us'
    ));
});

$app->post('/contact/contact-submit', function () use ($app, $callAPI) {

    $callAPI('POST', 'https://api.reiserrelief.org/public/contact', $_POST);

    return $app['twig']->render('contact/contact-submit.twig', array(
        'Title' => 'Contact',
        'DisplayTitle' => 'Contact Us'
    ));
});

$app->post('/donation-submit', function () use ($app, $callAPI) {
//    $payment = $callAPI('POST', 'http://localhost:8001/public/donation-submit', $_POST);
//
//    return $payment;

    $payment = $callAPI('POST', 'https://api.reiserrelief.org/public/donation-submit', $_POST);

    return $app['twig']->render('donate/donate-submit.twig', array(
        'Title' => 'Donate',
        'DisplayTitle' => 'Donation Confirmation',
        'Message' => $payment == 'success' ? 'Thank you for your contribution!' : 'There was an error with your donation.  Please try again.'
    ));
});

$app->get('/newsletters', function () use ($app) {
    return $app['twig']->render('news/news.twig', array(
        'Title' => 'Newsletters',
        'DisplayTitle' => 'Newsletters'
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
//$app->get('/gala', function () use ($app) {
//    return $app->redirect('/events');
//});

$app->get('/about', function () use ($app) {
    return $app->redirect('/about/core-values');
});

$app->get('/trips', function () use ($app) {
    return $app->redirect('/missions');
});

$app->get('/apply', function () use ($app) {
    return $app->redirect('/missions');
});

$app->get('/experience', function () use ($app) {
    return $app->redirect('/missions');
});

$app->get('/ministries', function () use ($app) {
    return $app->redirect('/about');
});

$app->get('/gala', function () use ($app) {
    return $app->redirect('/events');
});

$pages = [
    '',
    'about',
    'events',
    'missions',
    'donate',
    'contact'
];

$app->get('/{wildCard}/', function ($wildCard) use ($app, $pages) {
    $wildCard = strtolower($wildCard);
    if (in_array($wildCard, $pages)) {
        return $app->redirect('/' . $wildCard);
    } else {
        return $app['twig']->render('common/404.twig', array(
            'Title' => 'Not Found',
            'DisplayTitle' => 'Not Found'
        ));
    }
})->assert('wildCard', '.*');

$app->run();
