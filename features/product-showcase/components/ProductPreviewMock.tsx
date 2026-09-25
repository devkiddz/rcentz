import type { RcentzProduct } from '@/features/products/server/get-products';

import type { ProductVisual } from '../lib/product-showcase';

import styles from '../styles/ProductShowcase.module.css';

type ProductPreviewMockProps = {
  product: RcentzProduct;

  visual: ProductVisual;
};

function PreviewHeader({ product, visual }: ProductPreviewMockProps) {
  return (
    <div className={styles.previewHeader}>
      <div>
        <p className={styles.previewEyebrow}>{visual.galleryName}</p>

        <p className={styles.previewTitle}>{product.name}</p>
      </div>

      <span className={styles.previewSignal} />
    </div>
  );
}

function DashboardPreview(props: ProductPreviewMockProps) {
  return (
    <div className={styles.previewCanvas}>
      <PreviewHeader {...props} />

      <div className={styles.dashboardLayout}>
        <div className={styles.dashboardSidebar}>
          <span className={styles.accentBlock} />

          <span />
          <span />
          <span />
        </div>

        <div className={styles.dashboardContent}>
          <div className={styles.metricRow}>
            <span />
            <span />
            <span />
          </div>

          <div className={styles.chart}>
            {[30, 52, 42, 71, 56, 84, 69].map((height, index) => (
              <i
                key={index}
                style={{
                  height: `${height}%`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CataloguePreview(props: ProductPreviewMockProps) {
  return (
    <div className={styles.previewCanvas}>
      <PreviewHeader {...props} />

      <div className={styles.catalogueGrid}>
        {[0, 1, 2, 3].map(index => (
          <div key={index} className={styles.catalogueItem}>
            <span className={index === 0 ? styles.catalogueImageActive : styles.catalogueImage} />

            <span className={styles.fakeLineStrong} />

            <span className={styles.fakeLine} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityPreview(props: ProductPreviewMockProps) {
  return (
    <div className={styles.previewCanvas}>
      <PreviewHeader {...props} />

      <div className={styles.activityList}>
        {[0, 1, 2, 3].map(index => (
          <div key={index} className={styles.activityItem}>
            <span className={index === 0 ? styles.activityIconActive : styles.activityIcon} />

            <div>
              <span className={styles.fakeLineStrong} />

              <span className={styles.fakeLine} />
            </div>

            <span className={styles.activityStatus} />
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkspacePreview(props: ProductPreviewMockProps) {
  return (
    <div className={styles.previewCanvas}>
      <PreviewHeader {...props} />

      <div className={styles.workspace}>
        <div className={styles.workspaceMain}>
          <span className={styles.workspaceAccent} />

          <span className={styles.fakeLineStrong} />

          <span className={styles.fakeLine} />

          <span className={styles.workspaceAction} />
        </div>

        <div className={styles.workspaceSide}>
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export function ProductPreviewMock(props: ProductPreviewMockProps) {
  switch (props.visual.variant) {
    case 1:
      return <CataloguePreview {...props} />;

    case 2:
      return <ActivityPreview {...props} />;

    case 3:
      return <WorkspacePreview {...props} />;

    default:
      return <DashboardPreview {...props} />;
  }
}
