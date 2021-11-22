const saveUserDetails = (data) => {
  sessionStorage.setItem('token', data.accessToken);
  localStorage.setItem('userDetails', data.user);
};
export default saveUserDetails;
// export const clearUserDetails =(data) => {

//     sessionStorage.clear();
//     localStorage.clear();
// }
