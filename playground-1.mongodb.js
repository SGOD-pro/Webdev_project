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
use('mentalhealth');
const fakeData = [
  {
    "name": "Dr. Jane Smith",
    "qualification": {
      "degree": "PhD",
      "group": "Psychology"
    },
    "experience": 15,
    "speciality": "Clinical Psychology",
    "email": "jane.smith@example.com",
    "contactNo": "2345678901",
    "timing": "10:00 AM - 6:00 PM",
    "days": [
      "Tuesday",
      "Thursday",
      "Saturday"
    ],
    "clinicLocation": "456 Oak Street",
    "charges": 500,
    "image": "https://th.bing.com/th/id/OIP.uGb2KRe9XGJqsPqiQqRBgQHaKq?rs=1&pid=ImgDetMain",
    "username": "jane_smith",
    "limit": 5
  },
  {
    "name": "Dr. Christopher Wilson",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 9,
    "speciality": "Psychiatrist",
    "email": "christopher.wilson@example.com",
    "contactNo": "7890123456",
    "timing": "9:00 AM - 5:00 PM",
    "days": [
      "Monday",
      "Wednesday",
      "Friday"
    ],
    "clinicLocation": "345 Oak Street",
    "charges": 400,
    "image": "https://i.pinimg.com/originals/5d/7b/a5/5d7ba5391eb39caefa7b1dee3e5e1fd7.jpg",
    "username": "christopher_wilson",
    "limit": 5
  },
  {
    "name": "Dr. Brian Brown",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 10,
    "speciality": "Psychiatry",
    "email": "brian.brown@example.com",
    "contactNo": "1234567890",
    "timing": "10:00 AM - 6:00 PM",
    "days": [
      "Monday",
      "Wednesday",
      "Friday"
    ],
    "clinicLocation": "123 Main Street",
    "charges": 600,
    "image": "https://wallpapercave.com/wp/wp7665585.jpg",
    "username": "brian_brown",
    "limit": 5
  },
  {
    "name": "Dr. David Johnson",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 8,
    "speciality": "Psychotherapy",
    "email": "david.johnson@example.com",
    "contactNo": "3456789012",
    "timing": "8:00 AM - 4:00 PM",
    "days": [
      "Monday",
      "Wednesday",
      "Friday"
    ],
    "clinicLocation": "789 Elm Street",
    "charges": 700,
    "image": "https://wallpapercave.com/wp/wp7665733.jpg",
    "username": "david_johnson",
    "limit": 5
  },
  {
    "name": "Dr. Elizabeth Hernandez",
    "qualification": {
      "degree": "PhD",
      "group": "Psychology"
    },
    "experience": 15,
    "speciality": "Counselling Psychology",
    "email": "elizabeth.hernandez@example.com",
    "contactNo": "6789012345",
    "timing": "9:00 AM - 5:00 PM",
    "days": [
      "Tuesday",
      "Thursday",
      "Saturday"
    ],
    "clinicLocation": "567 Cedar Street",
    "charges": 650,
    "image": "https://dp.profilepics.in/profile_pictures/malayali-nadan-pennu/malayali-girls-274.jpg",
    "username": "elizabeth_hernandez",
    "limit": 5
  },
  {
    "name": "Dr. Charles Smith",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 8,
    "speciality": "Psychoanalyst",
    "email": "charles.smith@example.com",
    "contactNo": "7890123456",
    "timing": "10:00 AM - 6:00 PM",
    "days": [
      "Monday",
      "Wednesday",
      "Friday"
    ],
    "clinicLocation": "345 Oak Street",
    "charges": 500,
    "image": "https://i.pinimg.com/736x/9f/b4/1f/9fb41f3b7c84f923e09a6c93fbd83b56.jpg",
    "username": "charles_smith",
    "limit": 5
  },
  {
    "name": "Dr. Joshua Thompson",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 11,
    "speciality": "Geriatric Psychiatry",
    "email": "joshua.thompson@example.com",
    "contactNo": "5678901234",
    "timing": "8:00 AM - 4:00 PM",
    "days": [
      "Monday",
      "Wednesday",
      "Friday"
    ],
    "clinicLocation": "234 Pine Street",
    "charges": 600,
    "image": "https://th.bing.com/th/id/OIP.DRPPSP7LYuQly981-mNcfAHaIe?w=640&h=733&rs=1&pid=ImgDetMain",
    "username": "joshua_thompson",
    "limit": 5
  },
  {
    "name": "Dr. Kimberly Hill",
    "qualification": {
      "degree": "PhD",
      "group": "Psychology"
    },
    "experience": 16,
    "speciality": "Neuropsychology",
    "email": "kimberly.hill@example.com",
    "contactNo": "0123456789",
    "timing": "9:00 AM - 5:00 PM",
    "days": [
      "Tuesday",
      "Thursday",
      "Saturday"
    ],
    "clinicLocation": "456 Pine Street",
    "charges": 700,
    "image": "https://i.pinimg.com/originals/14/c0/55/14c05531d0a3061295dba6fb800580fa.jpg",
    "username": "kimberly_hill",
    "limit": 5
  },
  {
    "name": "Dr. William Gonzalez",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 11,
    "speciality": "Addiction Psychiatry",
    "email": "william.gonzalez@example.com",
    "contactNo": "5678901234",
    "timing": "8:00 AM - 4:00 PM",
    "days": [
      "Monday",
      "Wednesday",
      "Friday"
    ],
    "clinicLocation": "234 Pine Street",
    "charges": 500,
    "image": "https://i.pinimg.com/originals/dc/3c/0b/dc3c0bf1df040a93565cdf2e83a91c4e.jpg",
    "username": "william_gonzalez",
    "limit": 5
  },
  {
    "name": "Dr. Karen Johnson",
    "qualification": {
      "degree": "PhD",
      "group": "Psychology"
    },
    "experience": 12,
    "speciality": "Industrial- Organisational Psychology",
    "email": "karen.johnson@example.com",
    "contactNo": "8901234567",
    "timing": "9:00 AM - 5:00 PM",
    "days": [
      "Tuesday",
      "Thursday",
      "Saturday"
    ],
    "clinicLocation": "678 Pine Street",
    "charges": 700,
    "image": "https://i.pinimg.com/originals/53/9b/f5/539bf5b551c71e8483ac7112d807be87.jpg",
    "username": "karen_johnson",
    "limit": 5
  },
  {
    "name": "Dr. Daniel Anderson",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 7,
    "speciality": "Psychotherapy",
    "email": "daniel.anderson@example.com",
    "contactNo": "9012345678",
    "timing": "8:00 AM - 4:00 PM",
    "days": [
      "Monday",
      "Wednesday",
      "Friday"
    ],
    "clinicLocation": "890 Cedar Street",
    "charges": 600,
    "image": "https://i.pinimg.com/originals/62/11/b5/6211b522347c61b1aa0eacdb004bad0b.jpg",
    "username": "daniel_anderson",
    "limit": 5
  },
  {
    "name": "Dr. Laura Martinez",
    "qualification": {
      "degree": "PhD",
      "group": "Psychology"
    },
    "experience": 16,
    "speciality": "Educational Psychology",
    "email": "laura.martinez@example.com",
    "contactNo": "0123456789",
    "timing": "9:00 AM - 5:00 PM",
    "days": [
      "Tuesday",
      "Thursday",
      "Saturday"
    ],
    "clinicLocation": "456 Pine Street",
    "charges": 500,
    "image": "https://th.bing.com/th/id/OIP.gpx_V6a2F8myICqyaUgc2AHaI9?rs=1&pid=ImgDetMain",
    "username": "laura_martinez",
    "limit": 5
  },
  {
    "name": "Dr. Michael Brown",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 11,
    "speciality": "Eating Disorders",
    "email": "michael.brown@example.com",
    "contactNo": "5678901234",
    "timing": "10:00 AM - 6:00 PM",
    "days": [
      "Monday",
      "Wednesday",
      "Friday"
    ],
    "clinicLocation": "234 Pine Street",
    "charges": 700,
    "image": "https://miro.medium.com/max/2400/1*Nz9lsk3RdUtVcAmTlDI0Bw.jpeg",
    "username": "michael_brown",
    "limit": 5
  },
  {
    "name": "Dr. Lisa Miller",
    "qualification": {
      "degree": "PhD",
      "group": "Psychology"
    },
    "experience": 14,
    "speciality": "Neuropsychology",
    "email": "lisa.miller@example.com",
    "contactNo": "6789012345",
    "timing": "8:00 AM - 4:00 PM",
    "days": [
      "Tuesday",
      "Thursday",
      "Saturday"
    ],
    "clinicLocation": "567 Cedar Street",
    "charges": 750,
    "image": "https://cdn.icowboysradio.com/cuckooradio/uploads/2021/02/25-min-7.jpg",
    "username": "lisa_miller",
    "limit": 5
  },
  {
    "name": "Dr. Amanda Taylor",
    "qualification": {
      "degree": "PhD",
      "group": "Psychology"
    },
    "experience": 13,
    "speciality": "Social Psychology",
    "email": "amanda.taylor@example.com",
    "contactNo": "8901234567",
    "timing": "10:00 AM - 6:00 PM",
    "days": [
      "Tuesday",
      "Thursday",
      "Saturday"
    ],
    "clinicLocation": "678 Pine Street",
    "charges": 600,
    "image": "https://1.bp.blogspot.com/-HRPD-KYLSvE/YRC2gMNTJ1I/AAAAAAAAARs/C1YmBKRzUQMzOOfTyK0QiqE0boHtnmcwACLcBGAsYHQ/s0/Kolkata%2BBong%2BWomen%2BRupsa%2BSaha%2BSpicy%2BSaree%2BPhotos%2B2.jpg",
    "username": "amanda_taylor",
    "limit": 5
  },
  {
    "name": "Dr. John Doe",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 10,
    "speciality": "Geriatric Psychiatry",
    "email": "john.doe@example.com",
    "contactNo": "1234567890",
    "timing": "9:00 AM - 5:00 PM",
    "days": [
      "Monday",
      "Wednesday",
      "Friday"
    ],
    "clinicLocation": "123 Main Street",
    "charges": 600,
    "image": "https://4.bp.blogspot.com/-6-BYaWqggUs/W_2ACz9tnNI/AAAAAAAAKkQ/ZaqImmQRkvk0F9EIGYfomhTZKbMGS-qJQCLcBGAs/s1600/9d0e90d822253c8a4fc03b7ac06e0bb7.jpg",
    "username": "john_doe",
    "limit": 5
  },
  {
    "name": "Dr. Mary Rodriguez",
    "qualification": {
      "degree": "PhD",
      "group": "Psychology"
    },
    "experience": 14,
    "speciality": "Child Psychology",
    "email": "mary.rodriguez@example.com",
    "contactNo": "2345678901",
    "timing": "8:00 AM - 4:00 PM",
    "days": [
      "Tuesday",
      "Thursday",
      "Saturday"
    ],
    "clinicLocation": "456 Oak Street",
    "charges": 650,
    "image": "https://i.pinimg.com/originals/23/df/e4/23dfe435d903d69677003cf9ff0b71ef.jpg",
    "username": "mary_rodriguez",
    "limit": 5
  },
  {
    "name": "Dr. Christopher Wilson",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 9,
    "speciality": "Educational Psychology",
    "email": "christopher.wilson@example.com",
    "contactNo": "3456789012",
    "timing": "9:00 AM - 5:00 PM",
    "days": [
      "Monday",
      "Wednesday",
      "Friday"
    ],
    "clinicLocation": "789 Elm Street",
    "charges": 800,
    "image": "https://lh6.googleusercontent.com/3FbzTP9W8qg3ue9mD6Dm-fDy_jkWekJDe3eeQiO_SczoG6DUk_kxGUX1wfi98_A",
    "username": "christopher_wilson",
    "limit": 5
  },
  {
    "name": "Dr. Heather Brown",
    "qualification": {
      "degree": "PhD",
      "group": "Psychology"
    },
    "experience": 13,
    "speciality": "Clinical Psychology",
    "email": "heather.brown@example.com",
    "contactNo": "4567890123",
    "timing": "10:00 AM - 6:00 PM",
    "days": [
      "Tuesday",
      "Thursday",
      "Saturday"
    ],
    "clinicLocation": "901 Maple Street",
    "charges": 850,
    "image": "https://th.bing.com/th/id/OIP.nvoeRb0pr6xaZnRg2OGZfwHaJQ?rs=1&pid=ImgDetMain",
    "username": "heather_brown",
    "limit": 5
  },
  {
    "name": "Dr. Sarah Williams",
    "qualification": {
      "degree": "PhD",
      "group": "Psychology"
    },
    "experience": 12,
    "speciality": "Neuropsychology",
    "email": "sarah.williams@example.com",
    "contactNo": "4567890123",
    "timing": "9:00 AM - 5:00 PM",
    "days": [
      "Tuesday",
      "Thursday",
      "Saturday"
    ],
    "clinicLocation": "901 Maple Street",
    "charges": 600,
    "image": "https://i.pinimg.com/736x/cf/ec/34/cfec3428d176d9cc54d65fc2434b1fd3.jpg",
    "username": "sarah_williams",
    "limit": 5
  }
];

// Insert a few documents into the sales collection.
db.getCollection('doctors').insertMany(fakeData);

