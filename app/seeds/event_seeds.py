from datetime import datetime, timedelta

user_id = 1
current_datetime = datetime.now()

event_seeds = [
    {
            "title": "Event 1",
            "start": datetime(2024, 3, 9, 9, 0, 0),
            "end": datetime(2024, 3, 9, 12, 0, 0),
            "description": "Description of Event 1",
            "user_id": 1,  # Assuming user with ID 1 exists
            "created_at": current_datetime,
            "updated_at": current_datetime
        },
        {
            "title": "Event 2",
            "start": datetime(2024, 3, 10, 10, 0, 0),
            "end": datetime(2024, 3, 10, 14, 0, 0),
            "description": "Description of Event 2",
            "user_id": 1,  # Assuming user with ID 1 exists
            "created_at": current_datetime,
            "updated_at": current_datetime
        },
        {
            "title": "Event 3",
            "start": datetime(2024, 3, 11, 13, 0, 0),
            "end": datetime(2024, 3, 11, 16, 0, 0),
            "description": "Description of Event 3",
            "user_id": 1,  # Assuming user with ID 1 exists
            "created_at": current_datetime,
            "updated_at": current_datetime
        },
        {
            "title": "Event 4",
            "start": datetime(2024, 3, 12, 11, 0, 0),
            "end": datetime(2024, 3, 12, 15, 0, 0),
            "description": "Description of Event 4",
            "user_id": 1,  # Assuming user with ID 1 exists
            "created_at": current_datetime,
            "updated_at": current_datetime
        },
        {
            "title": "Event 5",
            "start": datetime(2024, 3, 13, 8, 0, 0),
            "end": datetime(2024, 3, 13, 11, 0, 0),
            "description": "Description of Event 5",
            "user_id": 1,  # Assuming user with ID 1 exists
            "created_at": current_datetime,
            "updated_at": current_datetime
        }
]

