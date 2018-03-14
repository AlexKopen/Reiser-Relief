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
                'Url' => 'work-slide.jpg',
                'Alt' => 'Core Values',
                'Header' => 'What we Do',
                'Description' => 'Learn more about Reiser Relief including our core values, upcoming events, and ways you can help',
                'Link' => '/about'
            ),
            array(
                'Url' => 'experience-slide.jpg',
                'Alt' => 'Experience',
                'Header' => 'Visit Haiti',
                'Description' => 'Live out God\'s mission through service by applying for a mission trip to Haiti',
                'Link' => '/experience'
            ),
            array(
                'Url' => 'support-slide.jpg',
                'Alt' => 'Support Us',
                'Header' => 'Give Today',
                'Description' => 'Help those in need with a donation which will provide water, food, care, and so much more',
                'Link' => '/give'
            )
        ),
        'News' => json_decode($callAPI('GET', 'http://api.reiserrelief.org/public/news/5'), true)
    ));
});

$AboutTitle = 'About';
$AboutDisplayTitle = 'About Us';

$app->get('/about/core-values', function () use ($app, $AboutTitle, $AboutDisplayTitle) {
    return $app['twig']->render('about/about.twig', array(
        'Title' => $AboutTitle,
        'DisplayTitle' => $AboutDisplayTitle,
        'Active' => 'Core Values',
        'DisplayPageInfo' => true
    ));
});

$boardMembers = array(
    array(
        'image' => 'ann_brau',
        'name' => 'Ann Brau',
        'title' => 'President',
        'bio' => 'My husband and I live in Eden Prairie where we raised our three grown daughters. I was baptized and married by my uncle, Father Reiser. He taught me by example that God gets his work on earth done by using people whose hearts are humble and willing to serve. Is has been my honor to continue his work in Haiti since joining the Board shortly after his death.'
    ),
    array(
        'image' => 'joyce_getchell',
        'name' => 'Joyce Getchell',
        'title' => 'Co-Vice President',
        'bio' => 'I live in Forest Lake with my husband Greg and my three school aged children. I joined the board in 2012 shortly after my uncle, Fr. Bernard Reiser, passed away. My service started with a desire to carry on my uncle’s legacy. It has since expanded to a passion to follow God’s command to go and serve.'
    ),
    array(
        'image' => 'james_lanigan',
        'name' => 'James Lanigan',
        'title' => 'Co-Vice President',
        'bio' => 'I live in Ramsey with my wife Jennifer and our two children. I attended Epiphany for nine excellent years and have many fond memories of Father Reiser. My first mission trip to Haiti was in January 2015 where I saw firsthand the need to help the people there who are suffering and need life’s most basic needs.'
    ),
    array(
        'image' => 'jerry_welle',
        'name' => 'Jerry Welle',
        'title' => 'Treasurer',
        'bio' => 'I live in White Bear Lake and have 3 grown children and numerous grandchildren. I attend St Mary of the Lake Catholic Church, which was Fr Reiser’s first parish assignment. I joined the Board in 2015 after praying for a new way to serve and feeling a calling to help Reiser Relief. My wife Mary has been a volunteer and team leader on numerous trips to Haiti. I was on the Board of Directors of the Catholic Spirit Newspaper for 15 years and Chairman of the Finance Committee.'
    ),
    array(
        'image' => 'beth_simms',
        'name' => 'Beth Simms',
        'title' => 'Secretary',
        'bio' => ''
    ),
    array(
        'image' => 'brian_olson',
        'name' => 'Brian Olson',
        'title' => 'Board Member',
        'bio' => 'I live in Dayton with my wife Angela and together we have four children. I knew Father Resier for many years while attending Epiphany Catholic School and he was also a good friend to both my parents. I was able to visit Haiti in the early part of 2016 and was deeply touched by the overall strength and perseverance of the Haitian people in spite of the many obstacles they face. My goal is to continue to try and serve those needs in whatever capacity I can.'
    ),
    array(
        'image' => 'bernie_maciej',
        'name' => 'Bernie Maciej',
        'title' => 'Board Member',
        'bio' => 'I am a nephew of Father Bernard Reiser. I joined the board in early 2012 to help the water trucks keep delivering fresh water to the people of Haiti. My desire is to keep the legacy that Father Reiser started in Haiti going.'
    ),
    array(
        'image' => 'doris_schulte',
        'name' => 'Doris Schulte',
        'title' => 'Board Member',
        'bio' => 'Father Bernard Reiser, our pastor and cherished friend, went to Haiti and what he saw broke his heart wide open. His commitment to make a difference caused us to start fund raising for his cause. Over the years, we’ve raised hundreds of thousands of dollars to reduce suffering in Haiti.'
    ),
    array(
        'image' => 'rick_wilder',
        'name' => 'Rick Wilder',
        'title' => 'Board Member',
        'bio' => 'Through my years of friendship with Father Reiser he became an inspiration for my family of three children and my wife Rita. When he would talk to me, I knew that everything was according to God’s will. I was honored that he asked me to become a board member so that with his directive we could help the less fortunate in Haiti. Father Reiser was and is, to this day a reason to respect life and to do God’s will always.'
    ),
    array(
        'image' => 'joline_caswell',
        'name' => 'Joline Caswell',
        'title' => 'Board Member',
        'bio' => ''
    ),
);

$app->get('/about/board-members', function () use ($app, $AboutTitle, $AboutDisplayTitle, $boardMembers) {
    return $app['twig']->render('about/about.twig', array(
        'Title' => $AboutTitle,
        'DisplayTitle' => $AboutDisplayTitle,
        'Active' => 'Board Members',
        'DisplayPageInfo' => false,
        'BoardMembers' => $boardMembers
    ));
});

