export interface DateSteps {
  title: string;
  desc: string;
  steps: string[];
  perfectFor?: string;
}

export interface StaticDate {
  virtual: DateSteps;
  inPerson: DateSteps;
}

export const staticDate: StaticDate = {
  virtual: {
    title: "Virtual Art Museum Tour & Sketch Session",
    desc: "Tour the Louvre or Metropolitan Museum of Art virtually together, then challenge each other to a 30-minute drawing battle of your favorite painting.",
    steps: [
      "Open Google Arts & Culture to access high-res museum tours",
      "Set up video FaceTime/Discord call on your tablets",
      "Share screens to browse historical galleries",
      "Spend 30 minutes sketching a shared piece using your local art kits"
    ]
  },
  inPerson: {
    title: "Sunset Outdoor Canvas Paint Date",
    desc: "Pack canvas, acrylic paint, and brushes. Head to a scenic local lookout, enjoy a bottle of wine, and paint the scenery side-by-side.",
    steps: [
      "Choose a picturesque local park or hilltop view",
      "Set up two small table easels side-by-side",
      "Paint the same sunset scene, offering tips to each other",
      "Sign the corners of each other's paintings as a souvenir"
    ]
  }
};

export const dateNightsMap: Record<string, { virtual: DateSteps; inPerson: DateSteps }> = {
  art: {
    virtual: {
      title: "Virtual Art Museum Tour & Sketch Session",
      desc: "Tour the Louvre or Metropolitan Museum of Art virtually together, then challenge each other to a 30-minute drawing battle of your favorite painting.",
      steps: [
        "Open Google Arts & Culture to access high-res museum tours",
        "Set up video FaceTime/Discord call on your tablets",
        "Share screens to browse historical galleries",
        "Spend 30 minutes sketching a shared piece using your local art kits"
      ],
      perfectFor: "Art lovers (Drawing evening together)"
    },
    inPerson: {
      title: "Sunset Outdoor Canvas Paint Date",
      desc: "Pack canvas, acrylic paint, and brushes. Head to a scenic local lookout, enjoy a bottle of wine, and paint the scenery side-by-side.",
      steps: [
        "Choose a picturesque local park or hilltop view",
        "Set up two small table easels side-by-side",
        "Paint the same sunset scene, offering tips to each other",
        "Sign the corners of each other's paintings as a souvenir"
      ]
    }
  },
  gaming: {
    virtual: {
      title: "Co-op Video Game Campaign",
      desc: "Play connection-focused multiplayer games like 'It Takes Two' or build a virtual home together in 'Stardew Valley' while on Discord voice.",
      steps: [
        "Pick a game (e.g. It Takes Two or Portal 2 Co-op)",
        "Redeem your Steam/Xbox Game Pass gift cards",
        "Connect via Discord voice channel with high-quality noise-cancelling headphones",
        "Cooperate to solve levels, building real-time teamwork skills"
      ],
      perfectFor: "Gamers (Co-op gaming session)"
    },
    inPerson: {
      title: "Local Retro Arcade Battle",
      desc: "Find a local classic arcade. Buy a handful of tokens, and play competitive face-to-face matches of retro games.",
      steps: [
        "Locate a retro bar/arcade or gaming cafe nearby",
        "Divide a bucket of tokens equally",
        "Play head-to-head on classic street fighters or racing units",
        "Trade in tickets to win matching cheesy prizes"
      ]
    }
  },
  music: {
    virtual: {
      title: "Shared Playlist listening party",
      desc: "Use Spotify Group Session or Apple Music SharePlay. Drink wine, listen to your shared playlist, and ask deep questions from Paired.",
      steps: [
        "Create a shared playlist of songs representing major relationship moments",
        "Launch a Spotify Group Session call",
        "Wear your noise-cancelling headphones to enjoy deep audio fidelity",
        "Discuss the memory attached to each song as it plays"
      ],
      perfectFor: "Music fans (Listening party & chat)"
    },
    inPerson: {
      title: "Intimate Local Live Music Night",
      desc: "Pre-book tickets to a local acoustic performance, jazz session, or indie show. Dress up and share the raw energy of live music together.",
      steps: [
        "Find a low-key local acoustic lounge or jazz bar",
        "Arrive early to secure seats near the stage",
        "Order custom mocktails/cocktails and enjoy the acoustic resonance",
        "Request a song dedicated to your partner"
      ]
    }
  },
  cooking: {
    virtual: {
      title: "Chef Challenge Live Cooking Race",
      desc: "Order identical gourmet recipe ingredients locally. Race to cook the dish side-by-side, then dine together on candlelit video FaceTime.",
      steps: [
        "Select a recipe from Cozymeal or your favorite food blog",
        "Deliver ingredients locally via Instacart/Blinkit/UberEats",
        "Put your laptops on kitchen counters and start cooking on video",
        "Serve the meals, light candles, and dine together virtually"
      ],
      perfectFor: "Cooking foodies (Live kitchen challenge)"
    },
    inPerson: {
      title: "Gourmet Couples Cooking Masterclass",
      desc: "Book a professional local cooking workshop. Spend the evening learning complex dishes from a professional chef side-by-side.",
      steps: [
        "Book a local couples cooking class (e.g. handmade sushi or pasta)",
        "Put on matching cooking aprons",
        "Work together to roll, slice, or knead elements from scratch",
        "Sip local wines while eating your creations"
      ]
    }
  },
  fitness: {
    virtual: {
      title: "Synchronized Virtual Yoga & Stretch",
      desc: "Set up matching yoga mats, put on a virtual class on split-screen, and complete a restorative stretch routine together.",
      steps: [
        "Choose a mutual yoga flow or meditation track on YouTube",
        "Launch a video call showing full-body camera views",
        "Keep your Bond Touch bracelets nearby to buzz support during hard poses",
        "End with a shared 10-minute quiet meditation session"
      ],
      perfectFor: "Fitness partners (Yoga & meditation flow)"
    },
    inPerson: {
      title: "Mountain Trail Hike & Outdoor Picnic",
      desc: "Pack energy bars and fresh fruit. Tackle a challenging local hiking trail together and celebrate at the summit with a picnic.",
      steps: [
        "Select a local scenic mountain trail (2-3 hour hike)",
        "Wear matching comfortable activewear",
        "Take turns leading the path and capturing outdoor photos",
        "Spread a blanket at the summit lookout and enjoy the picnic"
      ]
    }
  },
  coffee: {
    virtual: {
      title: "Pour-Over Coffee Morning Tasting",
      desc: "Wake up together on video call, grind your fresh roaster beans, brew matching pour-overs, and compare coffee tasting notes.",
      steps: [
        "Order specialty roaster sampler beans to both addresses",
        "Start your morning video call right as you wake up",
        "Brew using identical ratios and methods (e.g., V60 or French Press)",
        "Sip slowly and compare flavor notes (chocolaty, fruity, floral)"
      ],
      perfectFor: "Coffee enthusiasts (Tasting morning)"
    },
    inPerson: {
      title: "Local Roastery Hop & Tasting Flight",
      desc: "Visit the highest-rated specialty coffee roastery in town. Order a flight of espresso or cold brews and talk for hours.",
      steps: [
        "Locate an artisan local roastery that serves tasting flights",
        "Order contrasting origins (e.g., Ethiopian light roast vs. Sumatran dark)",
        "Sit in a cozy window seat away from laptops and phones",
        "Talk about future relocation plans over espresso"
      ]
    }
  },
  reading: {
    virtual: {
      title: "Silent Book Club & Chapter Discussion",
      desc: "Read the same Kindle book chapter-by-chapter. Set a 45-minute silent timer to read on call, then discuss the plot twists.",
      steps: [
        "Pick a compelling page-turner or mystery novel",
        "Open your Kindle/e-reader on the same page",
        "Keep video call active silently while reading for 45 minutes",
        "Unmute and dissect the characters' decisions over tea"
      ],
      perfectFor: "Readers (Silent book club chat)"
    },
    inPerson: {
      title: "Cozy Independent Bookstore Hop",
      desc: "Browse a local independent bookshop together. Find a book representing what you want to do next, buy it, and read in a cafe.",
      steps: [
        "Visit a local historic or independent bookstore",
        "Challenge: find a book you think the other MUST read",
        "Buy the selected volumes and get coffee at the next-door cafe",
        "Write personal dedications on the inside covers"
      ]
    }
  },
  travel: {
    virtual: {
      title: "Google Maps Travel Exploration",
      desc: "Share your screen on Google Street View, drop yourselves in a random city like Tokyo or Rome, and plan your dream itinerary.",
      steps: [
        "Launch a Google Meet or Discord screenshare session",
        "Navigate to Google Maps Street View in a dream city",
        "Virtually 'walk' through the streets, choosing cafes you'd visit",
        "Build a collaborative travel itinerary list on Google Docs"
      ],
      perfectFor: "Wanderers (Virtual city exploration)"
    },
    inPerson: {
      title: "Road Trip to a Cozy Cabin",
      desc: "Book a secluded cabin in the woods or mountains. Drive out together, build a campfire, and gaze at the stars.",
      steps: [
        "Rent a cozy cabin with an outdoor fireplace/stove",
        "Create a road trip music playlist together",
        "Drive out, unplugging from work alerts completely",
        "Toast marshmallows on the fire and stargaze under the night sky"
      ]
    }
  }
};
