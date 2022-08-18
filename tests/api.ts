import axios from "axios";


// This is a test file for the API
// It is not meant to be run, but rather to be used as a reference for the API

export const createUser = axios.post("http://localhost:3000/api/user", {
    wallet: '0x1234567890',
    type: 'APPLICANT',
    name: 'Alice',
    username: 'alice',
}).then((res) => {  
  return res;
});

// Create a async await function to use the above function
export const getUser = async (walletId: string) => {
  const res = await axios.get(`http://localhost:3000/api/user/${walletId}`);
  return res;
};

export const createUserProfile = async (userId: string) => {
  console.log(userId);
  const res  = axios.post(`http://localhost:3000/api/userProfile`, {
      userId,
      bio: "This is a test bio",
      image: "https://www.google.com",
      skills: [{
          name: "Javascript",
          level: "INTERMEDIATE",
      }],
      location: "New York",
      website: "https://www.google.com",
      experience: 
        {
          designation: "Software Engineer",
          company: "Google",
          location: "New York",
          from: new Date("2020-01-01"),
          to: new Date("2020-01-01"),
          current: false,
          description: "This is a test description",
        },
      education: 
        {
          school: "MIT",
          degree: "Bachelors",
          fieldOfStudy: "Computer Science",
          from: new Date("2020-01-01"),
          to: new Date("2020-01-01"),
          current: false,
          description: "This is a test description",
        },
      projects: 
        {
          title: "Test Project",
          description: "This is a test description",
          link: "https://www.google.com",
        },
      social: {
        youtube: "https://www.youtube.com",
        twitter: "https://www.twitter.com",
        facebook: "https://www.facebook.com",
        linkedin: "https://www.linkedin.com",
        instagram: "https://www.instagram.com",
      },
}).then((res) => {
  return res;
}).catch((err) => {
  console.log(err);
  return err;
});
return res;
}

(async () => {
  const user = await createUser;
  console.log(`User created with id: ${JSON.stringify(user.data)}`);
  const id = await getUser(user.data.wallet);
  console.log(`User ID: ${JSON.stringify(id.data)}`);
  const res = await createUserProfile(id.data.id);
  console.log(`User Profile: ${res.data}`);
})();