$app->get('/about/our-founder', function () use ($app, $AboutTitle, $AboutDisplayTitle) {
    return $app['twig']->render('about/about.twig', array(
        'Title' => $AboutTitle,
        'DisplayTitle' => $AboutDisplayTitle,
        'Active' => 'Our Founder',
        'DisplayPageInfo' => false
    ));
});

$EventsTitle = 'Events';

$app->get('/events', function () use ($app, $EventsTitle) {
    return $app['twig']->render('events/events.twig', array(
        'Title' => $EventsTitle,
        'DisplayTitle' => $EventsTitle,
    ));
});

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
        'answer' => '<a href="https://drive.google.com/file/d/0By871gytPLeeMmhsdEJDc2NOMHc/view?usp=sharing" class="plain-link">Refer to our packing list</a>.'
    ),
    array(
        'question' => 'How can I raise support?',
        'answer' => 'We encourage team members to include friends and family in their mission by asking for prayer or financial support. Your team leader can provide a support letter template and give ideas on how to get your community involved in your mission.'
    ),
    array(
        'question' => 'Do I have to be Catholic or Christian to go on a Reiser Relief trip?',
        'answer' => 'A Catholic priest, Fr. Bernard Reiser, founded Reiser Relief. We are a Catholic organization, but we welcome all Christian believers and non-believers to join in our ministry. While we will pray together on trips, participation is optional and we respect your boundaries. Expect to be spiritually challenged on this trip. “Listen, my dear brothers: Has not God chosen those who are poor in the eyes of the world to be rich in faith and to inherit the kingdom he promised to those to love him?” James 2:5'
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
        'answer' => 'We stay in guesthouses in Port Au Prince with security walls. There are air-conditioned bedrooms with bunk beds, pillows and blankets. Bathrooms have showers and flushing toilets. We eat family style in a dining room.'
    ),
    array(
        'question' => 'What kind of food will we be eating?',
        'answer' => 'Haitian staff at the guesthouse prepares breakfast and dinner. We will eat mostly American style food (like pancakes, French toast, tacos and spaghetti) and some traditional Haitian food including rice and beans, plantain and vegetables.<br><br>
        
        Team members buy snacks in the US and carry them to Haiti in our luggage. We eat snacks while on the go for lunch and share all of our food. Typical items are beef sticks, granola bars, nuts, dried fruit, and crackers. Please don’t bring anything containing chocolate. It will melt! If you have special dietary needs you are welcome to bring your own food. Haitian staff members cook our meals in the kitchen. You are welcome to prepare your own food in the kitchen.<br><br>
        
        We provide you with purified Culligan water to drink while out in the field and at the guesthouse. It is not safe to drink tap water.'
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
        'answer' => 'There will be two trip meetings before the trip where your leader will guide you through everything you need to know. There is also a packing meeting shortly before the trip where we pack donations and group items together.<br><br>

Your trip leader will let you know when to submit a <a href="https://drive.google.com/file/d/0By871gytPLeeM25NdEdpaDFIQVU/view?usp=sharing" class="plain-link">Consent of Treatment Form</a>. If you are a minor, your trip leader will let you know when to submit <a href="https://drive.google.com/file/d/0By871gytPLeeb2RKT19YT0xNeXM/view?usp=sharing" class="plain-link">Forms for Minors</a>.'
    ),
    array(
        'question' => 'Is there follow up after the trip?',
        'answer' => 'Post trip your team will have a reunion meeting. This will help you process what you learned, give you support, and help you explore ways to respond.'
    )
);

$app->get('/experience', function () use ($app, $questions) {
    return $app['twig']->render('experience/experience.twig', array(
        'Title' => 'Experience',
        'DisplayTitle' => 'Experience',
        'Questions' => $questions
    ));
});

$app->get('/experience/trip-dates', function () use ($app, $callAPI) {
    $allTrips = json_decode($callAPI('GET', 'http://api.reiserrelief.org/public/trip-dates-date-filtered'), true);
    return $app['twig']->render('experience/trip-dates.twig', array(
        'Title' => 'Experience - Mission Trips',
        'DisplayTitle' => 'Mission Trips',
        'Trips' => $allTrips
    ));
});

$app->get('/experience/apply', function () use ($app) {
    if (isset($_GET['id'])) {
        return $app['twig']->render('experience/apply.twig', array(
            'Title' => 'Experience - Mission Trip Application',
            'DisplayTitle' => 'Mission Trip Application',
            'TripId' => $_GET['id'],
            'TripDate' => $_GET['date']
        ));
    } else {
        return $app->redirect('/experience/trip-dates');
    }
});

$app->post('/experience/apply/apply-submit', function () use ($app, $callAPI) {
    if (isset($_GET['id'])) {
        $_POST['tripId'] = $_GET['id'];
        $callAPI('POST', 'http://api.reiserrelief.org/public/application', $_POST);
    }

    return $app['twig']->render('experience/apply-submit.twig', array(
        'Title' => 'Experience - Mission Trip Application',
        'DisplayTitle' => 'Mission Trip Application'
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

$app->post('/contact/contact-submit', function () use ($app, $callAPI) {

    $callAPI('POST', 'http://api.reiserrelief.org/public/contact', $_POST);

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
$app->get('/about', function () use ($app) {
    return $app->redirect('/about/core-values');
});

$app->get('/trips', function () use ($app) {
    return $app->redirect('/experience');
});

$app->get('/apply', function () use ($app) {
    return $app->redirect('/experience');
});

$app->get('/ministries', function () use ($app) {
    return $app->redirect('/about');
});

$pages = [
    '',
    'about',
    'events',
    'experience',
    'give',
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
