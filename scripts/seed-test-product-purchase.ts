import { config } from 'dotenv';

config({
  path: '.env.local'
});

config({
  path: '.env'
});

const { prisma } =
  await import('../lib/prisma');

const DAY =
  24 * 60 * 60 * 1000;

function daysAgo(
  days: number
) {
  return new Date(
    Date.now() -
      days * DAY
  );
}

function daysFromNow(
  days: number
) {
  return new Date(
    Date.now() +
      days * DAY
  );
}

async function resolveClient() {
  const requestedEmail =
    process.argv[2]
      ?.trim()
      .toLowerCase();

  if (requestedEmail) {
    const user =
      await prisma.user.findUnique({
        where: {
          email:
            requestedEmail
        },

        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          status: true
        }
      });

    if (!user) {
      throw new Error(
        `No Rcentz user found with email: ${requestedEmail}`
      );
    }

    if (
      user.status !==
      'ACTIVE'
    ) {
      throw new Error(
        `${user.email} is not an ACTIVE account.`
      );
    }

    return user;
  }

  const clients =
    await prisma.user.findMany({
      where: {
        role: 'CLIENT',
        status: 'ACTIVE'
      },

      orderBy: {
        createdAt: 'asc'
      },

      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true
      }
    });

  if (
    clients.length === 1
  ) {
    return clients[0];
  }

  if (
    clients.length === 0
  ) {
    throw new Error(
      'No ACTIVE CLIENT account was found.'
    );
  }

  console.table(
    clients.map(
      client => ({
        name:
          client.name,

        email:
          client.email
      })
    )
  );

  throw new Error(
    'More than one ACTIVE client exists. Run the script again with the client email.'
  );
}

