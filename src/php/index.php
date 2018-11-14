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
                'Alt' => 'Events',
                'Header' => '7th Annual Fall Gala',
                'Description' => 'Thursday, November 15th<br>Doors open at 5pm<br>Brooklyn Park, MN',
                'Link' => '/events'
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
        'bio' => 'Will Jude graduated from St. John’s University with a bachelor’s degree in political science and communication. He has extensive experience in nonprofit management and mission work. Will has participated in numerous mission programs in Haiti the past four summers, including some independent work in the slums surrounding Port-au-Prince. Will is committed to increasing opportunity for the poor and marginalized and has helped develop a unique poverty-alleviation model that addresses the root causes of poverty in Haiti, rather than the symptoms. Prior to joining Reiser Relief, Will served as the Executive Director of Just 4 Them Inc. Will enjoys spending time with friends, traveling domestically and abroad, and participating in activities at his local Catholic church. Will became Reiser Relief’s Executive Director in September, 2018.'
    ),
    array(
        'image' => 'ann_brau',
        'name' => 'Ann Brau',
        'title' => 'President',
        'email' => 'annbrau@reiserrelief.org',
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
        'bio' => 'My husband and I live in White Bear Lake where we raised our three daughters.  As a child, I always read my mother\'s Maryknoll magazine and from that knew I wanted to one day go on a mission trip, preferably in Haiti.  It took a while, but I went on my first trip in March of 2016 after Reiser Relief connected with St. Mary of the Lake. I feel very blessed to have had the opportunity to participate in a second trip since then and to be a member of the Reiser Relief board.'
    ),
    array(
        'image' => 'rick_wilder',
        'name' => 'Rick Wilder',
        'title' => 'Board Member',
        'bio' => 'Through my years of friendship with Father Reiser he became an inspiration for my family of three children and my wife Rita. When he would talk to me, I knew that everything was according to God’s will. I was honored that he asked me to become a board member so that with his directive we could help the less fortunate in Haiti. Father Reiser was and is, to this day a reason to respect life and to do God’s will always.'
    ),
    array(
        'image' => 'doris_schulte',
        'name' => 'Doris Schulte',
        'title' => 'Board Member',
        'bio' => 'Father Bernard Reiser, our pastor and cherished friend, went to Haiti and what he saw broke his heart wide open. His commitment to make a difference caused us to start fund raising for his cause. Over the years, we’ve raised hundreds of thousands of dollars to reduce suffering in Haiti.'
    ),
    array(
        'image' => 'mary_welle',
        'name' => 'Mary Welle',
        'title' => 'Board Member',
        'bio' => 'I live in White Bear Lake, MN, with my husband, Jerry, who is the treasurer of Reiser Relief.  We have three grown children and 6 grandchildren.  We attend St. Marys of the Lake Parish where Father Reiser had his first assignment.  I took my first mission trip to Haiti in 2010 and became involved with Reiser Relief in 2014.  In 2014, Ann Brau and myself brought Father Talbot on his first mission trip to Haiti.  Since then, Father Talbot and St. Mary of the Lake have become very involved in Reiser Relief and have supported many projects in Haiti.  I help manage the relationship between St. Marys and Reiser Relief.  I have been on the board since 2017.'
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
        'image' => 'joline_caswell',
        'name' => 'Joline Caswell',
        'title' => 'Board Member',
        'bio' => 'I live in White Bear Lake with my husband, Phil, and we have 3 grown children. In 2016, I joined my mother and husband on a mission trip to Haiti, through Reiser Relief and St. Mary of the Lake.  I saw firsthand the immense need there, as well as the amazing impact Reiser Relief was having on people\'s lives. I felt called to serve and help Reiser Relief in their on-going mission and was honored to join the board in 2017.'
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

$questions = array(
    array(
        'question' => 'How far in advance do I need to apply?',
        'answer' => '<p class="question-answer">We can take up to 30 people on a mission trip including the trip leaders.  Trips are available until filled. We encourage applications at least 4 months before the trip.</p>'
    ),
    array(
        'question' => 'What airport do I fly into?',
        'answer' => '<p class="question-answer">Toussaint L’Ouverture International Airport (PAP) in Port Au Prince.</p>'
    ),
    array(
        'question' => 'What is the cost?',
        'answer' => '<div class="question-answer">
                        <p>The base price for a trip is $875, which includes:</p>
                        <ul>
                            <li>Lodging</li>
                            <li>Breakfast and dinner daily</li>
                            <li>Safe drinking water</li>
                            <li>Transportation to / from airport and ministry sites</li>
                            <li>Interpreters / security</li>
                            <li>2 trip leaders</li>
                            <li>Group t-shirt (additional shirts available for $12)</li>
                        </ul>

                        <p>Other expenses / US:</p>
                        <ul>
                            <li>You purchase your own airline ticket.  You can check ticket prices by searching for
                                flights
                                from your airport to Port au Prince (PAP)
                            </li>
                            <li><a href="http://www.volunteercard.com/reiserrelief.html" target="_blank">$29 mandatory
                                    emergency evacuation insurance</a></li>
                            <li>Group snacks for lunch (purchased in the US and brought to Haiti)</li>
                            <li>Passport</li>
                            <li>Vaccinations</li>
                        </ul>
                        <p>Other expenses / Haiti:</p>
                        <ul>
                            <li>$10 Haiti entrance tax</li>
                            <li>Tips in Haiti(suggest $20)</li>
                            <li>Your team may choose to go to a pool and / or beach that charge entry. Total entry fees
                                should not exceed $20.
                            </li>
                            <li>Beverages purchased at restaurants or other locations</li>
                            <li>Souvenirs</li>
                            <li>Offering at church service<strong> </strong></li>
                        </ul>
                    </div>'
    ),
    array(
        'question' => 'What do I pack?',
        'answer' => '<p class="question-answer"><a href="https://drive.google.com/file/d/0By871gytPLeeMmhsdEJDc2NOMHc/view?usp=sharing" class="plain-link" target="_blank">Refer to our packing list</a>.</p>'
    ),
    array(
        'question' => 'How can I raise support?',
        'answer' => '<p class="question-answer">We encourage team members to include friends and family in their mission by asking for prayer or financial support. Your team leader can provide a support letter template and give ideas on how to get your community involved in your mission.</p>'
    ),
    array(
        'question' => 'I am not sure I’m cut out to be a missionary. Should I go?',
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
        'answer' => '<p class="question-answer">Yes, but not unbearable. The average daily high in January is 87 degrees F and in July is 92 degrees F. Rainy months are April, May, August, September and October. There is air conditioning in the bedrooms and fans throughout the house. You will sweat.</p>'
    ),
    array(
        'question' => 'Is Haiti safe?',
        'answer' => '<p class="question-answer">Overall Haitians are friendly and peaceful people. However, there are risks associated with any international travel. Team members in Haiti are required to follow rules that minimize risk and we take every precaution possible to keep you safe. The guesthouse where we sleep has a high security wall topped with barbed wire and a security guard at the gate 24/7.</p>'
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
