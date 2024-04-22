/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('mongodbVSCodePlaygroundDB');

// Insert a few documents into the sales collection.
db.getCollection('doctors').insertMany([
    {
      "name": "Dr. John Smith",
      "qualification": "MBBS, MD",
      "experience": "10 years",
      "speciality": "Cardiology",
      "email": "john.smith@example.com",
      "contactNo": "1234567890",
      "timing": "Morning",
      "days": ["Monday", "Wednesday", "Friday"],
      "clinicLocation": "123 Main Street",
      "charges": 250,
      "image": "https://via.placeholder.com/150",
      "username": "john_smith",
      "limit": 5
    },
    {
      "name": "Dr. Emily Johnson",
      "qualification": "MBBS, MS",
      "experience": "12 years",
      "speciality": "Dermatology",
      "email": "emily.johnson@example.com",
      "contactNo": "2345678901",
      "timing": "Afternoon",
      "days": ["Tuesday", "Thursday", "Saturday"],
      "clinicLocation": "456 Oak Street",
      "charges": 300,
      "image": "https://via.placeholder.com/150",
      "username": "emily_johnson",
      "limit": 5
    },
    {
      "name": "Dr. Michael Williams",
      "qualification": "MBBS, MD",
      "experience": "15 years",
      "speciality": "Orthopedics",
      "email": "michael.williams@example.com",
      "contactNo": "3456789012",
      "timing": "Evening",
      "days": ["Monday", "Wednesday", "Friday"],
      "clinicLocation": "789 Pine Street",
      "charges": 350,
      "image": "https://via.placeholder.com/150",
      "username": "michael_williams",
      "limit": 6
    },
    {
      "name": "Dr. Emma Brown",
      "qualification": "MBBS, MS",
      "experience": "10 years",
      "speciality": "Pediatrics",
      "email": "emma.brown@example.com",
      "contactNo": "4567890123",
      "timing": "Morning",
      "days": ["Tuesday", "Thursday", "Saturday"],
      "clinicLocation": "890 Maple Street",
      "charges": 200,
      "image": "https://via.placeholder.com/150",
      "username": "emma_brown",
      "limit": 5
    },
    {
      "name": "Dr. Ethan Davis",
      "qualification": "MBBS, MD",
      "experience": "8 years",
      "speciality": "Gynecology",
      "email": "ethan.davis@example.com",
      "contactNo": "5678901234",
      "timing": "Afternoon",
      "days": ["Monday", "Wednesday", "Friday"],
      "clinicLocation": "123 Elm Street",
      "charges": 280,
      "image": "https://via.placeholder.com/150",
      "username": "ethan_davis",
      "limit": 5
    },
    {
      "name": "Dr. Olivia Wilson",
      "qualification": "MBBS, MS",
      "experience": "10 years",
      "speciality": "Dentistry",
      "email": "olivia.wilson@example.com",
      "contactNo": "6789012345",
      "timing": "Evening",
      "days": ["Tuesday", "Thursday", "Saturday"],
      "clinicLocation": "456 Walnut Street",
      "charges": 180,
      "image": "https://via.placeholder.com/150",
      "username": "olivia_wilson",
      "limit": 7
    },
    {
      "name": "Dr. Liam Martinez",
      "qualification": "MBBS, MD",
      "experience": "12 years",
      "speciality": "Neurology",
      "email": "liam.martinez@example.com",
      "contactNo": "7890123456",
      "timing": "Morning",
      "days": ["Monday", "Wednesday", "Friday"],
      "clinicLocation": "789 Cedar Street",
      "charges": 320,
      "image": "https://via.placeholder.com/150",
      "username": "liam_martinez",
      "limit": 5
    },
    {
      "name": "Dr. Sophia Garcia",
      "qualification": "MBBS, MS",
      "experience": "15 years",
      "speciality": "Oncology",
      "email": "sophia.garcia@example.com",
      "contactNo": "8901234567",
      "timing": "Afternoon",
      "days": ["Tuesday", "Thursday", "Saturday"],
      "clinicLocation": "123 Pine Street",
      "charges": 400,
      "image": "https://via.placeholder.com/150",
      "username": "sophia_garcia",
      "limit": 5
    },
    {
      "name": "Dr. Mason Rodriguez",
      "qualification": "MBBS, MD",
      "experience": "10 years",
      "speciality": "Urology",
      "email": "mason.rodriguez@example.com",
      "contactNo": "9012345678",
      "timing": "Evening",
      "days": ["Monday", "Wednesday", "Friday"],
      "clinicLocation": "456 Maple Street",
      "charges": 280,
      "image": "https://via.placeholder.com/150",
      "username": "mason_rodriguez",
      "limit": 5
    },
    {
      "name": "Dr. Amelia Martinez",
      "qualification": "MBBS, MS",
      "experience": "12 years",
      "speciality": "Ophthalmology",
      "email": "amelia.martinez@example.com",
      "contactNo": "1234567890",
      "timing": "Morning",
      "days": ["Tuesday", "Thursday", "Saturday"],
      "clinicLocation": "789 Oak Street",
      "charges": 350,
      "image": "https://via.placeholder.com/150",
      "username": "amelia_martinez",
      "limit": 5
    },
    {
      "name": "Dr. James Thompson",
      "qualification": "MBBS, MD",
      "experience": "15 years",
      "speciality": "Gastroenterology",
      "email": "james.thompson@example.com",
      "contactNo": "2345678901",
      "timing": "Afternoon",
      "days": ["Monday", "Wednesday", "Friday"],
      "clinicLocation": "123 Elm Street",
      "charges": 300,
      "image": "https://via.placeholder.com/150",
      "username": "james_thompson",
      "limit": 5
    },
    {
      "name": "Dr. Harper Scott",
      "qualification": "MBBS, MS",
      "experience": "10 years",
      "speciality": "ENT",
      "email": "harper.scott@example.com",
      "contactNo": "3456789012",
      "timing": "Evening",
      "days": ["Tuesday", "Thursday", "Saturday"],
      "clinicLocation": "456 Cedar Street",
      "charges": 200,
      "image": "https://via.placeholder.com/150",
      "username": "harper_scott",
      "limit": 5
    },
    {
      "name": "Dr. Benjamin Hill",
      "qualification": "MBBS, MD",
      "experience": "8 years",
      "speciality": "Rheumatology",
      "email": "benjamin.hill@example.com",
      "contactNo": "4567890123",
      "timing": "Morning",
      "days": ["Monday", "Wednesday", "Friday"],
      "clinicLocation": "123 Walnut Street",
      "charges": 280,
      "image": "https://via.placeholder.com/150",
      "username": "benjamin_hill",
      "limit": 5
    },
    {
      "name": "Dr. Lily Adams",
      "qualification": "MBBS, MS",
      "experience": "10 years",
      "speciality": "Psychiatry",
      "email": "lily.adams@example.com",
      "contactNo": "5678901234",
      "timing": "Afternoon",
      "days": ["Tuesday", "Thursday", "Saturday"],
      "clinicLocation": "789 Pine Street",
      "charges": 180,
      "image": "https://via.placeholder.com/150",
      "username": "lily_adams",
      "limit": 7
    },
    {
      "name": "Dr. Noah Ramirez",
      "qualification": "MBBS, MD",
      "experience": "12 years",
      "speciality": "Nephrology",
      "email": "noah.ramirez@example.com",
      "contactNo": "6789012345",
      "timing": "Morning",
      "days": ["Monday", "Wednesday", "Friday"],
      "clinicLocation": "123 Maple Street",
      "charges": 320,
      "image": "https://via.placeholder.com/150",
      "username": "noah_ramirez",
      "limit": 5
    },
    {
      "name": "Dr. Ava Flores",
      "qualification": "MBBS, MS",
      "experience": "15 years",
      "speciality": "Endocrinology",
      "email": "ava.flores@example.com",
      "contactNo": "7890123456",
      "timing": "Afternoon",
      "days": ["Tuesday", "Thursday", "Saturday"],
      "clinicLocation": "456 Cedar Street",
      "charges": 400,
      "image": "https://via.placeholder.com/150",
      "username": "ava_flores",
      "limit": 5
    },
    {
      "name": "Dr. Lucas Cooper",
      "qualification": "MBBS, MD",
      "experience": "10 years",
      "speciality": "Pulmonology",
      "email": "lucas.cooper@example.com",
      "contactNo": "9012345678",
      "timing": "Evening",
      "days": ["Monday", "Wednesday", "Friday"],
      "clinicLocation": "123 Oak Street",
      "charges": 280,
      "image": "https://via.placeholder.com/150",
      "username": "lucas_cooper",
      "limit": 5
    },
    {
      "name": "Dr. Isabella Richardson",
      "qualification": "MBBS, MS",
      "experience": "12 years",
      "speciality": "Hematology",
      "email": "isabella.richardson@example.com",
      "contactNo": "1234567890",
      "timing": "Morning",
      "days": ["Tuesday", "Thursday", "Saturday"],
      "clinicLocation": "789 Walnut Street",
      "charges": 350,
      "image": "https://via.placeholder.com/150",
      "username": "isabella_richardson",
      "limit": 5
    },
    {
      "name": "Dr. Oliver Turner",
      "qualification": "MBBS, MD",
      "experience": "15 years",
      "speciality": "Allergy & Immunology",
      "email": "oliver.turner@example.com",
      "contactNo": "2345678901",
      "timing": "Afternoon",
      "days": ["Monday", "Wednesday", "Friday"],
      "clinicLocation": "123 Pine Street",
      "charges": 300,
      "image": "https://via.placeholder.com/150",
      "username": "oliver_turner",
      "limit": 5
    },
    {
      "name": "Dr. Charlotte Stewart",
      "qualification": "MBBS, MS",
      "experience": "10 years",
      "speciality": "Rheumatology",
      "email": "charlotte.stewart@example.com",
      "contactNo": "3456789012",
      "timing": "Evening",
      "days": ["Tuesday", "Thursday", "Saturday"],
      "clinicLocation": "456 Cedar Street",
      "charges": 200,
      "image": "https://via.placeholder.com/150",
      "username": "charlotte_stewart",
      "limit": 5
    }
  ]
  );

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.getCollection('sales').find({
  date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
}).count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('sales').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]);