async function main() {
  console.log(
    'Preparing Rcentz test product purchase...'
  );

  const client =
    await resolveClient();

  console.log(
    `Using client: ${client.name} <${client.email}>`
  );

  const product =
    await prisma.product.findUnique({
      where: {
        slug:
          'rcentz-client-portal-starter'
      },

      select: {
        id: true,
        name: true,
        price: true,
        currency: true,

        digital: {
          select: {
            id: true
          }
        }
      }
    });

  if (!product) {
    throw new Error(
      'Rcentz Client Portal Starter does not exist. Run scripts/seed-test-products.ts first.'
    );
  }

  // =====================================================
  // SELF-HEAL DIGITAL PRODUCT
  // =====================================================

  let digitalProduct =
    product.digital;

  if (!digitalProduct) {
    console.log(
      'DigitalProduct record missing — creating it now...'
    );

    digitalProduct =
      await prisma.digitalProduct.create({
        data: {
          productId:
            product.id,

          description:
            'Rcentz Client Portal Starter digital product.',

          version:
            '1.0.0',

          fileName:
            'rcentz-client-portal-starter.txt',

          fileSize:
            1024,

          fileType:
            'text/plain',

          downloadUrl:
            '/test-downloads/rcentz-client-portal-starter.txt'
        },

        select: {
          id: true
        }
      });
  } else {
    await prisma.digitalProduct.update({
      where: {
        productId:
          product.id
      },

      data: {
        description:
          'Rcentz Client Portal Starter digital product.',

        version:
          '1.0.0',

        fileName:
          'rcentz-client-portal-starter.txt',

        fileSize:
          1024,

        fileType:
          'text/plain',

        downloadUrl:
          '/test-downloads/rcentz-client-portal-starter.txt'
      }
    });
  }

  // =====================================================
  // CLIENT PROFILE
  // =====================================================

  const clientProfile =
    await prisma.clientProfile.findUnique({
      where: {
        userId:
          client.id
      },

      select: {
        address: true,
        city: true,
        state: true,
        country: true
      }
    });

  const hasBillingAddress =
    Boolean(
      clientProfile?.address ||
      clientProfile?.city ||
      clientProfile?.state ||
      clientProfile?.country
    );

  const billingAddress =
    hasBillingAddress
      ? {
          address:
            clientProfile
              ?.address ??
            null,

          city:
            clientProfile
              ?.city ??
            null,

          state:
            clientProfile
              ?.state ??
            null,

          country:
            clientProfile
              ?.country ??
            null
        }
      : null;

  // =====================================================
  // PRODUCT VARIANT
  // =====================================================

  const variant =
    await prisma.productVariant.upsert({
      where: {
        sku:
          'RC-DIG-001-STARTER'
      },

      update: {
        productId:
          product.id,

        name:
          'Starter',

        price:
          product.price,

        isDefault:
          true,

        attributes: {
          edition:
            'Starter',

          delivery:
            'Digital',

          license:
            'Single account'
        }
      },

      create: {
        productId:
          product.id,

        name:
          'Starter',

        sku:
          'RC-DIG-001-STARTER',

        price:
          product.price,

        isDefault:
          true,

        attributes: {
          edition:
            'Starter',

          delivery:
            'Digital',

          license:
            'Single account'
        }
      }
    });

  const purchasedAt =
    daysAgo(2);

  const lastDownloadedAt =
    daysAgo(1);

  const expiresAt =
    daysFromNow(30);

  const suffix =
    client.id
      .slice(-6)
      .toUpperCase();

  const orderNumber =
    `TEST-RC-ORD-${suffix}`;

  const invoiceNumber =
    `TEST-RC-INV-${suffix}`;

  const paymentReference =
    `TEST-RC-PAY-${suffix}`;

  const deliveryToken =
    `test-rcentz-delivery-${client.id}`;

  // =====================================================
  // ORDER
  // =====================================================

  const order =
    await prisma.order.upsert({
      where: {
        orderNumber
      },

      update: {
        userId:
          client.id,

        status:
          'COMPLETED',

        subtotal:
          product.price,

        discount: 0,
        tax: 0,
        shipping: 0,

        total:
          product.price,

        currency:
          product.currency,

        customerName:
          client.name,

        customerEmail:
          client.email,

        customerPhone:
          client.phone,

        completedAt:
          purchasedAt
      },

      create: {
        userId:
          client.id,

        orderNumber,

        status:
          'COMPLETED',

        subtotal:
          product.price,

        discount: 0,
        tax: 0,
        shipping: 0,

        total:
          product.price,

        currency:
          product.currency,

        customerName:
          client.name,

        customerEmail:
          client.email,

        customerPhone:
          client.phone,

        completedAt:
          purchasedAt,

        createdAt:
          purchasedAt
      }
    });

  // =====================================================
  // ORDER ITEM
  // =====================================================

  let orderItem =
    await prisma.orderItem.findFirst({
      where: {
        orderId:
          order.id,

        variantId:
          variant.id
      }
    });

  if (orderItem) {
    orderItem =
      await prisma.orderItem.update({
        where: {
          id:
            orderItem.id
        },

        data: {
          productName:
            product.name,

          variantName:
            variant.name,

          quantity: 1,

          unitPrice:
            product.price,

          total:
            product.price
        }
      });
  } else {
    orderItem =
      await prisma.orderItem.create({
        data: {
          orderId:
            order.id,

          variantId:
            variant.id,

          productName:
            product.name,

          variantName:
            variant.name,

          quantity: 1,

          unitPrice:
            product.price,

          total:
            product.price,

          createdAt:
            purchasedAt
        }
      });
  }

  // =====================================================
  // INVOICE
  // =====================================================

  const invoice =
    await prisma.invoice.upsert({
      where: {
        invoiceNumber
      },

      update: {
        clientId:
          client.id,

        sourceType:
          'ORDER',

        status:
          'PAID',

        currency:
          product.currency,

        subtotal:
          product.price,

        discount: 0,
        tax: 0,

        total:
          product.price,

        amountPaid:
          product.price,

        balanceDue: 0,

        orderId:
          order.id,

        customerName:
          client.name,

        customerEmail:
          client.email,

        customerPhone:
          client.phone,

        ...(billingAddress
          ? {
              billingAddress
            }
          : {}),

        issuedAt:
          purchasedAt,

        dueAt:
          purchasedAt,

        paidAt:
          purchasedAt
      },

      create: {
        clientId:
          client.id,

        invoiceNumber,

        sourceType:
          'ORDER',

        status:
          'PAID',

        currency:
          product.currency,

        subtotal:
          product.price,

        discount: 0,
        tax: 0,

        total:
          product.price,

        amountPaid:
          product.price,

        balanceDue: 0,

        orderId:
          order.id,

        customerName:
          client.name,

        customerEmail:
          client.email,

        customerPhone:
          client.phone,

        ...(billingAddress
          ? {
              billingAddress
            }
          : {}),

        issuedAt:
          purchasedAt,

        dueAt:
          purchasedAt,

        paidAt:
          purchasedAt,

        createdAt:
          purchasedAt
      }
    });

  // =====================================================
  // INVOICE ITEM
  // =====================================================

  await prisma.invoiceItem.deleteMany({
    where: {
      invoiceId:
        invoice.id,

      productVariantId:
        variant.id
    }
  });

  await prisma.invoiceItem.create({
    data: {
      invoiceId:
        invoice.id,

      type:
        'PRODUCT',

      name:
        product.name,

      description:
        'Rcentz Client Portal Starter digital product purchase.',

      quantity: 1,

      unitPrice:
        product.price,

      total:
        product.price,

      productVariantId:
        variant.id
    }
  });

  // =====================================================
  // PAYMENT
  // =====================================================

  const payment =
    await prisma.payment.upsert({
      where: {
        reference:
          paymentReference
      },

      update: {
        invoiceId:
          invoice.id,

        payerId:
          client.id,

        amount:
          product.price,

        currency:
          product.currency,

        method:
          'BANK_TRANSFER',

        provider:
          'BANK_TRANSFER',

        providerName:
          'Rcentz Test Payment',

        status:
          'SUCCESS',

        paidAt:
          purchasedAt
      },

      create: {
        invoiceId:
          invoice.id,

        payerId:
          client.id,

        amount:
          product.price,

        currency:
          product.currency,

        method:
          'BANK_TRANSFER',

        provider:
          'BANK_TRANSFER',

        providerName:
          'Rcentz Test Payment',

        status:
          'SUCCESS',

        reference:
          paymentReference,

        initiatedAt:
          purchasedAt,

        paidAt:
          purchasedAt,

        createdAt:
          purchasedAt
      }
    });

  // =====================================================
  // DIGITAL DELIVERY
  // =====================================================

  const delivery =
    await prisma.digitalDelivery.upsert({
      where: {
        orderItemId:
          orderItem.id
      },

      update: {
        digitalProductId:
          digitalProduct.id,

        token:
          deliveryToken,

        status:
          'DOWNLOADED',

        downloadCount: 2,

        lastDownloadedAt,

        expiresAt
      },

      create: {
        orderItemId:
          orderItem.id,

        digitalProductId:
          digitalProduct.id,

        token:
          deliveryToken,

        status:
          'DOWNLOADED',

        downloadCount: 2,

        lastDownloadedAt,

        expiresAt,

        createdAt:
          purchasedAt
      }
    });

  console.log('');
  console.log(
    '✅ Rcentz test purchase ready.'
  );

  console.table([
    {
      client:
        client.name,

      product:
        product.name,

      order:
        order.orderNumber,

      invoice:
        invoice.invoiceNumber,

      payment:
        payment.status,

      delivery:
        delivery.status,

      downloads:
        delivery.downloadCount
    }
  ]);

  console.log('');
  console.log(
    'Open /dashboard/products/rcentz-client-portal-starter'
  );
}

main()
  .catch(error => {
    console.error('');
    console.error(
      '❌ Test product purchase seed failed.'
    );

    console.error(error);

    process.exitCode = 1;
  })
  .finally(
    async () => {
      await prisma.$disconnect();
    }
  );