# event_seeds = [
#     {
#         'title': 'First Event at the new park',
#         'description': 'Everybody welcome',
#         'date': current_datetime.date(),
#         'time': current_datetime.time(),
#         'location': '12th Street',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Morning Yoga in the Park',
#         'description': 'Start your day with a rejuvenating yoga session at the Whole Park. All levels are welcome to join in for an hour of mindful stretching and relaxation.',
#         'date': (current_datetime + timedelta(days=1)).date(),
#         'time': current_datetime.replace(hour=7, minute=0, second=0).time(),
#         'location': 'Whole Park',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Community Gardening Workshop',
#         'description': 'Join us at the Field for a hands-on gardening workshop. Learn tips for growing your own vegetables and flowers. Get your hands dirty and enjoy the beauty of nature.',
#         'date': (current_datetime + timedelta(days=2)).date(),
#         'time': current_datetime.replace(hour=8, minute=0, second=0).time(),
#         'location': 'Field',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Playground Playdate',
#         'description': 'Bring your little ones to the Playground for a fun playdate. Connect with other parents and let the kids enjoy the swings, slides, and other play equipment.',
#         'date': (current_datetime + timedelta(days=3)).date(),
#         'time': current_datetime.replace(hour=9, minute=0, second=0).time(),
#         'location': 'Playground',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Rec Center Art Exhibition',
#         'description': 'Explore the artistic talents of our community at the Rec Center Art Exhibition. Local artists will showcase their work. Join us for an afternoon of creativity and inspiration.',
#         'date': (current_datetime + timedelta(days=4)).date(),
#         'time': current_datetime.replace(hour=10, minute=0, second=0).time(),
#         'location': 'Rec Center',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Picnic and Games Day',
#         'description': 'Pack your picnic baskets and head to the Picnic Area for a day of outdoor fun. We\'ll have games, music, and delicious food. Bring your friends and family for a fantastic time.',
#         'date': (current_datetime + timedelta(days=5)).date(),
#         'time': current_datetime.replace(hour=11, minute=0, second=0).time(),
#         'location': 'Picnic Area',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Neighborhood Cleanup',
#         'description': 'Join us for a neighborhood cleanup at Reed Street. Let\'s work together to keep our community clean and beautiful. Gloves and trash bags will be provided.',
#         'date': (current_datetime + timedelta(days=6)).date(),
#         'time': current_datetime.replace(hour=12, minute=0, second=0).time(),
#         'location': 'Reed Street',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Outdoor Movie Matinee',
#         'description': 'Enjoy a family-friendly movie under the open sky at 13th Street. Bring your blankets and snacks for a relaxing afternoon of cinema in the park.',
#         'date': (current_datetime + timedelta(days=7)).date(),
#         'time': current_datetime.replace(hour=13, minute=0, second=0).time(),
#         'location': '13th Street',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Dog Day Out',
#         'description': 'Bring your furry friends to the Field for a dog-friendly event. There will be games, treats, and a doggy parade. It\'s a paw-sitively delightful day for dogs and their owners.',
#         'date': (current_datetime + timedelta(days=8)).date(),
#         'time': current_datetime.replace(hour=15, minute=0, second=0).time(),
#         'location': 'Field',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Children\'s Storytime',
#         'description': 'Join us at the Playground for a magical afternoon of children\'s storytelling. Bring your little ones and listen to enchanting tales that will spark their imagination.',
#         'date': (current_datetime + timedelta(days=9)).date(),
#         'time': current_datetime.replace(hour=16, minute=0, second=0).time(),
#         'location': 'Playground',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Rec Center Fitness Class',
#         'description': 'Get fit and have fun at the Rec Center Fitness Class. Join our certified instructor for a high-energy workout suitable for all fitness levels. Don\'t forget your water bottle!',
#         'date': (current_datetime + timedelta(days=10)).date(),
#         'time': current_datetime.replace(hour=17, minute=0, second=0).time(),
#         'location': 'Rec Center',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Nature Photography Walk',
#         'description': 'Explore the beauty of Reed Street through a nature photography walk. Bring your cameras and smartphones to capture the scenic views and unique wildlife in our neighborhood.',
#         'date': (current_datetime + timedelta(days=11)).date(),
#         'time': current_datetime.replace(hour=8, minute=0, second=0).time(),
#         'location': 'Reed Street',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Community BBQ Bash',
#         'description': 'Join us at the Picnic Area for a sizzling BBQ bash. We\'ll have grilled delights, refreshing beverages, and live music. Bring your appetite and good vibes.',
#         'date': (current_datetime + timedelta(days=12)).date(),
#         'time': current_datetime.replace(hour=9, minute=0, second=0).time(),
#         'location': 'Picnic Area',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Art in the Park Workshop',
#         'description': 'Unleash your creativity at the Whole Park with an art workshop. Supplies will be provided, so bring your artistic spirit and create wonderful masterpieces together.',
#         'date': (current_datetime + timedelta(days=13)).date(),
#         'time': current_datetime.replace(hour=10, minute=0, second=0).time(),
#         'location': 'Whole Park',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Outdoor Chess Tournament',
#         'description': 'Challenge your friends and neighbors to an outdoor chess tournament at 13th Street. Test your strategic skills and enjoy a relaxing game in the park.',
#         'date': (current_datetime + timedelta(days=14)).date(),
#         'time': current_datetime.replace(hour=11, minute=0, second=0).time(),
#         'location': '13th Street',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Family Drum Circle',
#         'description': 'Bring your percussion instruments and join the Family Drum Circle at Reed Street. Experience the joy of making music together in a rhythmic celebration.',
#         'date': (current_datetime + timedelta(days=15)).date(),
#         'time': current_datetime.replace(hour=12, minute=0, second=0).time(),
#         'location': 'Reed Street',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Sunset Picnic and Stargazing',
#         'description': 'Pack your dinner and join us at the Field for a sunset picnic followed by stargazing. Witness the beauty of the night sky with fellow astronomy enthusiasts.',
#         'date': (current_datetime + timedelta(days=16)).date(),
#         'time': current_datetime.replace(hour=13, minute=0, second=0).time(),
#         'location': 'Field',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Rec Center Cooking Class',
#         'description': 'Discover your culinary skills at the Rec Center Cooking Class. Our chef will guide you through a hands-on cooking experience. Enjoy the delicious results!',
#         'date': (current_datetime + timedelta(days=17)).date(),
#         'time': current_datetime.replace(hour=14, minute=0, second=0).time(),
#         'location': 'Rec Center',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Picnic Area Karaoke Night',
#         'description': 'Sing your heart out at the Picnic Area Karaoke Night. Choose your favorite tunes and join the community for a night of music, laughter, and good company.',
#         'date': (current_datetime + timedelta(days=18)).date(),
#         'time': current_datetime.replace(hour=15, minute=0, second=0).time(),
#         'location': 'Picnic Area',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Whole Park Fitness Bootcamp',
#         'description': 'Challenge yourself with a fitness bootcamp at the Whole Park. Our trainer will lead you through a high-intensity workout to boost your energy and endurance.',
#         'date': (current_datetime + timedelta(days=19)).date(),
#         'time': current_datetime.replace(hour=16, minute=0, second=0).time(),
#         'location': 'Whole Park',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': '13th Street Photography Club',
#         'description': 'Join fellow photography enthusiasts for a photo walk at 13th Street. Capture the unique urban scenes and architectural details in our vibrant neighborhood.',
#         'date': (current_datetime + timedelta(days=20)).date(),
#         'time': current_datetime.replace(hour=8, minute=0, second=0).time(),
#         'location': '13th Street',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Reed Street Bird Watching',
#         'description': 'Discover the bird species in our neighborhood with a bird watching event at Reed Street. Bring your binoculars and enjoy the peaceful beauty of our local birds.',
#         'date': (current_datetime + timedelta(days=21)).date(),
#         'time': current_datetime.replace(hour=9, minute=0, second=0).time(),
#         'location': 'Reed Street',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Field Frisbee Tournament',
#         'description': 'Show off your Frisbee skills at the Field Frisbee Tournament. Form teams, compete, and enjoy a day of friendly competition and outdoor fun.',
#         'date': (current_datetime + timedelta(days=22)).date(),
#         'time': current_datetime.replace(hour=10, minute=0, second=0).time(),
#         'location': 'Field',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Playground Movie Night',
#         'description': 'Bring your blankets and join us at the Playground for an outdoor movie night. We\'ll be screening a family-friendly film for everyone to enjoy.',
#         'date': (current_datetime + timedelta(days=23)).date(),
#         'time': current_datetime.replace(hour=11, minute=0, second=0).time(),
#         'location': 'Playground',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Rec Center Board Game Marathon',
#         'description': 'Get ready for a day of board game fun at the Rec Center. Bring your favorite board games, meet new people, and enjoy a marathon of friendly competition.',
#         'date': (current_datetime + timedelta(days=24)).date(),
#         'time': current_datetime.replace(hour=12, minute=0, second=0).time(),
#         'location': 'Rec Center',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
#     {
#         'title': 'Community Volleyball Tournament',
#         'description': 'Gather at the Whole Park for an exciting community volleyball tournament. Form your teams, compete, and enjoy a day of friendly matches and camaraderie.',
#         'date': (current_datetime + timedelta(days=25)).date(),
#         'time': current_datetime.replace(hour=14, minute=0, second=0).time(),
#         'location': 'Whole Park',
#         'flyer': 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png',
#         'user_id': user_id,
#         'created_at': current_datetime,
#         'updated_at': current_datetime
#     },
# ]
