// import axios from 'axios';
// import Config from 'react-native-config';
//
// export const getCoordinates = async (address: string) => {
//   const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
//     address,
//   )}`;
//   const headers = {
//     Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
//   };
//
//   try {
//     const response = await axios.get(url, {headers});
//     console.log('address:', address);
//     console.log('Kakao API response:', response.data);
//     const documents = response.data.documents;
//
//     if (documents && documents.length > 0) {
//       const {x, y} = documents[0].address;
//       return {longitude: parseFloat(x), latitude: parseFloat(y)};
//     } else {
//       throw new Error('No coordinates found for the given address');
//     }
//   } catch (error) {
//     console.error('Error fetching coordinates:', error);
//     throw error;
//   }
// };
