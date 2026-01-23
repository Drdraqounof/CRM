

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { mockDonors, mockCampaigns } = require("../lib/mock-data");

async function main() {
  // Seed donors
  for (const donor of mockDonors) {
    await prisma.donor.upsert({
      where: { email: donor.email },
      update: {},
      create: {
        id: donor.id,
        name: donor.name,
        email: donor.email,
        phone: donor.phone,
        totalDonated: donor.totalDonated,
        lastDonation: donor.lastDonation ? new Date(donor.lastDonation) : undefined,
        status: donor.status,
        description: donor.description,
      },
    });
  }

  // Seed campaigns
  for (const campaign of mockCampaigns) {
    await prisma.campaign.upsert({
      where: { name: campaign.name },
      update: {},
      create: {
        name: campaign.name,
        goal: campaign.goal,
        raised: campaign.raised,
        startDate: new Date(campaign.startDate),
        endDate: new Date(campaign.endDate),
        status: campaign.status,
        description: campaign.description,
      },
    });
  }

  // Seed a test user for login
  const bcrypt = require('bcryptjs');
  // Test user
  const testEmail = 'test@email.com';
  const testPassword = 'test1234';
  const hashed = await bcrypt.hash(testPassword, 10);
  await prisma.user.upsert({
    where: { email: testEmail },
    update: { password: hashed },
    create: {
      email: testEmail,
      name: 'Test User',
      password: hashed,
    },
  });

  // Admin users
  const adminUsers = [
    { email: 'rob@launchpadphilly.org', name: 'Rob', password: 'lpuser1' },
    { email: 'sanaa@launchpadphilly.org', name: 'Sanaa', password: 'lpuser2' },
    { email: 'taheera@launchpadphilly.org', name: 'Taheera', password: 'lpuser3' },
  ];

  for (const admin of adminUsers) {
    const adminHashed = await bcrypt.hash(admin.password, 10);
    await prisma.user.upsert({
      where: { email: admin.email },
      update: { password: adminHashed, isAdmin: true },
      create: {
        email: admin.email,
        name: admin.name,
        password: adminHashed,
        isAdmin: true,
      },
    });
  }

  // Create additional test users with survey responses
  const surveyUsers = [
    { email: 'john.smith@nonprofit.org', name: 'John Smith', password: 'password123' },
    { email: 'sarah.jones@charity.org', name: 'Sarah Jones', password: 'password123' },
    { email: 'mike.wilson@foundation.org', name: 'Mike Wilson', password: 'password123' },
    { email: 'emily.davis@personal.com', name: 'Emily Davis', password: 'password123' },
    { email: 'david.brown@community.org', name: 'David Brown', password: 'password123' },
    { email: 'lisa.garcia@donor.com', name: 'Lisa Garcia', password: 'password123' },
    { email: 'james.taylor@ngo.org', name: 'James Taylor', password: 'password123' },
    { email: 'amanda.white@volunteer.org', name: 'Amanda White', password: 'password123' },
  ];

  const surveyData = [
    {
      userType: 'organization',
      usedCRM: 'yes',
      crmPurpose: 'donor-management',
      interests: 'Tracking donations, Managing donor relationships, Email campaigns',
      crmComfort: 'very-comfortable',
      orgName: 'Hope Foundation',
      orgRole: 'Development Director',
    },
    {
      userType: 'organization',
      usedCRM: 'yes',
      crmPurpose: 'fundraising',
      interests: 'Campaign tracking, Donor segmentation, Reporting',
      crmComfort: 'comfortable',
      orgName: 'Community Helpers',
      orgRole: 'Executive Director',
    },
    {
      userType: 'organization',
      usedCRM: 'no',
      crmPurpose: 'communication',
      interests: 'Email outreach, Donor thank you letters, Event invitations',
      crmComfort: 'somewhat-comfortable',
      orgName: 'Green Earth Initiative',
      orgRole: 'Volunteer Coordinator',
    },
    {
      userType: 'personal',
      usedCRM: 'no',
      crmPurpose: 'tracking-donations',
      interests: 'Personal giving history, Tax receipts',
      crmComfort: 'not-comfortable',
      orgName: null,
      orgRole: null,
    },
    {
      userType: 'organization',
      usedCRM: 'yes',
      crmPurpose: 'donor-management',
      interests: 'Grant tracking, Major donor cultivation, Board reporting',
      crmComfort: 'very-comfortable',
      orgName: 'Youth Empowerment Center',
      orgRole: 'Grants Manager',
    },
    {
      userType: 'personal',
      usedCRM: 'no',
      crmPurpose: 'organizing-contacts',
      interests: 'Managing giving goals, Tracking favorite charities',
      crmComfort: 'somewhat-comfortable',
      orgName: null,
      orgRole: null,
    },
    {
      userType: 'organization',
      usedCRM: 'yes',
      crmPurpose: 'fundraising',
      interests: 'Peer-to-peer fundraising, Event management, Social media integration',
      crmComfort: 'comfortable',
      orgName: 'Animal Rescue Network',
      orgRole: 'Fundraising Manager',
    },
    {
      userType: 'organization',
      usedCRM: 'no',
      crmPurpose: 'communication',
      interests: 'Newsletter management, Volunteer coordination, Impact reporting',
      crmComfort: 'not-comfortable',
      orgName: 'Literacy Partners',
      orgRole: 'Program Manager',
    },
  ];

  for (let i = 0; i < surveyUsers.length; i++) {
    const userData = surveyUsers[i];
    const surveyInfo = surveyData[i];
    const userHashed = await bcrypt.hash(userData.password, 10);
    
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: { password: userHashed },
      create: {
        email: userData.email,
        name: userData.name,
        password: userHashed,
      },
    });

    // Create survey response for this user
    const existingResponse = await prisma.surveyResponse.findFirst({
      where: { userId: user.id },
    });

    if (!existingResponse) {
      await prisma.surveyResponse.create({
        data: {
          userId: user.id,
          ...surveyInfo,
        },
      });
    }
  }

  console.log('Seed completed with survey responses!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
