

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
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
