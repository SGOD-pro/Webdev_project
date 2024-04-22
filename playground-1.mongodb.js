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
    "name": "Dr. John Doe",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 10,
    "speciality": "Psychiatrist",
    "email": "john.doe@example.com",
    "contactNo": "1234567890",
    "timing": "9:00 AM - 5:00 PM",
    "days": ["Monday", "Wednesday", "Friday"],
    "clinicLocation": "123 Main Street",
    "charges": 100,
    "image": "https://4.bp.blogspot.com/-6-BYaWqggUs/W_2ACz9tnNI/AAAAAAAAKkQ/ZaqImmQRkvk0F9EIGYfomhTZKbMGS-qJQCLcBGAs/s1600/9d0e90d822253c8a4fc03b7ac06e0bb7.jpg",
    "username": "john_doe",
    "limit": 5
  },
  {
    "name": "Dr. Jane Smith",
    "qualification": {
      "degree": "PhD",
      "group": "Philosophy"
    },
    "experience": 15,
    "speciality": "Philosopher",
    "email": "jane.smith@example.com",
    "contactNo": "2345678901",
    "timing": "10:00 AM - 6:00 PM",
    "days": ["Tuesday", "Thursday", "Saturday"],
    "clinicLocation": "456 Oak Street",
    "charges": 120,
    "image": "https://th.bing.com/th/id/OIP.uGb2KRe9XGJqsPqiQqRBgQHaKq?rs=1&pid=ImgDetMain",
    "username": "jane_smith",
    "limit": 5
  },
  {
    "name": "Dr. David Johnson",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 8,
    "speciality": "Psychiatrist",
    "email": "david.johnson@example.com",
    "contactNo": "3456789012",
    "timing": "8:00 AM - 4:00 PM",
    "days": ["Monday", "Wednesday", "Friday"],
    "clinicLocation": "789 Elm Street",
    "charges": 90,
    "image": "https://wallpapercave.com/wp/wp7665733.jpg",
    "username": "david_johnson",
    "limit": 5
  },
  {
    "name": "Dr. Sarah Williams",
    "qualification": {
      "degree": "PhD",
      "group": "Philosophy"
    },
    "experience": 12,
    "speciality": "Philosopher",
    "email": "sarah.williams@example.com",
    "contactNo": "4567890123",
    "timing": "9:00 AM - 5:00 PM",
    "days": ["Tuesday", "Thursday", "Saturday"],
    "clinicLocation": "901 Maple Street",
    "charges": 110,
    "image": "https://i.pinimg.com/736x/cf/ec/34/cfec3428d176d9cc54d65fc2434b1fd3.jpg",
    "username": "sarah_williams",
    "limit": 5
  },
  {
    "name": "Dr. Michael Brown",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 11,
    "speciality": "Psychiatrist",
    "email": "michael.brown@example.com",
    "contactNo": "5678901234",
    "timing": "10:00 AM - 6:00 PM",
    "days": ["Monday", "Wednesday", "Friday"],
    "clinicLocation": "234 Pine Street",
    "charges": 95,
    "image": "https://miro.medium.com/max/2400/1*Nz9lsk3RdUtVcAmTlDI0Bw.jpeg",
    "username": "michael_brown",
    "limit": 5
  },
  {
    "name": "Dr. Lisa Miller",
    "qualification": {
      "degree": "PhD",
      "group": "Philosophy"
    },
    "experience": 14,
    "speciality": "Philosopher",
    "email": "lisa.miller@example.com",
    "contactNo": "6789012345",
    "timing": "8:00 AM - 4:00 PM",
    "days": ["Tuesday", "Thursday", "Saturday"],
    "clinicLocation": "567 Cedar Street",
    "charges": 115,
    "image": "https://cdn.icowboysradio.com/cuckooradio/uploads/2021/02/25-min-7.jpg",
    "username": "lisa_miller",
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
    "days": ["Monday", "Wednesday", "Friday"],
    "clinicLocation": "345 Oak Street",
    "charges": 85,
    "image": "https://i.pinimg.com/originals/5d/7b/a5/5d7ba5391eb39caefa7b1dee3e5e1fd7.jpg",
    "username": "christopher_wilson",
    "limit": 5
  },
  {
    "name": "Dr. Amanda Taylor",
    "qualification": {
      "degree": "PhD",
      "group": "Philosophy"
    },
    "experience": 13,
    "speciality": "Philosopher",
    "email": "amanda.taylor@example.com",
    "contactNo": "8901234567",
    "timing": "10:00 AM - 6:00 PM",
    "days": ["Tuesday", "Thursday", "Saturday"],
    "clinicLocation": "678 Pine Street",
    "charges": 125,
    "image": "https://1.bp.blogspot.com/-HRPD-KYLSvE/YRC2gMNTJ1I/AAAAAAAAARs/C1YmBKRzUQMzOOfTyK0QiqE0boHtnmcwACLcBGAsYHQ/s0/Kolkata%2BBong%2BWomen%2BRupsa%2BSaha%2BSpicy%2BSaree%2BPhotos%2B2.jpg",
    "username": "amanda_taylor",
    "limit": 5
  },
  {
    "name": "Dr. Matthew Anderson",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 7,
    "speciality": "Psychiatrist",
    "email": "matthew.anderson@example.com",
    "contactNo": "9012345678",
    "timing": "8:00 AM - 4:00 PM",
    "days": ["Monday", "Wednesday", "Friday"],
    "clinicLocation": "890 Cedar Street",
    "charges": 80,
    "image": "https://th.bing.com/th/id/OIP.2IL3DlskcPAM3rSy14VL6wHaHa?rs=1&pid=ImgDetMain",
    "username": "matthew_anderson",
    "limit": 5
  },
  {
    "name": "Dr. Jennifer Garcia",
    "qualification": {
      "degree": "PhD",
      "group": "Philosophy"
    },
    "experience": 16,
    "speciality": "Philosopher",
    "email": "jennifer.garcia@example.com",
    "contactNo": "0123456789",
    "timing": "9:00 AM - 5:00 PM",
    "days": ["Tuesday", "Thursday", "Saturday"],
    "clinicLocation": "456 Pine Street",
    "charges": 130,
    "image": "https://i.pinimg.com/originals/13/12/5c/13125c05badc56c1337886c35d3f820e.jpg",
    "username": "jennifer_garcia",
    "limit": 5
  },
  {
    "name": "Dr. James Martinez",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 10,
    "speciality": "Psychiatrist",
    "email": "james.martinez@example.com",
    "contactNo": "1234567890",
    "timing": "10:00 AM - 6:00 PM",
    "days": ["Monday", "Wednesday", "Friday"],
    "clinicLocation": "123 Main Street",
    "charges": 100,
    "image": "https://i.pinimg.com/originals/77/2e/77/772e7783c444c6e6666492be38c7b5f7.jpg",
    "username": "james_martinez",
    "limit": 5
  },
  {
    "name": "Dr. Mary Rodriguez",
    "qualification": {
      "degree": "PhD",
      "group": "Philosophy"
    },
    "experience": 14,
    "speciality": "Philosopher",
    "email": "mary.rodriguez@example.com",
    "contactNo": "2345678901",
    "timing": "8:00 AM - 4:00 PM",
    "days": ["Tuesday", "Thursday", "Saturday"],
    "clinicLocation": "456 Oak Street",
    "charges": 120,
    "image": "https://i.pinimg.com/originals/23/df/e4/23dfe435d903d69677003cf9ff0b71ef.jpg",
    "username": "mary_rodriguez",
    "limit": 5
  },
  {
    "name": "Dr. Robert Lopez",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 9,
    "speciality": "Psychiatrist",
    "email": "robert.lopez@example.com",
    "contactNo": "3456789012",
    "timing": "9:00 AM - 5:00 PM",
    "days": ["Monday", "Wednesday", "Friday"],
    "clinicLocation": "789 Elm Street",
    "charges": 90,
    "image": "https://i.pinimg.com/originals/a6/d8/2a/a6d82a49a27045f531d5b2807308dbf1.jpg",
    "username": "robert_lopez",
    "limit": 5
  },
  {
    "name": "Dr. Patricia Perez",
    "qualification": {
      "degree": "PhD",
      "group": "Philosophy"
    },
    "experience": 13,
    "speciality": "Philosopher",
    "email": "patricia.perez@example.com",
    "contactNo": "4567890123",
    "timing": "10:00 AM - 6:00 PM",
    "days": ["Tuesday", "Thursday", "Saturday"],
    "clinicLocation": "901 Maple Street",
    "charges": 110,
    "image": "https://i.pinimg.com/originals/ce/a0/91/cea09171909093a8c7fcd97e8365151e.jpg",
    "username": "patricia_perez",
    "limit": 5
  },
  {
    "name": "Dr. William Gonzalez",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 11,
    "speciality": "Psychiatrist",
    "email": "william.gonzalez@example.com",
    "contactNo": "5678901234",
    "timing": "8:00 AM - 4:00 PM",
    "days": ["Monday", "Wednesday", "Friday"],
    "clinicLocation": "234 Pine Street",
    "charges": 95,
    "image": "https://i.pinimg.com/originals/dc/3c/0b/dc3c0bf1df040a93565cdf2e83a91c4e.jpg",
    "username": "william_gonzalez",
    "limit": 5
  },
  {
    "name": "Dr. Elizabeth Hernandez",
    "qualification": {
      "degree": "PhD",
      "group": "Philosophy"
    },
    "experience": 15,
    "speciality": "Philosopher",
    "email": "elizabeth.hernandez@example.com",
    "contactNo": "6789012345",
    "timing": "9:00 AM - 5:00 PM",
    "days": ["Tuesday", "Thursday", "Saturday"],
    "clinicLocation": "567 Cedar Street",
    "charges": 115,
    "image": "https://th.bing.com/th/id/OIP.2gtJK70FTI6Jer5y7jp1DgAAAA?w=450&h=675&rs=1&pid=ImgDetMain",
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
    "speciality": "Psychiatrist",
    "email": "charles.smith@example.com",
    "contactNo": "7890123456",
    "timing": "10:00 AM - 6:00 PM",
    "days": ["Monday", "Wednesday", "Friday"],
    "clinicLocation": "345 Oak Street",
    "charges": 85,
    "image": "https://i.pinimg.com/736x/9f/b4/1f/9fb41f3b7c84f923e09a6c93fbd83b56.jpg",
    "username": "charles_smith",
    "limit": 5
  },
  {
    "name": "Dr. Karen Johnson",
    "qualification": {
      "degree": "PhD",
      "group": "Philosophy"
    },
    "experience": 12,
    "speciality": "Philosopher",
    "email": "karen.johnson@example.com",
    "contactNo": "8901234567",
    "timing": "9:00 AM - 5:00 PM",
    "days": ["Tuesday", "Thursday", "Saturday"],
    "clinicLocation": "678 Pine Street",
    "charges": 125,
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
    "speciality": "Psychiatrist",
    "email": "daniel.anderson@example.com",
    "contactNo": "9012345678",
    "timing": "8:00 AM - 4:00 PM",
    "days": ["Monday", "Wednesday", "Friday"],
    "clinicLocation": "890 Cedar Street",
    "charges": 80,
    "image": "https://i.pinimg.com/originals/62/11/b5/6211b522347c61b1aa0eacdb004bad0b.jpg",
    "username": "daniel_anderson",
    "limit": 5
  },
  {
    "name": "Dr. Laura Martinez",
    "qualification": {
      "degree": "PhD",
      "group": "Philosophy"
    },
    "experience": 16,
    "speciality": "Philosopher",
    "email": "laura.martinez@example.com",
    "contactNo": "0123456789",
    "timing": "9:00 AM - 5:00 PM",
    "days": ["Tuesday", "Thursday", "Saturday"],
    "clinicLocation": "456 Pine Street",
    "charges": 130,
    "image": "https://th.bing.com/th/id/OIP.gpx_V6a2F8myICqyaUgc2AHaI9?rs=1&pid=ImgDetMain",
    "username": "laura_martinez",
    "limit": 5
  },
  {
    "name": "Dr. Brian Brown",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 10,
    "speciality": "Psychiatrist",
    "email": "brian.brown@example.com",
    "contactNo": "1234567890",
    "timing": "10:00 AM - 6:00 PM",
    "days": ["Monday", "Wednesday", "Friday"],
    "clinicLocation": "123 Main Street",
    "charges": 100,
    "image": "https://i.pinimg.com/originals/2a/68/26/2a68269db056dea5355dede522adebd9.jpg",
    "username": "brian_brown",
    "limit": 5
  },
  {
    "name": "Dr. Michelle Garcia",
    "qualification": {
      "degree": "PhD",
      "group": "Philosophy"
    },
    "experience": 14,
    "speciality": "Philosopher",
    "email": "michelle.garcia@example.com",
    "contactNo": "2345678901",
    "timing": "8:00 AM - 4:00 PM",
    "days": ["Tuesday", "Thursday", "Saturday"],
    "clinicLocation": "456 Oak Street",
    "charges": 120,
    "image": "https://i.pinimg.com/736x/f8/3d/a3/f83da3af4837045f62caf3ced5f30c9f.jpg",
    "username": "michelle_garcia",
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
    "contactNo": "3456789012",
    "timing": "9:00 AM - 5:00 PM",
    "days": ["Monday", "Wednesday", "Friday"],
    "clinicLocation": "789 Elm Street",
    "charges": 90,
    "image": "https://lh6.googleusercontent.com/3FbzTP9W8qg3ue9mD6Dm-fDy_jkWekJDe3eeQiO_SczoG6DUk_kxGUX1wfi98_A",
    "username": "christopher_wilson",
    "limit": 5
  },
  {
    "name": "Dr. Angela Rodriguez",
    "qualification": {
      "degree": "PhD",
      "group": "Philosophy"
    },
    "experience": 13,
    "speciality": "Philosopher",
    "email": "angela.rodriguez@example.com",
    "contactNo": "4567890123",
    "timing": "10:00 AM - 6:00 PM",
    "days": ["Tuesday", "Thursday", "Saturday"],
    "clinicLocation": "901 Maple Street",
    "charges": 110,
    "image": "https://4.bp.blogspot.com/-hEbysrHlBk0/XB2hDIaFIMI/AAAAAAAAL9I/79s9bEdT89887Lpl264wX3_4Uaubw28VACLcBGAs/s1600/46938899_363487044210690_8912911557788139198_n.jpg",
    "username": "angela_rodriguez",
    "limit": 5
  },
  {
    "name": "Dr. Joshua Thompson",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 11,
    "speciality": "Psychiatrist",
    "email": "joshua.thompson@example.com",
    "contactNo": "5678901234",
    "timing": "8:00 AM - 4:00 PM",
    "days": ["Monday", "Wednesday", "Friday"],
    "clinicLocation": "234 Pine Street",
    "charges": 95,
    "image": "https://th.bing.com/th/id/OIP.DRPPSP7LYuQly981-mNcfAHaIe?w=640&h=733&rs=1&pid=ImgDetMain",
    "username": "joshua_thompson",
    "limit": 5
  },
  {
    "name": "Dr. Amanda Clark",
    "qualification": {
      "degree": "PhD",
      "group": "Philosophy"
    },
    "experience": 15,
    "speciality": "Philosopher",
    "email": "amanda.clark@example.com",
    "contactNo": "6789012345",
    "timing": "9:00 AM - 5:00 PM",
    "days": ["Tuesday", "Thursday", "Saturday"],
    "clinicLocation": "567 Cedar Street",
    "charges": 115,
    "image": "https://th.bing.com/th/id/OIP.MT50KwyXxdP5SPyqbd2aFwAAAA?rs=1&pid=ImgDetMain",
    "username": "amanda_clark",
    "limit": 5
  },
  {
    "name": "Dr. Ryan Lee",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 8,
    "speciality": "Psychiatrist",
    "email": "ryan.lee@example.com",
    "contactNo": "8901234567",
    "timing": "10:00 AM - 6:00 PM",
    "days": ["Monday", "Wednesday", "Friday"],
    "clinicLocation": "678 Pine Street",
    "charges": 85,
    "image": "https://i.pinimg.com/originals/b9/f9/95/b9f9951db98c065d26d8b434ac784e93.jpg",
    "username": "ryan_lee",
    "limit": 5
  },
  {
    "name": "Dr. Kimberly Hill",
    "qualification": {
      "degree": "PhD",
      "group": "Philosophy"
    },
    "experience": 16,
    "speciality": "Philosopher",
    "email": "kimberly.hill@example.com",
    "contactNo": "0123456789",
    "timing": "9:00 AM - 5:00 PM",
    "days": ["Tuesday", "Thursday", "Saturday"],
    "clinicLocation": "456 Pine Street",
    "charges": 130,
    "image": "https://i.pinimg.com/originals/14/c0/55/14c05531d0a3061295dba6fb800580fa.jpg",
    "username": "kimberly_hill",
    "limit": 5
  },
  {
    "name": "Dr. Justin Garcia",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 10,
    "speciality": "Psychiatrist",
    "email": "justin.garcia@example.com",
    "contactNo": "1234567890",
    "timing": "10:00 AM - 6:00 PM",
    "days": ["Monday", "Wednesday", "Friday"],
    "clinicLocation": "123 Main Street",
    "charges": 100,
    "image": "https://th.bing.com/th/id/OIP.exWhVDURCtXPdmZSmB2HlwHaLG?rs=1&pid=ImgDetMain",
    "username": "justin_garcia",
    "limit": 5
  },
  {
    "name": "Dr. Nicole Martinez",
    "qualification": {
      "degree": "PhD",
      "group": "Philosophy"
    },
    "experience": 14,
    "speciality": "Philosopher",
    "email": "nicole.martinez@example.com",
    "contactNo": "2345678901",
    "timing": "8:00 AM - 4:00 PM",
    "days": ["Tuesday", "Thursday", "Saturday"],
    "clinicLocation": "456 Oak Street",
    "charges": 120,
    "image": "https://4.bp.blogspot.com/-oG5q8s_S46k/XBMifWKFijI/AAAAAAAALh4/mkPFIfZVBrwgxMmiZfVJg0BjDY9mO7BRwCLcBGAs/s1600/797996c5c96f15652ada052247f6be13.jpg",
    "username": "nicole_martinez",
    "limit": 5
  },
  {
    "name": "Dr. Daniel Wilson",
    "qualification": {
      "degree": "MD",
      "group": "Psychiatry"
    },
    "experience": 9,
    "speciality": "Psychiatrist",
    "email": "daniel.wilson@example.com",
    "contactNo": "3456789012",
    "timing": "9:00 AM - 5:00 PM",
    "days": ["Monday", "Wednesday", "Friday"],
    "clinicLocation": "789 Elm Street",
    "charges": 90,
    "image": "https://th.bing.com/th/id/OIP.Fh80gni0_bGPS0LBPCSF8gAAAA?rs=1&pid=ImgDetMain",
    "username": "daniel_wilson",
    "limit": 5
  },
  {
    "name": "Dr. Heather Brown",
    "qualification": {
      "degree": "PhD",
      "group": "Philosophy"
    },
    "experience": 13,
    "speciality": "Philosopher",
    "email": "heather.brown@example.com",
    "contactNo": "4567890123",
    "timing": "10:00 AM - 6:00 PM",
    "days": ["Tuesday", "Thursday", "Saturday"],
    "clinicLocation": "901 Maple Street",
    "charges": 110,
    "image": "https://th.bing.com/th/id/OIP.nvoeRb0pr6xaZnRg2OGZfwHaJQ?rs=1&pid=ImgDetMain",
    "username": "heather_brown",
    "limit": 5
  }
];

// Insert a few documents into the sales collection.
db.getCollection('doctors').insertMany(
  fakeData
);

