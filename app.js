import { connectDB } from './config/connectDB.js';

const connection = await connectDB();

const query = 'SELECT * FROM users';

const getUsers = async (query) => {
  const [rows, _] = await connection.execute(query);
  console.log(rows);
};

// getUsers(query);

const tourData = {
  p_name: 'Test tour',
  p_price: 50,
  p_dates: '2023-10-15,2023-10-22',
  p_times: '09:00,14:00',
  p_personsInGroup: 15,
  p_transportation: 'bus',
  p_duration: '03:30:00',
  p_guid: 'Included',
  p_language: 'Ukrainian',
  p_insurance: 'Included',
  p_titlePhoto: 'https://example.com/tour_image.jpg',
  p_photos: 'https://example.com/photo1.jpg,https://example.com/photo2.jpg',
  p_adultPrice: 40,
  p_childPrice: 20,
  p_vipTransPrice: 10,
};

const newTourQuery = `Call sp_addTour(
  '${tourData.p_name}',
  ${tourData.p_price},
  '${tourData.p_dates}',
  '${tourData.p_times}',
  ${tourData.p_personsInGroup},
  '${tourData.p_transportation}',
  '${tourData.p_duration}',
  '${tourData.p_guid}',
  '${tourData.p_language}',
  '${tourData.p_insurance}',
  '${tourData.p_titlePhoto}',
  '${tourData.p_photos}',
  ${tourData.p_adultPrice},
  ${tourData.p_childPrice},
  ${tourData.p_vipTransPrice}
)`;

const addTour = async () => {
  const [rows, _] = await connection.execute(newTourQuery);
  console.log(rows);
};

// addTour();
