from googletrans import Translator
translator = Translator()

text = '''
    What is the website about?
Welcome to our platform for booking visiting slots at the magnificent Ayodhya Ram Mandir Temple. Immerse yourself in the divinity of this sacred site by easily booking your preferred slots, checking real-time availability, and even securing a place on our waitlist. With live updates on slot availability and waitlist status, your journey to spirituality has never been more seamless. Plus, rest assured with our comprehensive refund policy. Join us in experiencing the serenity of Ayodhya Ram Mandir Temple, where every visit is a step closer to divine enlightenment.

History
The history of the Ayodhya Ram Mandir is centuries-old. The temple is built on the site believed to be the birthplace of Lord Ram, one of the most revered Hindu deities. The temple was demolished by the Mughal emperor Babur in the 16th century and a mosque was built in its place. The mosque, known as the Babri Masjid, stood on the site for centuries until it was demolished in 1992 by Hindu nationalists, triggering widespread violence and communal tensions in the country. The Ayodhya dispute has been a contentious issue in Indian politics for decades. The dispute revolved around the ownership of the site where the Babri Masjid stood and whether it was the birthplace of Lord Ram. The dispute was finally settled by the Indian Supreme Court in 2019, which ruled in favor of the construction of a Ram Janmabhoomi temple on the site. The construction of the temple was undertaken by the Shri Ram Janmabhoomi Teerth Kshetra, a trust formed by the Indian government to oversee the construction of the temple.

Architecture
A towering testament to faith, the Ram Mandir in Ayodhya is rising from the ground. Designed by generations of temple architects, the Sompura family, it blends tradition with modern planning. The 161-foot giant incorporates the Māru-Gurjara architectural style, known for its intricate details.  Inside, a central sanctum, the holiest space, is surrounded by five unique halls.  Respectful of the environment, the temple complex preserves most of its land as green space.  Construction itself is a marvel of craftsmanship, using copper instead of iron or steel to bind the sandstone blocks. This architectural marvel is destined to be one of the world's largest Hindu temples.

About
In Ayodhya, the Ram Mandir, nearing completion, stands as a beacon of faith, guided by the renowned Sompura family across generations. This monumental Hindu temple reflects deep devotion, featuring a central sanctum surrounded by five prayer halls, all emphasizing sustainability by preserving extensive green spaces and utilizing innovative construction methods such as copper binding instead of traditional iron or steel. Upon its forthcoming completion, the Ram Mandir will rank among the largest Hindu temples of the world, a testament to enduring faith and tradition.

Booking Procedure
Proceed to /booking -> Ensure you are logged in -> Provide necessary details -> Click 'BOOK NOW' -> proceed to the payment gateway -> Once payment is confirmed, you can access your booked ticket at /get-booking.


Cancel
Ensure you are logged in -> Navigate to 'VIEW BOOKINGS' tab -> Click 'CANCEL' -> proceed to the payment gateway -> Once payment is confirmed, you can access your booked ticket at /get-booking.

'''
translated = translator.translate(text, dest='hi').text
print(translated)