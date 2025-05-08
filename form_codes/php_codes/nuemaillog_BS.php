function getRandomGreeting() {
    $greetings = [
        "Hello, world!",
        "Welcome to nuBuilder!",
        "Have a great day!",
        "You're doing awesome!",
        "PHP is fun!",
    ];

    // Pick a random greeting
    $randomIndex = array_rand($greetings);
    return $greetings[$randomIndex];
}
