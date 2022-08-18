import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Connect the client
  await prisma.$connect()
  // ... you will write your Prisma Client queries here
  const createUser = await prisma.user.create({
    data: {
      name: 'Elon Musk',
      type: 'APPLICANT',
      wallet: "0x12345678910111213141516171819202122232425",
      username: "elon",
    },
  });
  console.log(createUser);
  const user = await prisma.user.findFirst({
    where: {
      username: "elon",
    },
  });
  if (!user) return;

  // Add a user profile
  const createProfile = await prisma.userProfile.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      bio: "I like turtles",
      location: "San Francisco",
      website: "https://www.alice.com",
      experience: [{
        company: "Google",
        designation: "Software Engineer",
        from: new Date("2019-01-01"),
        to: new Date("2020-01-01"),
        location: "San Francisco",
        description: "I worked on Google Maps",
      }],
      education: [{
        school: "Stanford University",
        degree: "Bachelors",
        fieldOfStudy: "Computer Science",
        from: new Date("2015-01-01"),
        to: new Date("2019-01-01"),
        location: "Stanford, CA",
        description: "I studied computer science",
      }],
      // skills: [{
      //   name: "JavaScript",
      //   level: "INTERMEDIATE",
      // }],
      // projects: [{
      //   title: "My Project",
      //   description: "My project description",
      //   link: "https://www.myproject.com",
      // }],
      social: {
        github: "https://www.github.com/alice",
        linkedin: "https://www.linkedin.com/alice",
        twitter: "https://www.twitter.com/alice",
      },
    },
  });
  console.log(createProfile);

    const updateProfile = await prisma.userProfile.update({
      where: {
        id: '62fd2caf602c8d6897536641',
      },
      data: {
      bio: "I like turtles",
      location: "San Francisco",
      website: "https://www.alice.com",
      experience: [{
        company: "Google",
        designation: "Software Engineer",
        from: new Date("2019-01-01"),
        to: new Date("2020-01-01"),
        location: "San Francisco",
        description: "I worked on Google Maps",
      }],
      skills: [{
        name: "JavaScript",
        level: "INTERMEDIATE",
      }],
      projects: [{
        title: "My Project",
        description: "My project description",
        link: "https://www.myproject.com",
      }],
    },
  });
  console.log(updateProfile);

  // Drop the User 
  const deleteUser = await prisma.user.delete({
    where: {
      username: "elon",
    },
  });
  // Drop the user profile
  const deleteProfile = await prisma.userProfile.delete({
    where: {
      id: '62fd2caf602c8d6897536641',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })