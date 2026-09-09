import { config } from 'dotenv';

config({
  path: '.env.local'
});

config({
  path: '.env'
});

const { prisma } =
  await import('../lib/prisma');

async function main() {
  console.log(
    'Seeding Rcentz test products...'
  );

  const softwareCategory =
    await prisma.productCategory.upsert({
      where: {
        slug: 'software-systems'
      },

      update: {
        name: 'Software Systems',

        description:
          'Reusable digital systems and software products from Rcentz.'
      },

      create: {
        name: 'Software Systems',

        slug: 'software-systems',

        description:
          'Reusable digital systems and software products from Rcentz.'
      }
    });

  const hardwareCategory =
    await prisma.productCategory.upsert({
      where: {
        slug: 'technology-accessories'
      },

      update: {
        name: 'Technology Accessories',

        description:
          'Selected physical technology products and accessories.'
      },

      create: {
        name: 'Technology Accessories',

        slug: 'technology-accessories',

        description:
          'Selected physical technology products and accessories.'
      }
    });

  const bundleCategory =
    await prisma.productCategory.upsert({
      where: {
        slug: 'rcentz-bundles'
      },

      update: {
        name: 'Rcentz Bundles',

        description:
          'Combined Rcentz products packaged for specific business needs.'
      },

      create: {
        name: 'Rcentz Bundles',

        slug: 'rcentz-bundles',

        description:
          'Combined Rcentz products packaged for specific business needs.'
      }
    });

  // =====================================================
  // DIGITAL PRODUCT
  // =====================================================

  const clientPortal =
    await prisma.product.upsert({
      where: {
        slug:
          'rcentz-client-portal-starter'
      },

      update: {
        categoryId:
          softwareCategory.id,

        name:
          'Rcentz Client Portal Starter',

        shortDescription:
          'A reusable client portal foundation for projects, billing, requests and managed services.',

        description:
          'A production-ready client portal foundation designed for businesses that need project visibility, billing records, requests and customer account management.',

        type: 'DIGITAL',

        status: 'ACTIVE',

        price: 250000,

        compareAtPrice:
          320000,

        currency: 'NGN',

        sku: 'RC-DIG-001',

        trackInventory:
          false,

        featured: true
      },

      create: {
        categoryId:
          softwareCategory.id,

        name:
          'Rcentz Client Portal Starter',

        slug:
          'rcentz-client-portal-starter',

        shortDescription:
          'A reusable client portal foundation for projects, billing, requests and managed services.',

        description:
          'A production-ready client portal foundation designed for businesses that need project visibility, billing records, requests and customer account management.',

        type: 'DIGITAL',

        status: 'ACTIVE',

        price: 250000,

        compareAtPrice:
          320000,

        currency: 'NGN',

        sku: 'RC-DIG-001',

        trackInventory:
          false,

        featured: true
      }
    });

  await prisma.digitalProduct.upsert({
    where: {
      productId:
        clientPortal.id
    },

    update: {
      description:
        'Rcentz client portal software package.',

      version:
        '1.0.0',

      fileType:
        'Application package',

      fileSize:
        48234496
    },

    create: {
      productId:
        clientPortal.id,

      description:
        'Rcentz client portal software package.',

      version:
        '1.0.0',

      fileType:
        'Application package',

      fileSize:
        48234496
    }
  });

  // =====================================================
  // PHYSICAL PRODUCT
  // =====================================================

  const mouse =
    await prisma.product.upsert({
      where: {
        slug:
          'wireless-productivity-mouse'
      },

      update: {
        categoryId:
          hardwareCategory.id,

        name:
          'Wireless Productivity Mouse',

        shortDescription:
          'A clean wireless mouse selected for productive office and development workspaces.',

        description:
          'A practical wireless productivity mouse for office, development and everyday workstation use.',

        type: 'PHYSICAL',

        status: 'ACTIVE',

        price: 35000,

        currency: 'NGN',

        sku: 'RC-HDW-001',

        trackInventory:
          true,

        featured: false
      },

      create: {
        categoryId:
          hardwareCategory.id,

        name:
          'Wireless Productivity Mouse',

        slug:
          'wireless-productivity-mouse',

        shortDescription:
          'A clean wireless mouse selected for productive office and development workspaces.',

        description:
          'A practical wireless productivity mouse for office, development and everyday workstation use.',

        type: 'PHYSICAL',

        status: 'ACTIVE',

        price: 35000,

        currency: 'NGN',

        sku: 'RC-HDW-001',

        trackInventory:
          true,

        featured: false
      }
    });

  const mouseVariant =
    await prisma.productVariant.upsert({
      where: {
        sku:
          'RC-HDW-001-BLK'
      },

      update: {
        productId:
          mouse.id,

        name: 'Black',

        price: 35000,

        isDefault: true,

        attributes: {
          colour: 'Black',
          connection: 'Wireless'
        }
      },

      create: {
        productId:
          mouse.id,

        name: 'Black',

        sku:
          'RC-HDW-001-BLK',

        price: 35000,

        isDefault: true,

        attributes: {
          colour: 'Black',
          connection: 'Wireless'
        }
      }
    });

  await prisma.inventoryItem.upsert({
    where: {
      variantId:
        mouseVariant.id
    },

    update: {
      quantity: 12,

      reserved: 2,

      lowStockThreshold:
        3
    },

    create: {
      variantId:
        mouseVariant.id,

      quantity: 12,

      reserved: 2,

      lowStockThreshold:
        3
    }
  });

  // =====================================================
  // BUNDLE PRODUCT
  // =====================================================

  const businessBundle =
    await prisma.product.upsert({
      where: {
        slug:
          'business-digital-launch-bundle'
      },

      update: {
        categoryId:
          bundleCategory.id,

        name:
          'Business Digital Launch Bundle',

        shortDescription:
          'A combined digital package for businesses preparing to establish a stronger online presence.',

        description:
          'A curated Rcentz bundle combining key digital products required to establish and organise a modern business presence.',

        type: 'BUNDLE',

        status: 'ACTIVE',

        price: 480000,

        compareAtPrice:
          550000,

        currency: 'NGN',

        sku: 'RC-BND-001',

        trackInventory:
          false,

        featured: true
      },

      create: {
        categoryId:
          bundleCategory.id,

        name:
          'Business Digital Launch Bundle',

        slug:
          'business-digital-launch-bundle',

        shortDescription:
          'A combined digital package for businesses preparing to establish a stronger online presence.',

        description:
          'A curated Rcentz bundle combining key digital products required to establish and organise a modern business presence.',

        type: 'BUNDLE',

        status: 'ACTIVE',

        price: 480000,

        compareAtPrice:
          550000,

        currency: 'NGN',

        sku: 'RC-BND-001',

        trackInventory:
          false,

        featured: true
      }
    });

  // =====================================================
  // OUT-OF-STOCK PRODUCT
  // =====================================================

  const display =
    await prisma.product.upsert({
      where: {
        slug:
          'portable-workspace-display'
      },

      update: {
        categoryId:
          hardwareCategory.id,

        name:
          'Portable Workspace Display',

        shortDescription:
          'A portable secondary display for mobile workstations and development setups.',

        description:
          'A compact portable monitor designed to extend productivity for developers, designers and remote professionals.',

        type: 'PHYSICAL',

        status:
          'OUT_OF_STOCK',

        price: 185000,

        currency: 'NGN',

        sku: 'RC-HDW-002',

        trackInventory:
          true,

        featured: false
      },

      create: {
        categoryId:
          hardwareCategory.id,

        name:
          'Portable Workspace Display',

        slug:
          'portable-workspace-display',

        shortDescription:
          'A portable secondary display for mobile workstations and development setups.',

        description:
          'A compact portable monitor designed to extend productivity for developers, designers and remote professionals.',

        type: 'PHYSICAL',

        status:
          'OUT_OF_STOCK',

        price: 185000,

        currency: 'NGN',

        sku: 'RC-HDW-002',

        trackInventory:
          true,

        featured: false
      }
    });

  // =====================================================
  // TEST PRODUCT MEDIA
  // =====================================================

  await prisma.mediaAsset.deleteMany({
    where: {
      productId: {
        in: [
          clientPortal.id,
          mouse.id,
          businessBundle.id,
          display.id
        ]
      },

      publicId: {
        startsWith:
          'rcentz-test-product-'
      }
    }
  });

  await prisma.mediaAsset.createMany({
    data: [
      {
        productId:
          clientPortal.id,

        url:
          'https://placehold.co/1200x800/101010/FFFFFF/png?text=Rcentz+Client+Portal',

        publicId:
          'rcentz-test-product-client-portal',

        fileName:
          'rcentz-client-portal.png',

        mimeType:
          'image/png',

        alt:
          'Rcentz Client Portal Starter',

        caption:
          'Rcentz software product preview',

        sortOrder: 0
      },

      {
        productId:
          mouse.id,

        url:
          'https://placehold.co/1200x800/181818/FFFFFF/png?text=Wireless+Mouse',

        publicId:
          'rcentz-test-product-mouse',

        fileName:
          'wireless-mouse.png',

        mimeType:
          'image/png',

        alt:
          'Wireless Productivity Mouse',

        caption:
          'Physical product preview',

        sortOrder: 0
      },

      {
        productId:
          businessBundle.id,

        url:
          'https://placehold.co/1200x800/0F766E/FFFFFF/png?text=Business+Launch+Bundle',

        publicId:
          'rcentz-test-product-bundle',

        fileName:
          'business-launch-bundle.png',

        mimeType:
          'image/png',

        alt:
          'Business Digital Launch Bundle',

        caption:
          'Rcentz bundled product preview',

        sortOrder: 0
      },

      {
        productId:
          display.id,

        url:
          'https://placehold.co/1200x800/27272A/FFFFFF/png?text=Portable+Display',

        publicId:
          'rcentz-test-product-display',

        fileName:
          'portable-display.png',

        mimeType:
          'image/png',

        alt:
          'Portable Workspace Display',

        caption:
          'Physical product preview',

        sortOrder: 0
      }
    ]
  });

  console.log(
    '✅ Rcentz test products ready.'
  );

  console.table([
    {
      product:
        clientPortal.name,

      type: 'DIGITAL',

      status: 'ACTIVE'
    },
    {
      product:
        mouse.name,

      type: 'PHYSICAL',

      status: 'ACTIVE'
    },
    {
      product:
        businessBundle.name,

      type: 'BUNDLE',

      status: 'ACTIVE'
    },
    {
      product:
        display.name,

      type: 'PHYSICAL',

      status:
        'OUT_OF_STOCK'
    }
  ]);
}

main()
  .catch(error => {
    console.error(
      '❌ Test product seed failed.'
    );

    console.error(
      error
    );

    process.exitCode = 1;
  })
  .finally(
    async () => {
      await prisma.$disconnect();
    }
  );