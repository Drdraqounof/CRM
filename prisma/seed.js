

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

  // Admin user
  const adminEmail = 'rob@launchapdphilly.org';
  const adminPassword = 'lpuser1';
  const adminHashed = await bcrypt.hash(adminPassword, 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: adminHashed },
    create: {
      email: adminEmail,
      name: 'Admin User',
      password: adminHashed,
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
